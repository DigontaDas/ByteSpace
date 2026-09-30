"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
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
          <span className={styles.logoText}>ByteSpace</span>
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/courses" className={styles.navLink}>
              Courses
            </Link>
          </li>
          <li>
            <Link href="/creators" className={styles.navLink}>
              Creators
            </Link>
          </li>
        </ul>

        <div className={styles.navActions}>
          <Link href="/login" className={styles.signInLink}>
            Sign In
          </Link>
          <Link href="/register" className={styles.joinBtn}>
            Join Us
          </Link>
          <button className={styles.cartBtn} aria-label="Cart">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </button>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ""}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ""}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ""}`}
      >
        <Link
          href="/"
          className={styles.mobileLink}
          onClick={() => setMobileOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/courses"
          className={styles.mobileLink}
          onClick={() => setMobileOpen(false)}
        >
          Courses
        </Link>
        <Link
          href="/creators"
          className={styles.mobileLink}
          onClick={() => setMobileOpen(false)}
        >
          Creators
        </Link>
        <div className={styles.mobileDivider} />
        <Link
          href="/login"
          className={styles.mobileLink}
          onClick={() => setMobileOpen(false)}
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className={styles.mobileJoinBtn}
          onClick={() => setMobileOpen(false)}
        >
          Join Us
        </Link>
      </div>
    </nav>
  );
}
