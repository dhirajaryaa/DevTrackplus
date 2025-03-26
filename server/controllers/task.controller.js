import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../model/task.model.js";

//! create new task
const createTask = AsyncHandler(async (req, res) => {
  const { title, description,project, status, priority, completed } = req.body;

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

//! update task
//! get task by id
//! get all tasks
//! delete task
//! compted task  task
//! status update task
//! priority update task

export { createTask };
