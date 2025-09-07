import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  
  return (
    <div>
      <div className='text-center pt-6 text-2xl'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
    
      <div className=' m-auto flex-col md:flex-row flex text-sm text-gray-800 gap-6 mt-2'>
      <img className='md:max-w-[410px] ' src={assets.about_img} alt="" />
      <div className=' mt-3 gap-3 flex flex-col '>
        <p >At Forever, we believe in creating moments that last a lifetime. Whether it's through meaningful experiences, timeless design, or lasting memories, our mission is to help you hold on to what matters most.
We are inspired by simplicity, driven by purpose, and committed to building something that endures.
Welcome to Forever — where everything we create is made to last.</p>
<p >We’re here to celebrate the beauty of the present while honoring what lasts. Through carefully crafted products, thoughtful content, and an unwavering commitment to quality, Forever inspires you to live intentionally, love deeply, and leave a lasting legacy.</p>
     <b className='mt-2 mb-2'>Our Mission</b>
     <p>At Forever, our mission is to create meaningful, lasting experiences.
We believe in quality over quantity, intention over impulse, and connection over noise. Whether through the products we craft, the stories we tell, or the community we build — we strive to leave a lasting impact that stands the test of time.</p>
      </div>
      </div>
      <div className='text-2xl mt-5'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex gap-3 flex-col md:flex-row '>
        <div className='sm:w-2/6 w-full text-sm border  items-center justify-center  py-4 px-2 flex gap-2 flex-col '>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>At every stage of production, we prioritize quality assurance to ensure our products meet the highest industry standards. Our dedicated QA team conducts thorough inspections and testing to verify that each item is free from defects and functions as intended. 

</p>
      </div>
      <div className='sm:w-2/6 w-full text-sm border items-center justify-center py-3 px-2 flex gap-2 flex-col'>
        <b className='text-lg'>Convinenece:</b>
        <p className='text-gray-600'>We understand that convenience products must not only be easy to use but also consistently reliable and safe. That’s why we implement a comprehensive quality assurance process at every stage—from sourcing materials to final packaging. 
</p>
      </div>
      <div className='sm:w-2/6 w-full text-sm items-center justify-center border py-3 px-2 flex gap-2 flex-col'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>At the heart of our business is a commitment to exceptional customer service. We believe every customer interaction is an opportunity to build trust and deliver value. 
</p>
      </div>
      </div>
      <NewsLetter/>
    </div>
  )
}

export default About
