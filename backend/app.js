import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import { getUserData } from "./controllers/userData.js";
const app = express();
import { connectDB } from "./db/db.js"; 
connectDB();
app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/chats", chatRoute);
app.use("/messages", messageRoute);
app.post("/userData", getUserData);
app.listen(4800, () => {
  console.log("Server is running!");
});
