import express from "express"
import { createProduct, deleteProduct, getAllProduct, getProductbyId, updateProduct } from "../controllers/Product.js";
import { authmiddleware } from "../middlewares/Authentication.js";

const router = express.Router()
router.post("/products",authmiddleware, createProduct);
router.get("/products",authmiddleware, getAllProduct);
router.get("/products/:id",authmiddleware,getProductbyId);
router.put("/products/:id",authmiddleware,updateProduct);
router.delete("/products/:id",authmiddleware,deleteProduct);
export default router;