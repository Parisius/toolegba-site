import type { ReactNode } from "react";

const S = { stroke: "currentColor", strokeWidth: 1.5 } as const;

const PATHS: Record<string, ReactNode> = {
  trade: (
    <>
      <path d="M4 9.5 5 4h14l1 5.5" {...S} strokeLinejoin="round" />
      <path d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" {...S} />
      <path d="M5.5 9.5V20h13V9.5" {...S} />
      <path d="M10 20v-5h4v5" {...S} />
    </>
  ),
  operationnel: (
    <>
      <path d="M3 7h11v9H3z" {...S} strokeLinejoin="round" />
      <path d="M14 10h4l3 3v3h-7z" {...S} strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" {...S} />
      <circle cx="17" cy="18" r="1.6" {...S} />
    </>
  ),
  consumer: (
    <>
      <circle cx="12" cy="8" r="3.3" {...S} />
      <path d="M5.5 20c1-3.8 4-5.8 6.5-5.8s5.5 2 6.5 5.8" {...S} strokeLinecap="round" />
    </>
  ),
  rp: (
    <>
      <path d="m3.5 12 3.2-3.2a2 2 0 0 1 2.9.1l.9.9 3.4-3.4a2 2 0 0 1 2.9 0l3.7 3.7" {...S} strokeLinecap="round" strokeLinejoin="round" />
      <path d="m8 10.5 3.3 3.3a1.6 1.6 0 0 0 2.3 0 1.6 1.6 0 0 0 0-2.3M13 16l1.4 1.4a1.6 1.6 0 0 0 2.3-2.3" {...S} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  distribution: (
    <>
      <path d="M12 3.5 20 7.5v9L12 20.5 4 16.5v-9Z" {...S} strokeLinejoin="round" />
      <path d="M4 7.5 12 11.5l8-4M12 11.5V20.5" {...S} strokeLinejoin="round" />
    </>
  ),
  social: (
    <>
      <path d="M4 5.5h16v10H12.5L8 19v-3.5H4v-10Z" {...S} strokeLinejoin="round" />
      <path d="M8 9.5h8M8 12h5" {...S} strokeLinecap="round" />
    </>
  ),
};

/** Fallback for any service id that has no dedicated icon yet. */
const FALLBACK = (
  <>
    <circle cx="12" cy="12" r="8" {...S} />
    <path d="m12 8 1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2L12 8Z" {...S} strokeLinejoin="round" />
  </>
);

export default function ServiceIcon({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {PATHS[id] ?? FALLBACK}
    </svg>
  );
}
