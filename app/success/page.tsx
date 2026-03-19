"use client";

export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f4f7",
        display: "grid",
        placeItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "min(720px, 100%)",
          background: "#ffffff",
          borderRadius: "28px",
          padding: "32px",
          border: "1px solid rgba(23,23,82,0.12)",
          boxShadow: "0 18px 45px rgba(14, 19, 72, 0.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#14d2d0",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Payment Successful
        </div>

        <h1 style={{ color: "#171752", marginTop: 0, fontSize: "2.2rem" }}>
          Your payment was received
        </h1>

        <p style={{ color: "#22234f", lineHeight: 1.7, marginBottom: "24px" }}>
          Your Boardium report download page is ready. PDF generation will be connected next.
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#14d2d0",
            color: "#ffffff",
            borderRadius: "999px",
            minHeight: "54px",
            padding: "0 22px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Return Home
        </a>
      </div>
    </main>
  );
}