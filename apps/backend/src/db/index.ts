import "dotenv/config";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.info("Connecting to MongoDB...");
    await mongoose.connect(process.env.DATABASE_URI!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
