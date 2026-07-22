import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CommunityGrid } from "@/components/storytelling/community/community-grid";
import type { ContentStatus } from "@/lib/commerce";
import type { CommunityGridConfig, CommunityItem } from "@/types/community";

type CommunityGridSectionProps = {
  config: CommunityGridConfig;
  items: readonly CommunityItem[];
  contentStatus?: ContentStatus;
};

export function CommunityGridSection({
  config,
  items,
  contentStatus = "production",
}: CommunityGridSectionProps) {
  const headingId = `${config.id}-heading`;
  const approvedItems = items.filter(
    (item) => item.approvedForUse && item.contentStatus === contentStatus,
  );
  const visibleItems = config.itemLimit
    ? approvedItems.slice(0, config.itemLimit)
    : approvedItems;

  if (visibleItems.length === 0 && config.hideWhenEmpty !== false) {
    return null;
  }

  return (
    <Section
      spacing="lg"
      tone="surface"
      aria-labelledby={headingId}
      data-community-section
    >
      <Container>
        <div className="max-w-2xl">
          {config.eyebrow ? (
            <p className="type-label text-accent">{config.eyebrow}</p>
          ) : null}
          <h2 id={headingId} className="type-section-heading mt-3">
            {config.heading}
          </h2>
          {config.description ? (
            <p className="type-body mt-5 text-foreground-muted">
              {config.description}
            </p>
          ) : null}
        </div>

        {visibleItems.length > 0 ? (
          <CommunityGrid items={visibleItems} />
        ) : (
          <p className="type-small mt-[var(--space-8)] text-foreground-muted" role="status">
            {config.emptyMessage ??
              "Approved community imagery will appear here when available."}
          </p>
        )}
      </Container>
    </Section>
  );
}
