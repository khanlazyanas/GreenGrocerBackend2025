import express from "express";
import { getAllOrders, getAllUser, getOrderByUserId, updateOrderStatus } from "../controllers/Admin.js";
import { authmiddleware } from "../middlewares/Authentication.js";
import { isAdmin } from "../middlewares/Admin.js";

const router = express.Router();

router.get("/users",authmiddleware,isAdmin,getAllUser)
router.get("/orders",authmiddleware,isAdmin,getAllOrders)
router.get("/orders/:userId",authmiddleware,isAdmin,getOrderByUserId)
router.put("/orders/:orderId",authmiddleware,isAdmin,updateOrderStatus)


export default router;