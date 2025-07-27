import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, getProfile); // Assuming you have an updateProfile controller
export default router;
