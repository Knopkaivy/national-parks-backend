import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  getAllInventory,
  getInventoryByProduct,
  getInventoryByProductAndVariant,
  createInventory,
  updateInventoryByProductAndVariant,
  deleteInventoryByProductAndVariant,
} from "../controllers/inventoryController.js";

const router = Router();

router.get("/", protect, adminOnly, getAllInventory);
router.post("/", protect, adminOnly, createInventory);
router.get("/:productId", protect, adminOnly, getInventoryByProduct);
router.get(
  "/:productId/:variant",
  protect,
  adminOnly,
  getInventoryByProductAndVariant,
);

router.put(
  "/:productId/:variant",
  protect,
  adminOnly,
  updateInventoryByProductAndVariant,
);

router.delete(
  "/:productId/:variant",
  protect,
  adminOnly,
  deleteInventoryByProductAndVariant,
);

export default router;
