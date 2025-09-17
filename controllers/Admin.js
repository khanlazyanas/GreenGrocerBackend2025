import { Order } from "../models/Order.js";
import { User } from "../models/User.js";

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};



export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email role"); 
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};






export const getOrderByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Paid", "Shipped", "Delivered"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order Not found" });
    }

    res.status(200).json({ success: true, message: "Order Status Updated", order });
  } catch (error) {
    next(error);
  }
};
