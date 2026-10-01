"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ShareModal from "@/components/ShareModal/ShareModal";
import styles from "./CourseCard.module.css";

export interface CourseCardProps {
  id?: string;
  title: string;
  author: string;
  rating: number;
  reviewCount?: number;
  price: number;
  originalPrice?: number;
  image: string;
  level: string;
  lessonCount?: number;
  studentCount?: number;
  badges?: string[];
}

export default function CourseCard({
  id,
  title,
  author,
  rating,
  price,
  originalPrice,
  image,
  level,
  badges,
}: CourseCardProps) {
  const { wishlistCourseIds, toggleWishlist } = useAuth();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const courseSlug =
    id ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const isWishlisted = wishlistCourseIds.includes(courseSlug);

  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      try {
        await navigator.share({
          title: `${title} | ByteSpace`,
          text: `Check out "${title}" by ${author} on ByteSpace!`,
          url: `${window.location.origin}/courses/${courseSlug}`,
        });
        return;
      } catch {
        // user cancelled or failed, fallback to modal
      }
    }
    setIsShareOpen(true);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(courseSlug);
  };

  return (
    <>
      <Link href={`/courses/${courseSlug}`} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={image} alt={title} className={styles.image} />
            {badges && badges.length > 0 && (
              <div className={styles.badges}>
                {badges.map((badge, i) => (
                  <span key={i} className={styles.badge}>
                    {badge}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.cardActions}>
              <button
                type="button"
                onClick={handleWishlistClick}
                className={`${styles.actionBtn} ${isWishlisted ? styles.actionBtnActive : ""}`}
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill={isWishlisted ? "#ff3366" : "none"}
                  stroke={isWishlisted ? "#ff3366" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleShareClick}
                className={styles.actionBtn}
                title="Share this course"
                aria-label="Share this course"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>

            <p className={styles.author}>by {author}</p>

            <div className={styles.meta}>
              <span className={styles.level}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 20h4V10H2zM9 20h4V4H9zM16 20h4v-8h-4z" />
                </svg>
                {level}
              </span>
              <div className={styles.avatars}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={styles.avatar}>
                    <div
                      className={styles.avatarPlaceholder}
                      style={{
                        background: `hsl(${i * 90 + 180}, 70%, 60%)`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.ratingRow}>
              <span className={styles.ratingScore}>{rating}</span>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`${styles.star} ${star <= Math.round(rating) ? styles.filled : ""}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill={star <= Math.round(rating) ? "#FFB800" : "none"}
                    stroke="#FFB800"
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>${price}</span>
              {originalPrice && (
                <span className={styles.originalPrice}>${originalPrice}</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={title}
        url={
          typeof window !== "undefined"
            ? `${window.location.origin}/courses/${courseSlug}`
            : undefined
        }
        description={`Check out "${title}" by ${author} on ByteSpace!`}
      />
    </>
  );
}
