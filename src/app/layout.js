"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../common/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TransitionLayout from "../common/TransitionOverlay";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (nextUrl) {
      setIsTransitioning(true);
      const timeout = setTimeout(() => {
        router.push(nextUrl);
        setIsTransitioning(false);
        setNextUrl(null);
      }, 1200); // durasi animasi transition

      return () => clearTimeout(timeout);
    }
  }, [nextUrl]);

  const handleNavigate = (url) => {
    if (url !== window.location.pathname) {
      setNextUrl(url);
    }
  };

  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable}`}>
        <Header onNavigate={handleNavigate} />
        <TransitionLayout isActive={isTransitioning} nextRoute={nextUrl} />
        <div id="page-container">{children}</div>
      </body>
    </html>
  );
}
