// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);         
root.render(
  <AuthProvider>
     <CartProvider>
    <App />
     </CartProvider>
  </AuthProvider>
);
