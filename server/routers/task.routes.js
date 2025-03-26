import {Router} from "express";
import {createTask, getTask} from "../controllers/task.controller.js"
import {AuthCheck} from "../middlewares/auth.middleware.js"

export const TaskRouter =  Router();

TaskRouter.post("/",AuthCheck,createTask);
TaskRouter.get("/",AuthCheck,getTask);
TaskRouter.get("/:taskId",AuthCheck,getTask);