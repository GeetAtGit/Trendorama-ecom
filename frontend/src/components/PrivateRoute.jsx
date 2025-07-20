// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, requireAdmin = false }) {
  const { user } = useAuth();

  if (!user) {
    // not logged in
    return <Navigate to="/auth" replace />;
  }
  if (requireAdmin && user.role !== "admin") {
    // logged in but not admin
    return <Navigate to="/" replace />;
  }
  return children;
}
