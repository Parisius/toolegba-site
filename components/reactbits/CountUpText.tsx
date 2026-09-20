"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const NUMBER = /\d+(?:[ , ]\d{3})*/g;

function group(n: number, sep: string) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/**
 * Counts every number inside a string (e.g. "2 000 → 26 000", "53,000+") up
 * from zero when it scrolls into view, keeping the original thousands
 * separator and any surrounding characters.
 */
export default function CountUpText({
  value,
  duration = 1800,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  // Start at the real value (server HTML, no-JS) and rewind to 0 right before first paint on the client.
  const [progress, setProgress] = useState(1);
  useIsoLayoutEffect(() => {
    if (!reduce) setProgress(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // If animation frames are throttled (background tab), still land on the real value.
    const fallback = setTimeout(() => setProgress(1), duration + 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [inView, reduce, duration]);

  const parts: (string | { target: number; sep: string })[] = [];
  let last = 0;
  for (const match of Array.from(value.matchAll(NUMBER))) {
    const index = match.index ?? 0;
    if (index > last) parts.push(value.slice(last, index));
    parts.push({ target: parseInt(match[0].replace(/\D/g, ""), 10), sep: match[0].match(/[ , ]/)?.[0] ?? "" });
    last = index + match[0].length;
  }
  if (last < value.length) parts.push(value.slice(last));

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i} aria-hidden="true">{part}</span>
        ) : (
          <span key={i} aria-hidden="true">{group(Math.round(part.target * progress), part.sep)}</span>
        ),
      )}
    </span>
  );
}
