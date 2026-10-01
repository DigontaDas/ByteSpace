"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logo} title="ByteSpace Home">
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
                  fill="#003BE2"
                />
                <circle cx="16" cy="14" r="3" fill="#D4FF00" />
              </svg>
              <span className={styles.logoText}>ByteSpace</span>
            </Link>
            <p className={styles.brandDesc}>
              Stay up to date with our latest features and releases by joining
              our newsletter.
            </p>
            <form onSubmit={handleSubscribe} className={styles.newsletter}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.subscribeBtn}>
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
            <p className={styles.privacyNote}>
              By subscribing, you agree to our <Link href="/" style={{ textDecoration: "underline", color: "inherit" }}>Privacy Policy</Link> and consent to
              receive updates from our company.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Featured Courses</h4>
              <ul>
                <li><Link href="/courses">Featured Categories</Link></li>
                <li><Link href="/courses?category=Business">Business</Link></li>
                <li><Link href="/courses?category=IT+%26+Software">IT &amp; Software</Link></li>
                <li><Link href="/courses?category=UI%2FUX+Design">Design</Link></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Development</h4>
              <ul>
                <li><Link href="/courses?category=Marketing">Marketing</Link></li>
                <li><Link href="/courses?category=Photography">Photography</Link></li>
                <li><Link href="/courses?category=Business">Finance</Link></li>
                <li><Link href="/courses">All Courses</Link></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>
                <Link href="/creators" style={{ color: "inherit" }}>
                  Become a Creator
                </Link>
              </h4>
              <ul>
                <li><Link href="/creators">PurePearl Studio</Link></li>
                <li><Link href="/creators">Affiliate Program</Link></li>
                <li><Link href="/register">Join Community</Link></li>
                <li><Link href="/" title="Help & Support - Return to Home">Help &amp; Support</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} ByteSpace. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/" title="Privacy Policy">Privacy Policy</Link>
            <Link href="/" title="Terms of Service">Terms of Service</Link>
            <Link href="/" title="Cookie Settings">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
