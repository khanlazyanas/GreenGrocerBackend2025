import express from "express"
import {getAllProduct} from "../controllers/Product.js";

const router = express.Router()
// router.post("/products",authmiddleware, createProduct);
router.get("/",getAllProduct);
// router.get("/products/:id",authmiddleware,getProductbyId);
// router.put("/products/:id",authmiddleware,updateProduct);
// router.delete("/products/:id",authmiddleware,deleteProduct);
export default router;