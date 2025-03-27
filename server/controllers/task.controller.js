import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../model/task.model.js";

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
// TODO: mongodb aggregations pipeline to get user info like avatar, name,email
const getTask = AsyncHandler(async (req, res) => {
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
  return res
    .status(200)
    .json(new ApiResponse(200, "Task fetch successfully", task));
});

//! get all tasks
// TODO: mongodb aggregations pipeline to get user info like avatar, name,email
const getAllTask = AsyncHandler(async (req, res) => {
  const tasks = await Task.find();
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
    .json(new ApiResponse(201, "Task successfully created", updateTask));
});
//! delete task

//! compted task  task
//! status update task
//! priority update task

export { createTask, getTask, getAllTask, updateTask };
