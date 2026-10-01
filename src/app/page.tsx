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

const SPONSORS = [
  {
    name: "Google Cloud",
    tier: "Global Cloud Partner",
    color: "#4285F4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
          fill="#4285F4"
        />
      </svg>
    ),
  },
  {
    name: "Figma",
    tier: "Design Systems Partner",
    color: "#A259FF",
    icon: (
      <svg width="18" height="22" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: "Stripe",
    tier: "Payment Infrastructure",
    color: "#635BFF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.058 1.658l.89-5.494C17.653.904 15.39.4 12.378.4 6.84.4 3.016 3.284 3.016 7.697c0 4.887 4.417 6.082 8.784 7.472 2.735.882 3.69 1.637 3.69 2.716 0 1.055-.913 1.609-2.38 1.609-2.613 0-5.385-1.164-7.243-2.22l-.936 5.568c2.09.96 4.82 1.558 7.848 1.558 6.002 0 10.024-2.83 10.024-7.447 0-4.99-4.398-6.149-8.827-7.253z"
          fill="#635BFF"
        />
      </svg>
    ),
  },
  {
    name: "Supabase",
    tier: "Backend & Database",
    color: "#3ECF8E",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13.447 23.864c-.792.832-2.186.299-2.23-1.077l-.462-11.85h9.324c1.134 0 1.765 1.328 1.042 2.222L13.447 23.864z" fill="#3ECF8E"/>
        <path d="M10.553.136c.792-.832 2.186-.299 2.23 1.077l.462 11.85H3.921c-1.134 0-1.765-1.328-1.042-2.222L10.553.136z" fill="#249361"/>
      </svg>
    ),
  },
  {
    name: "Vercel",
    tier: "Edge Cloud Platform",
    color: "#111827",
    icon: (
      <svg width="20" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L24 22H0L12 1Z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    tier: "AI Intelligence Partner",
    color: "#10A37F",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.653a4.48 4.48 0 0 1 2.366-2.003V12.1a.765.765 0 0 0 .388.672l5.844 3.37-2.02 1.168a.078.078 0 0 1-.071 0L4.007 14.53A4.504 4.504 0 0 1 2.34 8.653zm16.586 3.42-5.843-3.37 2.02-1.164a.08.08 0 0 1 .071 0l4.84 2.791a4.494 4.494 0 0 1-.676 8.105V12.745a.79.79 0 0 0-.412-.672zm2.01-4.323l-.142-.085-4.779-2.759a.776.776 0 0 0-.785 0L9.409 8.275V5.943a.08.08 0 0 1 .033-.062l4.84-2.791a4.5 4.5 0 0 1 6.654 4.485v.003zM8.708 13.5l-2.02-1.168a.07.07 0 0 1-.038-.052V6.697a4.504 4.504 0 0 1 7.37-3.453l-.14.08-4.78 2.759a.794.794 0 0 0-.392.681v6.736zm1.096-2.365l2.602-1.5 2.607 1.5v2.999l-2.607 1.506-2.602-1.506v-2.999z" fill="#10A37F"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    tier: "Developer Ecosystem",
    color: "#24292F",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    name: "Linear",
    tier: "Workflow & Planning",
    color: "#5E6AD2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3.24 3.24a12.44 12.44 0 0 0 0 17.52L14.76 9.24a5.94 5.94 0 0 0-8.4-8.4L3.24 3.24Z" fill="#5E6AD2"/>
        <path d="M9.24 14.76 20.76 3.24a12.44 12.44 0 0 1 0 17.52l-3.12-3.12a5.94 5.94 0 0 0-8.4-8.4Z" fill="#5E6AD2"/>
      </svg>
    ),
  },
  {
    name: "Webflow",
    tier: "Visual Experience",
    color: "#146EF5",
    icon: (
      <svg width="22" height="15" viewBox="0 0 32 20" fill="none">
        <path d="M32 0.3L20.8 19.7H13.6L17.2 13.5H17C14.7 17.1 11.5 19.7 6.4 19.7C1.4 19.7 0 16.5 0 13.1C0 8.7 3.5 4.8 8.8 4.8C12.1 4.8 14.1 6.5 15.3 8.3L15.4 8.3L17.9 0.3H23.5L20.4 11.2H20.6L26.4 0.3H32ZM8.8 14.2C10.9 14.2 12.7 12.5 13.6 10C13 8.6 11.8 7.8 10 7.8C7.5 7.8 5.7 9.8 5.7 12.2C5.7 13.5 6.7 14.2 8.8 14.2Z" fill="#146EF5"/>
      </svg>
    ),
  },
  {
    name: "Adobe",
    tier: "Creative Studio",
    color: "#FA0F00",
    icon: (
      <svg width="22" height="18" viewBox="0 0 24 20" fill="none">
        <path d="M14.64 0H24V20L14.64 0ZM9.36 0H0V20L9.36 0ZM12 8.42L16.29 18.23H13.06L11.75 14.98H9.36L12 8.42Z" fill="#FA0F00"/>
      </svg>
    ),
  },
  {
    name: "Framer",
    tier: "Interactive Prototyping",
    color: "#0055FF",
    icon: (
      <svg width="18" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF"/>
      </svg>
    ),
  },
  {
    name: "Notion",
    tier: "Knowledge Platform",
    color: "#111827",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.374L18.3 2.25c-.466-.373-1.12-.746-2.24-.653L3.899 2.574c-.653.047-.793.42-.466.746l1.026.888zm.84 3.733v12.41c0 .84.42 1.12 1.307 1.026l14.288-.84c.887-.046 1.027-.56 1.027-1.26V6.962c0-.7-.374-1.026-1.12-.98l-14.475.84c-.747.047-1.027.42-1.027 1.12zm13.728 1.167c.093.42 0 .84-.42.887l-.7.093v9.052c-.513.28-1.026.42-1.493.42-.746 0-1.026-.233-1.633-.98l-5.18-8.12v7.794l1.493.326c.093.047.093.374 0 .42l-3.92.233c-.093 0-.14-.233 0-.327l1.167-.326V9.761l-1.353-.14c-.094-.047-.047-.374.093-.42l3.874-.234 5.366 8.167V9.668l-1.26-.14c-.093-.047-.046-.374.093-.42l3.873-.234z"/>
      </svg>
    ),
  },
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
            <div className={styles.decoZigzag1}>
              <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
                <path d="M2 7C6 2 10 12 14 7C18 2 22 12 26 7C30 2 34 12 34 7" stroke="#D4FF00" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.decoZigzag2}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4FF00">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
            <div className={styles.decoArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4FF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
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

        {/* ===== WATER FLOATING SPONSOR SLIDER ===== */}
        <section
          className={styles.waterSponsorSection}
          aria-label="Official Sponsors and Global Learning Partners"
        >
          {/* Animated aquatic surface reflection and wave */}
          <div className={styles.waterBackdrop} aria-hidden="true">
            <div className={styles.waterWaveSvg}>
              <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none">
                <path
                  d="M0,35 C320,65 480,5 720,35 C960,65 1120,5 1440,35 L1440,70 L0,70 Z"
                  fill="rgba(20, 0, 255, 0.035)"
                />
                <path
                  d="M0,45 C240,15 500,60 760,40 C1020,20 1260,55 1440,45 L1440,70 L0,70 Z"
                  fill="rgba(0, 160, 255, 0.04)"
                />
              </svg>
            </div>
            <div className={styles.waterLightShimmer} />
          </div>

          <div className={styles.waterHeader}>
            <div className={styles.waterSubBadge}>
              <span className={styles.waterRippleDot}>
                <span className={styles.ripplePing} />
              </span>
              <span className={styles.waterBadgeText}>
                Trusted By 500+ Top Industry Innovators &amp; Global Studios
              </span>
            </div>
          </div>

          <div className={styles.waterMarqueeContainer}>
            <div className={styles.waterTrack}>
              {[...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
                <div
                  key={`${sponsor.name}-${idx}`}
                  className={styles.waterFloatingCard}
                  style={
                    {
                      "--float-delay": `${(idx % 8) * -0.62}s`,
                      "--float-dur": `${3.8 + (idx % 5) * 0.4}s`,
                      "--sponsor-accent": sponsor.color,
                    } as React.CSSProperties
                  }
                >
                  <div className={styles.waterGlassHighlight} />
                  <div className={styles.sponsorIconWrap}>{sponsor.icon}</div>
                  <div className={styles.sponsorInfo}>
                    <div className={styles.sponsorNameRow}>
                      <span className={styles.sponsorName}>{sponsor.name}</span>
                      <span
                        className={styles.sponsorVerifiedMark}
                        title="Official Sponsor"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </span>
                    </div>
                    <span className={styles.sponsorTier}>{sponsor.tier}</span>
                  </div>
                  <div className={styles.waterBuoyantShadow} />
                </div>
              ))}
            </div>
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
                  <span className={styles.checkIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Share Your Expertise
                </li>
                <li>
                  <span className={styles.checkIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Monetize Your Passion
                </li>
                <li>
                  <span className={styles.checkIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Flexibility and Autonomy
                </li>
                <li>
                  <span className={styles.checkIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Build a Community
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
              <Link href="/creators" className={styles.ctaBtn}>
                Join as Creator
              </Link>
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
