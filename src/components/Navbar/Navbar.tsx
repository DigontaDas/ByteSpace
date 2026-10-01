"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut, wishlistCourseIds, enrolledCourseIds } = useAuth();

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
          {user ? (
            <div className={styles.userProfile}>
              <Link
                href="/profile"
                className={styles.userProfileLink}
                title="Go to My Profile & Wishlist"
              >
                <div className={styles.userAvatar}>
                  {user.user_metadata?.full_name?.charAt(0).toUpperCase() ||
                    user.email.charAt(0).toUpperCase()}
                </div>
                <span className={styles.userName}>
                  {user.user_metadata?.full_name || user.email.split("@")[0]}
                </span>
              </Link>
              <button
                onClick={() => signOut()}
                className={styles.signOutBtn}
                title="Sign Out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className={styles.signInLink}>
                Sign In
              </Link>
              <Link href="/register" className={styles.joinBtn}>
                Join Us
              </Link>
            </>
          )}
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
        <Link
          href="/profile"
          className={styles.mobileLink}
          onClick={() => setMobileOpen(false)}
        >
          My Profile
        </Link>
        <Link
          href="/profile?tab=wishlist"
          className={styles.mobileLink}
          onClick={() => setMobileOpen(false)}
        >
          My Wishlist {wishlistCourseIds.length > 0 ? `(${wishlistCourseIds.length})` : ""}
        </Link>
        <Link
          href="/profile?tab=enrolled"
          className={styles.mobileLink}
          onClick={() => setMobileOpen(false)}
        >
          My Learning {enrolledCourseIds.length > 0 ? `(${enrolledCourseIds.length})` : ""}
        </Link>
        <div className={styles.mobileDivider} />
        {user ? (
          <div className={styles.mobileUserArea}>
            <span className={styles.mobileGreeting}>
              Logged in as {user.user_metadata?.full_name || user.email}
            </span>
            <button
              onClick={() => {
                signOut();
                setMobileOpen(false);
              }}
              className={styles.mobileSignOutBtn}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}
