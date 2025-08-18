"use client";
import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";

export default function ProjectItem({
  itemIndex,
  title,
  year,
  src,
  manageModal,
  isMobile,
  category = [],
}) {
  const shouldRender = !isMobile || itemIndex < 2;

  if (!shouldRender) return null;

  const renderCategory = category.join(" & ");

  return (
    <div
      className={styles.project}
      role="button"
      tabIndex={0}
      onMouseEnter={(e) => {
        if (!isMobile) manageModal(true, itemIndex, e.clientX, e.clientY);
      }}
      onMouseLeave={(e) => {
        if (!isMobile) manageModal(false, itemIndex, e.clientX, e.clientY);
      }}
    >
      <div className={styles.desktop}>
        <h2>{title}</h2>
        <p>{renderCategory}</p>
      </div>

      <div className={styles.mobile}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageFill}>
            <Image
              src={`/images/${src}`}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              priority={itemIndex === 0}
            />
          </div>
        </div>
        <div className={styles.info}>
          <h2>{title}</h2>
          <div className={styles.details}>
            <p>{renderCategory}</p>
            <p className={styles.year}>{year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
