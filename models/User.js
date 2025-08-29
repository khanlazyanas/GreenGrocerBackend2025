import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name:String,
   email:{type:String, unique:true},
   password:{type:String,required:true}
},
{
   timestamps:true
})

export const User = mongoose.model("User",UserSchema)