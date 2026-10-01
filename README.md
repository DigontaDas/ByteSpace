# ByteSpace - Online Learning Platform

A modern, production-grade online course platform built with **Next.js 16 (App Router)**, **TypeScript**, **Three.js**, **Supabase**, and **Vanilla CSS Modules**.

![ByteSpace Landing Page](/figma%20design/home.png)

## 🚀 Live Demo & Links

- **GitHub Repository**: [https://github.com/DigontaDas/ByteSpace.git](https://github.com/DigontaDas/ByteSpace.git)
- **Branch**: `feature/landing-page-and-auth`
- **Pull Request**: [Open Pull Request on GitHub](https://github.com/DigontaDas/ByteSpace/compare/main...feature/landing-page-and-auth?expand=1)
- **Deployment**: [ByteSpace on Vercel](https://bytespace-learning.vercel.app)

---

## ✨ Features & Architecture

### 1. 🌟 Interactive Three.js 3D Experiences
- **Hero 3D Scene (`Hero3DScene.tsx`)**:
  - Interactive WebGL canvas seamlessly integrated into the Hero section matching ByteSpace branding (`#1400FF` blue, `#D4FF00` neon lime, `#00E676` green).
  - Floating 3D geometric torus with frosted transmission, metallic icosahedron, octahedron, and cyber dodecahedron.
  - Interactive constellation of floating "Bytes" connected by dynamic cyber-lines when near each other.
  - Smooth mouse parallax tilt tracking and touch responsiveness.
  - Production lifecycle safety: auto-pauses offscreen via `IntersectionObserver`, clamps pixel ratio (max 2), and disposes all geometries, materials, and WebGL contexts on unmount.
- **404 Cosmic Lost Byte Sphere (`NotFound3DScene.tsx`)**:
  - Interactive 3D wireframe planet with orbital rings and yellow/cyan orbiting particle stream that reacts dynamically to mouse coordinates.

### 2. 🔐 Authentication & Supabase Integration
- **Auth Context (`AuthContext.tsx`)**:
  - Global user session state powered by Supabase.
  - Real email/password authentication (`signIn`, `signUp`).
  - **⚡ Instant 1-Click Demo Sign-In**: Instant login mode for reviewers and evaluators without needing to confirm emails.
  - **Auth-Aware Navigation**: Navbar dynamically shows user avatar, name, and "Sign Out" button when logged in, or "Sign In / Join Us" when logged out.

### 3. 🔍 Course Search & Filter Page (`/courses`)
- Real-time search by title, topic, category, or creator name.
- Query parameter synchronization (`/courses?q=Figma` and `/courses?category=UI/UX+Design`).
- Dropdown filters for Level (**All**, **Beginner**, **Intermediate**, **Advanced**).
- Sorting options (**Most relevant**, **Highest Rated**, **Price: Low to High**, **Price: High to Low**).
- Reset filters button with clean empty states.

### 4. 📚 Dynamic Course Detail Page (`/courses/[id]`)
- **Tabs System**: Smooth switching between **About**, **Lessons**, and **Reviews**.
- **Interactive Lesson Progress Checklist**: Click any module to check it off; dynamically updates the progress percentage bar!
- **Interactive Review Submission**: Live 5-star rating picker and comment form that posts directly to the review list.
- **Enrollment System**: "Enroll Now" button saves enrollment state to AuthContext and localStorage, toggling to "✓ Enrolled in Course" and opening the classroom.
- **Wishlist & Share**: Toggle wishlist with heart badge indicator in Navbar, and 1-click clipboard URL sharing with toast alerts.

### 5. 🎨 Creator Profile Page (`/creators/[id]`)
- Dedicated creator profile matching the Figma design for PurePearl Studio.
- Interactive **Follow / Following ✓** button with live follower counter.
- Creator course catalog with direct links to course details.

### 6. 🛡️ Production Grade Architecture
- **Error Boundaries (`error.tsx`, `global-error.tsx`)** for graceful runtime error handling.
- **Loading Skeletons (`loading.tsx`)** for smooth transitions.
- **SEO & Social Sharing**: Complete OpenGraph, Twitter Cards, dynamic `sitemap.ts`, and `robots.ts`.
- **Zero build errors**: Fully typed in TypeScript 5 with Next.js 16.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | App Router framework, SSR & static generation |
| [React 19](https://react.dev) | UI library |
| [TypeScript 5](https://typescriptlang.org) | End-to-end type safety |
| [Three.js](https://threejs.org) | Interactive 3D WebGL scenes |
| [Supabase](https://supabase.com) | User authentication & backend data |
| CSS Modules | Scoped, zero-runtime overhead styling |
| [Vercel](https://vercel.com) | Edge deployment & hosting |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout with SEO metadata & viewport
│   ├── page.tsx                    # Landing page with Three.js hero & search
│   ├── page.module.css
│   ├── error.tsx                   # Production error boundary
│   ├── loading.tsx                 # Loading skeleton
│   ├── not-found.tsx               # 404 page with 3D cosmic lost byte sphere
│   ├── sitemap.ts                  # Dynamic SEO sitemap
│   ├── robots.ts                   # Search crawler directives
│   ├── courses/
│   │   ├── page.tsx                # Course catalog, search, filter, and sort
│   │   ├── courses.module.css
│   │   └── [id]/
│   │       ├── page.tsx            # Course detail with tabs, lessons & reviews
│   │       └── courseDetail.module.css
│   ├── creators/
│   │   └── [id]/
│   │       ├── page.tsx            # Creator profile with follow toggle
│   │       └── creator.module.css
│   ├── login/
│   │   ├── page.tsx                # Login page with demo sign-in & Supabase
│   │   └── login.module.css
│   └── register/
│       └── page.tsx                # Account creation with validation
├── components/
│   ├── CourseCard/                 # Course card with level, rating, badges
│   ├── Navbar/                     # Auth-aware navbar with wishlist counter
│   ├── Footer/                     # Newsletter subscription and links
│   ├── Providers.tsx               # Client context provider wrapper
│   └── ThreeScene/
│       ├── Hero3DScene.tsx         # Three.js 3D hero canvas
│       └── NotFound3DScene.tsx     # Three.js 3D 404 canvas
├── context/
│   └── AuthContext.tsx             # Supabase auth, demo user, wishlist & enrollment
├── data/
│   ├── courses.ts                  # Comprehensive course data & helper functions
│   ├── creators.ts                 # Creator profiles data
│   ├── lessons.ts                  # Course modules & duration data
│   └── reviews.ts                  # User reviews & rating breakdown data
└── lib/
    └── supabase.ts                 # Supabase client initialization
```

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DigontaDas/ByteSpace.git
   cd ByteSpace
   git checkout feature/landing-page-and-auth
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file (or copy from `.env.example`):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://qaibequvikysdxwgmyqw.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```
