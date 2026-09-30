import styles from "./CourseCard.module.css";

export interface CourseCardProps {
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
  title,
  author,
  rating,
  price,
  originalPrice,
  image,
  level,
  badges,
}: CourseCardProps) {
  return (
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
  );
}
