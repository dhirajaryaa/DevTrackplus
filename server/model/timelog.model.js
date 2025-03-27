import mongoose from "mongoose";

const timeLogSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: [true, "task is Required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is Required"],
    },
    startTime: { type: Date, default: 0 },
    endTime: { type: Date, default: 0 },
    duration: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TimeLog = mongoose.model("TimeLog", timeLogSchema);
