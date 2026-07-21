import { HeroContent } from "@/components/storytelling/hero-content";
import { HeroMedia } from "@/components/storytelling/hero-media";
import { HeroOverlay } from "@/components/storytelling/hero-overlay";
import { cn } from "@/lib/utilities";
import type { HeroConfig } from "@/types/hero";

interface CampaignHeroProps {
  config: HeroConfig;
}

const HEADING_ID = "homepage-hero-title";

export function CampaignHero({ config }: CampaignHeroProps) {
  const theme = config.theme ?? "light";

  return (
    <section
      aria-labelledby={HEADING_ID}
      className={cn(
        "campaign-hero relative isolate overflow-hidden",
        theme === "dark" ? "bg-primary" : "bg-surface",
      )}
    >
      <HeroMedia media={config.media} />
      <HeroOverlay theme={theme} />
      <HeroContent config={config} headingId={HEADING_ID} />
    </section>
  );
}
