import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({id,image,name,price}) => {
const {currency} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden ' >
<img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out mt-2 '/>
      </div>
<p className='text-sm pt-3 pb-2 '>{name}</p>
<p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
