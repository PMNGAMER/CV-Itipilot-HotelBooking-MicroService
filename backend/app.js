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
      res.status(200).json("ok" );
    } catch (err) {
      console.log(err);
      res.status(500).json("Failed to get userData!");
    }
};
const getUserDataForClientSide = async (req, res) => {
  try {
    res.status(200).json({data});
  } catch (err) {
    console.log(err);
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
const Middleware = (req, res, next) => {
  req.userData = data;
  next();
};
app.get("/userdataclient", getUserDataForClientSide);
app.use(Middleware);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/chats", chatRoute);
app.use("/messages", messageRoute);
app.listen(4800, () => {
  console.log("Server is running!");
});
