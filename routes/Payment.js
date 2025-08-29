import express from "express";
import { codOrder, createPaymentOrder, razorpayWebhook, verifyPayment } from "../controllers/Payment.js";
import {requireAuth } from "../middlewares/Authentication.js";

const router = express.Router()

router.post("/create-order",requireAuth, createPaymentOrder)
router.post("/verify-payment",requireAuth, verifyPayment)
router.post("/webhook",express.json({type:"*/*"}),razorpayWebhook)
router.post("/cod",requireAuth,codOrder)
export default router;