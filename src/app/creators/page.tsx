"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CourseCard from "@/components/CourseCard/CourseCard";
import { getCreatorById } from "@/data/creators";
import { courses as allCourses } from "@/data/courses";
import styles from "./[id]/creator.module.css";

export default function CreatorsPage() {
  const creator = getCreatorById("purepearl-studio");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(creator.followerCount);
  const [sortBy, setSortBy] = useState("Most relevant");
  const [activeLevel, setActiveLevel] = useState("All");

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }
  };

  // The 6 courses displayed on PurePearl Studio creator profile per Figma design
  const creatorCourses = allCourses.slice(0, 6);

  return (
    <>
      <Navbar />

      {/* Blue Header */}
      <section className={styles.creatorHeader}>
        <div className={styles.gridBg} />
        <div className="container">
          <div className={styles.headerContent}>
            <img
              src={creator.avatar}
              alt={creator.name}
              className={styles.avatar}
            />
            <div className={styles.headerInfo}>
              <div className={styles.nameRow}>
                <h1 className={styles.creatorName}>{creator.name}</h1>
                <span className={styles.creatorBadge}>Creator</span>
              </div>
              <p className={styles.creatorRole}>{creator.role}</p>
            </div>
          </div>

          <div className={styles.headerBio}>
            {creator.bio.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className={styles.headerActions}>
            <div className={styles.statBadges}>
              <span className={styles.statBadge}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                {creator.productCount} Products
              </span>
              <span className={styles.statBadge}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                {followersCount} Followers
              </span>
            </div>
            <button
              onClick={handleFollowToggle}
              className={styles.followBtn}
              style={{
                background: isFollowing
                  ? "var(--green-accent)"
                  : "var(--yellow-accent)",
                color: "var(--blue-primary)",
              }}
            >
              {isFollowing ? "Following ✓" : "Follow"}
            </button>
          </div>
        </div>
      </section>

      {/* Filter Bar matching Figma Design */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <div className={styles.filterLeft}>
              <button
                className={styles.filterBtn}
                onClick={() => setActiveLevel("All")}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                Filter
              </button>
              <button
                className={styles.filterBtn}
                onClick={() =>
                  setActiveLevel((prev) =>
                    prev === "All" ? "Beginner" : prev === "Beginner" ? "Intermediate" : "All"
                  )
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
                Level: {activeLevel}
              </button>
              <button className={styles.filterBtn}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Category
              </button>
            </div>
            <div className={styles.filterRight}>
              <button
                className={styles.sortBtn}
                onClick={() =>
                  setSortBy((prev) =>
                    prev === "Most relevant" ? "Highest rated" : "Most relevant"
                  )
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M3 12h12M3 18h6" />
                </svg>
                {sortBy}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className={styles.courseSection}>
        <div className="container">
          <div className={styles.courseGrid}>
            {creatorCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                author={course.author}
                image={course.image}
                rating={course.rating}
                price={course.price}
                originalPrice={course.originalPrice}
                level={course.level}
                badges={course.badges}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
