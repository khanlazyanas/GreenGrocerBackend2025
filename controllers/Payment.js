import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";
import crypto from "crypto";
import {Order} from "../models/Order.js";
import { Payment } from "../models/Payment.js";

// 🔐 Razorpay init
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ 1. Create Razorpay Order
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Amount & OrderId required" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // paise me
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Payment record with status Pending
    await Payment.create({
      user: req.user.id,
      order: orderId,
      amount,
      paymentDetail: {
        razorpay_order_id: razorpayOrder.id,
        paymentMethod: "Online",
      },
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order: razorpayOrder,
    });
  } catch (err) {
    console.error("Create Razorpay Order Error:", err);
    res.status(500).json({
      success: false,
      message: "Razorpay Order Failed",
      error: err.message,
    });
  }
};

// ✅ 2. Verify Payment (after frontend checkout)
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // Signature verify
    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (sign === razorpay_signature) {
      // Update payment record
      await Payment.findOneAndUpdate(
        { "paymentDetail.razorpay_order_id": razorpay_order_id },
        {
          status: "Paid",
          paymentDetail: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            paymentMethod: "Online",
          },
        },
        { new: true }
      );

      // ✅ Update Order
      await Order.findByIdAndUpdate(orderId, { status: "Paid" }, { new: true });

      return res.status(200).json({
        success: true,
        message: "Payment Verified & Order Paid",
      });
    } else {
      //  Invalid signature → mark payment failed
      await Payment.findOneAndUpdate(
        { "paymentDetail.razorpay_order_id": razorpay_order_id },
        { status: "Failed" }
      );

      return res
        .status(400)
        .json({ success: false, message: "Invalid Signature" });
    }
  } catch (err) {
    console.error("Verify Payment Error:", err);
    res.status(500).json({
      success: false,
      message: "Payment Verification Failed",
      error: err.message,
    });
  }
};

// ✅ 3. Webhook (source of truth)
export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const body = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(body))
      .digest("hex");

    if (signature !== expectedSignature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid webhook signature" });
    }

    const event = body.event;

    if (event === "payment.captured") {
      const payment = body.payload.payment.entity;

      // ✅ Update payment
      await Payment.findOneAndUpdate(
        { "paymentDetail.razorpay_order_id": payment.order_id },
        {
          status: "Paid",
          paymentDetail: {
            razorpay_order_id: payment.order_id,
            razorpay_payment_id: payment.id,
            paymentMethod: payment.method,
            gatewayResponse: payment,
          },
        }
      );

      // ✅ Update order
      await Order.findOneAndUpdate(
        { razorpay_order_id: payment.order_id },
        { status: "Paid" }
      );

      console.log("Payment Captured via Webhook:", payment.id);
    }

    res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).json({
      success: false,
      message: "Webhook processing failed",
      error: err.message,
    });
  }
};

// ✅ COD Order
export const codOrder = async (req, res) => {
  try {
    const { items, total, address, name, email, phoneNumber } = req.body;

    if (!items || !total || !address || !name || !email || !phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const newOrder = await Order.create({
      user: req.user.id,      
      items,
      totalamount: total,      
      address,
      name,
      email,
      phoneNumber,
      paymentMethod: "COD",    // ✅ COD order
      status: "Pending",
    });

    res.status(200).json({
      success: true,
      message: "COD Order Placed Successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("COD Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place COD order",
      error: error.message,
    });
  }
};
