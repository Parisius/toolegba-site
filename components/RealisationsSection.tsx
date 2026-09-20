"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MAP_WIDTH, MAP_HEIGHT, MAP_COUNTRIES, MAP_PINS } from "./data/west-africa-map";
import { REALISATIONS, type Realisation, type RealisationIcon } from "./data/realisations";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

function TradeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M4 9.5 5 4h14l1 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M5.5 9.5V20h13V9.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function OperationnelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M3 7h11v9H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ConsumerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 20c1-3.8 4-5.8 6.5-5.8s5.5 2 6.5 5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DistributionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 3.5 20 7.5v9L12 20.5 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 7.5 12 11.5l8-4M12 11.5V20.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 5.5h16v10H12.5L8 19v-3.5H4v-10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 9.5h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="m3.5 12 3.2-3.2a2 2 0 0 1 2.9.1l.9.9 3.4-3.4a2 2 0 0 1 2.9 0l3.7 3.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8 10.5 3.3 3.3a1.6 1.6 0 0 0 2.3 0 1.6 1.6 0 0 0 0-2.3M13 16l1.4 1.4a1.6 1.6 0 0 0 2.3-2.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<RealisationIcon, ReactNode> = {
  trade: <TradeIcon />,
  operationnel: <OperationnelIcon />,
  consumer: <ConsumerIcon />,
  distribution: <DistributionIcon />,
  social: <SocialIcon />,
  rp: <RpIcon />,
};

const hexToRgba = (hex: string, alpha: number) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type RealisationText = {
  countryLabel: string;
  city: string;
  title: string;
  service: string;
  description: string;
  tags: string[];
};

