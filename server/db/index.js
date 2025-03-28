import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";

const connectDB = async()=> {
  await mongoose.connect(`${MONGODB_URI}`);
  console.log(`Database connected on ${NODE_ENV} mode`);

  try {
  } catch (error) {
    console.error("Database connection Error", error.message);
    process.exit(1);
  }
};

export default connectDB
