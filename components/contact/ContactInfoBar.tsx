"use client";

import { useDict } from "@/lib/language/LanguageProvider";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
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
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
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

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactInfoBar() {
  const { contactPage, siteInfo } = useDict();
  const { infoBar } = contactPage;

  return (
    <section className="relative z-[100] bg-ivoire px-6 pb-16 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 border-t border-petrole/10 pt-10 md:grid-cols-4">
        <a href={`mailto:${siteInfo.email}`} className="group text-center md:text-left">
          <span className="mx-auto flex h-10 w-10 items-center justify-center text-petrole/40 transition-colors duration-300 group-hover:text-corail md:mx-0">
            <MailIcon />
          </span>
          <p className="mt-3 text-xs uppercase tracking-wide text-petrole/50">{infoBar.email}</p>
          <p className="mt-1 font-sans text-sm font-medium text-petrole transition-colors duration-300 group-hover:text-corail md:text-base">
            {siteInfo.email}
          </p>
        </a>

        <div className="text-center md:text-left">
          <span className="mx-auto flex h-10 w-10 items-center justify-center text-petrole/40 md:mx-0">
            <PhoneIcon />
          </span>
          <p className="mt-3 text-xs uppercase tracking-wide text-petrole/50">{infoBar.phone}</p>
          <a
            href={`tel:${siteInfo.phoneHref}`}
            className="mt-1 block font-sans text-sm font-medium text-petrole transition-colors hover:text-corail md:text-base"
          >
            {siteInfo.phone} <span className="text-petrole/50">({siteInfo.phoneCountry})</span>
          </a>
          <a
            href={`tel:${siteInfo.phoneCIHref}`}
            className="font-sans text-sm font-medium text-petrole transition-colors hover:text-corail md:text-base"
          >
            {siteInfo.phoneCI} <span className="text-petrole/50">({siteInfo.phoneCICountry})</span>
          </a>
        </div>

        <div className="text-center md:text-left">
          <span className="mx-auto flex h-10 w-10 items-center justify-center text-petrole/40 md:mx-0">
            <PinIcon />
          </span>
          <p className="mt-3 text-xs uppercase tracking-wide text-petrole/50">{infoBar.office}</p>
          <p className="mt-1 font-sans text-sm font-medium text-petrole md:text-base">{siteInfo.addressShort}</p>
        </div>

        <div className="text-center md:text-left">
          <span className="mx-auto flex h-10 w-10 items-center justify-center text-petrole/40 md:mx-0">
            <ClockIcon />
          </span>
          <p className="mt-3 text-xs uppercase tracking-wide text-petrole/50">{infoBar.hours}</p>
          <p className="mt-1 font-sans text-sm font-medium text-petrole md:text-base">{siteInfo.hours}</p>
        </div>
      </div>
    </section>
  );
}
