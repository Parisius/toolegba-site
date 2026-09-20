"use client";

import Image from "next/image";
import Link from "next/link";
import GlowCursor from "./reactbits/GlowCursor";
import { useInView } from "./useInView";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.9c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.2 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.2-3.3-8.5S9.8 5.8 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    path: "M13.5 21v-7.2h2.4l.4-2.8h-2.8v-1.8c0-.8.2-1.4 1.4-1.4h1.5V5.1c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7v2.1H8.3v2.8h2.4V21h2.8Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 8.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4Zm0 6.1a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Zm4.7-6.3a.87.87 0 1 1-1.74 0 .87.87 0 0 1 1.74 0ZM12 4.9c2.1 0 2.4 0 3.2.05.8.04 1.3.16 1.7.35.4.16.7.36 1 .66.3.3.5.6.66 1 .19.4.31.9.35 1.7.04.8.05 1.1.05 3.2s0 2.4-.05 3.2c-.04.8-.16 1.3-.35 1.7a2.7 2.7 0 0 1-.66 1 2.7 2.7 0 0 1-1 .66c-.4.19-.9.31-1.7.35-.8.04-1.1.05-3.2.05s-2.4 0-3.2-.05c-.8-.04-1.3-.16-1.7-.35a2.7 2.7 0 0 1-1-.66 2.7 2.7 0 0 1-.66-1c-.19-.4-.31-.9-.35-1.7C4.9 14.4 4.9 14.1 4.9 12s0-2.4.05-3.2c.04-.8.16-1.3.35-1.7.16-.4.36-.7.66-1 .3-.3.6-.5 1-.66.4-.19.9-.31 1.7-.35C9.6 4.9 9.9 4.9 12 4.9Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.94 8.5H4.1V19h2.84V8.5ZM5.52 4a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3ZM19.9 19h-2.84v-5.4c0-1.28-.46-2.16-1.6-2.16-.88 0-1.4.59-1.63 1.16-.08.2-.1.48-.1.76V19H10.9s.04-8.75 0-9.66h2.84v1.37c.38-.58 1.05-1.42 2.56-1.42 1.87 0 3.28 1.22 3.28 3.85V19Z",
  },
];

export default function Footer() {
  const { ref, inView } = useInView<HTMLElement>();
  const dict = useDict();
  const { siteInfo, services } = dict;

  const QUICK_LINKS = [
    { label: siteInfo.quickLinks.home, href: "/" },
    { label: siteInfo.quickLinks.services, href: "/#services" },
    { label: siteInfo.quickLinks.realisations, href: "/realisations" },
    { label: siteInfo.quickLinks.agence, href: "/agence" },
    { label: siteInfo.quickLinks.contact, href: "/contact" },
  ];

  const SERVICES = [services.trade.title, services.operationnel.title, services.consumer.title, services.rp.title, services.distribution.title, services.social.title];

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative z-[100] overflow-hidden bg-ivoire"
    >
      <GlowCursor
        trackWindow
        enabled={inView}
        color="#E54E3E"
        secondaryColor="#FFAF5C"
        trailLength={44}
        trailWidth={10}
        glowIntensity={2}
        blendMode="screen"
        className="pointer-events-none fixed inset-0 z-[140]"
      />
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <p className="mb-6 font-sans text-base text-petrole/70 md:text-lg">
          {siteInfo.footerCta}
        </p>
        <a
          href={`mailto:${siteInfo.email}`}
          className="inline-block rounded-full border-2 border-corail px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-petrole transition-colors hover:bg-corail hover:text-white md:text-base"
        >
          {siteInfo.talkToAgency}
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-sans text-sm text-petrole md:text-base">
          <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-2 hover:text-corail">
            <MailIcon /> {siteInfo.email}
          </a>
          <a href={`tel:${siteInfo.phoneHref}`} className="flex items-center gap-2 hover:text-corail">
            <PhoneIcon /> {siteInfo.phone}
          </a>
          <a href={`tel:${siteInfo.phoneCIHref}`} className="flex items-center gap-2 hover:text-corail">
            <PhoneIcon /> {siteInfo.phoneCI}
          </a>
          <span className="flex items-center gap-2">
            <GlobeIcon /> {siteInfo.website}
          </span>
        </div>
        <p className="mx-auto mt-4 max-w-md text-center font-sans text-sm leading-relaxed text-petrole/60 md:max-w-none">
          <PinIcon className="mr-1.5 inline-block h-5 w-5 -translate-y-px align-text-bottom text-corail" />
          {siteInfo.addressFull}
        </p>
      </div>

      <div className="mx-3 mb-3 rounded-[28px] bg-petrole px-6 pb-20 pt-14 md:mx-4 md:mb-4 md:px-12 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <div className="relative h-8 w-36">
              <Image src={pictures.logos.white} alt="Toolègba" fill className="object-contain object-left" />
            </div>
            <p className="mt-4 max-w-xs font-sans text-sm text-white/70">
              {siteInfo.footerAbout}
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-corail hover:text-corail"
                >
                  <SocialIcon path={s.path} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-white/50">
              {siteInfo.footerQuickLinksHeading}
            </p>
            <ul className="mt-4 space-y-3 font-sans text-sm text-white/80">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-corail">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-white/50">
              {siteInfo.footerServicesHeading}
            </p>
            <ul className="mt-4 space-y-3 font-sans text-sm text-white/80">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-wide text-white/50">
              {siteInfo.footerStudioHeading}
            </p>
            <p className="mt-4 font-sans text-sm text-white/70">
              {siteInfo.addressShort}
            </p>
            <p className="mt-3 font-sans text-sm text-white/80">
              {siteInfo.phone} <span className="text-white/50">({siteInfo.phoneCountry})</span>
            </p>
            <p className="font-sans text-sm text-white/80">
              {siteInfo.phoneCI} <span className="text-white/50">({siteInfo.phoneCICountry})</span>
            </p>
            <p className="mt-3 font-sans text-sm text-white/80">{siteInfo.email}</p>
            <a
              href={`mailto:${siteInfo.email}`}
              className="mt-5 inline-block rounded-full bg-corail px-6 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-corail/85"
            >
              {siteInfo.getQuote}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center gap-4 border-t border-white/10 pt-6 text-center font-sans text-xs text-white/50 md:flex-row md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} Toolègba. {siteInfo.allRightsReserved}</p>
          <p className="italic">&quot;{siteInfo.tagline}&quot;</p>
          {/* Privacy / Terms hidden until the pages exist.
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              {siteInfo.privacy}
            </a>
            <a href="#" className="hover:text-white">
              {siteInfo.terms}
            </a>
          </div>
          */}
        </div>
      </div>
    </footer>
  );
}
