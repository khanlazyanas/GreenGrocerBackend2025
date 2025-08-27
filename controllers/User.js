import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import { Sendcookie } from "../utils/Sendcookie.js";




export const Register = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { name, email, password } = req.body;

        // User exit check 
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        // Hash Password
        const hassedpassword = await bcrypt.hash(password, 10);

        //create User 
        const user = await User.create({ name, email, password: hassedpassword })

        // Sendcookie + token
        Sendcookie(user, res, "User Register Successfully", 201)

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        // Password match check
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        Sendcookie(user, res, "Login Successfully", 200)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

export const Logout = async (req, res) => {
    res.cookie("token", "", { maxAge: 0 })
    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
}