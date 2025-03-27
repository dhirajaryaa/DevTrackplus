import {Router} from "express";
import {createTask, deleteTask, getAllTask, getTask, updateTask, updateTaskStatus} from "../controllers/task.controller.js"
import {AuthCheck} from "../middlewares/auth.middleware.js"

export const TaskRouter =  Router();

TaskRouter.post("/",AuthCheck,createTask);
TaskRouter.get("/",AuthCheck,getAllTask);
TaskRouter.get("/:taskId",AuthCheck,getTask);
TaskRouter.patch("/:taskId",AuthCheck,updateTask);
TaskRouter.delete("/:taskId",AuthCheck,deleteTask);
TaskRouter.put("/:taskId/status",AuthCheck,updateTaskStatus);