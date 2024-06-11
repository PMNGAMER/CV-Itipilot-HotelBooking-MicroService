import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DATABASE_URL = "mongodb://localhost:27017/mongo-golang";
export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
