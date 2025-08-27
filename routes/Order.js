import express from "express";
import { getMyOrders, placeorder } from "../controllers/Order.js";
import { authmiddleware } from "../middlewares/Authentication.js";

const router = express.Router();

router.post('/place',authmiddleware, placeorder);
router.get('/myorder',authmiddleware,getMyOrders);

export default router;