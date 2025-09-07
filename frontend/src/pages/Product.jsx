import React, { useState,useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
const {productId} = useParams();
const {products,addToCart}=useContext(ShopContext);
const [productData,setProductData] = useState(false);
const [image,setImage] = useState('');
const {currency:Currency} = useContext(ShopContext);
const [size,setSize]=useState('');

const fetchProductData = async () => {
products.map((item)=>{
  if(item._id===productId){
    setProductData(item);
    setImage(item.image[0]);
    return null;
  }
})
}

useEffect(() => {
  fetchProductData();
  

}, [productId,products]);

  return productData ?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
    {/* Product data */}
      <div className='flex gap-10 sm:gap-1 flex-col sm:flex-row '>
{/* Product Image */}
<div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
<div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between  sm:justify-normal sm:w-[18.7%] w-full'>
  {
  productData.image.map((item,index)=>
   ( 
      <img onClick={()=>setImage(item)} key={index} src={item} className='w-[24%] sm:w-24 sm:mb-3 flex-shrink-0 cursor-pointer' />
  )
)
}
</div>
{/* Main Product Image */}
<div  className='sm:w-[70%]  w-full mb-10 '>
<img src={image} className='h-auto w-full' />
</div>
   </div>
                     {/* ---------------------------------producdetails ----------------------------------*/}
  <div className='flex-1 '>
    <h1 className='text-2xl font-semibold'>{productData.name}</h1>
    <div className='flex items-center gap-2 mt-2'>
      <img src={assets.star_icon} className='w-3  ' alt="" />
      <img src={assets.star_icon} className='w-3  ' alt="" />
      <img src={assets.star_icon} className='w-3  ' alt="" />
      <img src={assets.star_icon} className='w-3  ' alt="" />
      <img src={assets.star_dull_icon} className='w-3  ' alt="" />
      <p className='pl-2'>(122)</p>
    </div>
    <p className='text-2xl mt-2 font-semibold'>{Currency}{productData.price}</p>
    <p className=' text-gray-500 mt-2 md:w-4/5'>{productData.description}</p>
    <p className='font-semibold mt-3'>Select Size</p>
    <div className='gap-5 flex mt-2  text-gray-500 flex-wrap'>
     {
      productData.sizes.map((item,index)=>(
        <button onClick={()=>setSize(item)} className={`border-2 bg-gray-100 px-4  py-2 ${item===size ? 'border-orange-300':' '}`} key={index}>{item}</button>
      ))
     }
    </div>
     <button onClick={() => {
    addToCart(productData._id, size);
  }}
   className='px-6 py-2 bg-black text-gray-100 active:bg-yellow-700 text-sm mt-6'>Add to cart</button>
    <hr className='sm:w-4/5 mt-7'/>
    <div className='text-gray-500 text-sm mt-3'>
<p>100% Original Product</p>
<p>Cash on delivery available on this product</p>
<p>Easy return and replacement policy within 7 days</p>
    </div>
  </div>

   </div>
   {/* {Description and Review Section} */}
   <div className='mt-8'>
      <div className='flex gap-3'>
<b className='border px-4 py-2 text-sm'>Description</b>
<p className='border px-4 py-2 text-sm'>Review (122)</p>
   </div>
<div className='sm:w-5/6 bg-gray-100 text-sm border px-5 py-6 mt-2 text-gray-600'>
  <p>Experience superior comfort with our ultra-soft cotton t-shirt, crafted for all-day wear. Breathable, stylish, and machine-washable—perfect for casual days, workouts, or layering with your favorite outfits
    .
    <br />Enjoy rich sound and powerful bass with our wireless earbuds. Bluetooth-enabled, noise-cancelling, and with all-day battery life, they’re perfect for music, calls, and workouts on the go.
    </p>

</div>
   </div>
 <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ):<div className='opacity-0'></div>
}

export default Product
