import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js"; 
import {getUser} from "./controllers/user.controller.js";
import {getHotel, getHotels, addHotel, deleteHotel} from "./controllers/hotel.controller.js";
import { uploadImage, getImageById } from "./controllers/image.controller.js";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true,
}));
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
async function verifyToken(req, res, next) {
  try {

    console.log(req.cookies.usertoken);
      const token = req.cookies.usertoken;
      if (!token) {
          throw new Error('No token provided');
      }
      const userData = await new Promise((resolve, reject) => {
          jwt.verify(token, jwtSecret, {}, (err, decoded) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(decoded);
              }
          });
      });
      req.user = userData;
      console.log(req.user);
      next(); 
  } catch (err) {
      res.status(401).send(err.message || 'Unauthorized');
  }
}
app.get("/users",verifyToken, getUser);
app.post("/hotels/search",verifyToken, getHotels);
app.get("/hotels/:id", verifyToken, getHotel);
app.post("/hotels", verifyToken, addHotel);
app.delete("/hotels/:id", verifyToken, deleteHotel);
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
