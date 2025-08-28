import mongoose from "mongoose";


const productShcema = new mongoose.Schema({
    id: {
    type: Number,
    unique: true,
    required: true
  },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    }
},{timestamps:true})

export const Product = mongoose.model("Product",productShcema);