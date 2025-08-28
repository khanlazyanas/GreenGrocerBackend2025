import express from "express";
import { addtoCart, getCart, removeFromCart, updateCartItemQuantity } from "../controllers/Cart.js";
import { authmiddleware } from "../middlewares/Authentication.js";

const router = express.Router()

router.get("/",authmiddleware,getCart)
router.post("/add",authmiddleware,addtoCart)
router.delete("/remove",authmiddleware,removeFromCart)
router.put("/update",authmiddleware,updateCartItemQuantity)
// router.put('/update',authmiddleware,UpdateCartItemQuantity)

export default router;