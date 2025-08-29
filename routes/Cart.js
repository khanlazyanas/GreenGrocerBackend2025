import express from "express"
import { addtoCart,getCart, removeFromCart, updateCartItemQuantity } from "../controllers/Cart.js";
import { requireAuth } from "../middlewares/Authentication.js";

const router = express.Router();

router.get("/",requireAuth,getCart);
router.post("/",requireAuth,addtoCart);
router.put("/update",requireAuth,updateCartItemQuantity);
router.delete("/remove",requireAuth,removeFromCart)

export default router;