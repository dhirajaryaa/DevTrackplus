import mongoose from "mongoose";

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
      ref: "Project"
    },
    description: {
      type: String,
      trim: true,
      default: "",
      minLength: 3,
    },
    status: {
      type: String,
      enum: ["todo", "in progress", "completed"],
      default: "todo", 
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
