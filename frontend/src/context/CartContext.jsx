import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { token, logout } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    if (!token || token === "null" || token === "undefined") {
      setCart({ items: [] });
      return;
    }

    axios
      .get("http://localhost:5050/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          console.warn("Unauthorized access. Logging out.");
          logout();
          setCart({ items: [] });
        } else {
          console.error("Failed to fetch cart:", err);
        }
      });
  }, [token, logout]);

  const addToCart = async (productId, quantity = 1) => {
    if (!token || token === "null" || token === "undefined") {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5050/api/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      } else {
        console.error("Error adding to cart:", err);
      }
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const res = await axios.put(
        `http://localhost:5050/api/cart/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Failed to update cart item:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5050/api/cart/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.items) {
        // ✅ If API returns updated cart
        setCart(res.data);
      } else {
        // ✅ If API returns only success message, update state manually
        setCart((prev) => ({
          ...prev,
          items: prev.items.filter((i) => i._id !== itemId),
        }));
      }
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
