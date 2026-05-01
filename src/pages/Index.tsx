import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import PortfolioSection from "@/components/PortfolioSection";
import ToolsSection from "@/components/ToolsSection";
import ContactSection from "@/components/ContactSection";
import { useCursorHint } from "@/hooks/useCursorHint";

const Index = () => {
  useCursorHint();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="noise-overlay" />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <PortfolioSection />
      <ToolsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
