import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./db/db.js"; 
connectDB();
let data = null;
const getUserData = async (req, res) => {
  try {
    data = req.body.data;
    console.log(data);
      res.status(200).json("ok" );
    } catch (err) {
      console.log(err);
      res.status(500).json("Failed to get userData!");
    }
};
const getUserDataForClientSide = async (req, res) => {
  try {
    while (data === null) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 100ms before checking again
    }
    console.log(data);
    console.log("client");
    res.status(200).json({ data });
  } catch (err) {
    console.error("Error awaiting data:", err);
    res.status(500).json("Failed to get userData!");
  }
};
const Middleware = async (req, res, next) => {
  try {
    while (data === null) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 100ms before checking again
    }
    console.log(data);
    console.log("middleware");
    req.userData = data;
    next();
  } catch (err) {
    console.error("Error awaiting data:", err);
    res.status(500).json("Failed to get userData!");
  }
};
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true,
}));
app.post("/userData", getUserData);
app.get("/userdataclient", getUserDataForClientSide);
app.use(Middleware);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/chats", chatRoute);
app.use("/messages", messageRoute);
app.listen(4800, () => {
  console.log("Server is running!");
});
