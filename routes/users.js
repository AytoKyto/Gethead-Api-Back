import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  resetPassword,
} from "../controllers/usersController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.post("/reset-password", verifyToken, resetPassword);
router.delete("/:id", verifyToken, deleteUser);

export default router;
