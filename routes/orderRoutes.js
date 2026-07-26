import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = Router();
router.post("/", protect, createOrder);
router.get("/all", protect, adminOnly, getAllOrders);
router.get("/my-orders", protect, getMyOrders);
router.get("/:orderId", protect, getOrderById);
router.put("/:orderId", protect, adminOnly, updateOrderStatus);

export default router;
