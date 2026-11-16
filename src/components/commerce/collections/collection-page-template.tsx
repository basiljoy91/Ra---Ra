import { CollectionEmptyState } from "@/components/commerce/collections/collection-empty-state";
import { CollectionHero } from "@/components/commerce/collections/collection-hero";
import { CollectionIntroduction } from "@/components/commerce/collections/collection-introduction";
import { CollectionResults } from "@/components/commerce/collections/collection-results";
import { CollectionStorySections } from "@/components/commerce/collections/collection-story-sections";
import { CollectionShortcuts } from "@/components/commerce/collections/collection-shortcuts";
import { CollectionDesktopTail } from "@/components/commerce/collections/collection-desktop-tail";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type {
  CollectionCatalogEntry,
  CollectionFilter,
  CollectionQueryResult,
  CollectionQueryState,
} from "@/types/collection";
import type { ProductCardQuickAddHandler } from "@/types/product-card";

interface CollectionPageTemplateProps {
  entry: CollectionCatalogEntry;
  filters: readonly CollectionFilter[];
  query: CollectionQueryResult;
  quickAddAction?: ProductCardQuickAddHandler;
  state: CollectionQueryState;
}

export function CollectionPageTemplate({
  entry,
  filters,
  query,
  quickAddAction,
  state,
}: CollectionPageTemplateProps) {
  const active = entry.status === "active";

  return (
    <>
      <CollectionHero
        entry={entry}
        {...(active ? { productCount: query.totalProducts } : {})}
      />
      <CollectionShortcuts products={entry.collection.products} />
      <div className="lg:hidden">
        <CollectionIntroduction entry={entry} />
        <CollectionStorySections products={entry.collection.products} />
      </div>
      {active ? (
        <>
          <CollectionResults
            collectionHandle={entry.collection.handle}
            collectionLabel={entry.collection.title}
            filters={filters}
            query={query}
            state={state}
            {...(quickAddAction ? { quickAddAction } : {})}
          />
          <CollectionDesktopTail image={entry.story.heroMedia?.desktop} />
        </>
      ) : (
        <Section spacing="md" tone="background">
          <Container>
            <CollectionEmptyState
              collectionHref={`/collections/${entry.collection.handle}`}
              kind="collection-empty"
            />
          </Container>
        </Section>
      )}
    </>
  );
}
