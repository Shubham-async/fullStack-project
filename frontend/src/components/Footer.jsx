import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
         <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-4 my-8 mt-15 text-sm'>
      <div>
<img src={assets.logo} alt="" className='mb-8 w-32 ' />
<p className='w-full md:w-2/3 text-xs'>"Forever was founded with a simple belief: great design and quality should never fade with time. Our mission is to offer products that combine timeless aesthetics, sustainable craftsmanship, and everyday functionality. Whether you're shopping for essentials or statement pieces, we ensure every item is built to last—because true beauty never goes out of style. Welcome to a place where quality lives forever."</p>
      </div>
      <div>
<p className='text-xl font-medium mb-5'>COMPANY</p>
      <ul className='flex gap-3  flex-col cursor-pointer'> 
         <li>Home</li>
         <li>About us</li>
         <li>Delivery</li>
         <li>Privacy Policy</li>
      </ul>
      </div>
      <div>
         <p className='text-xl font-medium '>Get in Touch</p>
         <ul className='flex gap-3 flex-col mt-5 cursor-pointer'>
                  <li>+1-213-342-3443</li>
                  <li>contactForever@gmail.com</li>
                  
         </ul>
      </div>
     
    </div>
    <div >
          <hr />
      <p className='text-sm  py-5 text-center'>Copyrights 2025 @Forever.com - All Copyrights Reserved</p>
     </div>
     </div>
  )
}
 
export default Footer
