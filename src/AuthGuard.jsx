import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../src/api/api";

/* Protect private pages */
export function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me"); // token validation
        setAuthorized(true);
      } catch {
        localStorage.removeItem("token");
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return null; // or loader
  return authorized ? children : <Navigate to="/" replace />;
}

/* Block login/signup if already logged in */
export function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
}
