import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {getUser} from "./controllers/user.controller.js";
import {getHotel, getHotels, addHotel, deleteHotel, getAllUserHotels} from "./controllers/hotel.controller.js";
import { uploadImage, getImageById } from "./controllers/image.controller.js";
import { createBooking, deleteBooking,  getAllUserBookings } from "./controllers/booking.controller.js";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import Image from "./models/Image.js";
import User from "./models/user.js";
import Hotel from "./models/hotel.js";
import Booking from "./models/booking.js";
import { generateImageData, generateUsers, generateHotels, generateBookings } from "./data.js";
import 'dotenv/config';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true,
}));
app.get("/users",
  getUser);
app.post("/hotels/search",
  getHotels);
app.get("/hotels/:id", 
  getHotel);
app.post("/hotels", 
  addHotel);
app.delete("/hotels/:id", 
  deleteHotel);
app.get("/hotels", getAllUserHotels);

app.get("/bookings", getAllUserBookings);
app.post("/bookings", createBooking);
app.delete("/bookings/:id", deleteBooking);
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
mongoose.connect(process.env.DATABASE_URL).then(async () => {
  await Image.deleteMany();
  await User.deleteMany();
  await Hotel.deleteMany();
  await Booking.deleteMany();
  await Image.insertMany(generateImageData());
  await User.insertMany(await generateUsers());
  await Hotel.insertMany(await generateHotels());
  await Booking.insertMany(await generateBookings());
  app.listen(process.env.PORT, () => console.log(`Server running on PORT: ${process.env.PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
