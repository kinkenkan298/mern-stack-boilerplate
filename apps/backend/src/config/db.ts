import { dbLogger } from "@/utils/logger";
import mongoose from "mongoose";
import { env } from "./env";

if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URI is not defined in environment variables");
}

export const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(env.DATABASE_URL);
    dbLogger.info(`Database MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    dbLogger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
