import validator from 'validator';
import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const createToken=(id)=>{
  return  jwt.sign({id},process.env.jwt_SCRET)
    

}
//Route for user login

const userLogin=async(req,res)=>{

   const {email,password}=req.body;

   const user=await userModel.findOne({email})

   if(!user){
      res.json({success:false,message:"User not exist"});
   }

   const isMatch=await bcrypt.compare(password,user.password)

   if(isMatch){
      const token=createToken(user._id);
      res.json({success:true,token})
   }



}

//Route for user Register

const userRegister=async(req,res)=>{

try {
   const {name,email,password}=req.body
   //checking user already exist or not

   const exist= await userModel.findOne({email})

   if(exist){
      return res.json({success:false,message:"user is already exist"})
   }

   //validating email format & strong password
   if(!validator.isEmail(email)){
       res.json({success:false,message:'Please enter the valid email'})
   }
   
   if (password.length < 8) {
   res.json({ success: false, message: 'Please enter a strong password (min 8 characters)' });
}


// hasing user password
const salt =await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)

const newUser=new userModel({
   name,
   email,
   password:hashedPassword
})
const user=await newUser.save()
const token=createToken(user._id)
res.json({success:true,token})

   
} catch (error) {
   console.log(error);
   res.json({success:false,message:error.message})
         
}

}

//Routes for Admin login
const adminLogin=async  (req,res)=>{

const {email,password}=req.body;

try {
   if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
   const token=jwt.sign(email+password,process.env.jwt_SCRET)
   res.json({success:true,token})
}else{
   res.json({success:false,message:"Invalid email or password"})

}
} catch (error) {
   console.log(error);
   res.json({success:false,message:error.message})
         
}
}


export  {userLogin,userRegister,adminLogin}