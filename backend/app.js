import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import userData from "./routes/userData.js";
const app = express();
import { connectDB } from "./db/db.js"; // Adjust the path as needed

connectDB();
configDotenv.apply();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/chats", chatRoute);
app.use("/messages", messageRoute);
app.use("/", userData);
app.listen(4800, () => {
  console.log("Server is running!");
});
