export default function Cancel() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa, #e4e8f0)",
        padding: "20px",
        fontFamily: "Inter, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "40px 32px",
          borderRadius: "16px",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "12px",
          }}
        >
          ❌
        </div>

        <h1
          style={{
            fontSize: "26px",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "8px",
          }}
        >
          Payment Cancelled
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "24px",
          }}
        >
          Your payment was not completed. You can return to the dashboard and
          try again anytime.
        </p>

        <a
          href="/dashboard"
          style={{
            display: "inline-block",
            padding: "12px 22px",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "500",
            textDecoration: "none",
            transition: "0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "#1e40af")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "#2563eb")
          }
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
