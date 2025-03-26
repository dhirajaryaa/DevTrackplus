import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";

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

export { registerUser };
