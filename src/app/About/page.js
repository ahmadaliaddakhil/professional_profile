"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Header from "../../components/About/Header";
import PageWrapper from "../../common/PageWrapper";
import Contact from "../../components/Contact";

export default function AboutPage() {
  return (
    <PageWrapper direction={1}>
      <main className={styles.main}>
        <Header />
        <Contact />
      </main>
    </PageWrapper>
  );
}
