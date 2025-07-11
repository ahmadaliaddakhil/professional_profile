"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./page.module.scss";
import Curve from "../../common/Curve";
import Contact from "../../components/Contact";

export default function Work() {
  return (
    <main className={styles.main}>
      <Curve>
        <AnimatePresence mode="wait"></AnimatePresence>
        <Contact />
      </Curve>
    </main>
  );
}
