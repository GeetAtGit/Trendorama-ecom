import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getMyOrders, createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/my", protect, getMyOrders);
router.post("/", protect, createOrder);

export default router;
