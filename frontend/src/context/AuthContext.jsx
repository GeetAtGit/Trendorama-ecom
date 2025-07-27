import { createContext, useState, useEffect, useContext } from "react";

function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const rawToken = localStorage.getItem("token");
  const cleanedToken =
    rawToken && rawToken !== "null" && rawToken !== "undefined"
      ? rawToken
      : null;

  const [token, setToken] = useState(cleanedToken);
  const [user, setUser] = useState(cleanedToken ? decodeToken(cleanedToken) : null);

  useEffect(() => {
    if (token) setUser(decodeToken(token));
    else setUser(null);
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
