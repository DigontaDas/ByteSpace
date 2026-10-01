"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "65vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "20px",
            background: "rgba(20, 0, 255, 0.08)",
            color: "#1400FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: "12px",
            color: "var(--gray-900)",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            maxWidth: "480px",
            color: "var(--gray-600)",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          We encountered an unexpected error. Don&apos;t worry, you can try again or
          return to the home page.
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => reset()}
            style={{
              background: "var(--blue-primary)",
              color: "var(--white)",
              padding: "12px 24px",
              borderRadius: "9999px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            style={{
              background: "var(--gray-100)",
              color: "var(--gray-800)",
              padding: "12px 24px",
              borderRadius: "9999px",
              fontWeight: 600,
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
