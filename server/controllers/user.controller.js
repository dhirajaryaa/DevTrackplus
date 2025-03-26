import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { cookiesOptions, REFRESH_TOKEN_SECRET } from "../config/env.js";

//! generate access token
const generateAccessAndRefreshToken = async function (user) {
  if (!user) {
    throw new ApiError(400, "userId is required");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

//! register user
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    throw new ApiError(400, "All Fields Are Required!");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError(400, "user Already Exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  const user = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "User Successful Register", user));
});

//! login user
const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new ApiError(400, "All Fields Are Required!");
  }

  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new ApiError(404, "user not found");
  }

  const isPasswordCorrect = await userExist.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password Incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userExist
  );
  if (!(accessToken && refreshToken)) {
    throw new ApiError(500, "Failed to generate tokens");
  }

  const user = await User.findById(userExist._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .json(
      new ApiResponse(200, "User Login Successful", {
        user,
        accessToken,
        refreshToken,
      })
    );
});

//! logout user
const logoutUser = AsyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req?.user?._id, {
    refreshToken: "",
  });
  if (!user) {
    throw new ApiError(400, "Authorized user!");
  }

  return res
    .status(200)
    .clearCookie("accessToken", cookiesOptions)
    .clearCookie("refreshToken", cookiesOptions)
    .json(new ApiResponse(200, "User Logout Successful"));
});

//! generateAccessToken
const refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingToken =
    req.cookies?.refreshToken ||
    req.headers?.authorization?.replace("Bearer ", "");

  if (!incomingToken) {
    throw new ApiError(403, "Token Expired or Invalid");
  }

  const decodedToken = await jwt.verify(incomingToken, REFRESH_TOKEN_SECRET);

  if (!decodedToken) {
    throw new ApiError(403, "Invalid Token");
  }
  const user = await User.findById(decodedToken?._id);

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user
  );

  if (!(accessToken && refreshToken)) {
    throw new ApiError(500, "Failed to generate tokens");
  }

  const data = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .json(
      new ApiResponse(200, "User Login Successful", {
        user: data,
        accessToken,
        refreshToken,
      })
    );
});

//! update User
const updateUser = AsyncHandler(async (req, res) => {
  const { name, about } = req.body;

  if (!(name || about)) {
    throw new ApiError(400, "Fields Are Required");
  }
  const user = await User.findByIdAndUpdate(
    req?.user?._id,
    { name, about },
    { new: true, select: "-password -refreshToken" }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "User profile updated successfully", user));
});

//! get User
const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req?.user?._id).select(
    "-password -refreshToken"
  );
  return res.status(200).json(new ApiResponse(200, "Profile fetched", user));
});

//! delete User
const deleteUser = AsyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req?.user?._id);
  return res.status(200).json(new ApiResponse(200, "Profile Deleted"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateUser,
  getUserProfile,
  deleteUser
};
