import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  
  return (
    <div className='w-[18%] boder-r-1 border-gray-400 min-h-screen border  '>
      <div className='flex flex-col pl-[15%] pt-6 gap-3 text-[15px]'>
         <NavLink className='flex items-center border border-gray-400 gap-4 border-r-0 px-3 py-2 rounded-1' to="/add">
               <img className='w-5 h-5' src={assets.add_icon} alt="" />  
               <p className='hidden md:block'>Add items</p> 
         </NavLink>
          <NavLink className='flex items-center border border-gray-400 gap-4 border-r-0 px-3 py-2 rounded-1' to="/list">
               <img className='w-5 h-5' src={assets.order_icon} alt="" />  
               <p className='hidden md:block'>List items</p> 
         </NavLink>
         <NavLink className='flex items-center border border-gray-400 gap-4 border-r-0 px-3 py-2  rounded-1' to="/order">
               <img className='w-5 h-5' src={assets.order_icon} alt="" />  
               <p className='hidden md:block'>Orders</p> 
         </NavLink>
        
      </div>
    </div>
  )
}

export default Sidebar
          