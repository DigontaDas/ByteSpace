"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CourseCard from "@/components/CourseCard/CourseCard";
import { courses, categories } from "@/data/courses";
import styles from "./courses.module.css";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Featured");
  const [sortBy, setSortBy] = useState("Most relevant");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "Featured" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Duplicate courses to fill the grid like in the Figma design
  const displayCourses = [...filteredCourses, ...filteredCourses, ...filteredCourses];

  return (
    <>
      <Navbar />

      {/* Blue Hero Header */}
      <section className={styles.heroHeader}>
        <div className="container">
          <h1 className={styles.heroTitle}>Find Your Next Course</h1>
          <div className={styles.searchRow}>
            <div className={styles.searchBar}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button className={styles.coursesBtn}>
              Courses
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <div className={styles.filterLeft}>
              <button className={styles.filterBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                Filter
              </button>
              <button className={styles.filterBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
                Level
              </button>
              <button className={styles.filterBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Category
              </button>
            </div>
            <div className={styles.filterRight}>
              <button className={styles.sortBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M3 12h12M3 18h6" />
                </svg>
                {sortBy}
              </button>
            </div>
          </div>

          {/* Category Tags */}
          <div className={styles.categoryTags}>
            {categories.slice(0, 10).map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryTag} ${activeCategory === cat ? styles.categoryActive : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className={styles.courseSection}>
        <div className="container">
          <div className={styles.courseGrid}>
            {displayCourses.map((course, idx) => (
              <Link key={`${course.id}-${idx}`} href={`/courses/${course.id}`} className={styles.courseLink}>
                <CourseCard
                  title={course.title}
                  author={course.author}
                  image={course.image}
                  rating={course.rating}
                  price={course.price}
                  originalPrice={course.originalPrice}
                  level={course.level}
                  badges={course.badges}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
