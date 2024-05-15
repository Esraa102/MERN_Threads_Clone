import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const createNewPost = async (req, res, next) => {
  const { content, img } = req.body;
  try {
    const newPost = await Post.create({
      postedBy: req.user._id,
      content: content,
      img: img || "",
    });
    if (!newPost) {
      res.status(400).json({ status: "Error", message: "Invalid Data" });
    }
    res.status(201).json({ status: "Error", postData: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const updatePost = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  try {
    const postToUpdate = await Post.findById(postId);
    if (!postToUpdate) {
      return res
        .status(404)
        .json({ status: "Error", message: "Post Not Found" });
    } else {
      if (userId.toString() === postToUpdate.postedBy.toString()) {
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            ...req.body,
          },
          { new: true }
        );
        res.status(200).json({ status: "OK", postData: updatedPost });
      } else {
        res.status(403).json({
          status: "Error",
          message: "Only the post owner can update this post",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const deletePost = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "Error",
        message: "This post is not available anymore",
      });
    } else {
      if (userId.toString() === post.postedBy.toString()) {
        await Post.findByIdAndDelete(postId);
        res.status(200).json({
          status: "OK",
          message: "Post has been deleted successfully",
        });
      } else {
        res.status(403).json({
          status: "Error",
          message: "Only the post owner can delete this post",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const replyToPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        status: "Error",
        message: "This post is not available anymore",
      });
    }
    const newComment = {
      userId: req.user._id,
      text: req.body.text,
      userProfilePic: req.user.profileImg || "",
      username: req.user.username,
    };
    post.replies.push(newComment);
    await post.save();
    res.status(201).json({ status: "OK", postData: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const likeOrUnlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        status: "Error",
        message: "This post is not available anymore",
      });
    } else {
      const isUserLiked = post.likes.includes(req.user._id);
      if (isUserLiked) {
        // unlike post
        post.likes = post.likes.filter((e) => {
          return e.toString() !== req.user._id.toString();
        });
      } else {
        // like post
        post.likes.push(req.user._id);
      }
      await post.save();
      res.status(200).json({
        status: "OK",
        message: `You ${isUserLiked ? "unliked" : "liked"} this post`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      res.status(404).json({
        status: "Error",
        message: "This post is not available anymore",
      });
    }
    res.status(200).json({ status: "OK", postData: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const getFeeedPosts = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ status: "Error", message: "User not found" });
    }
    const following = user.following;
    // get the posts created by users that our user follows :)
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: "OK", postsData: feedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

export {
  createNewPost,
  updatePost,
  deletePost,
  replyToPost,
  likeOrUnlikePost,
  getPost,
  getFeeedPosts,
};
