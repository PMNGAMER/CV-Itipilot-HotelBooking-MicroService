import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js"; 
import {getUser} from "./controllers/user.controller.js";
import {getHotel, getHotels, addHotel, deleteHotel} from "./controllers/hotel.controller.js";
import { uploadImage, getImageById } from "./controllers/image.controller.js";
import multer from "multer";
import path from "path";
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true,
}));
let data = null;
let x= null;
let y= null;
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
      req.userData = req.cookies.userid; 
      next();
    } else {
      throw new Error('User ID cookie not found'); 
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
app.get("/users/:id",Middleware, getUser);
app.post("/hotels/search",Middleware, getHotels);
app.get("/hotels/:id", getHotel);
app.post("/hotels", Middleware, addHotel);
app.delete("/hotels/:id", Middleware, deleteHotel);
app.use(express.static('uploads'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
app.post('/upload', upload.single('file'), uploadImage);
app.get('/images/:id', getImageById);
app.listen(4800, () => {
  console.log("Server is running!");
});
