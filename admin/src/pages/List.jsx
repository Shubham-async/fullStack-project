import axios from 'axios';
import {useEffect, useState} from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';




const List = ({token}) => {
const [list, setList] = useState([]);
const fetchList = async () => {
try {
const response = await axios.get(backendUrl + "/api/product/list");
  if(response.data.success){
    setList(response.data.products);
  }
  else{
    toast.error(response.data.message);
  }

} catch (error) {
  console.log(error)
  toast.error("Failed to fetch product list. Please try again.");
}
}

const removeProduct = async (id) => {
try {
  const response=await axios.post(backendUrl+ '/api/product/remove', {id},{headers:{token}});
  if(response.data.success){
    toast.success(response.data.message);
   await fetchList(); // Refresh the list after removal
  } else {
    toast.error(response.data.message);
  }
} catch (error) {
  console.error("Error removing product:", error);
  toast.error("Failed to remove product. Please try again.");
}

}
useEffect(()=>{
  fetchList();
},[])

  return (
    <> 

    <p className='text-xl mb-2'> All Products List</p>

{/* ............................................ list Table items............................... */}

    <div className='flex flex-col gap-2'>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1.4fr_0.7fr] items-center px-2 py-1 border bg-gray-200 p-2 gap-7 text-sm'>
  <b>Image</b>
   <b> name</b>
   <b> Category</b>
   <b> Price </b>
    <b className='items-center pr-2'> Action</b>
      </div>
      
      {/*......................................... product list ................................... */}
{
  list.map((item,index)=>( 
    <div key={index} className='grid  grid-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr]  items-center px-2 py-1 border gap-1 bg-white hover:bg-gray-100 text-sm'>
        <img src={item.image[0]} alt={item.name} className='w-16 h-16 object-cover' />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p> {currency}{item.price}</p>
      <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg border'>X</p>
    </div>
  ))
}
    </div>
    </>
  )
}

export default List
