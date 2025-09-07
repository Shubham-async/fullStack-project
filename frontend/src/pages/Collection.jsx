import React, { createContext, use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';



const Collection = () => {
const {products,search,showSearch} =useContext(ShopContext);
const [showFilter,setShowFilter] = useState(false);
const [filterProduct,setFilterProduct]=useState([]);
const [category,setCategory] = useState([]);
const [subCategory,setSubCategory] = useState([]);
const [sortType,setShortType] = useState('relevent');



const toggleCategory = (e) => {
  if (category.includes(e.target.value)) {
    setCategory(prev=>prev.filter(item=> item !== e.target.value));
  }
  else{
    setCategory(prev=>[...prev,e.target.value]);
  }
}

const toggleSubCategory=(e)=>{
if(subCategory.includes(e.target.value)){
  setSubCategory(prev=>prev.filter(item=> item !== e.target.value));
}
else{
  setSubCategory(prev=>[...prev,e.target.value]);
}
}

const  applyFilter = () => {
let productsCopy=products.slice();
if (showSearch && search){
productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
}

if(category.length > 0){
  productsCopy = productsCopy.filter(item => category.includes(item.category));   
}
if(subCategory.length >  0){
  productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory));
}
setFilterProduct(productsCopy);
}

const shortProduct=()=>{
  let  fpCopy=filterProduct.slice();

  switch(sortType){
    case'low to high':
      setFilterProduct(fpCopy.sort((a,b)=>a.price-b.price));
      break;
  case'high to low':
  setFilterProduct(fpCopy.sort((a,b)=>b.price-a.price));
  break;

  default:
    applyFilter();
  break;

}

}

useEffect(()=>{
  setFilterProduct(products);
},[products])

useEffect(()=>{
applyFilter();
},[category,subCategory,search,showSearch,products])

useEffect(()=>{
shortProduct();
},[sortType])


  return (
    <div className='gap-1 flex-col flex sm:flex-row sm:gap-10 pt-10 border-t  '>
      {/* {fiter option} */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='flex   items-center text-xl gap-2 my-10 cursor-pointer'>FILTERS
          <img className={`sm:hidden h-3 ${showFilter ? 'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`pl-5 py-3 mt-6 border border-gray-400 ${showFilter ? ' ':'hidden'} sm:block`}>
        
          <p className='mb-3 text-sm font-medium'>CATEGORYS</p>
        <div className='flex flex-col text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox"  name="" value={'Women'} id="" onChange={toggleCategory} /> Women
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" name="" value={'Kids'} id="" onChange={toggleCategory}/>Kids
          </p>
        </div>
        </div>
        {/* SubCatgory */}
 <div className={`pl-5 py-3 mt-6 border  border-gray-400 ${showFilter ? '': 'hidden'} sm:block`}>
        
          <p className='mb-3 text-sm font-medium'>TYPE</p>
        <div className='flex flex-col text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox"  name="" value={'Downwear'} id="" onChange={toggleSubCategory}/> Downwear
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type="checkbox" name="" value={'Winterwear'} id="" onChange={toggleSubCategory}/>Winterwear
          </p>
        </div>
      </div>
    </div>
    {/* Right side */}
    <div className='flex-1'>
<div className='flex justify-between text-base sm:text-xl mb-5'>
  <Title text1={'ALL'} text2={'COLLECTION'}/>

  {/* Product sort */}
  <select onChange={(e)=>{setShortType(e.target.value)}} className='text-base border-2 border-gray-300 px-2'  name="" id="">
    <option value="relevent">Sort by : Relevent</option>
    <option value="low to high">Sort by : Low to High</option>
    <option value="high to low">Sort by : High to Low</option>
  </select>

</div>
{/* Map products */}
<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-8'>
{
  filterProduct.map((item,index)=>(
    <ProductItem id={index} key={item.id} image={item.image} name={item.name} price={item.price}/>
  ))
}
</div>
    </div>
    </div>
  )
}

export default Collection
