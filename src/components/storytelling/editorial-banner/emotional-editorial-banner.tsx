import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { EditorialBannerContent } from "@/components/storytelling/editorial-banner/editorial-banner-content";
import { EditorialBannerMedia } from "@/components/storytelling/editorial-banner/editorial-banner-media";
import type { EditorialBannerConfig } from "@/types/editorial-banner";

interface EmotionalEditorialBannerProps {
  config: EditorialBannerConfig;
}

export function EmotionalEditorialBanner({
  config,
}: EmotionalEditorialBannerProps) {
  const headingId = `${config.id}-heading`;

  return (
    <Section
      aria-labelledby={headingId}
      className="border-t border-border"
      data-editorial-banner={config.id}
      spacing="lg"
      tone="background"
    >
      <Container>
        <div className="grid overflow-hidden rounded-[var(--radius-panel)] border border-border shadow-[var(--shadow-soft)] lg:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)]">
          <EditorialBannerMedia media={config.media} />
          <EditorialBannerContent config={config} headingId={headingId} />
        </div>
      </Container>
    </Section>
  );
}
