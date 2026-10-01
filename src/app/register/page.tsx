"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "../login/login.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
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

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, fullName);

    if (error) {
      setErrorMessage(error.message || "Failed to create account. Please try again.");
      setLoading(false);
    } else {
      setSuccessMessage(
        "Account created successfully! Check your email or sign in now."
      );
      setTimeout(() => {
        router.push("/courses");
      }, 1200);
    }
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
          <h2 className={styles.leftTitle}>Sign up and come in</h2>
          <p className={styles.leftDesc}>
            The registration process is straightforward, uncomplicated, and
            efficient, allowing users to sign up quickly, easily, and at no
            cost.
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
            <span className={styles.formLabel}>Create an Account</span>
            <h1 className={styles.formTitle}>
              Welcome to
              <br />
              ByteSpace
            </h1>
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
              <label htmlFor="register-name" className={styles.label}>
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="register-email" className={styles.label}>
                Email
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="designer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="register-password" className={styles.label}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id="register-password"
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
              {loading ? "Creating Account..." : "Continue"}
            </button>
          </form>

          <p className={styles.switchText} style={{ marginTop: "24px" }}>
            Already have an account?{" "}
            <Link href="/login" className={styles.switchLink}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
