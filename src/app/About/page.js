"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./page.module.scss";
import Curve from "../../common/Curve";
import Header from "../../components/Home/Header";

export default function Work() {
  return (
    <main className={styles.main}>
      <h1> testing</h1>

      <Curve backgroundColor={"#B0AD98"}>
        <AnimatePresence mode="wait"></AnimatePresence>
        <Header />
      </Curve>
    </main>
  );
}
