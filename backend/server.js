import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import cartRoutes from "./routes/cartRoutes.js";
import Product from "./models/Product.js";

import { registerUser, loginUser } from "./controllers/authController.js";
import { protect, isAdmin } from "./middlewares/authMiddleware.js";
import paymentRoutes from "./routes/paymentRoutes.js";





dotenv.config();

const app = express();

app.use(cors()); // ✅ Allow CORS
app.use(express.json()); // ✅ Allow JSON body parsing


app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

// POST: Create a product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Fetch all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);


console.log("📦 Available routes:");
console.table(
  listEndpoints(app).map(({ path, methods }) => ({
    path,
    methods: methods.join(", "),
  }))
);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

console.log("📌 Routes:");
console.table(listEndpoints(app));


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
