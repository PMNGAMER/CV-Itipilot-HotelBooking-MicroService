import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import hotelRoute from "./routes/hotel.route.js";
import userRoute from "./routes/user.route.js";
import { connectDB } from "./db/db.js"; 
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true,
}));
let data = null;
const x= null;
const y= null;
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
const Middleware = (req, res, next) => {
  try {
    if (req.cookies && req.cookies.userid) {
      req.userData = req.cookies.userid; // Assuming 'userid' is the correct cookie key
      next();
    } else {
      throw new Error('User ID cookie not found'); // Throw an error if 'userid' cookie is missing
    }
  } catch (err) {
    console.error("Error retrieving user data:", err);
    res.status(500).json({ error: "Failed to get userData!" });
  }
};
const coordinateForMap = (req, res) => {
  x = req.body.x;
  y = req.body.y;
  res.status(200).json("ok");
}
const getCoordinate = (req,res) =>{
  res.status(200).json({x,y});
}
app.post("/userData", getUserData);
app.get("/userdataclient", getUserDataForClientSide);
app.post("/coordinateformap", coordinateForMap);
app.get("/coordinateclient", getCoordinate);
app.use(Middleware);
app.use("/users", userRoute);
app.use("/hotels", hotelRoute);
app.listen(4800, () => {
  console.log("Server is running!");
});
