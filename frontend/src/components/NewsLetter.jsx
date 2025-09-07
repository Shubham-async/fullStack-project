import React from 'react'

const NewsLetter = () => {

         const SubmitHandler=(e)=>{
           e.preventDefault();
         }
  return (
  <div className='text-center my-8  '>
      <p className='font-semibold text-2xl my-4'>Subscribe now & get 20% off</p>
      <p className='text-gray-500 mt-2'>"Get 20% off just for signing up! It’s our way of saying thanks."</p>
     <form  onSubmit={SubmitHandler} className='flex sm:w-1/2 w-full mx-auto items-center my-8 gap-2  pl-2'>
<input type="email" name="" id="" className='w-full sm:flex outline-none' placeholder='enter your email' />
   <button className='bg-black text-white text-sm px-10 py-3'>Subscribe</button>
    </form>
    </div>  
  )
}

export default NewsLetter
