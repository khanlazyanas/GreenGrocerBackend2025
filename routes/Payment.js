import express from "express";
import { codOrder, createPaymentOrder, razorpayWebhook, verifyPayment } from "../controllers/Payment.js";
import { authmiddleware } from "../middlewares/Authentication.js";

const router = express.Router()

router.post("/create-order",authmiddleware, createPaymentOrder)
router.post("/verify-payment",authmiddleware, verifyPayment)
router.post("/webhook",express.json({type:"*/*"}),razorpayWebhook)
router.post("/cod",authmiddleware,codOrder)
export default router;