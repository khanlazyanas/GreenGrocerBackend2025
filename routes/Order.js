import express from "express";
import { getMyOrders, placeorder } from "../controllers/Order.js";
import {requireAuth } from "../middlewares/Authentication.js";

const router = express.Router();

router.post('/place',requireAuth, placeorder);
router.get('/myorder',requireAuth,getMyOrders);

export default router;