import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }) {
  const magnetic = useRef(null);

  useEffect(() => {
    const node = magnetic.current; // ✅ simpan snapshot ref
    if (!node) return;

    const xTo = gsap.quickTo(node, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(node, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = node.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove); // ✅ pakai snapshot
      node.removeEventListener("mouseleave", handleMouseLeave); // ✅ pakai snapshot
    };
  }, []);

  return React.cloneElement(children, { ref: magnetic });
}
