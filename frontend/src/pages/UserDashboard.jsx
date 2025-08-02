import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const products = [
    { id: 1, name: "Trendy Sneakers", price: "$49", image: "https://source.unsplash.com/300x300/?shoes" },
    { id: 2, name: "Minimalist Watch", price: "$89", image: "https://source.unsplash.com/300x300/?watch" },
    { id: 3, name: "Streetwear Hoodie", price: "$59", image: "https://source.unsplash.com/300x300/?hoodie" },
    { id: 4, name: "Stylish Backpack", price: "$39", image: "https://source.unsplash.com/300x300/?backpack" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow p-4">
        <h1 className="text-2xl font-extrabold text-purple-700">Trendorama</h1>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center p-6">
        <h2 className="text-3xl font-bold mb-2">Welcome back, Trendsetter! 🌟</h2>
        <p className="text-gray-600 mb-4">
          Ready to explore the latest & greatest? Shop what’s hot right now!
        </p>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition">
          🛒 Explore Products
        </button>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition transform cursor-pointer"
          >
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <div className="p-3 text-center">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-purple-700 font-bold">{p.price}</p>
              <button className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-4 mt-auto bg-white shadow-inner">
        <p className="text-gray-500 text-sm">© 2025 Trendorama. Keep it trendy 😉</p>
      </footer>
    </div>
  );
}
