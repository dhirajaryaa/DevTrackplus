import { Router } from "express";
import {
  deleteUser,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import { AuthCheck } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshAccessToken);
userRouter.post("/logout", AuthCheck, logoutUser);
userRouter.put("/profile", AuthCheck, updateUser);
userRouter.get("/profile", AuthCheck, getUserProfile);
userRouter.delete("/profile", AuthCheck, deleteUser);
