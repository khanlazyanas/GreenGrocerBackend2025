import {Product} from "../models/Product.js"

// export const createProduct = async(req,res,next)=>{
//     try {
//         const product = await Product.create(req.body)
//         res.status(201).json({
//             success:true,
//             message:"Product Created",
//             product,
//         })
//     } catch (error) {
//         next(error)
//     }
// };


// export const getAllProduct = async(req,res,next)=>{
//     try {
//         const products = await Product.find();
//         res.status(200).json(products)
//     } catch (error) {
//         next(error)
//     }
// };


// export const getProductbyId = async(req,res,next)=>{
//     try {
//         const product = await Product.findById(req.params.id);
//         if(!product) return res.status(404).json({
//             success:false,
//             message:"Product Not Found"
//         })
//         res.status(200).json(product)
//     } catch (error) {
//         next(error)
//     }
// };



// export const updateProduct = async(req,res,next)=>{
//     try {
//         const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//             runValidators:true
//         })
//         if(!product){
//             return res.status(404).json({
//                 success:false,
//                 message:"Product Not Found"
//             });
//         }

//         res.status(200).json({
//             success:true,
//             message:"Product Updated Successfully",
//             data:product
//         })
//     } catch (error) {
//         next(error)
//     }
// };


// export const deleteProduct = async(req,res)=>{
//     try {
//        const product = await Product.findOneAndDelete(req.params.id);
//        if(!product){
//         return res.status(404).json({
//             success:false,
//             message:"Product Not Found"
//         })
//        }
//        res.status(200).json({
//         success:true,
//         message:"Product Delete Successfully"
//        })
//     } catch (error) {
//         next(error)
//     }
// };



export const getAllProduct = async(req,res,next)=>{
    try {
        const product = await Product.find()
        res.json({
            success:true,
            product,
        })
    } catch (error) {
        next(error)
    }
}