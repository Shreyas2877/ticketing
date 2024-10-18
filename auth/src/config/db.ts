import dotenv from "dotenv";
import mongoose from "mongoose";
import { DatabaseConnectionError } from "../errors/database-connection-error";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (err) {
    console.log("Database connection error :", err);
    throw new DatabaseConnectionError();
  }
  console.log("Connected to Mongo-DB");
};
