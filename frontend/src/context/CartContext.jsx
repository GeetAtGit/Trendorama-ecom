import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    if (!token) return setCart({ items: [] });
    axios
      .get("http://localhost:5050/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setCart(res.data))
      .catch(console.error);
  }, [token]);

  const addToCart = (productId, quantity = 1) =>
    axios
      .post(
        "http://localhost:5050/api/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => setCart(res.data))
      .catch(console.error);

  const updateCartItem = (itemId, quantity) =>
    axios
      .put(
        `http://localhost:5050/api/cart/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => setCart(res.data))
      .catch(console.error);

  const removeFromCart = itemId =>
    axios
      .delete(`http://localhost:5050/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setCart(res.data))
      .catch(console.error);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
