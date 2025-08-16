import React, { useState } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { menuSlide } from "../animation";
import Link from "./Link";
import Curve from "./Curve";
import Footer from "./Footer";
import Magnetic from "../../Magnetic";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Work", href: "/Work" },
  { title: "About", href: "/About" },
  { title: "Contact", href: "/Contact" },
];

export default function NavMenu() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => (
            <Magnetic key={index}>
              <Link
                data={{ ...data, index }}
                isActive={selectedIndicator === data.href}
                setSelectedIndicator={setSelectedIndicator}
              />
            </Magnetic>
          ))}
        </div>
        <Magnetic>
          <Footer />
        </Magnetic>
      </div>
      <Curve />
    </motion.div>
  );
}
