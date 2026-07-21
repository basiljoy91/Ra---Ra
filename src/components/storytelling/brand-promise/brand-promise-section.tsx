import { BrandPrincipleGrid } from "@/components/storytelling/brand-promise/brand-principle-grid";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { BrandPromiseConfig } from "@/types/brand-promise";

interface BrandPromiseSectionProps {
  config: BrandPromiseConfig;
}

const HEADING_ID = "brand-promise-heading";

export function BrandPromiseSection({
  config,
}: BrandPromiseSectionProps) {
  if (config.principles.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby={HEADING_ID}
      className="border-t border-border"
      data-homepage-section="brand-promise"
      spacing="lg"
      tone="muted"
    >
      <Container>
        <header className="max-w-3xl">
          {config.eyebrow ? (
            <p className="type-label text-accent">{config.eyebrow}</p>
          ) : null}
          <h2 className="type-section-heading mt-3" id={HEADING_ID}>
            {config.heading}
          </h2>
          {config.description ? (
            <p className="type-body mt-4 max-w-[44rem] text-foreground-muted">
              {config.description}
            </p>
          ) : null}
        </header>

        <BrandPrincipleGrid principles={config.principles} />
      </Container>
    </Section>
  );
}
