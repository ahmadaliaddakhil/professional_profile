"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Curve from "../../../common/Curve";
import Header from "../../components/Home/Header";

export default function Work() {
  return (
    <main className={styles.main}>
      <Curve backgroundColor={"#B0AD98"}>
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
        <Header />
      </Curve>
    </main>
  );
}
