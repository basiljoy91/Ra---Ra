import { CollectionEmptyState } from "@/components/commerce/collections/collection-empty-state";
import { CollectionHero } from "@/components/commerce/collections/collection-hero";
import { CollectionIntroduction } from "@/components/commerce/collections/collection-introduction";
import { CollectionResults } from "@/components/commerce/collections/collection-results";
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
      <CollectionIntroduction entry={entry} />
      {active ? (
        <CollectionResults
          collectionHandle={entry.collection.handle}
          collectionLabel={`${entry.collection.title} — Development`}
          filters={filters}
          query={query}
          state={state}
          {...(quickAddAction ? { quickAddAction } : {})}
        />
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
