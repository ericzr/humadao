import { HeroSection } from "./home/HeroSection";
import { StatsSection } from "./home/StatsSection";
import { FeaturesSection } from "./home/FeaturesSection";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </div>
  );
}