function RealisationCard({
  realisation,
  text,
  index,
  total,
  isActive,
  onHover,
}: {
  realisation: Realisation;
  text: RealisationText;
  index: number;
  total: number;
  isActive: boolean;
  onHover: () => void;
}) {
  const glowRef = useRef<HTMLDivElement>(null);
  const glowColor = hexToRgba(realisation.accent, 0.55);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glowRef.current?.style.setProperty("--mx", `${x}%`);
    glowRef.current?.style.setProperty("--my", `${y}%`);
  };

  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      onMouseMove={handleMouseMove}
      className={`group relative w-[280px] flex-none overflow-hidden rounded-[28px] shadow-lg shadow-petrole/15 ring-corail transition-shadow duration-300 md:w-[300px] ${
        isActive ? "ring-2" : "ring-0"
      }`}
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="relative h-[360px] w-full md:h-[380px]">
        <Image
          src={pictures.realisations[realisation.id as keyof typeof pictures.realisations]}
          alt=""
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Base scrim, always on, for text legibility over any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-petrole via-petrole/15 to-black/10" />

        {/* Pointer-tracked color glow, revealed on hover */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), ${glowColor} 0%, transparent 60%)`,
            mixBlendMode: "screen",
          }}
        />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors duration-300">
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: realisation.accent }}
            />
            <span className="relative">{ICONS[realisation.icon]}</span>
          </span>
          <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-medium tracking-wide text-white/80 backdrop-blur-md">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-5 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange">
            {text.service}
          </p>
          <p className="mt-1.5 font-display text-xl font-semibold leading-snug text-white md:text-2xl">
            {text.title}
          </p>
          <p className="mt-2.5 text-xs text-white/50">
            {realisation.flag} {text.countryLabel}, {text.city}
          </p>
        </div>

      </div>
    </button>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d={dir === "left" ? "M19 12H5m0 0 6-6m-6 6 6 6" : "M5 12h14m0 0-6-6m6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PREVIEW_W = 160;
const PREVIEW_H = 122;

export default function RealisationsSection() {
  const { realisationsSection, realisations } = useDict();
  const getText = (id: string): RealisationText =>
    realisations[id as keyof typeof realisations];

  const [hovered, setHovered] = useState<string>(REALISATIONS[0].country);
  const active = REALISATIONS.find((r) => r.country === hovered) ?? REALISATIONS[0];

  const [preview, setPreview] = useState({ x: 0, y: 0, visible: false });

  const stripRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });
  const updateCanScroll = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanScroll({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);
  useEffect(() => {
    updateCanScroll();
    window.addEventListener("resize", updateCanScroll);
    return () => window.removeEventListener("resize", updateCanScroll);
  }, [updateCanScroll]);
  const scrollStrip = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 300) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const handleMapMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left + 18, 8), rect.width - PREVIEW_W - 8);
    const y = Math.min(Math.max(e.clientY - rect.top + 18, 8), rect.height - PREVIEW_H - 8);
    setPreview({ x, y, visible: true });
  };

  const activeText = getText(active.id);

  return (
    <section
      id="realisations"
      className="relative z-[100] bg-ivoire px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
            {realisationsSection.overline}
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
            {realisationsSection.headline}
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
            {realisationsSection.body}
          </p>
        </ScrollReveal>

        {/* Filmstrip - snap-scrolling, one card per country. Hovering a card
            also highlights the matching country on the map below. */}
        <div className="relative mt-10">
          <div className="mb-5 flex justify-end gap-2">
            {(["left", "right"] as const).map((dir) => {
              const enabled = dir === "left" ? canScroll.left : canScroll.right;
              return (
                <button
                  key={dir}
                  type="button"
                  disabled={!enabled}
                  onClick={() => scrollStrip(dir === "left" ? -1 : 1)}
                  aria-label={dir === "left" ? "Previous" : "Next"}
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-white text-petrole shadow-md shadow-petrole/10 transition-all duration-200 ${
                    enabled ? "hover:scale-105 hover:bg-petrole hover:text-white" : "cursor-default opacity-40"
                  }`}
                >
                  <ChevronIcon dir={dir} />
                </button>
              );
            })}
          </div>
          <div
            ref={stripRef}
            onScroll={updateCanScroll}
            className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {REALISATIONS.map((r, index) => (
              <RealisationCard
                key={r.id}
                realisation={r}
                text={getText(r.id)}
                index={index}
                total={REALISATIONS.length}
                isActive={hovered === r.country}
                onHover={() => setHovered(r.country)}
              />
            ))}
          </div>
        </div>

        {/* Map - full width, hovering a country shows a cursor-following
            preview of its project right next to the pointer. */}
        <div className="mt-16">
          <p className="mb-6 text-xs uppercase tracking-wide text-petrole/50">
            {realisationsSection.mapLabel}
          </p>
          <div
            onMouseMove={handleMapMouseMove}
            onMouseLeave={() => setPreview((p) => ({ ...p, visible: false }))}
            className="relative aspect-[1000/825] w-full overflow-hidden rounded-[28px] bg-petrole"
          >
            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              className="h-full w-full"
              role="img"
              aria-label="Map of the six West and Central African countries Toolègba operates in"
            >
              <g>
                {MAP_COUNTRIES.filter((c) => !c.target).map((c) => (
                  <path
                    key={c.name}
                    d={c.path}
                    fill="rgba(255,255,255,0.05)"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth={1}
                  />
                ))}
              </g>
              <g>
                {MAP_COUNTRIES.filter((c) => c.target).map((c) => {
                  const isActive = hovered === c.name;
                  return (
                    <path
                      key={c.name}
                      d={c.path}
                      onMouseEnter={() => setHovered(c.name)}
                      className="cursor-pointer transition-colors duration-200"
                      fill={isActive ? "rgba(229,78,62,0.45)" : "rgba(229,78,62,0.2)"}
                      stroke="#E54E3E"
                      strokeWidth={isActive ? 2.4 : 1.6}
                    />
                  );
                })}
              </g>
              <g>
                {MAP_PINS.map((p) => {
                  const isActive = hovered === p.name;
                  return (
                    <g
                      key={p.name}
                      onMouseEnter={() => setHovered(p.name)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isActive ? 14 : 10}
                        fill="#E54E3E"
                        opacity={isActive ? 0.28 : 0.16}
                        className="transition-all duration-200"
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isActive ? 5.5 : 4.5}
                        fill="#E54E3E"
                        stroke="#FBF3E7"
                        strokeWidth={1.4}
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Cursor-following preview of the hovered country's project */}
            <div
              className={`pointer-events-none absolute z-10 w-40 overflow-hidden rounded-xl bg-ivoire shadow-xl transition-opacity duration-150 ease-out ${
                preview.visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ left: preview.x, top: preview.y }}
            >
              <div className="relative h-20 w-full">
                <Image
                  src={pictures.realisations[active.id as keyof typeof pictures.realisations]}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2.5">
                <p className="truncate text-[10px] text-petrole/60">
                  {active.flag} {activeText.countryLabel}, {activeText.city}
                </p>
                <p className="mt-1 truncate text-xs font-semibold text-petrole">
                  {activeText.title}
                </p>
                <p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-wide text-corail">
                  {activeText.service}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/realisations"
          className="group mt-14 inline-block border-b-2 border-corail pb-1 font-sans text-sm font-semibold text-petrole transition-colors hover:text-corail"
        >
          {realisationsSection.portfolioLink.replace(/\s*→\s*$/, "")}
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
