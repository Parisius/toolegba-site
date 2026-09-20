"use client";

import { useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import { getAbout, getContact, getServices, getServicesPage } from "@/lib/content";
import { getRealisationsPage } from "@/lib/realisations";

/** Language-aware readers for the per-page content files in /content. */
export const useServices = () => {
  const { lang } = useLanguage();
  return useMemo(() => getServices(lang), [lang]);
};
export const useServicesPage = () => getServicesPage(useLanguage().lang);
export const useAbout = () => getAbout(useLanguage().lang);
export const useContact = () => getContact(useLanguage().lang);
export const useRealisationsPage = () => getRealisationsPage(useLanguage().lang);
