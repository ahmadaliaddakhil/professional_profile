"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import Preloader from "../components/Home/Preloader";
import Landing from "../components/Home/Landing";
import Projects from "../components/Home/Projects";
import Description from "../components/Home/Description";
import SlidingImages from "../components/Home/SlidingImages";
import Contact from "../components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
      document.body.style.cursor = "wait";

      const timeout = setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);

        import("locomotive-scroll").then((LocomotiveScroll) => {
          new LocomotiveScroll.default();
        });
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
      import("locomotive-scroll").then((LocomotiveScroll) => {
        new LocomotiveScroll.default();
      });
    }
  }, []);

  // ✅ Isolasi rendering Preloader supaya image lain tidak sempat muncul
  return isLoading ? (
    <main className={styles.main}>
      <Preloader />
    </main>
  ) : (
    <main className={styles.main}>
      <Landing />
      <Description />
      <Projects />
      <SlidingImages />
      <Contact />
    </main>
  );
}
