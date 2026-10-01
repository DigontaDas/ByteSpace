"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CourseCard from "@/components/CourseCard/CourseCard";
import { courses as allCourses, categories } from "@/data/courses";
import styles from "./courses.module.css";

function CoursesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "Featured";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [levelFilter, setLevelFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Most relevant");

  useEffect(() => {
    if (searchParams.get("q")) {
      setSearchQuery(searchParams.get("q") || "");
    }
    if (searchParams.get("category")) {
      setActiveCategory(searchParams.get("category") || "Featured");
    }
  }, [searchParams]);

  // Filter courses
  let filtered = allCourses.filter((course) => {
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "Featured" ||
      course.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesLevel =
      levelFilter === "All" || course.level === levelFilter;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Sort courses
  if (sortBy === "Price: Low to High") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === "Highest Rated") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  // Multiply grid for visual completeness if not searching
  const displayCourses =
    searchQuery || activeCategory !== "Featured" || levelFilter !== "All"
      ? filtered
      : [...filtered, ...filtered, ...filtered];

  return (
    <>
      {/* Textured Blue Hero Header */}
      <section className={styles.heroHeader}>
        <div className={styles.heroGridBackground} aria-hidden="true" />
        <div className={styles.heroNoiseTexture} aria-hidden="true" />

        {/* Decorative 3D Clay Shapes */}
        <div className={styles.headerDecorLeft} aria-hidden="true">
          <img
            src="/assets/hero_shape_lime_squiggle.png"
            alt=""
            className={`${styles.decorShape} ${styles.decorShape1}`}
          />
          <img
            src="/assets/auth_shape_white_zigzag_clean.png"
            alt=""
            className={`${styles.decorShape} ${styles.decorShape2}`}
          />
        </div>

        <div className={styles.headerDecorRight} aria-hidden="true">
          <img
            src="/assets/auth_shape_lime_torus_angled.png"
            alt=""
            className={`${styles.decorShape} ${styles.decorShape3}`}
          />
          <img
            src="/assets/hero_shape_white_triangle.png"
            alt=""
            className={`${styles.decorShape} ${styles.decorShape4}`}
          />
        </div>

        <div className={`container ${styles.headerContainer}`}>
          <h1 className={styles.heroTitle}>Find Your Next Course</h1>
          <div className={styles.searchRow}>
            <div className={styles.searchBar}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by topic, skill, creator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 8px",
                    color: "#888",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label="Clear search query"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <button className={styles.coursesBtn}>
              {displayCourses.length} Courses
            </button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterBar}>
            <div className={styles.filterLeft}>
              {/* Level Dropdown */}
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className={styles.filterBtn}
                style={{ cursor: "pointer", appearance: "auto" }}
              >
                <option value="All">Level: All</option>
                <option value="Beginner">Level: Beginner</option>
                <option value="Intermediate">Level: Intermediate</option>
                <option value="Advanced">Level: Advanced</option>
              </select>

              {/* Reset filter button if active */}
              {(searchQuery || activeCategory !== "Featured" || levelFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Featured");
                    setLevelFilter("All");
                    setSortBy("Most relevant");
                  }}
                  className={styles.filterBtn}
                  style={{ color: "#ff4757", borderColor: "#ff4757" }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Clear Filters
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                </button>
              )}
            </div>

            <div className={styles.filterRight}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortBtn}
                style={{ cursor: "pointer", appearance: "auto" }}
              >
                <option value="Most relevant">Sort: Most relevant</option>
                <option value="Highest Rated">Sort: Highest Rated</option>
                <option value="Price: Low to High">Sort: Price Low to High</option>
                <option value="Price: High to Low">Sort: Price High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tags */}
          <div className={styles.categoryTags}>
            {categories.slice(0, 10).map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryTag} ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? styles.categoryActive
                    : ""
                }`}
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
          {displayCourses.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "var(--gray-600)",
              }}
            >
              <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>
                No courses found
              </h3>
              <p style={{ marginBottom: "16px" }}>
                Try adjusting your search query or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Featured");
                  setLevelFilter("All");
                }}
                style={{
                  background: "var(--blue-primary)",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={styles.courseGrid}>
              {displayCourses.map((course, idx) => (
                <CourseCard
                  key={`${course.id}-${idx}`}
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
          )}
        </div>
      </section>
    </>
  );
}

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading Courses...
          </div>
        }
      >
        <CoursesContent />
      </Suspense>
      <Footer />
    </>
  );
}
