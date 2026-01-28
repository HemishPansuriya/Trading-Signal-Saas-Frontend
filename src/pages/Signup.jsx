import { useState } from "react";
import api from "../api/api";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      const res = await api.post("/auth/signup", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Create Account 🚀</h2>
        <p className="subtitle">Start your journey with us</p>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="signup-btn" onClick={signup}>
          Create Account
        </button>

        <p className="login-link">
          Already have an account?
          <span onClick={() => (window.location.href = "/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
