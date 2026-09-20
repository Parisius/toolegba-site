"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, useDict } from "@/lib/language/LanguageProvider";
import { siteImages } from "@/lib/content";
import GlassSurface from "@/components/reactbits/GlassSurface";

/** Visual language switch, wired to the shared LanguageProvider. */
function LanguageToggle({ dark }: { dark?: boolean }) {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label="Toggle language"
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-wide transition-colors ${
        dark
          ? "border-petrole/30 text-petrole hover:border-corail hover:text-corail"
          : "border-white/40 text-white/90 hover:border-corail hover:text-corail"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.2 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.2-3.3-8.5S9.8 5.8 12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      {lang.toUpperCase()}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const dict = useDict();
  const [open, setOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const NAV_LINKS = [
    { label: dict.nav.accueil, href: "/#" },
    { label: dict.nav.agence, href: "/agence" },
    { label: dict.nav.services, href: "/services" },
    { label: dict.nav.realisations, href: "/realisations" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  // Only the homepage has a tall hero to scroll past - everywhere else the
  // header always sits in its floating, "past hero" style.
  const pastHero = isHome ? scrolledPastHero : true;

  useEffect(() => {
    if (!isHome) return;
    const marker = document.getElementById("hero-end");
    if (!marker) return;

    const update = () => {
      setScrolledPastHero(marker.getBoundingClientRect().top <= 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  const isActive = (href: string) => href === pathname;

  return (
    <>
      {/* While in the hero: a plain full-width bar, matching the original
          design. Once scrolled past it (or on any page without a hero): a
          floating glass pill that stays visible all the way to the bottom
          of the page. */}
      <header
        className={`fixed inset-x-0 top-0 z-[150] flex justify-center ${
          pastHero ? "px-4 pt-4 md:px-6 md:pt-6" : "px-0 pt-0"
        }`}
      >
        <GlassSurface
          active={pastHero}
          blur={7}
          distortionScale={18}
          className={`flex w-full items-center justify-between transition-all duration-500 ${
            pastHero
              ? "max-w-5xl rounded-full border border-white/40 bg-white/70 px-5 py-3 shadow-lg shadow-black/10 md:px-8 md:py-4"
              : "rounded-none border-transparent bg-transparent px-6 py-5 md:px-10 md:py-7"
          }`}
        >
          <Link href="/" className="relative block h-7 w-32 md:h-8 md:w-36">
            <Image
              src={pastHero ? siteImages.logos.color : siteImages.logos.white}
              alt="Toolègba"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>

          <nav
            className={`hidden gap-8 font-sans text-sm md:flex ${
              pastHero ? "text-petrole" : "text-white/90"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-corail ${
                  isActive(link.href) ? "font-semibold text-corail" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <LanguageToggle dark={pastHero} />
          </div>

          {/* Mobile: opens the full-screen menu, same icon-button pattern as the reference site */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-petrole text-white transition-colors hover:bg-corail md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </GlassSurface>
      </header>

      {/* Full-screen mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-petrole px-6 py-5 md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative block h-9 w-40" onClick={() => setOpen(false)}>
              <Image
                src={siteImages.logos.white}
                alt="Toolègba"
                fill
                className="object-contain object-left"
              />
            </Link>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-petrole transition-colors hover:bg-corail hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="mt-16 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/20 py-6 font-display text-4xl transition-colors hover:text-corail ${
                  isActive(link.href) ? "text-corail" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
