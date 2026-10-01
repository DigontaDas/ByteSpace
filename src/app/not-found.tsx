import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.code}>404</h1>
          <h2 className={styles.title}>
            The page you are looking
            <br />
            for doesn&apos;t exist
          </h2>
          <p className={styles.subtitle}>
            Try to use a correct url or go back to homepage to start again.
          </p>
          <Link href="/" className={styles.backBtn}>
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
