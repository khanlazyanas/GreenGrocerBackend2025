import express from "express";
import { addtoCart, getCart, removeFromCart, UpdateCartItemQuantity } from "../controllers/Cart.js";
import { authmiddleware } from "../middlewares/Authentication.js";

const router = express.Router()

router.get("/",authmiddleware,getCart)
router.post("/add",authmiddleware,addtoCart)
router.post("/remove",authmiddleware,removeFromCart)
router.delete("/remove/:productId",authmiddleware,removeFromCart)
router.put('/update',authmiddleware,UpdateCartItemQuantity)

export default router;