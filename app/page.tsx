import HeroStack from "@/components/HeroStack";
import BottomBar from "@/components/BottomBar";
import HeroAmbientGlow from "@/components/HeroAmbientGlow";
import AboutSection from "@/components/AboutSection";
import CraftReveal from "@/components/CraftReveal";
import ToolegbaDifference from "@/components/ToolegbaDifference";
import IndustriesSection from "@/components/IndustriesSection";
import RealisationsSection from "@/components/RealisationsSection";

export default function Home() {
  return (
    <main>
      <BottomBar />
      <HeroAmbientGlow />

      <HeroStack />
      <div id="hero-end" aria-hidden="true" className="h-px w-full" />

      {/* Scrolls up over the closing "Toolègba" slide, ending the hero stack. */}
      <AboutSection />

      {/* Full-bleed image that sharpens into focus on scroll. */}
      <CraftReveal />

      {/* Bento-grid section on what sets Toolègba apart. */}
      <ToolegbaDifference />

      {/* Fanned card presentation of the industries we work in. */}
      <IndustriesSection />

      {/* Filmstrip gallery + accurate map with hover-to-reveal key realisation. */}
      <RealisationsSection />
    </main>
  );
}
