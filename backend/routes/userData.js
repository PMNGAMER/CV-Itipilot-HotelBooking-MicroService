import express from "express";
import { getUserData } from "../controllers/userData";
const router = express.Router();
router.get("/userData", verifyToken, getUserData);

