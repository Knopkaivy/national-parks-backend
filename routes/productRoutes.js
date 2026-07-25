import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);
router.post("/", protect, adminOnly, createProduct);
router.put("/:slug", protect, adminOnly, updateProduct);
router.delete("/:slug", protect, adminOnly, deleteProduct);

export default router;
