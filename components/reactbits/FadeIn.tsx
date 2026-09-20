"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Fades and slides content in on mount (for the top of a page, where in-view triggers add nothing). */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 18,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
