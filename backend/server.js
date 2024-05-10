import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { authRouter } from "./routes/auth.route.js";
import { connectToDB } from "./config/connectToDB.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5001;
connectToDB();

app.use(express.json());
app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELTE"],
    credentials: true,
  })
);

//Routes
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  console.log("Server Is Running on", port);
});
