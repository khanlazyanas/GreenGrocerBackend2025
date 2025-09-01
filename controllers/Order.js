import {  Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";


export const placeorder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { address, paymentMethod, name, email, phoneNumber } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const order = await Order.create({
      user: userId,
      items: cart.items,
      totalamount: cart.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
      address,
      paymentMethod,
      name,
      email,
      phoneNumber,
      status: "Pending",
    });

    // Empty the cart after placing order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order Placed",
      order,
    });
  } catch (error) {
    next(error);
  }
};





export const getMyOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.userId }).populate("items.product");
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GetMyOrders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



