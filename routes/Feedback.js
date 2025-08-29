import express from "express";
import { requireAuth } from "../middlewares/Authentication.js";
import { getAllfeedback, SubmitFeedback } from "../controllers/Feedback.js";

const router = express.Router();

router.post("/",requireAuth,SubmitFeedback)
router.get("/",getAllfeedback)

export default router;