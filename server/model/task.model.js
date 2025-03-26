import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} from "../config/env.js";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is Required"],
      minLength: 3,
      maxLength: 255,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is Required"],
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      default: "",
    },
    description: {
      type: String,
      trim: true,
      minLength: 3,
    },
    status: {
      type: String,
      enum: ["todo", "in progress", "completed"],
      default: "Todo",
    },
    priority: {
      type: String,
      enum: ["urgent", "high", "medium", "low"],
      default: "low",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
