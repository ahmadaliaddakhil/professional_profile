"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import ProjectItem from "./components/project";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../../../common/RoundedButton";
import Magnetic from "../../../common/Magnetic";

const allCategories = ["All", "Design", "Development"];

const projects = [
  {
    id: "c2",
    title: "Portfo V1™",
    src: "projectportfo1.png",
    color: "#000000",
    year: "2023",
    category: ["Design", "Development"],
  },
  {
    id: "off",
    title: "ASVARAKA 42",
    src: "project2.png",
    color: "#8C8C8C",
    year: "2025",
    category: ["Design", "Development"],
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const { active, index } = modal;

  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mql.matches);
    set();
    mql.addEventListener("change", set);
    return () => mql.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, [isMobile]);

  const moveItems = useCallback(
    (x, y) => {
      if (isMobile) return;
      xMoveContainer.current?.(x);
      yMoveContainer.current?.(y);
      xMoveCursor.current?.(x);
      yMoveCursor.current?.(y);
      xMoveCursorLabel.current?.(x);
      yMoveCursorLabel.current?.(y);
    },
    [isMobile]
  );

  const manageModal = useCallback(
    (isActive, idx, x, y) => {
      if (isMobile) return;
      moveItems(x, y);
      setModal({ active: isActive, index: idx });
    },
    [isMobile, moveItems]
  );

  const filteredProjects = projects.filter((project) =>
    activeCategory === "All" ? true : project.category.includes(activeCategory)
  );

  return (
    <main
      className={styles.projects}
      onMouseMove={(e) => {
        if (active && !isMobile) moveItems(e.clientX, e.clientY);
      }}
    >
      <div className={styles.recentwork}>
        <h1>Design — Develop — Deliver.</h1>

        <div className={styles.filters}>
          {allCategories.map((cat) => (
            <Magnetic key={cat}>
              <button
                className={`${activeCategory === cat ? styles.active : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            </Magnetic>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        {filteredProjects.map((p, i) => (
          <ProjectItem
            key={p.id}
            itemIndex={i}
            title={p.title}
            year={p.year}
            src={p.src}
            isMobile={isMobile}
            manageModal={manageModal}
            category={p.category}
          />
        ))}
      </div>

      {!isMobile && (
        <>
          <motion.div
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className={styles.modalContainer}
          >
            <div
              style={{ top: `${index * -100}%` }}
              className={styles.modalSlider}
            >
              {projects.map((project, i) => (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: project.color }}
                  key={`modal_${project.id}`}
                >
                  <div className={styles.modalImgWrap}>
                    <Image
                      src={`/images/${project.src}`}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 400px"
                      priority={i === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={cursor}
            className={styles.cursor}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
          />
          <motion.div
            ref={cursorLabel}
            className={styles.cursorLabel}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
          >
            View
          </motion.div>
        </>
      )}
      {isMobile && (
        <motion.div
          style={{ height: "50vh" }}
          className={styles.circleContainer}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className={styles.circle}></div>
        </motion.div>
      )}
    </main>
  );
}
