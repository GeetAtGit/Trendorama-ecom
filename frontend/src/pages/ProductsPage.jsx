import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";


const API = import.meta.env.VITE_API_URL || "http://localhost:5050";


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [view, setView]       = useState("grid");
  const [search, setSearch]   = useState("");

  useEffect(() => {
    axios
      .get(`${API}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = product => {
    console.log("Add to cart:", product);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search & Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input max-w-sm"
        />

        <div className="flex space-x-2">
          {["grid", "list"].map(mode => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                view === mode
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filtered.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            view={view}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
