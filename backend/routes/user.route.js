import express from "express";
import { verfiyToken } from "../middleware/verfiyToken.js";
import {
  updateProfile,
  deleteProfile,
  followOrUnfollowUser,
  getUserProfile,
} from "../controllers/user.controller.js";
const router = express.Router();

router.put("/update/:profileId", verfiyToken, updateProfile);
router.delete("/delete/:profileId", verfiyToken, deleteProfile);
router.delete("/freeze/:profileId", verfiyToken, deleteProfile);
router.post("/follow/:profileId", verfiyToken, followOrUnfollowUser);
router.get("/profile/:id", getUserProfile);

export { router as userRouter };
