import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
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
            <p className={styles.brandDesc}>
              Stay up to date with our latest features and releases by joining
              our newsletter.
            </p>
            <div className={styles.newsletter}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
              />
              <button className={styles.subscribeBtn}>Search</button>
            </div>
            <p className={styles.privacyNote}>
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Featured Courses</h4>
              <ul>
                <li><Link href="#">Featured Categories</Link></li>
                <li><Link href="#">Business</Link></li>
                <li><Link href="#">IT</Link></li>
                <li><Link href="#">Design</Link></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Development</h4>
              <ul>
                <li><Link href="#">Marketing</Link></li>
                <li><Link href="#">Photography</Link></li>
                <li><Link href="#">Finance</Link></li>
                <li><Link href="#">Sport</Link></li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Become a Creator</h4>
              <ul>
                <li><Link href="#">Affiliate Program</Link></li>
                <li><Link href="#">Contact</Link></li>
                <li><Link href="#">Help</Link></li>
                <li><Link href="#">About</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; 2025 ByteSpace. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
