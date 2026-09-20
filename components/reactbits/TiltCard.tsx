"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/**
 * Wraps a card so it tilts toward the cursor in 3D, with a soft colored glow
 * that follows the pointer. Touch devices simply get the plain card.
 */
export default function TiltCard({
  children,
  className = "",
  glow = "#E54E3E",
  max = 5,
  radius = 28,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  max?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });
  const glowBg = useTransform(
    [px, py],
    ([x, y]: number[]) => `radial-gradient(460px circle at ${x * 100}% ${y * 100}%, ${glow}40, transparent 62%)`,
  );

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={`group/tilt relative ${className}`}
    >
      {children}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ background: glowBg, borderRadius: radius }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      )}
    </motion.div>
  );
}
