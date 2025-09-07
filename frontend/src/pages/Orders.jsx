import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Orders = () => {
  const {currency,backend_url,token}=useContext(ShopContext)
const [ordersData,setordersData]=useState([])

const loadOrderData=async()=>{
try {
  if(!token){
    return null
  }
  const response=await axios.post(backend_url+'/api/order/userorder',{},{headers:{token}})
if(response.data.success){
  let allOrderItems=[]
  response.data.orders.map((order)=>{
    order.items.map((item)=>{
      item['status']=order.status
      item['payment']=order.payment
      item['paymentMethod']=order.paymentMethod
      item['date']=order.date
      allOrderItems.push(item)
    })
  })
  setordersData(allOrderItems.reverse())
}
  
} catch (error) {
  console.log(error)
}

}
useEffect(()=>{
loadOrderData()
},[token])

  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl '>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
          ordersData.map((item,index)=>(
<div key={index} className='flex flex-col text-gray-700 border-b md:flex-row md:items-center md:justify-between gap-4 '>
<div className='flex items-start gap-6 m-2 text-sm '>
<img src={item.image[0]} className='w-16 sm:w-20' alt="" />
<div className=' text-base gap-3 mt-1 text-gray-700'>
  <p className='sm:text-base font-medium'>{item.name}</p>
<p className='text-lg'>{currency}{item.price}</p>
<p>Quantity:{item.quantity}</p>
<p>Size:{item.size}</p>
<p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
<p className='mt-1'>PaymentMethod: <span className='text-gray-400'>{item.paymentMethod}</span></p>
</div>
</div>
<div className='md:w-1/2 flex justify-between'>
<div className='flex items-center gap-2'>
<p className='min-w-2 h-2 rounded-full bg-green-500'></p>
<p className='text-sm md:text-base'>{item.status}</p>
</div>
<button onClick={loadOrderData} className='border p-1 text-sm font-semibold'>Track Order</button>
</div>
</div>
 )
 )
  }
     </div>
    </div>
  )
}

export default Orders
