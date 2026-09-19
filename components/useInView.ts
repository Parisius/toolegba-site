"use client";

import { useEffect, useRef, useState } from "react";

/** True while the observed element is on screen (plus a preload margin),
 * so continuous-render effects (WebGL canvases, etc.) can pause off-screen
 * instead of animating forever in the background. */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
