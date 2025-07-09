"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Image from "next/image";

export default function index({ index, title, year, src, manageModal }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldRender = !isMobile || index < 2; // Render semua gambar di desktop, hanya 2 gambar di mobile

  return (
    shouldRender && (
      <div
        className={styles.project}
        onMouseEnter={(e) => {
          manageModal(true, index, e.clientX, e.clientY);
        }}
        onMouseLeave={(e) => {
          manageModal(false, index, e.clientX, e.clientY);
        }}
      >
        <div className={styles.desktop}>
          <h2>{title}</h2>
          <p>Design & Development</p>
        </div>

        <div className={styles.mobile}>
          <div className={styles.imageWrapper}>
            <Image
              src={`/images/${src}`}
              alt={title}
              className={styles.image}
              width={300}
              height={0}
            />
          </div>
          <div className={styles.info}>
            <h2>{title}</h2>
            <div className={styles.details}>
              <p>Design & Development</p>
              <p className={styles.year}>{year}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
