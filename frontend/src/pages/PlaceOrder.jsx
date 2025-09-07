import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import Orders from './Orders'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {navigate,backend_url,setCartItems,cartItems,token,deliver_fee,products,cartTotalAmount}=useContext(ShopContext)

const [method,setMethode]= useState('cod')
const [formData,setFormData]=useState({
  firstName:'',
  lastName:'',
  email:'',
  street:'',
  city:'',
  state:'',
  zipcode:'',
  country:'',
  phone:''
})

const onChangeHandler=(event)=>{
const name= event.target.name
  const  value=event.target.value
setFormData(data=>({...data,[name]:value}))


}

const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    receipt:order.receipt,
    handler: async (response) => {
      console.log("Razorpay response:", response);
      try {
        const { data } = await axios.post(
          backend_url + '/api/order/verifyRozarpay',response,{ headers: { token } }  );
        if (data.success) {
          toast.success("Payment verified successfully");
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(data.message || "Payment verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(error.response?.data?.message || "Payment verification failed");
      }
    },
    theme: {
      color: "#3399cc",
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


const onSubmitHandler=async(event)=>{
event.preventDefault();
try {
  let orderItems=[]
  for(const items in cartItems){
    for(const item in cartItems[items]){
      if(cartItems[items][item]>0){
        const itemInfo=structuredClone(products.find(product=>product._id===items))
        if(itemInfo){
          itemInfo.size=item
          itemInfo.quantity=cartItems[items][item]
          orderItems.push(itemInfo)
        }
      }
    }
  }
  
let orderData={
  address:formData,
  items:orderItems,
  amount:cartTotalAmount()+deliver_fee
}

switch(method){
  case 'cod':
const response=await axios.post(backend_url+'/api/order/place',orderData,{headers:{token}})

if(response.data.success){
  setCartItems({})

  navigate('/orders')
}
else{
  toast.error(response.data.message)
}
    break;
  case 'stripe':
    const responseStripe = await axios.post(
  backend_url + '/api/order/stripe',
  { userId: token.userId, orderData },
  { headers: { token } }
);

  console.log(responseStripe.data)
if(responseStripe.data.success){
  const {session_url} = responseStripe.data
  window.location.replace(session_url)
} else {
  toast.error(responseStripe.data.message)
}
  break;

  case 'razorpay':
    const responseRazorpay=await axios.post(backend_url+'/api/order/razorpay',orderData,{headers:{token}})
    console.log(responseRazorpay.data)
    if(responseRazorpay.data.success){
      initPay(responseRazorpay.data.order)
    }
    break;

    default:
      break;


}

} catch (error) {
  
}
}

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
    {/* ....................................... left Side................................... */}
      <div className='w-full sm:w-[480px] gap-4 flex flex-col'>
        <div className='text-xl sm:text-2xl my-3'>
<Title text1={'DELIVERY'} text2={'INFORMATIONS'}/>
        </div>
        <div className='flex gap-3'>
<input name='firstName' onChange={onChangeHandler} value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5px w-full ' placeholder='First Name' type="text"  />
<input name='lastName' onChange={onChangeHandler} value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5px w-full ' placeholder='Last Name' type="text"  />
        </div>
        <input name='email' onChange={onChangeHandler} value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5px w-full ' placeholder='Enter e-mail' type="email"  />
        <input name='street' onChange={onChangeHandler} value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5px w-full ' placeholder='Streat' type="text"  />
      <div className='flex gap-3'>
<input name='city' onChange={onChangeHandler} value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5px w-full ' placeholder='City' type="text"  />
<input name='state' onChange={onChangeHandler} value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5px w-full ' placeholder='State' type="text"  />
        </div>
          <div className='flex gap-3'>
<input name='zipcode' onChange={onChangeHandler} value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5px w-full ' placeholder='PinCode' type="number"  />
<input name='country' onChange={onChangeHandler} value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5px w-full ' placeholder='Country' type="text"  />
        </div>
        <input name='phone' onChange={onChangeHandler} value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5px w-full ' placeholder='Phone Number' type="number"  />
      </div>
      {/* ....................Right Side........................... */}
<div className='mt-10 '>
<div className='mt-8 min-w-80'>
<CartTotal />
</div>
<div className='mt-10 mb-3'>
<Title text1={'PAYMENT'} text2={'METHOD'}/>
{/*............................................. Payment Method Selection.................... */}
<div className='flex flex-col  gap-3 lg:flex-row'>
  <div onClick={()=>setMethode('stripe')} className='flex items-center gap-3 cursor-pointer border p-2 px-3'>
<p  className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400':''} `}></p>
<img className='h-5 mx-3' src={assets.stripe_logo} alt="" />
  </div>
  <div onClick={()=>setMethode('razorpay')} className='flex items-center gap-3 cursor-pointer border p-2 px-3'>
<p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-400':''}`}></p>
<img className='h-5 mx-3' src={assets.razorpay_logo} alt="" />
  </div>
  <div onClick={()=>setMethode('cod')}  className='flex items-center gap-3 cursor-pointer border p-2 px-3'>
<p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
<p  className='text-sm font-semibold'>CASH ON DELIVERY</p>
  </div>
</div>
<div className='w-full text-end '>
         <button type='submit'  className='bg-black text-white text-sm my-8 px-6 py-3'>Place Order</button>
</div>
</div>
</div>

    </form>
  )
}

export default PlaceOrder
