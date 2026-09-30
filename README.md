# ByteSpace - Online Learning Platform

A modern, responsive online course platform built with **Next.js 16**, **TypeScript**, and **CSS Modules**.

![ByteSpace Landing Page](/figma%20design/home.png)

## 🚀 Live Demo

🔗 [View Live on Vercel](https://bytespace.vercel.app)

## ✨ Features

- **Landing Page** — Complete pixel-perfect implementation from Figma design
  - Hero section with animated floating cards
  - Course category filtering
  - Course cards grid with ratings and pricing
  - Learning paths showcase
  - Growth statistics section
  - Create & Manage courses section
  - CTA banner for creators
  - Testimonials from community members
  - Newsletter subscription footer
  
- **Login Page** — Split-layout authentication page
  - Decorative left panel with grid background and floating previews
  - Email/password form with validation
  - Social auth buttons (Facebook, Google)
  
- **Register Page** — Account creation page
  - Matching split-layout design
  - Full Name, Email, Password fields
  - Consistent design language

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [TypeScript](https://typescriptlang.org) | Type safety |
| CSS Modules | Scoped, maintainable styling |
| [Vercel](https://vercel.com) | Deployment & hosting |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page
│   ├── page.module.css     # Landing page styles
│   ├── globals.css         # Design system & reset
│   ├── login/
│   │   ├── page.tsx        # Login page
│   │   └── login.module.css
│   └── register/
│       └── page.tsx        # Register page (reuses login styles)
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx      # Responsive navigation
│   │   └── Navbar.module.css
│   ├── Footer/
│   │   ├── Footer.tsx      # Footer with newsletter
│   │   └── Footer.module.css
│   └── CourseCard/
│       ├── CourseCard.tsx   # Reusable course card
│       └── CourseCard.module.css
└── public/
    └── images/             # Course and hero images
```

## 🏃‍♂️ Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/bytespace.git

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📐 Design

The design was created in Figma and faithfully implemented:

- **Design file**: [ByteSpace Figma Design](https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website)
- **Color palette**: Blue primary (#1400FF), Yellow accent (#D4FF00)
- **Typography**: Outfit (headings), Inter (body)
- **Fully responsive**: Desktop, tablet, and mobile breakpoints

## 📄 License

This project is for demonstration purposes.
