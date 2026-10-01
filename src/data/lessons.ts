export interface Lesson {
  moduleNumber: number;
  title: string;
  description: string;
  duration: string;
}

export interface CourseLessons {
  courseId: string;
  lessons: Lesson[];
  lessonContent: string;
  progressTracking: string;
  currentProgress: number;
}

export const courseLessonsData: CourseLessons[] = [
  {
    courseId: "build-digital-asset",
    lessons: [
      {
        moduleNumber: 1,
        title: "Introduction to Digital Assets",
        description:
          "Lay the groundwork with lessons for Understanding Digital Elements and Navigating Design Software Tools. Dive into the essentials of digital asset creation.",
        duration: "12 mins",
      },
      {
        moduleNumber: 2,
        title: "Design Principles for Impact",
        description:
          "Master the art behind vivid, impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
        duration: "21 mins",
      },
      {
        moduleNumber: 3,
        title: "Advanced Techniques in Digital Creation",
        description:
          "Explore cutting-edge techniques for creating digital assets that stand out and captivate audiences.",
        duration: "18 mins",
      },
      {
        moduleNumber: 4,
        title: "User-Centric Design Strategies",
        description:
          "Understand Design Thinking in Digital Creation and learn how User Experience (UX) Essentials. Craft digital assets with a focus on user-centric design.",
        duration: "15 mins",
      },
      {
        moduleNumber: 5,
        title: "Interactive Media and Engagement",
        description:
          "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
        duration: "25 mins",
      },
      {
        moduleNumber: 6,
        title: "Project Showcase and Critique",
        description:
          "Refine your presentation skills with 'Effective Presentation Techniques' and enhance collaboration with 'Peer Critiques and Collaboration'. Showcase your work with confidence.",
        duration: "20 mins",
      },
      {
        moduleNumber: 7,
        title: "Optimizing Digital Assets for Various Platforms",
        description:
          "Adapt your digital content for Mobile Platforms and optimize for Social Media. Ensure widespread accessibility and engagement across diverse digital landscapes.",
        duration: "18 mins",
      },
    ],
    lessonContent:
      "Engage with each lesson through captivating video content, detailed text explanations, and interactive exercises. Download resources, complete assignments, and test your understanding with quizzes.",
    progressTracking:
      "Witness your growth as you complete lessons, with an intuitive progress tracking feature to guide you through your learning journey.",
    currentProgress: 55,
  },
  {
    courseId: "learn-figma-from-basic",
    lessons: [
      {
        moduleNumber: 1,
        title: "Getting Started with Figma",
        description: "Introduction to the Figma interface, tools, and workspace setup.",
        duration: "15 mins",
      },
      {
        moduleNumber: 2,
        title: "Design Fundamentals",
        description: "Learn about shapes, colors, typography, and basic design principles.",
        duration: "22 mins",
      },
      {
        moduleNumber: 3,
        title: "Components and Variants",
        description: "Master reusable components, variants, and design systems in Figma.",
        duration: "25 mins",
      },
      {
        moduleNumber: 4,
        title: "Prototyping and Interactions",
        description: "Create interactive prototypes with transitions and animations.",
        duration: "20 mins",
      },
      {
        moduleNumber: 5,
        title: "Collaboration and Handoff",
        description: "Learn team collaboration features and developer handoff workflows.",
        duration: "18 mins",
      },
    ],
    lessonContent: "Engage with each lesson through video tutorials, hands-on exercises, and downloadable Figma files.",
    progressTracking: "Track your progress as you complete each module and build your design portfolio.",
    currentProgress: 0,
  },
];

export function getLessonsByCourseId(courseId: string): CourseLessons | undefined {
  return courseLessonsData.find((cl) => cl.courseId === courseId);
}
