import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { cart }         = useCart();
  const { pathname }     = useLocation();
  const navigate         = useNavigate();

  // Don’t render on the auth page
  if (pathname === "/auth") return null;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-black">
          Trendorama
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center space-x-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "px-3 py-1 rounded-md text-sm font-medium " +
              (isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              "px-3 py-1 rounded-md text-sm font-medium " +
              (isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100")
            }
          >
            Shop
          </NavLink>

          {/* Cart with count */}
          <Link
            to="/cart"
            className="relative px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cart
            {cart?.items?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.items.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            )}
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={() => {
                  logout();
                  navigate("/auth");
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Log Out
              </button>
              <NavLink
                to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Dashboard
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                "px-3 py-1 rounded-md text-sm font-medium " +
                (isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100")
              }
            >
              Login / Register
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
