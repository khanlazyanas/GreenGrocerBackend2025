import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
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

  // ✅ extra fields for COD orders
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Paid", "Shipped", "Delivered"],
    default: "Pending",
  },
}, { timestamps: true });

export const Order = mongoose.model("Order", OrderSchema);
