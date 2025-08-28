// import mongoose from "mongoose";


// const productShcema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     description: {
//         type: String
//     },
//     image: {
//         type: String
//     },
//     stock: {
//         type: Number,
//         default: 0
//     },
//     category: {
//         type: String
//     }
// },{timestamps:true})

// export const Product = mongoose.model("Product",productShcema);








import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    category:String,
    rating:Number
});

export const Product = mongoose.model("Product",ProductSchema)