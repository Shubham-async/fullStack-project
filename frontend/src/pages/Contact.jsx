import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl mt-2 text-center'>
<Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='flex flex-col justify-center px-10 pt-10 mb-28 md:flex-row my-10 gap-8'>
  <img className='md:max-w-[480px] px-10 w-full ' src={assets.contact_img} alt="" />
   <div className='flex flex-col  justify-center  pt-14 items-start gap-2'>
    <p className='font-semibold mt-16'>Our Store</p>
    <p className='text-gray-600'>54709:williom station <br />suit 300 wanshigthon</p>
    <p className='text-gray-600'>tel:(415) 551:0324 <br />Admin@forever.com
    </p>
    <p className='text-semibold text-xl text-gray-600'>Career at Forever</p>
  <p className='text-gray-600'>Learn more about job openings</p>
      <button className='border-2 px-3 py-2 font-semibold text-sm hover:bg-black duration-500 transition-all hover:text-white'>Explore jobs</button>
   </div>
      </div>
       <NewsLetter />
    </div>
  )
}

export default Contact
