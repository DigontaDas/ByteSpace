import type { Metadata, Viewport } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1400FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "ByteSpace - Get Access to Hundreds of Courses Available",
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses. ByteSpace is your path to professional growth.",
  keywords: [
    "online courses",
    "learning platform",
    "education",
    "ByteSpace",
    "design",
    "development",
    "business",
    "skills development",
  ],
  authors: [{ name: "ByteSpace" }],
  creator: "ByteSpace",
  publisher: "ByteSpace",
  metadataBase: new URL("https://bytespace-learning.vercel.app"),
  openGraph: {
    title: "ByteSpace - Online Learning Platform",
    description:
      "Get access to hundreds of courses. Discover your passion, build your skills.",
    type: "website",
    locale: "en_US",
    siteName: "ByteSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "ByteSpace - Online Learning Platform",
    description: "Get access to hundreds of courses. Discover your passion, build your skills.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
