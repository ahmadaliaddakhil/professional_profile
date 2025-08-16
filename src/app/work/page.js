"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./page.module.scss";
import Contact from "../../common/Contact";
import PageWrapper from "../../common/PageWrapper";
import Projects from "../../components/Work/Projects";
import SlidingImages from "../../components/Home/SlidingImages";

export default function Work() {
  return (
    <PageWrapper direction={-1}>
      <main className={styles.main}>
        <Projects />
        <SlidingImages />
        <Contact />
      </main>
    </PageWrapper>
  );
}
