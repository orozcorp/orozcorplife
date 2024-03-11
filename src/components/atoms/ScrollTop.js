"use client";
import { motion, useScroll } from "framer-motion";

export default function ScrollTop() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="progress-barMotion text-white text-2xl text-center"
      style={{ scaleX: scrollYProgress }}
    ></motion.div>
  );
}
