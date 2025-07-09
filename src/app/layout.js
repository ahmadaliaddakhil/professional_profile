"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Home/Header";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Ali Addakhil - Portfolio",
  description: "Freelance Designer & Developer Portfolio",
};

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get current route

  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable}`}>
        <Header />
        <AnimatePresence mode="wait">
          <div key={pathname}>{children}</div>
        </AnimatePresence>
      </body>
    </html>
  );
}
