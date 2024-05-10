import express from "express";
import {
  checkAuth,
  logInUser,
  logOutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { verfiyToken } from "../middleware/verfiyToken.js";
import { logInValidation, registerValidation, validators } from "../middleware/validators.js";

const router = express.Router();

router.post("/register", validators(registerValidation), registerUser);
router.post("/login", validators(logInValidation), logInUser);
router.get("/check-auth", verfiyToken, checkAuth);
router.get("/logout", verfiyToken, logOutUser);
export { router as authRouter };
