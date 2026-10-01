export interface Review {
  id: string;
  courseId: string;
  authorName: string;
  authorAvatar: string;
  avatarColor: string;
  rating: number;
  text: string;
  date: string;
}

export interface CourseReviewSummary {
  courseId: string;
  overallRating: number;
  totalReviews: number;
  summary: string;
}

export const reviewSummaries: CourseReviewSummary[] = [
  {
    courseId: "build-digital-asset",
    overallRating: 4.7,
    totalReviews: 172,
    summary:
      "Our last live course has a very exciting feedback from the course taker. With a remarkable average rating of 4.7 out of 5 stars, our course has received overwhelmingly positive feedback from a diverse and engaged community of learners.",
  },
  {
    courseId: "learn-figma-from-basic",
    overallRating: 4.5,
    totalReviews: 172,
    summary:
      "Students love the practical approach and hands-on exercises in this Figma course, consistently rating it highly for its clear instruction and comprehensive coverage.",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    courseId: "build-digital-asset",
    authorName: "PurePearl Studio",
    authorAvatar: "P",
    avatarColor: "#FFB800",
    rating: 5,
    text: "This course is a hidden gem for anyone interested in digital asset creation. The content is comprehensive and teaches applicable skills. I highly recommend it for both beginners and intermediates.",
    date: "1 year ago",
  },
  {
    id: "r2",
    courseId: "build-digital-asset",
    authorName: "Alexis Oliver",
    authorAvatar: "A",
    avatarColor: "#1400FF",
    rating: 5,
    text: "I was very impressed with this e-commerce course. The product section is well-organized and covers a wide range of topics. The course creator has a great understanding of the industry and presents concepts in an engaging way.",
    date: "1 year ago",
  },
  {
    id: "r3",
    courseId: "build-digital-asset",
    authorName: "Cyris Millan",
    authorAvatar: "C",
    avatarColor: "#00C48C",
    rating: 3,
    text: "This course offers a comprehensive crash on digital asset creation methodologies. While some areas could use more depth, the overall content provides a solid introduction and offers valuable insights into the field.",
    date: "1 year ago",
  },
  {
    id: "r4",
    courseId: "build-digital-asset",
    authorName: "Blesslyn Sunshine",
    authorAvatar: "B",
    avatarColor: "#FF6B6B",
    rating: 5,
    text: "An excellent course that covers all the essentials of digital asset creation and beyond. A great resource for anyone looking to upskill in the fast-evolving digital landscape, with real-world examples and hands-on exercises that really helped reinforce the concepts.",
    date: "1 year ago",
  },
  {
    id: "r5",
    courseId: "learn-figma-from-basic",
    authorName: "Sarah Mitchell",
    authorAvatar: "S",
    avatarColor: "#9B59B6",
    rating: 5,
    text: "Fantastic Figma course! The lessons are well-structured and the hands-on exercises really helped solidify my understanding. Highly recommended for anyone starting out in UI/UX design.",
    date: "6 months ago",
  },
  {
    id: "r6",
    courseId: "learn-figma-from-basic",
    authorName: "James Lee",
    authorAvatar: "J",
    avatarColor: "#3498DB",
    rating: 4,
    text: "Great course for beginners. The instructor explains concepts clearly and the pace is perfect. Would love to see more advanced topics covered in a follow-up course.",
    date: "8 months ago",
  },
];

export function getReviewsByCourseId(courseId: string): Review[] {
  return reviews.filter((r) => r.courseId === courseId);
}

export function getReviewSummaryByCourseId(courseId: string): CourseReviewSummary | undefined {
  return reviewSummaries.find((rs) => rs.courseId === courseId);
}
