"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "../../../common/nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../../common/RoundedButton";
import Magnetic from "../../../common/Magnetic";

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
          <a className={styles.logo}>
            <p className={styles.copyright}>©</p>
            <div className={styles.name}>
              <p className={styles.codeBy}>Code by</p>
              <p className={styles.Ahmad}>Ahmad </p>
              <p className={styles.AliAddakhil}>Ali Addakhil</p>
            </div>
          </a>
        </Link>

        <div className={styles.nav}>
          <div className={styles.desktopNav}>
            <Magnetic>
              <Link href="/Work" legacyBehavior>
                <a className={styles.el}>
                  Work
                  <div className={styles.indicator}></div>
                </a>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/About" legacyBehavior>
                <a className={styles.el}>
                  About
                  <div className={styles.indicator}></div>
                </a>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/Contact" legacyBehavior>
                <a className={styles.el}>
                  Contact
                  <div className={styles.indicator}></div>
                </a>
              </Link>
            </Magnetic>
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
