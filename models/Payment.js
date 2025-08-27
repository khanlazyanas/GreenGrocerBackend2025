import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required:true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentDetail: {
        razorpay_order_id:String,
        razorpay_payment_id:String,
        razorpay_signature:String,
        paymentMethod:{type:String,default:"Online"},
        gatewayResponse:Object
    },

    status: {
        type: String,
        enum: ['Pending','Paid', 'Failed'],
        default: 'Pending'
    }
}, { timestamps: true })

export const Payment = mongoose.model("Payment", paymentSchema)