import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";






const Add = ({token}) => {

  const [image1,setImage1]=useState(false);
  const [image2,setImage2]=useState(false);
  const [image3,setImage3]=useState(false);
  const [image4,setImage4]=useState(false);
  const [image5,setImage5]=useState(false);
  

  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [price,setPrice]=useState(0);
  const [sizes,setSizes]=useState([]);
  const [bestSeller,setbestSeller]=useState(false);
  const [category,setCategory]=useState("Men");  
  const [subCategory,setSubCategory]=useState("Topwear"); 
  
  

 const onSubmitHandler = async(e) => {
    e.preventDefault();
   try {
     const formData = new FormData();
     formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestSeller",bestSeller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)
      image5 && formData.append("image5",image5)

    const response=await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}})
    console.log("Response:", response.data);

    if(response.data.success){
      toast.success(response.data.message);
  console.log(response)
      setName("");
      setDescription("");
      setPrice('');
      setbestSeller('');
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setImage5(false);
    }
    else{
      toast.error(response.data.message);
    }
   } catch (error) {
    console.error(error);
toast.error(error.message)
  }
  }


  return (
    <form onSubmit={onSubmitHandler}>
      <div className="mb-2">
        <p className="text-xl mb-2 text-gray-120">Upload Images</p>
        <div className="flex gap-2">
          <label htmlFor="Image1">
            <img className="w-20"  src={!image1?assets.upload_area:URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" hidden id="Image1" />
          </label>
          <label htmlFor="Image2">
            <img className="w-20"  src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" hidden id="Image2" />
          </label>
          <label htmlFor="Image3">
            <img className="w-20"  src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" hidden id="Image3" />
          </label>
          <label htmlFor="Image4">
            <img className="w-20"  src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" hidden id="Image4" />
          </label>
          <label htmlFor="Image5">
            <img className="w-20"  src={!image5?assets.upload_area:URL.createObjectURL(image5)} alt="" />
            <input onChange={(e)=>setImage5(e.target.files[0])} type="file" hidden id="Image5" />
          </label>
        
        </div>
      </div>
      <div className="mb-2 ">
        <p>Product name</p>
      <input  onChange={(e)=>setName(e.target.value)} className="w-full max-w-[300px] px-3 py-2 "  placeholder="Type here" type="text" />
      </div>
      <div className="mb-2">
        <p>Product description</p>
      <textarea onChange={(e)=>setDescription(e.target.value)} className="w-full max-w-[300px] px-3 py-2 " placeholder="Type here" type="text" />
      </div>

  <div className="flex gap-4" >
<div className="">
  <p>Product Category</p>
  <select onChange={(e)=>setCategory(e.target.value)} className="px-3 py-2 w-full max-w-[130px]"> 
     <option value="Men"> Men</option>
    <option value="Woman">Women</option>
    <option value="Kids">Kids</option>
  </select>
</div>
<div>
  <p>Product SubCategory</p>
  <select onChange={(e)=>setSubCategory(e.target.value)} className="px-3 py-2 w-full max-w-[130px]">
     <option value="Topwear"> Topwear</option>
    <option value="Bottomwear">BottomWear</option>
    <option value="WinterWear">WinterWear</option>
  </select>
</div>
<div >
  <p>Product Price</p>
  <input onChange={(e)=>setPrice(e.target.value)} className="w-full px-3 py-1 w-full max-w-[130px] " placeholder="25" type="number" />

</div>
    </div>
    <div>
        <p className="mt-2">Product Sizes</p>
      </div>
    <div className="flex gap-4 mt-2 cursor-pointer">
      <div onClick={()=>setSizes(prev=>prev.includes('S') ? prev.filter(item=>item!=='S'):[...prev,'S'])} >
        <p className={`${sizes.includes('S')?'bg-pink-200':'bg-slate-200'}  px-3 py-1`}>S</p>
      </div>
      <div onClick={()=>setSizes(prev=>prev.includes('M') ? prev.filter(item=>item!=='M'):[...prev,'M'])}>
        <p className={`${sizes.includes('M')?'bg-pink-200':'bg-slate-200'}  px-3 py-1`}>M</p>
      </div>
      <div onClick={()=>setSizes(prev=>prev.includes('L') ? prev.filter(item=>item!=='L'):[...prev,'L'])}>
        <p className={`${sizes.includes('L')?'bg-pink-200':'bg-slate-200'}  px-3 py-1`}>L</p>
      </div >
      <div onClick={()=>setSizes(prev=>prev.includes('XL') ? prev.filter(item=>item!=='XL'):[...prev,'XL'])}>
        <p className={`${sizes.includes('XL')?'bg-pink-200':'bg-slate-200'}  px-3 py-1`}>XL</p>
      </div>
      <div onClick={()=>setSizes(prev=>prev.includes('XXL') ? prev.filter(item=>item!=='XXL'):[...prev,'XXL'])}>
        <p className={`${sizes.includes('XXL')?'bg-pink-200':'bg-slate-200'}  px-3 py-1`}>XXL</p>
      </div>
    </div>
    <div className="flex gap-2 mt-2">
      <input onChange={()=>setbestSeller(prev=>!prev)} checked={bestSeller} type="checkbox" id="bestSeller"  />
      <label className="cursor-pointer" htmlFor="bestSeller">Add to bestSeller</label>
    </div>
    <div className="w-5 mt-2  ">
      <button className="px-6 py-2 bg-black text-white m-2 " type="submit">Add</button>
    </div>
    </form>
  );
};

export default Add;
