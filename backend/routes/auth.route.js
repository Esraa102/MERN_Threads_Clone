import express from "express";
import {
  checkAuth,
  logInUser,
  logOutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { verfiyToken } from "../middleware/verfiyToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/check-auth", verfiyToken, checkAuth);
router.get("/logout", verfiyToken, logOutUser);
export { router as authRouter };
