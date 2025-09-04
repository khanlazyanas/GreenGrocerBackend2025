// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      name: String,   // ✅ direct product name
      price: Number,  // ✅ direct product price
      image: String,  // ✅ direct product image
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  totalamount: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  name: String,
  email: String,
  phoneNumber: String,
  paymentMethod: String,

  status: {
    type: String,
    enum: ["Pending", "Paid", "Shipped", "Delivered"],
    default: "Pending",
  },
}, { timestamps: true });

export const Order = mongoose.model("Order", OrderSchema);
