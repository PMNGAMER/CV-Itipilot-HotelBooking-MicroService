import express from "express";
import {
  addMessage
} from "../controllers/message.controller.js";
const router = express.Router();
router.post("/:chatId", addMessage);
export default router;
