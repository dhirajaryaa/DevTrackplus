import {Router} from "express";
import {createTask, getAllTask, getTask} from "../controllers/task.controller.js"
import {AuthCheck} from "../middlewares/auth.middleware.js"

export const TaskRouter =  Router();

TaskRouter.post("/",AuthCheck,createTask);
TaskRouter.get("/",AuthCheck,getAllTask);
TaskRouter.get("/:taskId",AuthCheck,getTask);