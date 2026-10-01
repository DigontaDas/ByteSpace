"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { getCourseById } from "@/data/courses";
import { getCreatorById } from "@/data/creators";
import { getLessonsByCourseId } from "@/data/lessons";
import { getReviewsByCourseId, getReviewSummaryByCourseId } from "@/data/reviews";
import styles from "./courseDetail.module.css";

type TabType = "about" | "lessons" | "reviews";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabType>("about");

  const course = getCourseById(courseId);
  const creator = course ? getCreatorById(course.authorId) : undefined;
  const lessonData = getLessonsByCourseId(courseId);
  const reviewsData = getReviewsByCourseId(courseId);
  const reviewSummary = getReviewSummaryByCourseId(courseId);

  if (!course) {
    return (
      <>
        <Navbar />
        <div className={styles.notFound}>
          <h1>Course not found</h1>
          <Link href="/courses">Back to Courses</Link>
        </div>
        <Footer />
      </>
    );
  }

  const stars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
  };

  return (
    <>
      <Navbar />

      {/* Blue Header */}
      <section className={styles.courseHeader}>
        <div className="container">
          <h1 className={styles.courseTitle}>{course.title}</h1>
          {course.subtitle && <p className={styles.courseSubtitle}>{course.subtitle}</p>}
          <p className={styles.courseAuthor}>
            by <Link href={`/creators/${course.authorId}`}>{course.author}</Link>
          </p>
          <div className={styles.badgeRow}>
            <span className={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              {course.level}
            </span>
            <span className={styles.badge}>
              <span className={styles.badgeStar}>★</span>
              {course.rating} ({course.reviewCount} reviews)
            </span>
            <span className={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {course.studentCount} Students
            </span>
          </div>
          <button className={styles.shareBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.mainContent}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {/* Course Video/Image */}
              <div className={styles.videoWrapper}>
                <img src={course.image} alt={course.title} className={styles.courseImage} />
                <div className={styles.playBtn}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>

              {/* Tabs */}
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === "about" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
                <button
                  className={`${styles.tab} ${activeTab === "lessons" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("lessons")}
                >
                  Lessons
                </button>
                <button
                  className={`${styles.tab} ${activeTab === "reviews" ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>

              {/* Tab Content */}
              <div className={styles.tabContent}>
                {activeTab === "about" && (
                  <div className={styles.aboutTab}>
                    <h3 className={styles.sectionHeading}>Description</h3>
                    {course.description.split("\n\n").map((para, i) => (
                      <p key={i} className={styles.descText}>{para}</p>
                    ))}

                    <h3 className={styles.sectionHeading}>Sneak Peek</h3>
                    <div className={styles.sneakPeekGrid}>
                      {course.sneakPeekImages.map((img, i) => (
                        <div key={i} className={styles.sneakPeekItem}>
                          <img src={img} alt={`Preview ${i + 1}`} />
                        </div>
                      ))}
                    </div>

                    <h3 className={styles.sectionHeading}>Key Points</h3>
                    <ul className={styles.keyPointsList}>
                      {course.keyPoints.map((point, i) => (
                        <li key={i} className={styles.keyPoint}>
                          <span className={styles.keyPointDot}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--yellow-accent)" strokeWidth="3">
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "lessons" && (
                  <div className={styles.lessonsTab}>
                    <h3 className={styles.sectionHeading}>Explore the Modules</h3>
                    <p className={styles.descText}>
                      Immerse yourself in the course content as we break down each topic into comprehensive lessons, providing you with insights and hands-on experiences.
                    </p>

                    <h4 className={styles.subHeading}>Lesson List</h4>
                    <div className={styles.lessonList}>
                      {(lessonData?.lessons || []).map((lesson) => (
                        <div key={lesson.moduleNumber} className={styles.lessonItem}>
                          <div className={styles.lessonIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--yellow-accent)">
                              <polygon points="5,3 19,12 5,21" />
                            </svg>
                          </div>
                          <div className={styles.lessonInfo}>
                            <h5 className={styles.lessonTitle}>
                              Module {lesson.moduleNumber}: {lesson.title}
                            </h5>
                            <p className={styles.lessonDesc}>{lesson.description}</p>
                          </div>
                          <span className={styles.lessonDuration}>{lesson.duration}</span>
                        </div>
                      ))}
                      {(!lessonData || lessonData.lessons.length === 0) && (
                        <p className={styles.descText}>Lesson details coming soon.</p>
                      )}
                    </div>

                    <h4 className={styles.subHeading}>Lesson Content</h4>
                    <p className={styles.descText}>
                      {lessonData?.lessonContent || "Engage with each lesson through captivating video content, detailed text explanations, and interactive exercises."}
                    </p>

                    <h4 className={styles.subHeading}>Lesson Progress Tracking</h4>
                    <p className={styles.descText}>
                      {lessonData?.progressTracking || "Track your progress as you complete each module."}
                    </p>
                    <div className={styles.progressCard}>
                      <span className={styles.progressLabel}>Learning Progress</span>
                      <span className={styles.progressPercent}>{lessonData?.currentProgress || 0}%</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${lessonData?.currentProgress || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className={styles.reviewsTab}>
                    <h3 className={styles.sectionHeading}>What Learners Are Saying</h3>
                    {reviewSummary && (
                      <p className={styles.descText}>{reviewSummary.summary}</p>
                    )}

                    {/* Overall Rating */}
                    <div className={styles.overallRating}>
                      <div className={styles.ratingBig}>
                        <span className={styles.ratingNumber}>{reviewSummary?.overallRating || course.rating}</span>
                        <div className={styles.ratingStars}>{stars(reviewSummary?.overallRating || course.rating)}</div>
                        <span className={styles.ratingTotal}>Course Rating</span>
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <h4 className={styles.subHeading}>Individual Reviews</h4>
                    <div className={styles.reviewList}>
                      {reviewsData.map((review) => (
                        <div key={review.id} className={styles.reviewCard}>
                          <div className={styles.reviewHeader}>
                            <div
                              className={styles.reviewAvatar}
                              style={{ background: review.avatarColor }}
                            >
                              {review.authorAvatar}
                            </div>
                            <div className={styles.reviewMeta}>
                              <span className={styles.reviewName}>{review.authorName}</span>
                              <div className={styles.reviewStars}>{stars(review.rating)}</div>
                            </div>
                            <span className={styles.reviewDate}>{review.date}</span>
                          </div>
                          <p className={styles.reviewText}>{review.text}</p>
                        </div>
                      ))}
                      {reviewsData.length === 0 && (
                        <p className={styles.descText}>No reviews yet. Be the first to review this course!</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                {/* Lesson Summary */}
                <div className={styles.lessonSummary}>
                  <h4 className={styles.lessonSummaryTitle}>
                    {course.lessonCount} Lessons ({course.totalHours} hours)
                  </h4>
                  <div className={styles.lessonPreviewList}>
                    {(lessonData?.lessons || []).slice(0, 3).map((l) => (
                      <div key={l.moduleNumber} className={styles.lessonPreviewItem}>
                        <span className={styles.lessonPreviewNum}>0{l.moduleNumber}</span>
                        <span className={styles.lessonPreviewTitle}>{l.title}</span>
                        <span className={styles.lessonPreviewDur}>{l.duration}</span>
                      </div>
                    ))}
                  </div>
                  <span className={styles.lessonViewAll}>99+ more videos</span>
                </div>

                {/* CTA */}
                <p className={styles.sidebarText}>
                  Ready to Dive In? Enroll Now and Start Building Your Digital Future!
                </p>
                <div className={styles.priceRow}>
                  <span className={styles.price}>${course.price}</span>
                  {course.originalPrice && (
                    <span className={styles.originalPrice}>${course.originalPrice}</span>
                  )}
                </div>
                <button className={styles.enrollBtn}>Enroll Now</button>

                {/* Includes */}
                <div className={styles.includesSection}>
                  <h5 className={styles.includesTitle}>This course includes</h5>
                  <ul className={styles.includesList}>
                    {course.includes.map((item, i) => (
                      <li key={i} className={styles.includesItem}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--blue-primary)" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Creator Info */}
                {creator && (
                  <div className={styles.creatorCard}>
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className={styles.creatorAvatar}
                    />
                    <div>
                      <span className={styles.creatorName}>{creator.name}</span>
                      <span className={styles.creatorRole}>{creator.role}</span>
                    </div>
                  </div>
                )}
                <p className={styles.sidebarText} style={{ marginTop: 8 }}>
                  Ready to Dive In? Enroll Now and Start Building Your Digital Future!
                </p>
                {creator && (
                  <Link href={`/creators/${creator.id}`} className={styles.profileLink}>
                    See Full Profile →
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
