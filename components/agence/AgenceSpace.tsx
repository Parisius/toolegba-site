"use client";

import Image from "next/image";
import { useDict } from "@/lib/language/LanguageProvider";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { useAbout } from "@/lib/language/useContent";
import { aboutImages } from "@/lib/content";

function PinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function AgenceSpace() {
  const { siteInfo } = useDict();
  const { space } = useAbout().page;

  return (
    <section className="relative z-[100] bg-ivoire px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
            {space.overline}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
            {space.headline}
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
            {space.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="group relative h-64 overflow-hidden rounded-[28px] md:h-80">
            <Image
              src={aboutImages.space1}
              alt=""
              fill
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
          <div className="group relative h-64 overflow-hidden rounded-[28px] md:h-80">
            <Image
              src={aboutImages.space2}
              alt=""
              fill
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        </ScrollReveal>

        <p className="mx-auto mt-8 max-w-md text-center font-sans text-sm leading-relaxed text-petrole/60 md:max-w-none">
          <PinIcon className="mr-1.5 inline-block h-5 w-5 -translate-y-px align-text-bottom text-corail" />
          {siteInfo.addressFull}
        </p>
      </div>
    </section>
  );
}
