import {  Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";


export const placeorder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { address, paymentMethod, name, email, phoneNumber } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const orderItems = cart.items.map(item => ({
  product: item.productId, // ✅ ObjectId reference
  quantity: item.quantity,
}));
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalamount: cart.items.reduce((total, item) => total + item.quantity * item.price, 0),
      address,
      paymentMethod,
      name,
      email,
      phoneNumber,
      status: "Pending",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({ success: true, message: "Order Placed", order });
  } catch (error) {
    next(error);
  }
};




export const getMyOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.userId }).populate("items.product","name price image");
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GetMyOrders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



