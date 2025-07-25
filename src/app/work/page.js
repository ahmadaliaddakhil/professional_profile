"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./page.module.scss";
import Header from "../../common/Header";
import Contact from "../../components/Contact";
import PageWrapper from "../../common/PageWrapper";

export default function Work() {
  return (
    <PageWrapper direction={-1}>
      <main className={styles.main}></main>
    </PageWrapper>
  );
}
