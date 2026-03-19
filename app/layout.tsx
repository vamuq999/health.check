import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boardium Governance Health Check",
  description:
    "A practical governance assessment tool for boards, not-for-profits, and SMEs. Review governance maturity, capture results, and unlock a board-ready PDF report.",
  keywords: [
    "Boardium",
    "governance health check",
    "board governance",
    "board assessment",
    "SME governance",
    "not-for-profit governance",
    "board advisory",
    "governance review",
  ],
  openGraph: {
    title: "Boardium Governance Health Check",
    description:
      "Review governance maturity, capture results, and unlock a board-ready PDF report.",
    url: "https://healthcheck.boardium.com.au",
    siteName: "Boardium",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boardium Governance Health Check",
    description:
      "A practical governance assessment tool for boards, not-for-profits, and SMEs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}