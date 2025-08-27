import express from "express";
import { authmiddleware } from "../middlewares/Authentication.js";
import { getAllfeedback, SubmitFeedback } from "../controllers/Feedback.js";

const router = express.Router();

router.post("/",authmiddleware,SubmitFeedback)
router.get("/",getAllfeedback)

export default router;