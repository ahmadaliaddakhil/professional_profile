"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { slideUp } from "./animation";
import { motion } from "framer-motion";

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const arrowIcon = useRef(null);

  let xPercent = 0;
  let direction = -1;
  let rafId = null; // simpan requestAnimationFrame id

  useEffect(() => {
    if (typeof window === "undefined") return; // pastikan client

    gsap.registerPlugin(ScrollTrigger);

    // Scroll horizontal untuk slider
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });

    // Scroll untuk ikon panah
    gsap.to(arrowIcon.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: 0,
        end: window.innerHeight,
      },
      rotation: 45,
      scale: 1.2,
    });

    const animate = () => {
      if (xPercent < -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      gsap.set(firstText.current, { xPercent });
      gsap.set(secondText.current, { xPercent });

      xPercent += 0.05 * direction;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // cleanup biar gak memory leak
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className={styles.landing}>
      {/* Badge Lokasi */}
      <div className={styles.locationBadge}>
        <div className={styles.badgeContent}>
          <div className={styles.badgeText}>
            <span>Located</span>
            <span>in the</span>
            <span>Indonesia</span>
          </div>
          <div className={styles.globeIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M3.6001 9H20.4001M3.6001 15H20.4001"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M12 3C14.7614 3 17 7.02944 17 12C17 16.9706 14.7614 21 12 21C9.23858 21 7 16.9706 7 12C7 7.02944 9.23858 3 12 3Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <Image
        src="/images/backgroundcyber1.jpg"
        fill
        alt="background"
        quality={100}
        priority
        sizes="100vw"
      />

      {/* Konten animasi */}
      <motion.div
        variants={slideUp}
        initial="initial"
        animate="enter"
        className={styles.content}
      >
        {/* Slider Loop */}
        <div className={styles.sliderContainer}>
          <div ref={slider} className={styles.slider}>
            <p ref={firstText} className={styles.slideText}>
              Ali Addakhil —
            </p>
            <p ref={secondText} className={styles.slideText}>
              Ali Addakhil —
            </p>
          </div>
        </div>

        {/* Deskripsi */}
        <div className={styles.description}>
          <div className={styles.arrowWrapper}>
            <svg
              ref={arrowIcon}
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
            >
              <path
                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                fill="white"
              />
            </svg>
          </div>
          <div className={styles.textContent}>
            <p>Freelance</p>
            <p>Designer & Developer</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
