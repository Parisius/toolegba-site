"use client";

import Link from "next/link";
import { useDict } from "@/lib/language/LanguageProvider";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

function TradeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
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
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M3 7h11v9H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ConsumerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 20c1-3.8 4-5.8 6.5-5.8s5.5 2 6.5 5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DistributionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3.5 20 7.5v9L12 20.5 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 7.5 12 11.5l8-4M12 11.5V20.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function RpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
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

function SocialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
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

const SERVICE_ICONS = [
  <TradeIcon key="trade" />,
  <OperationnelIcon key="operationnel" />,
  <ConsumerIcon key="consumer" />,
  <RpIcon key="rp" />,
  <DistributionIcon key="distribution" />,
  <SocialIcon key="social" />,
];

const SERVICE_ACCENTS = ["#E54E3E", "#7F2B2B", "#468F92", "#D11A1B", "#2C3D4F", "#E54E3E"];

export default function AgenceServices() {
  const dict = useDict();
  const { agencePage, services } = dict;
  const SERVICES = [
    services.trade,
    services.operationnel,
    services.consumer,
    services.rp,
    services.distribution,
    services.social,
  ];

  return (
    <section className="relative z-[100] bg-ivoire px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
            {agencePage.services.overline}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
            {agencePage.services.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
            {agencePage.services.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-petrole/10 bg-white/60 p-7 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-transparent hover:bg-white hover:shadow-2xl hover:shadow-petrole/15"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-petrole text-white">
                <span
                  className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-90"
                  style={{ background: SERVICE_ACCENTS[i] }}
                />
                <span
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: SERVICE_ACCENTS[i] }}
                />
                <span className="relative">{SERVICE_ICONS[i]}</span>
              </span>
              <p className="mt-5 font-sans text-base font-semibold text-petrole">
                {s.title}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-petrole/60">
                {s.text}
              </p>
            </div>
          ))}
        </ScrollReveal>

        <div className="mt-14 text-center">
          <Link
            href="/#services"
            className="group font-sans text-sm font-medium text-petrole underline decoration-corail decoration-2 underline-offset-4 transition-colors hover:text-corail"
          >
            {agencePage.services.link.replace(/\s*→\s*$/, "")}
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
