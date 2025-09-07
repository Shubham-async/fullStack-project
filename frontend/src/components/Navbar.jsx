import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch,getCartCount,token,setToken,navigate,setCartItems} = useContext(ShopContext);

 const Logout=()=>{
    navigate('/Login');
  localStorage.removeItem('token');
  setToken('');
  setCartItems({});
  toast.success('Logged out successfully');
 
  
 }
  return (
    <div className='flex justify-between items-center py-3 font-medium'>
      <Link to='/'><img src={assets.logo} alt="" className='w-32' /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
<NavLink to="/" className='hover:text-gray-900 '>
  <p>Home</p> 
   <hr className='border-none h-[1.5px] w-2/4 mx-auto bg-gray-700 hidden'/>
    </NavLink>
 <NavLink to='/collection' className='hover:text-gray-900' >
  <p>Collection</p>
  <hr className='h-[1.5px] w-2/4 mx-auto bg-gray-700 border-none hidden'/>
 </NavLink>
 <NavLink to='/contact'  className=' hover:text-gray-900' >
  <p>Contact</p>
  <hr className='h-[1.5px] mx-auto w-2/4 bg-gray-700 border-none hidden'/>
 </NavLink>
 <NavLink to='/about' className='hover:text-gray-900' >
  <p>About</p>
  <hr className='h-[1.5px] w-2/4 bg-gray-700 border-none mx-auto hidden'/>
 </NavLink> 
      </ul>
<div className='flex gap-6 items-center'>
<img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className='w-5 cursor-pointer'/>
<div className='group relative'>
<img onClick={()=> token ? null:navigate('/Login')} src={assets.profile_icon} className="w-5 cursor-pointer" alt="" />
{
  token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
  <div className='flex flex-col gap-2 w-36 py-3 px-4 bg-slate-100 text-gray-700 rounded '>
    <p className='hover:text-black cursor-pointer'> My Profile</p>
    <p onClick={()=>navigate('/orders')} className='hover:text-black cursor-pointer'>Orders</p>
    <p onClick={Logout} className='hover:text-black cursor-pointer'>Logout</p>
  </div>
</div>
}
</div>
<Link to='cart' className='relative'>
<img src={assets.cart_icon}  className='min-w-5 w-[10px]  ' alt="" />
<div className='flex bottom-[-4px] right-[-6px] absolute aspect-square bg-black text-white rounded-full items-center text-[10px] w-[17px]'>
  <p className='text-center m-auto'>{getCartCount()}</p>
  </div>
</Link>
<img  onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 sm:hidden' alt="" />


</div>

{/* this is sidebar for smaller screen */}
<div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0'}`}>
<div className=' flex text-gray-500 m-[1px] px-2'>
<div onClick={()=>setVisible(false)} className='flex items-center gap-2 cursor-pointer'>
  <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180 ' />
<p>Back</p>
</div>

</div>
<NavLink onClick={()=>setVisible(false)} className='py-2 flex pl-2 mt-2 border' to='/' >Home</NavLink>
<NavLink onClick={()=>setVisible(false)} className='py-2 flex pl-2 border' to='/collection'>Collection</NavLink>
<NavLink onClick={()=>setVisible(false)} className='py-2 flex pl-2 border' to='/contact'>Contact</NavLink>
<NavLink onClick={()=>setVisible(false)} className='py-2 flex pl-2 border' to='/about'>About</NavLink>

</div>
    </div>
  )
}

export default Navbar
