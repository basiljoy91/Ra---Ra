import { DiscoveryCategoryList } from "@/components/commerce/discovery/discovery-category-list";
import { DiscoverySectionHeader } from "@/components/commerce/discovery/discovery-section-header";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { DiscoveryConfig } from "@/types/discovery";

interface HomepageDiscoveryProps {
  config: DiscoveryConfig;
}

const HEADING_ID = "homepage-discovery-title";

export function HomepageDiscovery({ config }: HomepageDiscoveryProps) {
  const visibleCategories = config.categories.filter(
    (category) => category.enabled !== false,
  );

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby={HEADING_ID}
      className="border-t border-border"
      spacing="md"
      tone="background"
    >
      <Container>
        <DiscoverySectionHeader
          description={config.description}
          eyebrow={config.eyebrow}
          heading={config.heading}
          headingId={HEADING_ID}
        />
        <div className="mt-10 md:mt-12">
          <DiscoveryCategoryList
            categories={visibleCategories}
            navigationLabel={config.navigationLabel}
          />
        </div>
      </Container>
    </Section>
  );
}
