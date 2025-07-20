// backend/routes/cartRoutes.js
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} from "../controllers/cartController.js";

const router = express.Router();

// protect all cart routes
router.use(protect);

// GET   /api/cart
router.get("/", getCart);
// POST  /api/cart
router.post("/", addToCart);
// PUT   /api/cart/:itemId
router.put("/:itemId", updateCartItem);
// DEL   /api/cart/:itemId
router.delete("/:itemId", removeCartItem);

console.log("🛒 [cartRoutes] loaded");
export default router;
