import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  getAllPricing,
  getPricingByProductId,
  createPricing,
  updatePricingByProductId,
  deletePricingByProductId,
  getAllSizeModifiers,
  getSizeModifierBySize,
  createSizeModifier,
  updateSizeModifierBySize,
  deleteSizeModifierBySize,
} from "../controllers/pricingController.js";

const router = Router();

router.get("/", protect, adminOnly, getAllPricing);
router.post("/", protect, adminOnly, createPricing);
router.get("/modifiers", protect, adminOnly, getAllSizeModifiers);
router.post("/modifiers", protect, adminOnly, createSizeModifier);
router.get("/modifiers/:size", protect, adminOnly, getSizeModifierBySize);
router.put("/modifiers/:size", protect, adminOnly, updateSizeModifierBySize);
router.delete("/modifiers/:size", protect, adminOnly, deleteSizeModifierBySize);
router.get("/:productId", protect, adminOnly, getPricingByProductId);
router.put("/:productId", protect, adminOnly, updatePricingByProductId);
router.delete("/:productId", protect, adminOnly, deletePricingByProductId);

export default router;
