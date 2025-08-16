"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

const slider1 = [
  { color: "#e3e5e7", src: "c2.jpg" },
  { color: "#d6d7dc", src: "decimal.jpg" },
  { color: "#e3e3e3", src: "funny.jpg" },
  { color: "#21242b", src: "google.jpg" },
];

const slider2 = [
  { color: "#d4e3ec", src: "maven.jpg" },
  { color: "#e5e0e1", src: "panda.jpg" },
  { color: "#d7d4cf", src: "powell.jpg" },
  { color: "#e1dad6", src: "wix.jpg" },
];

// Komponen gambar
const ProjectImage = ({ color, src, alt }) => (
  <div className={styles.project} style={{ backgroundColor: color }}>
    <div className={styles.imageContainer}>
      <Image
        fill
        alt={alt}
        src={`/images/${src}`}
        loading="lazy"
        sizes="(max-width: 768px) 70vw, 25vw"
      />
    </div>
  </div>
);

export default function SlidingImages() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.slidingImages}>
      {/* Slider baris 1 */}
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => (
          <ProjectImage
            key={index}
            color={project.color}
            src={project.src}
            alt={`Project ${index + 1}`}
          />
        ))}
      </motion.div>

      {/* Slider baris 2 */}
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => (
          <ProjectImage
            key={index}
            color={project.color}
            src={project.src}
            alt={`Project ${index + 1}`}
          />
        ))}
      </motion.div>

      {/* Curve di bawah */}
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}
