import {Router} from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';

export const userRouter =  Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);