export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  author: string;
  authorId: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  price: number;
  originalPrice?: number;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessonCount: number;
  totalHours: number;
  badges?: string[];
  category: string;
  keyPoints: string[];
  sneakPeekImages: string[];
  includes: string[];
}

export const courses: Course[] = [
  {
    id: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    subtitle: "Master the fundamentals of UI/UX design with Figma",
    description:
      "Embark on an enlightening exploration into the world of UI/UX design with our comprehensive course. This hands-on learning experience invites you to deep dive into the intricacies of crafting beautiful digital interfaces. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously crafted to empower you with the skills essential for navigating the dynamic landscape of modern design.\n\nIn the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of Figma mastery. Understanding the nuances of design systems and user-centered approaches will empower you to create interfaces that not only look stunning but function seamlessly.\n\nAs you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations.",
    author: "PurePearl Studio",
    authorId: "purepearl-studio",
    rating: 4.5,
    reviewCount: 172,
    studentCount: 199,
    price: 25,
    originalPrice: 50,
    image: "/images/course-figma.jpg",
    level: "Beginner",
    lessonCount: 10,
    totalHours: 24,
    badges: [],
    category: "UI/UX Design",
    keyPoints: [
      "Foundational Concepts",
      "Design Principles Mastery",
      "Advanced Techniques in Figma",
      "Project Showcase and Critique",
      "Optimizing for Various Platforms",
      "Digital Asset Management Best Practices",
      "Monetization Strategies",
      "Capstone Project: Building Your Portfolio",
    ],
    sneakPeekImages: [
      "/images/course-figma.jpg",
      "/images/course-digital-asset.jpg",
      "/images/course-productivity.jpg",
      "/images/course-money.jpg",
    ],
    includes: [
      "Lifetime Access",
      "Quality Lesson Videos",
      "Certificate of Completion",
      "Private Consultation",
    ],
  },
  {
    id: "build-digital-asset",
    title: "Build Digital Asset: A Comprehensive Guide",
    subtitle: "Unlock the Power of Digital Creation with Expert Guidance",
    description:
      "Embark on an enlightening exploration into the world of digital creation with our comprehensive course, 'Build Digital Asset: A Comprehensive Guide.' This masterclass learning experience invites you to deep dive into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously crafted to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.\n\nIn the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of a digital asset creator. Understanding the nuances of impactful visual content and gain proficiency in leveraging these elements to communicate effectively with your audience.\n\nAs you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Discover the secrets behind effective visual communication, where clarity meets creativity, and learn strategies that captivate your audience.",
    author: "PurePearl Studio",
    authorId: "purepearl-studio",
    rating: 4.0,
    reviewCount: 172,
    studentCount: 199,
    price: 25,
    originalPrice: 50,
    image: "/images/course-digital-asset.jpg",
    level: "Intermediate",
    lessonCount: 10,
    totalHours: 24,
    badges: ["15 Lessons", "8 Quizzes", "3 Downloads"],
    category: "Digital Illustration",
    keyPoints: [
      "Foundational Concepts",
      "Design Principles Mastery",
      "Advanced Techniques in Digital Creation",
      "Project Showcase and Critique",
      "Optimizing for Various Platforms",
      "Digital Asset Management Best Practices",
      "Monetization Strategies",
      "Capstone Project: Building Your Portfolio",
    ],
    sneakPeekImages: [
      "/images/course-digital-asset.jpg",
      "/images/course-figma.jpg",
      "/images/course-big-data.jpg",
      "/images/course-startup.jpg",
    ],
    includes: [
      "Lifetime Access",
      "Quality Lesson Videos",
      "Certificate of Completion",
      "Private Consultation",
    ],
  },
  {
    id: "power-of-big-data",
    title: "The Power of Big Data",
    subtitle: "Harness data analytics to drive business decisions",
    description:
      "Dive deep into the world of big data analytics and learn how to leverage massive datasets to uncover insights, drive decisions, and create value. This course covers everything from data collection and storage to advanced analytics and visualization techniques.\n\nYou'll explore real-world case studies from leading companies, learn to work with popular data tools and frameworks, and develop the skills needed to transform raw data into actionable intelligence.\n\nBy the end of this course, you'll be equipped to handle large-scale data projects and communicate data-driven insights effectively to stakeholders.",
    author: "LearnerFreaks",
    authorId: "learnerfreaks",
    rating: 4.5,
    reviewCount: 89,
    studentCount: 156,
    price: 25,
    originalPrice: 50,
    image: "/images/course-big-data.jpg",
    level: "Beginner",
    lessonCount: 8,
    totalHours: 18,
    badges: [],
    category: "Data Science",
    keyPoints: [
      "Data Collection Strategies",
      "Big Data Architecture",
      "Analytics and Visualization",
      "Machine Learning Basics",
      "Data-Driven Decision Making",
      "Real-World Case Studies",
    ],
    sneakPeekImages: [
      "/images/course-big-data.jpg",
      "/images/course-money.jpg",
      "/images/course-productivity.jpg",
    ],
    includes: [
      "Lifetime Access",
      "Quality Lesson Videos",
      "Certificate of Completion",
    ],
  },
  {
    id: "balancing-productivity",
    title: "Balancing Productivity and Wellness",
    subtitle: "Achieve more while maintaining work-life balance",
    description:
      "Learn the art of balancing high productivity with personal wellness. This course teaches proven techniques for time management, stress reduction, and maintaining peak performance without burnout.\n\nThrough practical exercises and real-world applications, you'll develop a personalized productivity system that works for your lifestyle and career goals.",
    author: "ProductiveMind",
    authorId: "productivemind",
    rating: 4.5,
    reviewCount: 64,
    studentCount: 120,
    price: 25,
    originalPrice: 50,
    image: "/images/course-productivity.jpg",
    level: "Beginner",
    lessonCount: 7,
    totalHours: 14,
    badges: [],
    category: "Productivity",
    keyPoints: [
      "Time Management Mastery",
      "Stress Reduction Techniques",
      "Peak Performance Habits",
      "Work-Life Balance Framework",
      "Mindfulness Practices",
    ],
    sneakPeekImages: ["/images/course-productivity.jpg", "/images/course-money.jpg"],
    includes: ["Lifetime Access", "Quality Lesson Videos", "Certificate of Completion"],
  },
  {
    id: "mastering-money-management",
    title: "Mastering Money Management",
    subtitle: "Financial literacy for personal and professional growth",
    description:
      "Take control of your financial future with this comprehensive money management course. Learn budgeting, investing, saving strategies, and financial planning from industry experts.\n\nWhether you're just starting your financial journey or looking to optimize your existing strategy, this course provides practical tools and frameworks for building lasting wealth.",
    author: "PurePearl Studio",
    authorId: "purepearl-studio",
    rating: 4.5,
    reviewCount: 95,
    studentCount: 178,
    price: 25,
    originalPrice: 50,
    image: "/images/course-money.jpg",
    level: "Beginner",
    lessonCount: 9,
    totalHours: 20,
    badges: [],
    category: "Business",
    keyPoints: [
      "Budgeting Fundamentals",
      "Investment Strategies",
      "Debt Management",
      "Retirement Planning",
      "Tax Optimization",
      "Building Multiple Income Streams",
    ],
    sneakPeekImages: ["/images/course-money.jpg", "/images/course-startup.jpg"],
    includes: ["Lifetime Access", "Quality Lesson Videos", "Certificate of Completion"],
  },
  {
    id: "from-idea-to-startup",
    title: "From Idea to Startup Success",
    subtitle: "Turn your business idea into a thriving startup",
    description:
      "Transform your entrepreneurial vision into reality. This course covers the entire startup journey from ideation and validation to fundraising and scaling.\n\nLearn from successful founders and industry experts who have built and scaled startups. Get practical frameworks for business model development, customer acquisition, and sustainable growth.",
    author: "PurePearl Studio",
    authorId: "purepearl-studio",
    rating: 4.5,
    reviewCount: 112,
    studentCount: 205,
    price: 25,
    originalPrice: 50,
    image: "/images/course-startup.jpg",
    level: "Beginner",
    lessonCount: 12,
    totalHours: 28,
    badges: [],
    category: "Freelance & Entrepreneurship",
    keyPoints: [
      "Idea Validation",
      "Business Model Canvas",
      "MVP Development",
      "Fundraising Strategies",
      "Customer Acquisition",
      "Scaling Your Business",
      "Building a Team",
    ],
    sneakPeekImages: ["/images/course-startup.jpg", "/images/course-big-data.jpg"],
    includes: ["Lifetime Access", "Quality Lesson Videos", "Certificate of Completion"],
  },
];

export const categories = [
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

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getCoursesByAuthorId(authorId: string): Course[] {
  return courses.filter((c) => c.authorId === authorId);
}

export function getCoursesByCategory(category: string): Course[] {
  if (category === "Featured") return courses;
  return courses.filter((c) => c.category === category);
}
