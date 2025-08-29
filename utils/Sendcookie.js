import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    sameSite: isProduction ? "None" : "Lax",  // Production me None, local me Lax
    secure: isProduction,                     // Production me true (https), local me false
  });

  res.status(200).json({
    success: true,
    message,
    user,
    token,
  });
};