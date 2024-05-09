import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELTE"],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log("Server Is Running on", port);
});
