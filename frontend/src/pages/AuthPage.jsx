import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use login from AuthContext
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      if (isRegister) {
        // ─── REGISTER FLOW ─────────────────────────────────────────────
        const res = await axios.post(`${API}/api/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role
        });
        alert(res.data.message || "Registered successfully!");
        setIsRegister(false);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      } else {
        // ─── LOGIN FLOW ────────────────────────────────────────────────
        const res = await axios.post(`${API}/api/login`, {
          email: formData.email,
          password: formData.password
        });

        const token = res.data.token;

        // ✅ Use AuthContext to save token and update user state
        login(token);

        // ✅ Decode token to get user role
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const userPayload = JSON.parse(atob(base64));
        const actualRole = userPayload.role;

        navigate(actualRole === "admin" ? "/" : "/");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg shadow-2xl border border-white/40">

        {/* Login / Register Toggle */}
        <div className="flex">
          <button
            onClick={() => setIsRegister(false)}
            className={`w-1/2 py-3 font-semibold text-center ${
              !isRegister ? "bg-gray-500 text-white" : "text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`w-1/2 py-3 font-semibold text-center ${
              isRegister ? "bg-gray-500 text-white" : "text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Container */}
        <div className="p-8 space-y-6">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>

          {/* Role Select */}
          <div className="flex justify-between mb-4 bg-gray-100 p-1 rounded-full">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex-1 py-2 text-center text-sm font-medium rounded-full transition ${
                role === "user"
                  ? "bg-gray-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 text-center text-sm font-medium rounded-full transition ${
                role === "admin"
                  ? "bg-gray-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-800">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
            )}

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input"
              />
            </div>

            {isRegister && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-800">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="input"
                />
              </div>
            )}

            <button type="submit" className="btn w-full">
              {isRegister ? "Create Account" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
