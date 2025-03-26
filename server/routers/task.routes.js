import {Router} from "express";
import {createTask} from "../controllers/task.controller.js"
import {AuthCheck} from "../middlewares/auth.middleware.js"

export const TaskRouter =  Router();

TaskRouter.post("/",AuthCheck,createTask);