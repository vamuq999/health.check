"use client";

export default function SuccessPage() {
  const handleDownload = async () => {
    const { jsPDF } = await import("jspdf");

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(23, 23, 82);
    doc.text("BOARDIUM", 20, 20);

    doc.setFontSize(16);
    doc.text("Governance Health Check Report", 20, 32);

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text("Thank you for your purchase.", 20, 48);
    doc.text("Your branded report layout will go here next.", 20, 58);

    doc.save("boardium-governance-report.pdf");
  };

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
          Your report is ready
        </h1>

        <p style={{ color: "#22234f", lineHeight: 1.7, marginBottom: "24px" }}>
          You can now download your Boardium Governance Health Check PDF report.
        </p>

        <button
          onClick={handleDownload}
          style={{
            background: "#14d2d0",
            color: "#ffffff",
            border: "none",
            borderRadius: "999px",
            minHeight: "54px",
            padding: "0 22px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Download Report
        </button>
      </div>
    </main>
  );
}