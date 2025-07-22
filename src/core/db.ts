import { RESPONSE_MESSAGE } from "@/constants/message";
import mongoose from "mongoose";

export async function connectDB() {
  const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27017/metrics";
  try {
    await mongoose.connect(MONGO_URI);
    console.log(RESPONSE_MESSAGE.MONGODB_CONNECTED);
  } catch (error) {
    console.error(RESPONSE_MESSAGE.MONGODB_CONNECTION_ERROR, error);
    process.exit(1);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error(RESPONSE_MESSAGE.MONGODB_DISCONNECTION_ERROR, error);
  }
}
