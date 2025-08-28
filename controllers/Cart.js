import { Product } from "../models/Product.js";
import {Cart} from "../models/Cart.js"



export const getCart = async(req,res,next)=>{
  try {
    const userId = req.user.id
    const cart = await Cart.findOne({user:userId}).populate("items.product");
    res.status(200).json(cart)
  } catch (error) {
    next(error)
  }
}




export const addtoCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found"
      });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const qty = parseInt(quantity); // ✅ ensure number

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += qty;
    } else {
      cart.items.push({ product: productId, quantity: qty });
    }

    await cart.save();
    res.status(200).json({ success: true, message: 'Item added to cart', cart });
  } catch (error) {
    next(error);
  }
}


export const removeFromCart = async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        const cart = await Cart.findOne({user:userId})
        if(!cart){
            return res.status(404).json({
                success:false,
                message:"Cart not found"
            })
        }
        cart.items = cart.items.filter(item=> item.product.toString()!== productId);
        await cart.save();
        res.status(200).json({
            success:true,
            message:'Item Removed',
            cart
        });
    } catch (error) {
        next(error)
    }
}



export const UpdateCartItemQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const qty = parseInt(quantity);
    if (!Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity"
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart"
      });
    }

    cart.items[itemIndex].quantity = qty; // ✅ correct assignment
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart Item quantity updated',
      cart
    });
  } catch (error) {
    next(error);
  }
};