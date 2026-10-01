import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinnerRing} />
        <div className={styles.spinnerCore} />
      </div>
      <p className={styles.loadingText}>Loading ByteSpace...</p>
    </div>
  );
}
