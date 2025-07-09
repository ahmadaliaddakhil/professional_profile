import React, { useEffect, useRef, forwardRef } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
import Magnetic from "../Magnetic";

const RoundedButton = forwardRef(
  ({ children, backgroundColor = "#455CE9", ...attributes }, ref) => {
    const circle = useRef(null);
    let timeline = useRef(null);
    let timeoutId = null;

    useEffect(() => {
      timeline.current = gsap.timeline({ paused: true });
      timeline.current
        .to(
          circle.current,
          { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
          "enter"
        )
        .to(
          circle.current,
          { top: "-150%", width: "125%", duration: 0.25 },
          "exit"
        );
    }, []);

    const manageMouseEnter = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeline.current.tweenFromTo("enter", "exit");
    };

    const manageMouseLeave = () => {
      timeoutId = setTimeout(() => {
        timeline.current.play();
      }, 300);
    };

    return (
      <div
        ref={ref} // <-- penting untuk Magnetic
        className={styles.roundedButton}
        style={{ overflow: "hidden" }}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        {children}
        <div
          ref={circle}
          style={{ backgroundColor }}
          className={styles.circle}
        ></div>
      </div>
    );
  }
);

export default function Index(props) {
  return (
    <Magnetic>
      <RoundedButton {...props} />
    </Magnetic>
  );
}
