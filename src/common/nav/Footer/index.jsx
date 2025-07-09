import styles from "./style.module.scss";
import { motion } from "framer-motion";
import Magnetic from "../../Magnetic"; // Pastikan path sudah benar

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.header}>
        <p>Socials</p>
      </div>
      <motion.div className={styles.socialLinks}>
        <Magnetic>
          <p>
            <a
              href="https://www.awwwards.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Awwwards
            </a>
          </p>
        </Magnetic>
        <Magnetic>
          <p>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
        </Magnetic>
        <Magnetic>
          <p>
            <a
              href="https://www.dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dribbble
            </a>
          </p>
        </Magnetic>
        <Magnetic>
          <p>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </Magnetic>
      </motion.div>
    </div>
  );
}
