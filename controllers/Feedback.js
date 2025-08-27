import { Feedback } from "../models/Feedback.js";


export const SubmitFeedback = async(req,res,next)=>{
 try {
    const userId = req.user.id;
    const {message,rating} = req.body;
    
    if(!message){
        return res.status(400).json({
            success:false,
            message:"Message is Required"
        })
    }
    if(rating &&(rating < 1 || rating > 5)){
        return res.status(400).json({
            success:false,
            message:"Rating must be between 1 and 5"
        })
    }

    const feedback = await Feedback.create({
        user:userId,
        message,
        rating
    })
    res.status(201).json({
        success:true,
        message:"Feedback Submitted Successfully",
        feedback
    })
 } catch (error) {
    next(error)
 }
}


export const getAllfeedback = async(req,res,next)=>{
    try {
        const feedbacks = await Feedback.find().populate("user", "name email").sort({createdAt: -1});
        res.status(200).json({
            success:true,
            feedbacks,
        })
    } catch (error) {
        next(error)
    }
};