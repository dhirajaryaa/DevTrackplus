import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";

export const AuthCheck = AsyncHandler(async (req, res, next) => {
  const incomingToken =
    req.cookies?.accessToken ||
    req.headers?.authorization?.replace("Bearer ", "");

  if (!incomingToken) {
    throw new ApiError(403, "Access token is missing or Expired!");
  }

  const decodedToken = await jwt.verify(incomingToken, ACCESS_TOKEN_SECRET);

  if (!decodedToken) {
    throw new ApiError(403, "Invalid Token");
  }
  req.user = decodedToken;

  next();
});
