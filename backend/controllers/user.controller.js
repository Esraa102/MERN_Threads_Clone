import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const updateProfile = async (req, res, next) => {
  const { fullName, username, password, profileImg, bio } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (req.user._id.toString() !== req.params.profileId) {
      return res.status(403).json({
        status: "Error",
        message: "Only the profile owner can update his profile",
      });
    }
    if (password) {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      user.password = hashedPassword;
    }
    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.profileImg = profileImg || user.profileImg;
    user.bio = bio || user.bio;
    await user.save();
    return res.status(200).json({ status: "OK", userData: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.profileId) {
      return res.status(403).json({
        status: "Error",
        message: "You can only delete your own profile",
      });
    } else {
      await User.findByIdAndDelete(req.params.profileId).select("-password");
      return res.status(200).json({
        status: "OK",
        message: "Account has been delete successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

const followOrUnfollowUser = async (req, res, next) => {
  const { _id: userId } = req.user;
  if (req.params.profileId !== userId.toString()) {
    try {
      const userToFollow = await User.findById(req.params.profileId);
      if (!userToFollow) {
        res.status(404).json({
          status: "Error",
          message: "This profile is not available anymore",
        });
      }
      const followerUser = await User.findById(userId);
      const amIFollower = userToFollow.followers.filter((e) => {
        return e.toString() === userId.toString();
      });
      if (amIFollower.length > 0) {
        // Unfollow User
        //remove the user from the userToFollow list
        userToFollow.followers = userToFollow.followers.filter((e) => {
          return e.toString() !== userId.toString();
        });
        // remove the userToFollow from following list of the user
        followerUser.following = followerUser.following.filter((e) => {
          return e.toString() !== userToFollow._id.toString();
        });
      } else {
        // Follow User
        // add the follower to user
        userToFollow.followers.push(userId);
        // add the userToFollow to following list of the user
        followerUser.following.push(userToFollow._id);
      }

      Promise.all([await userToFollow.save(), await followerUser.save()]);
      res.status(200).json({
        status: "OK",
        message: `You're now ${
          amIFollower.length > 0 ? "unfollowing" : "following"
        } ${userToFollow.username}`,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  } else {
    res
      .status(400)
      .json({ status: "Error", message: "You can't follow/unfollow yourself" });
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({
        status: "Error",
        message: "This profile is not available anymore",
      });
    }
    return res.status(200).json({ status: "OK", userData: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};

export { updateProfile, deleteProfile, followOrUnfollowUser, getUserProfile };
