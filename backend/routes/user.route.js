import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  getNotificationNumber
} from "../controllers/user.controller.js";
const router = express.Router();
router.get("/", getUsers);
router.get("/search/:id", getUser);
router.delete("/:id", deleteUser);
router.get("/notification", getNotificationNumber);

export default router;
