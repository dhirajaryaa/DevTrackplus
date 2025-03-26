import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is Required"],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is Required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
      minLength: 3,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is Required"],
      minLength: 3,
    },
    refreshToken: {
      type: String,
    },
    avatar: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
      about: {
        type: String,
        trim: true,
        default: "",
      },
      
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
