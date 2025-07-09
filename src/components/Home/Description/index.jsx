import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { slideUp, opacity } from "./animation";
import Rounded from "../../../common/RoundedButton";

export default function Index() {
  const phrase =
    "Helping ambitious brands thrive and compete in the digital era through strategic design, smart development, and continuous support that drives real results.";

  const description = useRef(null);
  const isInView = useInView(description, { once: true, margin: "-20% 0px" });

  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  initial="closed"
                  animate={isInView ? "open" : "closed"}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>

        <motion.p
          variants={opacity}
          initial="closed"
          animate={isInView ? "open" : "closed"}
        >
          Blending design, code, and interaction into seamless digital
          experiences — where creativity meets functionality.
        </motion.p>

        <motion.div
          variants={opacity}
          initial="closed"
          animate={isInView ? "open" : "closed"}
          data-scroll
          data-scroll-speed={0.1}
        >
          <Rounded className={styles.button}>
            <p>About me</p>
          </Rounded>
        </motion.div>
      </div>
    </div>
  );
}
