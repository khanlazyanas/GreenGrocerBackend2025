import jwt from "jsonwebtoken"


export const requireAuth = (req,res,next)=>{
   try {
      const token = req.cookies.token;
      if(!token){
         return res.status(401).json({success:false,message:"Login first"})
      } 
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.userId = decoded._id;
      next()
   } catch (error) {
      res.status(401).json({success:false,message:"Invalid token", error:error.message})
   }
} 

