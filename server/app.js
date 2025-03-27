import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { NODE_ENV, ORIGIN } from "./config/env.js";

const app = express();

// setup req.json format middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ORIGIN,
    credentials: NODE_ENV === "development",
  })
);

app.use(cookieParser());

// setup router 
import { userRouter } from "./routers/user.routes.js";
import { TaskRouter } from "./routers/task.routes.js";
//? user router 
app.use("/api/v1/users",userRouter);
//? tasks router 
app.use("/api/v1/tasks",TaskRouter);


export default app;
