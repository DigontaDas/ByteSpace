import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ByteSpace - Get Access to Hundreds of Courses Available",
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses. ByteSpace is your path to professional growth.",
  keywords: [
    "online courses",
    "learning platform",
    "education",
    "ByteSpace",
    "professional growth",
    "skills development",
  ],
  openGraph: {
    title: "ByteSpace - Online Learning Platform",
    description:
      "Get access to hundreds of courses. Discover your passion, build your skills.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
