import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';


const Cart = () => {

  const {products,cartItems,currency,updateQunatity,navigate}=useContext(ShopContext);
  const [cartData,setCartData]=useState([]);
  

useEffect(()=>{
  if(products.length > 0){
const tempData=[];
for(const items in cartItems){
  for(const item in cartItems[items]){
    if(cartItems[items][item]>0){
      tempData.push({
        _id:items,
        size:item,
        quantity:cartItems[items][item]
      })
    }
  }
}
setCartData(tempData);
  }

  },[cartItems,products]);

  return (
    
    <div className='border-t pt-14'>
      <div className='text-3xl mb-3 '>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
{
  cartData.map((item,index)=>{
    const productsData=products.find((product)=>product._id===item._id);
    
    if (!productsData) return null;
 
    return (
      <div key={index} className='border-b border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr]  py-4 sm:grid-cols-[4fr_2fr_0.3fr] items-center gap-3'>
        <div className='items-start flex gap-6'>
          <img src={productsData.image[0]} alt="" className='w-16 sm:w-20'/>
          <div  >
             <p className='text-xs font-medium sm:text-lg'>{productsData.name}</p>
            <div className='flex gap-4 mt-2 items-center'>
              <p>{currency}{productsData.price}</p>
            <p className='sm:px-3 px-2 sm:py-1  border bg-slate-100 '>{item.size}</p>
            </div>   
          </div>
        </div>  
        <input onClick={(e)=>e.target.value===''|| e.target.value==='0'?null : updateQunatity(item._id,item.size,Number(e.target.value))} className='px-1 sm:px-2 py-1 border max-w-10 sm:max-w-10' type='number' min={1} defaultValue={item.quantity}/>
      <img className='w-4 cursor-pointer' onClick={()=>updateQunatity(item._id,item.size, 0)} src={assets.bin_icon} alt="" />
     </div> 
    )
  })

}
<div className='flex justify-end my-20'>
<div className='w-full sm:w-[450px]'>
<CartTotal/>
<div className='w-full text-end '>
         <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>Proceed To Check Out</button>
</div>
</div>

</div>
      </div>
    </div>
  )
}

export default Cart
