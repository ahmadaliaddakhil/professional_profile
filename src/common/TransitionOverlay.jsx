"use client";
import { motion, AnimatePresence } from "framer-motion";

const routes = {
  "/": "Home",
  "/About": "About",
  "/Work": "Work",
  "/Contact": "Contact",
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const overlayVariants = {
  initial: { y: "100%" },
  enter: { y: 0 },
  exit: { y: "-100%" },
};

export default function TransitionOverlay({ isActive, nextRoute }) {
  const routeText = routes[nextRoute];

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0a0a0a",
            zIndex: 9999,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {routeText && (
            <motion.p
              variants={textVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                color: "#fff",
                fontSize: "2.5rem",
                fontWeight: "600",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
              }}
            >
              {routeText}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
