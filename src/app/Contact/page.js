"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import PageWrapper from "../../common/PageWrapper";

export default function Work() {
  return (
    <PageWrapper>
      <main className={styles.main}></main>
    </PageWrapper>
  );
}
