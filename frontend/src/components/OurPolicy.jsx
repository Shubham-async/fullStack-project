import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {


  return (
    <div className='flex flex-col items-center justify-center sm:flex-row sm:gap-4 gap-12 my-10 '>
      <div>
         <img src={assets.exchange_icon} alt="" className='w-12 m-auto   ' />
         <p className='text-gray-700 w-18 px-12 m-auto font-semibold'>Easy Exchange Policy</p> 
         <p className='text-gray-500 mt-2 px-2 '>We offer hassel exchange policy</p>
      </div>
      <div>
         <img src={assets.quality_icon} alt="" className='w-12 m-auto   ' />
         <p className='text-gray-700 w-18 px-12 m-auto font-semibold'>7 days return Policy</p> 
         <p className='text-gray-500 mt-2 px-2 '>We provide 7 days return policy</p>
      </div>
      <div>
         <img src={assets.support_img} alt="" className='w-12 m-auto   ' />
         <p className='text-gray-700 w-18 px-12 m-auto font-semibold'>Customer Support </p> 
         <p className='text-gray-500 mt-2 px-2 '>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
