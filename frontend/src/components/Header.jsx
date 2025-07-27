import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiLogIn, FiHome } from "react-icons/fi";
import { LuPackageOpen } from "react-icons/lu";
import { BsShop } from "react-icons/bs";



export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/auth") return null;

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Hamburger Left */}
        <button
          className="text-2xl text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu />
        </button>

        {/* Logo Center (Optional) */}
        <Link to="/" className="text-xl font-bold text-black">
          Trendorama
        </Link>

        {/* Cart Right */}
        <Link to="/cart" className="relative text-2xl text-gray-700">
          <FiShoppingCart />
          {cart?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.items.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          )}
        </Link>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/10 bg-opacity-40 z-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button className="text-2xl" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4">
          <NavLink to="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-black">
            <FiHome /> Home
          </NavLink>
          <NavLink to="/shop" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-black">
            <BsShop  /> Shop
          </NavLink>
          {user && (
            <NavLink to="/orders" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-black">
              <LuPackageOpen /> Orders
            </NavLink>
          )}
          <NavLink to="/profile" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-black">
            <FiUser /> Profile
          </NavLink>

          <div className="mt-auto pt-4 border-t">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/auth");
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
              >
                <FiLogOut /> Logout
              </button>
            ) : (
              <NavLink to="/auth" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 text-green-600 hover:text-green-800">
                <FiLogIn /> Sign In
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
