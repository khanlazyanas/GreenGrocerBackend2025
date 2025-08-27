
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Connectdb = async () => {
  try {
   const conn =  await mongoose.connect(process.env.MONGO_URI, {
      dbName: "GreengGrocer",
    });
    console.log(`MongoDB connected: ${conn.connection.host}` );
  } catch (e) {
    console.error(" MongoDB connection error:", e.message);
    process.exit(1); 
  }
};
