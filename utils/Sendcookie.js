import jwt from "jsonwebtoken"

export const Sendcookie = (user, res, message, statusCode=201)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"10d"});

    const isProduction = process.env.NODE_ENV == 'production';


    res.cookie("token",token,{
        httpOnly:true,
        secure:isProduction,
        sameSite: isProduction ? "None" : "Lax",
        maxAge: 10 * 24 * 60 * 60 * 1000
    });


    res.status(statusCode).json({
        success:true,
        message,
        user,
        token
    });
};