import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  getAllUsers,
  getMe,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", protect, adminOnly, getAllUsers);
router.get("/me", protect, getMe);
router.get("/:userId", protect, adminOnly, getUserById);
router.put("/:userId", protect, updateUser);
router.delete("/:userId", protect, adminOnly, deleteUser);

export default router;
