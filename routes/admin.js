import express from "express";
import { deleteOrder, getAllOrders, getAllUser, getOrderByUserId, updateOrderStatus } from "../controllers/Admin.js";
import { requireAuth } from "../middlewares/Authentication.js";
import { isAdmin } from "../middlewares/Admin.js";

const router = express.Router();

router.get("/users",requireAuth,isAdmin,getAllUser)
router.get("/orders",requireAuth,isAdmin,getAllOrders)
router.get("/orders/:userId",requireAuth,isAdmin,getOrderByUserId)
router.put("/orders/:orderId",requireAuth,isAdmin,updateOrderStatus)
router.delete("/orders/:orderId", requireAuth, isAdmin, deleteOrder);



export default router;