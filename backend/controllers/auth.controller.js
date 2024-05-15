import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res, next) => {
  const { fullName, username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ status: "Error", message: "Email is already taken" });
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({
        fullName,
        username,
        email,
        password: hashedPassword,
      });
      if (!newUser) {
        return res
          .status(400)
          .json({ status: "Error", message: "Please Provide Valid Data" });
      } else {
        // Generate access token
        const accessToken = generateToken(newUser);
        const { password: encryptedPass, ...rest } = newUser._doc;

        res
          .status(201)
          .cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
          })
          .json({ status: "OK", userData: rest });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const logInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ status: "Error", message: "User is unathorized" });
    } else {
      if (bcryptjs.compareSync(password, user.password)) {
        // generate access token
        const accessToken = generateToken(user);
        const { password: encryptedPass, ...rest } = user._doc;
        res
          .status(200)
          .cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
          })
          .json({ status: "OK", userData: rest });
      } else {
        return res
          .status(400)
          .json({ status: "Error", message: "Wrong Credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const checkAuth = (req, res, next) => {
  if (req.user) {
    res.status(200).json({ status: "Error", userData: req.user });
  } else {
    res.status(401).json({
      status: "Error",
      message: "Invalid or expired token, you need to log in",
    });
  }
};

const logOutUser = async (req, res, next) => {
  if (req.user) {
    res
      .clearCookie("access_token", {
        httpOnly: true,
      })
      .status(200)
      .json({ status: "OK", message: "User Logged out successfully" });
  } else {
    res.status(401).json({
      status: "Error",
      message: "Invalid or expired token, you need to log in",
    });
  }
};

export { registerUser, logInUser, checkAuth, logOutUser };
