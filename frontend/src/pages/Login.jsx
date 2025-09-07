import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';



const Login = () => {
  const [currentState,setCurrentState]=useState('Login');
  const {token,setToken,backend_url,navigate}=useContext(ShopContext);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');

  const onEventHandler=async(event)=>{
event.preventDefault();

try {
  
  if(currentState==='Sign Up'){
    const response=await axios.post(backend_url+'/api/user/register',{name,email,password})
    if(response.data.success)
    {
      toast.success('Account created successfully! You can now log in.');
      setToken(response.data.token);
      localStorage.setItem('token',response.data.token);
      
      
    }
   else {
toast.error(response.data.message);
    }
    }
    else{
      
      const response=await axios.post(backend_url+'/api/user/login',{email,password})
      if(response.data.success)
      {
        console.log(response.data);
        toast.success('Logged in successfully!');
        setToken(response.data.token);
        localStorage.setItem('token',response.data.token);
      }
      else {
        toast.error(response.data.message);
      }
    }
  }

catch (error) {
  console.error('Error during login:', error);
  toast.error('An error occurred while logging in. Please try again later.');
}

  }

  useEffect(() => {
    if(token){
    navigate('/');
    }
  }, [token]);


  return (
    <form onSubmit={onEventHandler} className='flex flex-col items-center w-[90%] sm:max-w-94 m-auto mt-14 gap-4 text-gray-700'>
<div className='inline-flex  items-center gap-2 mb-2 mt-10'>
  <p className='text-3xl'>{currentState}</p>
  <hr className='border-none h-[1.5px] w-8 bg-gray-800 '/>
</div>
{currentState==='Login'?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='px-2 w-[40%] py-2 border border-gray-800 ' placeholder='Name' />}
<input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='px-2 py-2 w-[40%] border border-gray-800 ' placeholder='Email' />
<input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='px-2 py-2  w-[40%] border border-gray-800 ' placeholder='Password' />

<div className='w-[40%] flex justify-between text-sm mt-[-8px]'>
  <p className='cursor-pointer'>Forget your password</p>
{
  currentState==='Login'
  ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
  :<p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login here</p>
}
</div>
<button className='text-white bg-black px-3 py-2'>{currentState==='Login'?'Login':'Sign Up'}</button>
    </form>
  )
}

export default Login
