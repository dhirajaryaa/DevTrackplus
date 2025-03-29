import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../model/task.model.js";
import mongoose from "mongoose";

//! create new task
const createTask = AsyncHandler(async (req, res) => {
  const { title, description, project, status, priority, completed } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is Required");
  }
  const taskExists = await Task.findOne({ title });
  if (taskExists) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Task Already Exists", taskExists));
  }
  const newTask = await Task.create({
    title,
    description: description || "",
    userId: req?.user?._id,
    status,
    project,
    priority,
    completed,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Task successfully created", newTask));
});

//! get task by id
const getTask = AsyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    throw new ApiError(400, "Task Id missing or invalid");
  }
  const task = await Task.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(taskId),
        userId: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user_detailed",
      },
    },
    {
      $addFields: {
        user_detailed: { $arrayElemAt: ["$user_detailed", 0] },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        status: 1,
        dueDate: 1,
        priority: 1,
        createdAt: 1,
        completed:1,
        "user_detailed.email": 1,
        "user_detailed.name": 1,
        "user_detailed.avatar": 1,
      },
    },
  ]);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Task fetch successfully", task));
});

//! get all tasks
const getAllTask = AsyncHandler(async (req, res) => {
  const tasks = await Task.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(req.user._id) },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user_detailed",
      },
    },
    {
      $addFields: {
        user_detailed: { $arrayElemAt: ["$user_detailed", 0] },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        status: 1,
        dueDate: 1,
        priority: 1,
        createdAt: 1,
        completed:1,
        "user_detailed.email": 1,
        "user_detailed.name": 1,
        "user_detailed.avatar": 1,
      },
    },
  ]);

  if (!tasks) {
    throw new ApiError(404, "Tasks not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "All Tasks fetch successfully", tasks));
});
//! update task
const updateTask = AsyncHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) {
    throw new ApiError(400, "Task Id missing or invalid");
  }

  const taskExists = await Task.findById(taskId);
  if (!taskExists) {
    throw new ApiError(404, "task not found!");
  }

  if (taskExists.userId.toString() !== req?.user?._id) {
    throw new ApiError(403, "You are not authorized to access this task");
  }

  const updateTask = await Task.findByIdAndUpdate(
    taskExists._id,
    {
      ...req.body,
    },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "Task successfully Updated!", updateTask));
});

//! delete task
const deleteTask = AsyncHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) {
    throw new ApiError(400, "Task Id missing or invalid");
  }
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.userId.toString() !== req?.user?._id) {
    throw new ApiError(403, "You are not authorized to access this task");
  }
  await Task.findByIdAndDelete(task._id);
  return res
    .status(200)
    .json(new ApiResponse(200, "Task successfully deleted"));
});

//! status update task
const updateTaskStatus = AsyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, "status are required");
  }

  const { taskId } = req.params;

  if (!taskId) {
    throw new ApiError(400, "Task Id missing or invalid");
  }
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.userId.toString() !== req?.user?._id) {
    throw new ApiError(403, "You are not authorized to access this task");
  }

  const updateTask = await Task.findByIdAndUpdate(
    task?._id,
    {
      status,
    },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Task Status update successfully", updateTask));
});

//! completed task  task
const toggleTaskCompleted = AsyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    throw new ApiError(400, "Task Id missing or invalid");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.userId.toString() !== req?.user?._id) {
    throw new ApiError(403, "You are not authorized to access this task");
  }

  const updateTask = await Task.findByIdAndUpdate(
    task?._id,
    {
      completed: !task.completed,
    },
    { new: true }
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Task Complete update successfully", updateTask)
    );
});

//! priority update task
const updateTaskPriority = AsyncHandler(async (req, res) => {
  const { priority } = req.body;

  if (!priority) {
    throw new ApiError(400, "priority are required");
  }

  const { taskId } = req.params;

  if (!taskId) {
    throw new ApiError(400, "Task Id missing or invalid");
  }
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.userId.toString() !== req?.user?._id) {
    throw new ApiError(403, "You are not authorized to access this task");
  }

  const updateTask = await Task.findByIdAndUpdate(
    task?._id,
    {
      priority,
    },
    { new: true }
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Task Priority update successfully", updateTask)
    );
});

export {
  createTask,
  getTask,
  getAllTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  toggleTaskCompleted,
  updateTaskPriority,
};
