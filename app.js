import express from "express"
import authroutes from "./routes/authroutes.js";
import cartroutes from "./routes/Cart.js";
import proudctroutes from "./routes/Product.js"
import cookieParser from "cookie-parser"
import orderroutes from "./routes/Order.js"
import paymentroutes from "./routes/Payment.js"
import feedbackroutes from "./routes/Feedback.js"
import adminroutes from "./routes/admin.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app = express()

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
))

// Using Middlewares
app.use(cookieParser())
app.use(express.json())
app.use("/api", authroutes)
app.use("/api", proudctroutes)
app.use("/api/cart", cartroutes)
app.use("/api/order", orderroutes)
app.use("/api/payment", paymentroutes)
app.use("/api/feedback", feedbackroutes)
app.use("/api/admin", adminroutes)





app.get("/", (req, res) => {
    res.send("<h1>Working<h1/>")
})

export default app;