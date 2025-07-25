"use client";

import { motion } from "framer-motion";

export default function PageWrapper({ children, direction = 1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 * direction }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
