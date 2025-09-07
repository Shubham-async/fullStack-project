import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'


const CartTotal = () => {
         const {currency,deliver_fee,cartTotalAmount}= useContext(ShopContext);
  return (
    <div className='w-full'>
      <div className='text-2xl'>
<Title text1={'CART'} text2={'TOTALS'}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
         <div className='flex justify-between'>
<p>Subtotal</p>
<p>{currency} {cartTotalAmount()}.00</p>
 </div>
<hr />
<div className='flex justify-between'>
<p>Shipping Fee</p>
<p>{currency}{deliver_fee}.00</p>
</div>
<hr />
<div className='flex justify-between'>
<b>Total</b>
<b>{currency}{cartTotalAmount()=== 0 ? 0: cartTotalAmount() +deliver_fee}.00</b>
</div>

   </div>
    </div>
  )
}

export default CartTotal
