import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return accessToken;
};

export default generateToken;
