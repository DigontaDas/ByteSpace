"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithDemo } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setErrorMessage(
        error.message || "Invalid login credentials. Please check your email and password."
      );
      setLoading(false);
    } else {
      setSuccessMessage("Signed in successfully! Redirecting...");
      setTimeout(() => {
        router.push("/courses");
      }, 1000);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await signInWithDemo();
    setSuccessMessage("Logged in as Demo User! Redirecting...");
    setTimeout(() => {
      router.push("/courses");
    }, 800);
  };

  return (
    <div className={styles.authPage}>
      {/* Left Side - Decorative */}
      <div className={styles.authLeft}>
        <Link href="/" className={styles.logo}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="#D4FF00" />
            <path
              d="M8 10C8 8.89543 8.89543 8 10 8H16C19.3137 8 22 10.6863 22 14C22 17.3137 19.3137 20 16 20H12V24H8V10Z"
              fill="#1400FF"
            />
            <circle cx="16" cy="14" r="3" fill="#D4FF00" />
          </svg>
        </Link>

        <div className={styles.leftContent}>
          <h2 className={styles.leftTitle}>Sign in with ease</h2>
          <p className={styles.leftDesc}>
            Experience a seamless and efficient sign-in process that grants you
            instant access to a world of knowledge.
          </p>
        </div>

        {/* Decorative elements */}
        <div className={styles.gridBg} />
        <div className={styles.decoTriangle} />
        <div className={styles.decoCircle} />

        {/* Floating course card */}
        <div className={styles.floatingPreview}>
          <div className={styles.previewImage}>
            <img
              src="/images/course-big-data.jpg"
              alt="Course preview"
            />
          </div>
          <div className={styles.previewContent}>
            <h4>The Power of Big Data</h4>
            <div className={styles.previewRating}>
              4.5
              <span className={styles.previewStars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </span>
            </div>
            <span className={styles.previewPrice}>$25 <s>$50</s></span>
          </div>
        </div>

        <div className={styles.floatingStudents}>
          <span>Happy Students</span>
          <div className={styles.miniAvatars}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={styles.miniAvatar}
                style={{ background: `hsl(${i * 70 + 200}, 60%, 55%)` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className={styles.authRight}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <span className={styles.formLabel}>Sign In</span>
            <h1 className={styles.formTitle}>Welcome Back</h1>
          </div>

          {errorMessage && (
            <div className={styles.errorBanner}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className={styles.successBanner}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="login-email" className={styles.label}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="designer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="login-password" className={styles.label}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className={styles.demoLoginBtn}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Instant Demo Sign-In
              </span>
            </button>
          </form>

          <div className={styles.socialDivider}>
            <span>or continue with</span>
          </div>

          <div className={styles.socialButtons}>
            <button className={styles.socialBtn} aria-label="Sign in with Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </button>
            <button className={styles.socialBtn} aria-label="Sign in with Google">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
          </div>

          <p className={styles.switchText}>
            New User?{" "}
            <Link href="/register" className={styles.switchLink}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
