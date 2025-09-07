import jwt from 'jsonwebtoken';

const authUser=async(req,res,next)=>{

         const {token}=req.headers;

         if(!token){
              return   res.json({success:false,message:'Please login first'});
         }
                  try {
                           const decoded=jwt.verify(token,process.env.jwt_SCRET);
                           req.body.userId=decoded.id;
                           next();
                           
                  } catch (error) {
                           console.error(error);
                            res.json({success:false,message:'Invalid token'});      
                  }
         
}

export default authUser;