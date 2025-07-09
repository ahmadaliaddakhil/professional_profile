"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Projectdetail from "../../../components/Work/Projectdetail";
import Projectlist from "../../../components/Work/projectlist";
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
        <Projectdetail />
        <Projectlist />
      </Curve>
    </main>
  );
}
