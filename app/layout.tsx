import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClickSpark from "@/components/reactbits/ClickSpark";
import GreetingIntro from "@/components/reactbits/GreetingIntro";
import PageTransition from "@/components/reactbits/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/lib/language/LanguageProvider";

// Self-hosted brand fonts (from the charte graphique): League Spartan for
// display/headline text, Poppins for body copy. Self-hosting avoids a
// runtime dependency on Google Fonts and keeps visitor data off Google's
// servers.
const leagueSpartan = localFont({
  src: "../public/fonts/LeagueSpartan-Variable.ttf",
  weight: "500 800",
  variable: "--font-league-spartan",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "../public/fonts/Poppins-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toolègba — Groupe Panafricain BTL",
  description:
    "Toolègba, groupe panafricain BTL actif depuis 2014 au Bénin, en Côte d'Ivoire, au Cameroun, en Guinée Conakry, au Togo et au Sénégal. Trade marketing, distribution et activation terrain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${leagueSpartan.variable} ${poppins.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <GreetingIntro />
          <PageTransition />
          <ClickSpark />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}