// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product, view = "grid" }) {
  const { addToCart } = useCart();
  const { token } = useAuth();

  const handleAddToCart = () => {
    if (!token || token === "null" || token === "undefined") {
      alert("Please log in to add items to your cart.");
      return;
    }

    addToCart(product._id, 1);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow overflow-hidden flex flex-col ${
        view === "list" ? "sm:flex-row" : ""
      }`}
    >
      {/* Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className={`w-full ${
          view === "list" ? "sm:w-1/3" : ""
        } h-48 object-cover`}
      />

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500 text-sm mt-1">{product.category}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
