import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {

 try {
   const {token}=req.headers;

  if(!token){
    return res.json({sucess:false, message:"Token not found"});
  }
  const decode=jwt.verify(token, process.env.jwt_SCRET);
  if(decode !==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
    return res.json({success:false, message:"You are not authorized"});
  }
  
  next();

 } catch (error) {
  console.error('Error in adminAuth middleware:', error);
  return res.json({ message: 'Internal server error' });
  
 }

}

export default adminAuth;