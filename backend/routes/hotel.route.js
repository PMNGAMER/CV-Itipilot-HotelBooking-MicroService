import express from "express";
import { addHotel, deleteHotel, getHotel, getHotels } from "../controllers/hotel.controller.js";
const router = express.Router();
router.post("/search", getHotels);
router.get("/:id", getHotel);
router.post("/", addHotel);
router.delete("/:id", deleteHotel);
export default router;
