import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      default: "",
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
