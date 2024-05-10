import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verfiyToken = (req, res, next) => {
  console.log(req.cookie);
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json({
      status: "Error",
      message: "Expired or invalid token, you need to log in",
    });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ status: "Error", message: "Expired or invalid token" });
      } else {
        const user = await User.findById(decoded._id);
        if (!user) {
          res.status(404).json({ status: "Error", message: "User Not Found" });
        } else {
          req.user = decoded;
          next();
        }
      }
    });
  }
};
