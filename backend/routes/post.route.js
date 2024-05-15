import express from "express";
import { verfiyToken } from "../middleware/verfiyToken.js";
import {
  createNewPost,
  deletePost,
  updatePost,
  replyToPost,
  likeOrUnlikePost,
  getPost,
  getFeeedPosts,
} from "../controllers/post.controller.js";
import {
  commentValidation,
  postValidation,
  validators,
} from "../middleware/validators.js";
const router = express.Router();

router.post("/new", verfiyToken, validators(postValidation), createNewPost);
router.put("/update/:postId", verfiyToken, updatePost);
router.delete("/delete/:postId", verfiyToken, deletePost);
router.get("/:postId", getPost);
router.get("/feed", verfiyToken, getFeeedPosts);

// comments routes
router.post(
  "/reply/:postId",
  verfiyToken,
  validators(commentValidation),
  replyToPost
);

//likes routes
router.post("/like/:postId", verfiyToken, likeOrUnlikePost);

export { router as postRouter };
