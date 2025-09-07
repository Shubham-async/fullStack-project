import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex sm:flex-row border flex-col border-gray-400'>
      {/* Left side of the hero section */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
      <div className='text-[#414141]'>
<div className='flex items-center gap-2'>
         <p className='h-[2px] bg-gray-700 w-8 md:w-11'></p>
         <p className='font-medium text-sm md:text-base'>Our Best Seller</p>
</div>
<h1 className='text-3xl lg:text-5xl'>Latest Arival</h1>
<div className='flex items-center gap-2'>
          <p className='font-medium text-sm md:text-base'>Shop Now</p>
         <p className='h-[2px] bg-gray-700 w-8 md:w-11'></p>
</div>
      </div>
      </div>
         {/* Right side of the hero section */}
<img src={assets.hero_img} alt=""  className='w-full sm:w-1/2'/>

    </div>
  )
}

export default Hero
