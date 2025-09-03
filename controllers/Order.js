import {  Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";


export const placeorder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { address, paymentMethod, name, email, phoneNumber } = req.body;

    const order = await Order.create({
  user: userId,
  items: cart.items.map(item => ({
    product: item.product._id,   // 👈 yeh add karo
    quantity: item.quantity,
  })),
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



