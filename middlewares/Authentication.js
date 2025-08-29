import jwt from "jsonwebtoken";

export const authmiddleware = (req, res, next) => {
  try {
    // sirf cookie me token check karenge
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;   // ✅ userId ko request me attach kar diya
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
