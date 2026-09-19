"use client";

import { useEffect, useRef, useState } from "react";

export default function TextType({
  text,
  className = "",
  speed = 45,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  // Start typing once the heading scrolls into view.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Restart the typing animation whenever the text itself changes (e.g. a
  // language switch), rather than slicing the new string at the old count.
  useEffect(() => {
    setCount(0);
  }, [text]);

  // Advance one character at a time.
  useEffect(() => {
    if (!started || count >= text.length) return;
    const timeout = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(timeout);
  }, [started, count, text, speed]);

  const finished = count >= text.length;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span
          className={`ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-current align-middle ${
            finished ? "animate-pulse" : "opacity-90"
          }`}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
