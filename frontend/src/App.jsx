// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage    from "./pages/LandingPage";
import ProductsPage   from "./pages/ProductsPage";
import AuthPage       from "./pages/AuthPage";
import UserDashboard  from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CartPage       from "./pages/CartPage";
import PrivateRoute   from "./components/PrivateRoute";
import Profile        from "./pages/Profile";
import Orders from "./pages/Orders";


export default function App() {
  return (
    <Router>
      {/* Header always present except on /auth */}
      <Header />

      <Routes>
        <Route path="/"        element={<LandingPage />} />
        <Route path="/shop"    element={<ProductsPage />} />
        <Route path="/auth"    element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders"  element={<Orders />} />


        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute requireAdmin>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
