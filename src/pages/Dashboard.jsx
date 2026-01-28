import { useEffect, useState } from "react";
import api from "../api/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    init();
  }, []); // Runs once on component mount

  const init = async () => {
    try {
      await refreshUser();
      await loadSignals();
    } catch {
      setError("Failed to load user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    const res = await api.get("/auth/me");
    setUser(res.data);
  };

  const loadSignals = async () => {
    const res = await api.get("/signals");
    setSignals(res.data);
  };

  const subscribe = async () => {
    try {
      const res = await api.post("/billing/create-checkout");
      window.location.href = res.data.checkout_url;
    } catch (err) {
      console.error(err);
      alert("Failed to start checkout");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Handle Stripe success query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "true" && !window.location.href.includes("paid=true")) {
      refreshUser().then(loadSignals);
      window.history.replaceState({}, "", "/dashboard"); // Clears query param
    }
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.href = "/"}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          {user && <span className="user-email">{user.email}</span>}
        </div>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </header>

      {user && (
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Account Type</p>
            <p className={`stat-value ${user.is_paid ? "paid" : "free"}`}>{user.is_paid ? "Premium" : "Free"}</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Signals Access</p>
            <p className="stat-value">{user.is_paid ? "Unlimited" : "Limited"}</p>
          </div>
        </div>
      )}

      <section className="signals-section">
        <div className="signals-header">
          <h3>Trading Signals</h3>

          {!user?.is_paid && (
            <button className="upgrade-btn" onClick={subscribe}>
              Upgrade to Premium
            </button>
          )}
        </div>

        <div className="signals-list">
          {signals.length === 0 && <p className="empty-text">No signals available</p>}

          {signals.map((s, i) => (
            <div key={i} className="signal-card">
              <span className="signal-symbol">{s.symbol}</span>
              <span
                className={`signal-action ${s.signal.toLowerCase() === "buy" ? "buy" : "sell"}`}
              >
                {s.signal}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
