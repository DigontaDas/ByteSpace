"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ShareModal from "@/components/ShareModal/ShareModal";
import { useAuth } from "@/context/AuthContext";
import { courses, Course } from "@/data/courses";
import styles from "./profile.module.css";

type TabType = "wishlist" | "enrolled" | "settings";

function ProfileContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabType) || "wishlist";

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const {
    user,
    enrolledCourseIds,
    wishlistCourseIds,
    removeFromWishlist,
    enrollCourse,
    updateProfile,
    signInWithDemo,
    signOut,
  } = useAuth();

  // Settings form state
  const [fullName, setFullName] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sharing state
  const [shareCourse, setShareCourse] = useState<Course | null>(null);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as TabType;
    if (tabParam && ["wishlist", "enrolled", "settings"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setFullName(user.user_metadata.full_name);
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Get course objects
  const wishlistCourses = courses.filter((c) =>
    wishlistCourseIds.includes(c.id)
  );
  const enrolledCourses = courses.filter((c) =>
    enrolledCourseIds.includes(c.id)
  );

  const handleEnrollFromWishlist = (courseId: string, courseTitle: string) => {
    enrollCourse(courseId);
    showToast(`Enrolled in "${courseTitle}"`);
  };

  const handleRemoveWishlist = (courseId: string, courseTitle: string) => {
    removeFromWishlist(courseId);
    showToast(`Removed "${courseTitle}" from wishlist.`);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    await updateProfile({ full_name: fullName.trim() });
    setSaveSuccess(true);
    showToast("Profile credentials updated successfully");
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const userInitial = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "U";

  const userName =
    user?.user_metadata?.full_name ||
    (user?.email ? user.email.split("@")[0] : "Learner");

  const handleShareProfile = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      showToast("Profile link copied to clipboard!");
    }
  };

  const isAlex = userName.toLowerCase().includes("alex") || userName.toLowerCase().includes("designer");

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Profile Hero Header - Solid Color, No Gradient */}
        <section className={styles.heroSection}>
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.bannerDecor} />
            <div className={styles.profileCard}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>
                  {isAlex ? (
                    <img
                      src="/assets/avatar_alex_circle.png"
                      alt={userName}
                      className={styles.avatarImg}
                    />
                  ) : (
                    userInitial
                  )}
                </div>
                <div className={styles.onlineBadge} title="Active Now" />
              </div>

              <div className={styles.profileInfo}>
                <div className={styles.nameRow}>
                  <h1 className={styles.profileName}>{userName}</h1>
                  <span className={styles.memberBadge}>ByteSpace Member</span>
                </div>
                <p className={styles.profileEmail}>
                  {user?.email || "designer@bytespace.io"}
                </p>

                <div className={styles.statsRow}>
                  <div
                    className={`${styles.statPill} ${activeTab === "wishlist" ? styles.statPillActive : ""}`}
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <span className={styles.statSvgIcon}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </span>
                    <span className={styles.statCount}>
                      {wishlistCourseIds.length}
                    </span>
                    <span className={styles.statLabel}>Wishlist</span>
                  </div>

                  <div
                    className={`${styles.statPill} ${activeTab === "enrolled" ? styles.statPillActive : ""}`}
                    onClick={() => setActiveTab("enrolled")}
                  >
                    <span className={styles.statSvgIcon}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </span>
                    <span className={styles.statCount}>
                      {enrolledCourseIds.length}
                    </span>
                    <span className={styles.statLabel}>Enrolled</span>
                  </div>

                  <div className={styles.statPill}>
                    <span className={styles.statSvgIcon}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <span className={styles.statCount}>
                      {enrolledCourses.reduce(
                        (acc, curr) => acc + curr.totalHours,
                        0
                      ) || 48}
                      h
                    </span>
                    <span className={styles.statLabel}>Learning</span>
                  </div>
                </div>
              </div>

              <div className={styles.headerActions}>
                <button
                  onClick={handleShareProfile}
                  className={styles.shareProfileBtn}
                  title="Share your learning profile"
                >
                  <svg
                    width="15"
                    height="15"
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
                  Share Profile
                </button>

                {user ? (
                  <button
                    onClick={() => signOut()}
                    className={styles.signOutBtn}
                    title="Sign out of account"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => signInWithDemo()}
                    className={styles.demoLoginBtn}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Switch to Demo Account
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

        {/* Tab Navigation */}
        <section className={styles.tabsSection}>
          <div className="container">
            <div className={styles.tabNav}>
              <button
                className={`${styles.tabBtn} ${activeTab === "wishlist" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("wishlist")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={activeTab === "wishlist" ? "#1400FF" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                My Wishlist
                <span className={styles.tabBadge}>
                  {wishlistCourses.length}
                </span>
              </button>

              <button
                className={`${styles.tabBtn} ${activeTab === "enrolled" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("enrolled")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Enrolled Courses
                <span className={styles.tabBadge}>
                  {enrolledCourses.length}
                </span>
              </button>

              <button
                className={`${styles.tabBtn} ${activeTab === "settings" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Account Settings
              </button>
            </div>
          </div>
        </section>

        {/* Tab Content Section */}
        <section className={styles.contentSection}>
          <div className="container">
            {/* 1. WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className={styles.tabPane}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle}>Saved Courses</h2>
                    <p className={styles.sectionSubtitle}>
                      Masterclasses you&apos;ve bookmarked to learn at your own pace
                    </p>
                  </div>
                  <Link href="/courses" className={styles.exploreMoreBtn}>
                    Explore More Courses →
                  </Link>
                </div>

                {wishlistCourses.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIconWrap}>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1400FF"
                        strokeWidth="1.5"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <h3 className={styles.emptyTitle}>Your Wishlist is Empty</h3>
                    <p className={styles.emptyText}>
                      Discover high-impact courses taught by top industry mentors
                      and save them here to start learning anytime.
                    </p>
                    <Link href="/courses" className={styles.primaryActionBtn}>
                      Browse All Courses
                    </Link>
                  </div>
                ) : (
                  <div className={styles.coursesGrid}>
                    {wishlistCourses.map((c) => {
                      const isEnrolled = enrolledCourseIds.includes(c.id);
                      return (
                        <div key={c.id} className={styles.wishlistCard}>
                          <div className={styles.cardThumbWrap}>
                            <img
                              src={c.image}
                              alt={c.title}
                              className={styles.cardThumb}
                            />
                            <span className={styles.categoryBadge}>
                              {c.category}
                            </span>
                            <button
                              onClick={() => handleRemoveWishlist(c.id, c.title)}
                              className={styles.removeWishlistBtn}
                              title="Remove from wishlist"
                              aria-label="Remove from wishlist"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>

                          <div className={styles.cardBody}>
                            <div className={styles.cardMetaRow}>
                              <span className={styles.levelTag}>{c.level}</span>
                              <span className={styles.ratingTag}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="1">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                {c.rating} ({c.reviewCount})
                              </span>
                            </div>

                            <Link
                              href={`/courses/${c.id}`}
                              className={styles.courseTitleLink}
                            >
                              <h3 className={styles.cardTitle}>{c.title}</h3>
                            </Link>

                            <p className={styles.cardInstructor}>by {c.author}</p>

                            <div className={styles.cardFooter}>
                              <div className={styles.priceWrap}>
                                <span className={styles.currentPrice}>
                                  ${c.price}
                                </span>
                                {c.originalPrice && (
                                  <span className={styles.origPrice}>
                                    ${c.originalPrice}
                                  </span>
                                )}
                              </div>

                              <div className={styles.cardBtnRow}>
                                <button
                                  onClick={() => setShareCourse(c)}
                                  className={styles.cardShareBtn}
                                  title="Share this course"
                                  aria-label="Share course"
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line
                                      x1="8.59"
                                      y1="13.51"
                                      x2="15.42"
                                      y2="17.49"
                                    />
                                    <line
                                      x1="15.41"
                                      y1="6.51"
                                      x2="8.59"
                                      y2="10.49"
                                    />
                                  </svg>
                                </button>

                                {isEnrolled ? (
                                  <Link
                                    href={`/courses/${c.id}?tab=lessons`}
                                    className={styles.continueBtn}
                                  >
                                    Continue
                                  </Link>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleEnrollFromWishlist(c.id, c.title)
                                    }
                                    className={styles.enrollBtn}
                                  >
                                    Enroll Now
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 2. ENROLLED COURSES TAB */}
            {activeTab === "enrolled" && (
              <div className={styles.tabPane}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle}>My Learning Space</h2>
                    <p className={styles.sectionSubtitle}>
                      Pick up right where you left off and finish your certificates
                    </p>
                  </div>
                  <Link href="/courses" className={styles.exploreMoreBtn}>
                    Browse New Skills →
                  </Link>
                </div>

                {enrolledCourses.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIconWrap}>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1400FF"
                        strokeWidth="1.5"
                      >
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <h3 className={styles.emptyTitle}>No Courses Enrolled Yet</h3>
                    <p className={styles.emptyText}>
                      Start your journey with hands-on projects, interactive
                      checkpoints, and lifetime access to verified creators.
                    </p>
                    <Link href="/courses" className={styles.primaryActionBtn}>
                      Explore Catalog
                    </Link>
                  </div>
                ) : (
                  <div className={styles.enrolledList}>
                    {enrolledCourses.map((c) => (
                      <div key={c.id} className={styles.enrolledCard}>
                        <img
                          src={c.image}
                          alt={c.title}
                          className={styles.enrolledThumb}
                        />

                        <div className={styles.enrolledDetails}>
                          <div className={styles.enrolledCategory}>
                            {c.category} • {c.level}
                          </div>
                          <Link
                            href={`/courses/${c.id}`}
                            className={styles.enrolledTitleLink}
                          >
                            <h3 className={styles.enrolledTitle}>{c.title}</h3>
                          </Link>
                          <p className={styles.enrolledAuthor}>
                            Instructor: {c.author}
                          </p>

                          <div className={styles.progressContainer}>
                            <div className={styles.progressLabels}>
                              <span>Course Progress</span>
                              <span className={styles.progressPercent}>
                                35% Completed
                              </span>
                            </div>
                            <div className={styles.progressBar}>
                              <div
                                className={styles.progressFill}
                                style={{ width: "35%" }}
                              />
                            </div>
                          </div>

                          <div className={styles.enrolledActions}>
                            <Link
                              href={`/courses/${c.id}?tab=lessons`}
                              className={styles.continueLearningBtn}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <polygon points="5,3 19,12 5,21" />
                              </svg>
                              Continue Lesson
                            </Link>

                            <button
                              onClick={() => setShareCourse(c)}
                              className={styles.enrolledShareBtn}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line
                                  x1="8.59"
                                  y1="13.51"
                                  x2="15.42"
                                  y2="17.49"
                                />
                                <line
                                  x1="15.41"
                                  y1="6.51"
                                  x2="8.59"
                                  y2="10.49"
                                />
                              </svg>
                              Share Progress
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className={styles.tabPane}>
                <div className={styles.settingsCard}>
                  <h2 className={styles.settingsTitle}>Account Information</h2>
                  <p className={styles.settingsSubtitle}>
                    Manage your personal details and learning credentials
                  </p>

                  <form onSubmit={handleSaveProfile} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="fullName">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className={styles.input}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="email">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={user?.email || "designer@bytespace.io"}
                        disabled
                        className={`${styles.input} ${styles.inputDisabled}`}
                      />
                      <span className={styles.inputHint}>
                        Account email is verified with ByteSpace Auth
                      </span>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Account Role</label>
                      <div className={styles.roleBox}>
                        <span className={styles.roleTitle}>ByteSpace Learner</span>
                        <span className={styles.roleBadge}>Active Access</span>
                      </div>
                    </div>

                    <div className={styles.formActions}>
                      <button type="submit" className={styles.saveBtn}>
                        {saveSuccess ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Changes Saved
                          </span>
                        ) : (
                          "Save Profile"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Share Modal */}
      {shareCourse && (
        <ShareModal
          isOpen={!!shareCourse}
          onClose={() => setShareCourse(null)}
          title={shareCourse.title}
          url={
            typeof window !== "undefined"
              ? `${window.location.origin}/courses/${shareCourse.id}`
              : undefined
          }
          description={`Check out "${shareCourse.title}" by ${shareCourse.author} on ByteSpace!`}
        />
      )}

      <Footer />
    </>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
          Loading profile...
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
