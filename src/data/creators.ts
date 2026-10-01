export interface Creator {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  productCount: number;
  followerCount: number;
}

export const creators: Creator[] = [
  {
    id: "purepearl-studio",
    name: "PurePearl Studio",
    avatar: "/images/creator-purepearl.jpg",
    role: "Passionate UI/UX, Web designer",
    bio: "Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!\n\nDive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
    productCount: 3,
    followerCount: 12,
  },
  {
    id: "learnerfreaks",
    name: "LearnerFreaks",
    avatar: "/images/hero-student.jpg",
    role: "Data Science Educator",
    bio: "Passionate about making complex data concepts accessible to everyone. We create engaging courses that transform beginners into confident data practitioners.",
    productCount: 3,
    followerCount: 8,
  },
  {
    id: "productivemind",
    name: "ProductiveMind",
    avatar: "/images/creator-purepearl.jpg",
    role: "Productivity Coach",
    bio: "Helping professionals achieve peak productivity while maintaining balance and wellness. Our courses combine scientific research with practical techniques.",
    productCount: 2,
    followerCount: 5,
  },
];

export function getCreatorById(id?: string): Creator {
  if (!id) return creators[0];
  const normalized = decodeURIComponent(id).toLowerCase().replace(/[^a-z0-9]/g, "");
  const found = creators.find(
    (c) =>
      c.id.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized ||
      c.name.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized
  );
  return found || creators[0];
}
