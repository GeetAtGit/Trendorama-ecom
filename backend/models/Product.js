import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  category: { type: String },
  imageUrl:  { type: String, required: true },    // ← new

},  { timestamps: true });

export default mongoose.model("Product", productSchema);
