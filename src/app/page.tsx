"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CourseCard from "@/components/CourseCard/CourseCard";
import Hero3DScene from "@/components/ThreeScene/Hero3DScene";
import { courses as allCoursesData } from "@/data/courses";
import styles from "./page.module.css";

const categories = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
];

const courses = [
  {
    title: "Learn Figma from Basic",
    author: "purePearl studio",
    rating: 4.5,
    price: 25,
    originalPrice: 50,
    image: "/images/course-figma.jpg",
    level: "Beginner",
  },
  {
    title: "Build Digital Asset",
    author: "purePearl studio",
    rating: 4.5,
    price: 25,
    originalPrice: 50,
    image: "/images/course-digital-asset.jpg",
    level: "Beginner",
    badges: ["15 Lessons", "8 Quizzes", "3 Downloads"],
  },
  {
    title: "The Power of Big Data",
    author: "LearnerFreaks",
    rating: 4.5,
    price: 25,
    originalPrice: 50,
    image: "/images/course-big-data.jpg",
    level: "Beginner",
  },
  {
    title: "Balancing Productivity an...",
    author: "productiveMind",
    rating: 4.5,
    price: 25,
    originalPrice: 50,
    image: "/images/course-productivity.jpg",
    level: "Beginner",
  },
  {
    title: "Mastering Money Manage...",
    author: "purePearl studio",
    rating: 4.5,
    price: 25,
    originalPrice: 50,
    image: "/images/course-money.jpg",
    level: "Beginner",
  },
  {
    title: "From Idea to Startup Succ...",
    author: "purePearl studio",
    rating: 4.5,
    price: 25,
    originalPrice: 50,
    image: "/images/course-startup.jpg",
    level: "Beginner",
  },
];

