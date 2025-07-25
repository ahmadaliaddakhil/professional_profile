"use client";

import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

export default function Description() {
  useEffect(() => {
    const scrollBar = Scrollbar.init(
      document.querySelector(`.${styles.main}`),
      {
        damping: 0.06,
        delegateTo: document,
        alwaysShowTracks: false,
        speed: 3,
      }
    );

    ScrollTrigger.defaults({
      scroller: `.${styles.main}`,
    });

    ScrollTrigger.scrollerProxy(`.${styles.main}`, {
      scrollTop(value) {
        if (arguments.length) {
          scrollBar.scrollTop = value;
        }
        return scrollBar.scrollTop;
      },
    });

    scrollBar.addListener(ScrollTrigger.update);
    ScrollTrigger.refresh();

    const sections = document.querySelectorAll("[data-bgcolor]");
    sections.forEach((section, i) => {
      const prevBg = i === 0 ? "" : sections[i - 1].dataset.bgcolor;
      const prevText = i === 0 ? "" : sections[i - 1].dataset.textcolor;

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        onEnter: () =>
          gsap.to(`.${styles.main}`, {
            backgroundColor: section.dataset.bgcolor,
            color: section.dataset.textcolor,
            overwrite: "auto",
          }),
        onLeaveBack: () =>
          gsap.to(`.${styles.main}`, {
            backgroundColor: prevBg,
            color: prevText,
            overwrite: "auto",
          }),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      scrollBar.destroy();
    };
  }, []);

  return (
    <div className={styles.main}>
      <section
        className={styles.hero}
        data-bgcolor="#070707"
        data-textcolor="#ffffff"
      >
        <p className={styles.title}>
          Scroll To Change <span className={styles.green}>Background</span>{" "}
          Color
        </p>
      </section>

      <section
        className={styles.section}
        data-bgcolor="#3b2525"
        data-textcolor="#d0b6c0"
      >
        <div className={styles.content}>
          <p>
            In nature, nothing is <span className={styles.green}>perfect</span>{" "}
            and everything is perfect. Trees can be contorted, bent in weird
            ways, and they're still beautiful.
          </p>
          <img src="/assets/pexels1.jpg" alt="Nature" />
        </div>
      </section>

      <section
        className={styles.section}
        data-bgcolor="#3b3825"
        data-textcolor="#c2c1b3"
      >
        <div className={styles.content}>
          <img src="/assets/pexels2.jpg" alt="Self" />
          <p>
            Look deep into <span className={styles.green}>Yourself</span>, and
            then you will understand everything better.
          </p>
        </div>
      </section>

      <section
        className={styles.section}
        data-bgcolor="#032F35"
        data-textcolor="#b3c2ba"
      >
        <div className={styles.content}>
          <p>
            The best thing one can do when it's raining is{" "}
            <span className={styles.green}>to let it rain.</span>
          </p>
          <img src="/assets/pexels3.jpg" alt="Rain" />
        </div>
      </section>

      <section
        className={styles.hero}
        data-bgcolor="#582e1a"
        data-textcolor="#ffffff"
      >
        <p className={styles.title}>End Of Scroll</p>
      </section>
    </div>
  );
}
