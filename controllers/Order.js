import mongoose from "mongoose";
import { Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";

export const placeorder = async (req, res, next) => {
  try {
    const userId = req.userId; // ✅ fixed
    const { address, paymentMethod, name, email, phoneNumber } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // 🟢 Convert cart.items -> order.items
    const orderItems = cart.items.map((item) => ({
      product: new mongoose.Types.ObjectId(item.productId), // ✅ convert string → ObjectId
      quantity: item.quantity,
    }));

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalamount: cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      address,
      paymentMethod,
      name,
      email,
      phoneNumber,
      status: "Pending",
    });

    // 🟢 Empty the cart
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
    const order = await Order.find({ user: req.userId })
      .populate("items.product", "name price image"); // ✅ populate hoga
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GetMyOrders Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
