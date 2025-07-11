"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "../nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../RoundedButton";
import Magnetic from "../Magnetic";

export default function Header() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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
  }, []);

  return (
    <>
      <div ref={header} className={styles.header}>
        <Link href="/" legacyBehavior>
          <Magnetic>
            <a className={styles.logo}>
              <p className={styles.copyright}>©</p>
              <div className={styles.name}>
                <p className={styles.codeBy}>Code by</p>
                <p className={styles.Ahmad}>Ahmad </p>
                <p className={styles.AliAddakhil}>Ali Addakhil</p>
              </div>
            </a>
          </Magnetic>
        </Link>

        <div className={styles.nav}>
          <div className={styles.desktopNav}>
            <Link href="/Work" passHref>
              <Magnetic>
                <a className={styles.el}>
                  Work
                  <div className={styles.indicator}></div>
                </a>
              </Magnetic>
            </Link>

            <Link href="/About" passHref>
              <Magnetic>
                <a className={styles.el}>
                  About
                  <div className={styles.indicator}></div>
                </a>
              </Magnetic>
            </Link>

            <Link href="/Contact" passHref>
              <Magnetic>
                <a className={styles.el}>
                  Contact
                  <div className={styles.indicator}></div>
                </a>
              </Magnetic>
            </Link>
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
