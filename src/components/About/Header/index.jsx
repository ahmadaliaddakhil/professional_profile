"use client";

import React, { useEffect } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  // Horizontal scroll animation
  useEffect(() => {
    const wrapper = document.querySelector(`.${styles.wrapper404}`);

    const cards = [
      { id: "#card-1", endTranslateX: -2000, rotate: 45 },
      { id: "#card-2", endTranslateX: -1000, rotate: -30 },
      { id: "#card-3", endTranslateX: -1500, rotate: 15 },
      { id: "#card-4", endTranslateX: -1800, rotate: -20 },
    ];

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "+=900vh",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.to(wrapper, {
          x: `${-window.innerWidth * 3.5 * progress}px`,
          duration: 0.5,
          ease: "power3.out",
        });

        cards.forEach(({ id, endTranslateX, rotate }) => {
          const el = document.querySelector(id);
          if (el) {
            gsap.to(el, {
              x: endTranslateX * progress,
              rotate: rotate * progress,
              duration: 0.5,
              ease: "power3.out",
            });
          }
        });
      },
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }, []);

  // Scroll background color changer
  useEffect(() => {
    const sections = document.querySelectorAll("[data-bgcolor]");

    sections.forEach((section, i) => {
      const prevBg = i === 0 ? "" : sections[i - 1].dataset.bgcolor;
      const prevText = i === 0 ? "" : sections[i - 1].dataset.textcolor;

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        onEnter: () =>
          gsap.to("body", {
            backgroundColor: section.dataset.bgcolor,
            color: section.dataset.textcolor,
            overwrite: "auto",
          }),
        onLeaveBack: () =>
          gsap.to("body", {
            backgroundColor: prevBg,
            color: prevText,
            overwrite: "auto",
          }),
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper404}>
        <h1 className={styles.heading}>Nothing About Me</h1>

        {/* Cards */}
        <div id="card-1" className={`${styles.card} ${styles.card1}`}>
          <img src="/images/c2.jpg" alt="Card 1" />
        </div>
        <div id="card-2" className={`${styles.card} ${styles.card2}`}>
          <img src="/images/panda.jpg" alt="Card 2" />
        </div>
        <div id="card-3" className={`${styles.card} ${styles.card3}`}>
          <img src="/images/powell.jpg" alt="Card 3" />
        </div>
        <div id="card-4" className={`${styles.card} ${styles.card4}`}>
          <img src="/images/google.jpg" alt="Card 4" />
        </div>
      </div>

      <div style={{ height: "60vh" }} />
      <section className={styles.outro}>
        <h1>
          I Mean, There's Nothing About Me When There's No Job. <br />
          So... Please Give Me One.
        </h1>
      </section>

      {/* Scroll-triggered background color sections */}
      <div className={styles.scrollMain}>
        <section
          className={styles.hero}
          data-bgcolor="#111827"
          data-textcolor="#A7F3D0"
        >
          <p className={styles.title}>I’m Ali — The Mind Behind The Pixels.</p>
        </section>

        <section
          className={styles.section}
          data-bgcolor="#c1d2c5  "
          data-textcolor="#2c2c2c  "
        >
          <div className={styles.content}>
            <p>
              Ali helps brands grow through thoughtful design and smart
              development, ensuring every pixel has a purpose.
            </p>
          </div>
        </section>

        <section
          className={styles.section}
          data-bgcolor="#1d1f2f "
          data-textcolor="#ffe7c4 "
        >
          <div className={styles.content}>
            <p>
              Design — <br />
              With a solid track record in designing websites, I deliver strong
              and user-friendly digital designs.
            </p>
          </div>
        </section>

        <section
          className={styles.section}
          data-bgcolor="#032F35"
          data-textcolor="#e2f4f1 "
        >
          <div className={styles.content}>
            <p>
              Development — <br /> I build websites from the ground up. Clean
              code. Smooth transitions. Micro-interactions that make users stay.
              Webflow or Kirby, you name it, I code it.
            </p>
          </div>
        </section>

        <section
          className={styles.section}
          data-bgcolor="#582e1a"
          data-textcolor="#ffffff"
        >
          <div className={styles.content}>
            <p>
              The full package — <br /> From the first sketch to the final
              launch, I handle it all. My blend of design intuition and
              development skill ensures your site isn’t just beautiful, but
              powerful.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