const learningPaths = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
        <line x1="9.69" y1="8" x2="21.17" y2="8" />
        <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
        <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
        <line x1="14.31" y1="16" x2="2.83" y2="16" />
        <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
      </svg>
    ),
    title: "Design",
    color: "#FF4757",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Development",
    color: "#3742FA",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "IT & Software",
    color: "#2ED573",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: "Business",
    color: "#FFA502",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" />
      </svg>
    ),
    title: "Marketing",
    color: "#FF6B81",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    title: "Photography",
    color: "#7C4DFF",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    text: "\"ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.\"",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    text: "\"I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.\"",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    text: "\"As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a valuable impact on learners globally.\"",
  },
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Featured");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/courses");
    }
  };

  const displayedCourses =
    activeCategory === "Featured"
      ? allCoursesData
      : allCoursesData.filter(
          (c) =>
            c.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
            activeCategory.toLowerCase().includes(c.category.toLowerCase()) ||
            c.title.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <>
      <Navbar />

      <main>
        {/* ===== HERO SECTION ===== */}
        <section className={styles.hero}>
          <Hero3DScene />
          <div className={styles.heroDecorations}>
            <div className={styles.decoCircle1} />
            <div className={styles.decoCircle2} />
            <div className={styles.decoZigzag1}>〰️</div>
            <div className={styles.decoZigzag2}>✦</div>
            <div className={styles.decoArrow}>↗</div>
          </div>

          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Get Access to Hundreds Courses Available
              </h1>
              <p className={styles.heroSubtitle}>
                Unlock your creativity, gain valuable knowledge, and grow your
                business with our wide range of courses.
              </p>
              <form onSubmit={handleSearch} className={styles.searchBar}>
                <svg
                  className={styles.searchIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Course, topic, creator"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchBtn}>Search</button>
              </form>
            </div>

            <div className={styles.heroImageWrapper}>
              <div className={styles.heroImageBg} />
              <img
                src="/images/hero-student.jpg"
                alt="Student learning on ByteSpace"
                className={styles.heroImage}
              />

              {/* Floating Cards */}
              <div className={styles.floatingCard1}>
                <span className={styles.floatingLabel}>UI/UX Design</span>
                <span className={styles.floatingDetail}>
                  Advanced creative course
                </span>
              </div>

              <div className={styles.floatingCard2}>
                <span className={styles.floatingLabel}>Learning Progress</span>
                <span className={styles.floatingPercent}>55%</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "55%" }}
                  />
                </div>
              </div>

              <div className={styles.floatingCard3}>
                <span className={styles.floatingLabel}>Happy Students</span>
                <div className={styles.studentAvatars}>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={styles.studentAvatar}
                      style={{
                        background: `hsl(${i * 70 + 180}, 65%, 55%)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== LOGO MARQUEE ===== */}
        <section className={styles.logoStrip}>
          <div className={styles.logoMarquee}>
            {[...Array(10)].map((_, i) => (
              <div key={i} className={styles.logoItem}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <rect width="32" height="32" rx="6" fill="#E9ECEF" />
                  <circle cx="16" cy="16" r="8" fill="#DEE2E6" />
                </svg>
                <span>Logoipsum</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== DISCOVER SECTION ===== */}
        <section className={`section ${styles.discover}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Discover Your Passion,
                <br />
                Build Your Skills
              </h2>
              <p className={styles.sectionSubtitle}>
                At Bytespace Courses, we bring you closer to life-changing
                knowledge. Explore a variety of courses across different fields,
                from technology to the arts, and make a difference in your
                career and life.
              </p>
            </div>

            <div className={styles.categoryTags}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.categoryTag} ${activeCategory === cat ? styles.categoryActive : ""}`}
                >
                  {cat}
                </button>
              ))}
              <Link href="/courses" className={styles.categoryMore}>
                + More
              </Link>
            </div>

            <div className={styles.courseGrid}>
              {(displayedCourses.length > 0 ? displayedCourses : allCoursesData).map(
                (course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    author={course.author}
                    rating={course.rating}
                    price={course.price}
                    originalPrice={course.originalPrice}
                    image={course.image}
                    level={course.level}
                    badges={course.badges}
                  />
                )
              )}
            </div>
          </div>
        </section>

        {/* ===== LEARNING PATHS ===== */}
        <section className={`section ${styles.learningPaths}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Explore Diverse Learning Paths at Bytespace
              </h2>
              <p className={styles.sectionSubtitle}>
                At Bytespace, we believe in empowering individuals through
                knowledge. Our diverse range of courses spans various fields,
                ensuring there&apos;s something for everyone. Unleash your potential
                and explore our carefully curated categories.
              </p>
            </div>

            <div className={styles.pathsGrid}>
              {learningPaths.map((path, i) => (
                <div key={i} className={styles.pathCard}>
                  <div
                    className={styles.pathIcon}
                    style={{
                      background: `${path.color}15`,
                      color: path.color,
                    }}
                  >
                    {path.icon}
                  </div>
                  <span className={styles.pathTitle}>{path.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GROWTH SECTION ===== */}
        <section className={`section ${styles.growth}`}>
          <div className={`container ${styles.growthContainer}`}>
            <div className={styles.growthContent}>
              <div className={styles.growthLabel}>
                <div className={styles.greenDot} />
                Your Path to Professional Growth
              </div>
              <h2 className={styles.growthTitle}>
                Your Path to Professional Growth Starts Here!
              </h2>
              <p className={styles.growthText}>
                Explore our curated selection of courses tailored to enhance your
                capabilities and accelerate your career journey. Whether you are
                looking to sharpen specific skills, gain industry expertise, or
                embark on a new career path entirely, we have the resources you
                need.
              </p>

              <div className={styles.statsRow}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>12K</span>
                  <span className={styles.statLabel}>Students</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>70+</span>
                  <span className={styles.statLabel}>Courses</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>16</span>
                  <span className={styles.statLabel}>Creators</span>
                </div>
              </div>
            </div>

            <div className={styles.growthImageWrapper}>
              <img
                src="/images/course-figma.jpg"
                alt="Course preview"
                className={styles.growthImage}
              />
              <div className={styles.growthFloatingCard}>
                <span className={styles.growthCardLabel}>Learn Figma fr...</span>
                <div className={styles.growthProgressRow}>
                  <span>Learning Progress</span>
                  <span className={styles.growthPercent}>55%</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "55%" }}
                  />
                </div>
                <span className={styles.growthPrice}>$25 <s>$50</s></span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CREATE & MANAGE SECTION ===== */}
        <section className={`section ${styles.createManage}`}>
          <div className={`container ${styles.createManageContainer}`}>
            <div className={styles.createManageImage}>
              <img
                src="/images/creator-section.jpg"
                alt="Create and manage courses"
                className={styles.manageImg}
              />
              <div className={styles.revenueCard}>
                <div className={styles.revenueRow}>
                  <span className={styles.revenueLabel}>Total Revenue</span>
                  <span className={styles.revenueAmount}>$120.28</span>
                </div>
              </div>
              <div className={styles.yearlySalesCard}>
                <span className={styles.revenueLabel}>Year to Date</span>
                <span className={styles.revenueAmount}>$1,200.38</span>
              </div>
            </div>

            <div className={styles.createManageContent}>
              <h2 className={styles.sectionTitle}>
                Create & Manage Courses Easily.
              </h2>
              <p className={styles.sectionSubtitle}>
                <strong>ByteSpace</strong> supports individuals or entities in
                the creation, publication, and administration of educational
                courses.
              </p>
              <ul className={styles.featureList}>
                <li>
                  <span className={styles.checkIcon}>✓</span> Share Your
                  Expertise
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span> Monetize Your
                  Passion
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span> Flexibility and
                  Autonomy
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span> Build a Community
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===== CTA BANNER ===== */}
        <section className={styles.ctaBanner}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Unlock Your Potential as a Creator with ByteSpace
              </h2>
              <p className={styles.ctaText}>
                Experience the collaboration of numerous creators and an expanding
                selection of courses. Register now and become a part of a
                community comprising over 10,000 local and international
                creators.
              </p>
              <button className={styles.ctaBtn}>Join as Creator</button>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className={`section ${styles.testimonials}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className={styles.testimonialPretext}>
                At ByteSpace, our vibrant community of learners and creators is
                at the heart of what we do. Hear directly from those who have
                experienced the transformative journey of learning and creating
                on our platform.
              </p>
              <h2 className={styles.sectionTitle}>
                Discover What Our
                <br />
                Community Is Saying
              </h2>
            </div>

            <div className={styles.testimonialGrid}>
              {testimonials.map((t, i) => (
                <div key={i} className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <div
                      className={styles.testimonialAvatar}
                      style={{
                        background: `hsl(${i * 90 + 200}, 60%, 50%)`,
                      }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className={styles.testimonialName}>{t.name}</h4>
                      <span className={styles.testimonialRole}>{t.role}</span>
                    </div>
                  </div>
                  <p className={styles.testimonialText}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
