import { CollectionCardList } from "@/components/commerce/collection-navigation/collection-card-list";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { ShopByCollectionConfig } from "@/types/collection-card";

interface ShopByCollectionSectionProps {
  config: ShopByCollectionConfig;
}

const HEADING_ID = "shop-by-collection-heading";

export function ShopByCollectionSection({
  config,
}: ShopByCollectionSectionProps) {
  const visibleCollections = config.collections.filter(
    (collection) => collection.status !== "hidden",
  );

  if (visibleCollections.length === 0) {
    return null;
  }

  const labels = {
    activeCtaLabel: config.activeCtaLabel,
    activeStatusLabel: config.activeStatusLabel,
    comingSoonStatusLabel: config.comingSoonStatusLabel,
  };

  return (
    <Section
      aria-labelledby={HEADING_ID}
      className="border-t border-border"
      data-homepage-section="shop-by-collection"
      spacing="lg"
      tone="background"
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

        <CollectionCardList
          collections={visibleCollections}
          labels={labels}
        />
      </Container>
    </Section>
  );
}
