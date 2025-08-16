"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../RoundedButton";
import Magnetic from "../Magnetic";

export default function Header({ onNavigate }) {
  const header = useRef(null);
  const button = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  const isDark = pathname === "/" || pathname.toLowerCase() === "/contact";

  // ✅ Perbaikan: reset menu saat pathname berubah tanpa warning deps
  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(button.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: window.innerHeight,
          onLeave: () => {
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
            });
          },
          onEnterBack: () => {
            gsap.to(button.current, {
              scale: 0,
              duration: 0.25,
              ease: "power1.out",
            });
            setIsActive(false);
          },
        },
      });
    }, header);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <>
      <div
        ref={header}
        className={`${styles.header} ${isDark ? styles.dark : styles.light}`}
      >
        <Magnetic>
          <Link
            href="/"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/");
            }}
          >
            <p className={styles.copyright}>©</p>
            <div className={styles.name}>
              <p className={styles.codeBy}>Code by</p>
              <p className={styles.Ahmad}>Ahmad</p>
              <p className={styles.AliAddakhil}>Ali Addakhil</p>
            </div>
          </Link>
        </Magnetic>

        <div className={styles.nav}>
          <div className={styles.desktopNav}>
            {["Work", "About", "Contact"].map((page) => {
              const href = `/${page}`;
              return (
                <Magnetic key={page}>
                  <Link
                    href={href}
                    className={styles.el}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(href);
                    }}
                  >
                    {page}
                    <div className={styles.indicator}></div>
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          <div
            className={styles.mobileMenuText}
            onClick={() => setIsActive(!isActive)}
          >
            • Menu
          </div>
        </div>
      </div>

      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => setIsActive(!isActive)}
          className={`${styles.button} ${isActive ? styles.active : ""}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>

      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
