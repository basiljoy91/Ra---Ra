import { CollectionCategoryTabs } from "@/components/commerce/collections/collection-category-tabs";
import { CollectionEmptyState } from "@/components/commerce/collections/collection-empty-state";
import { CollectionHero } from "@/components/commerce/collections/collection-hero";
import { CollectionMaterialBanner } from "@/components/commerce/collections/collection-material-banner";
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
      <CollectionCategoryTabs
        collectionHandle={entry.collection.handle}
        products={entry.collection.products}
        state={state}
      />
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
          <CollectionMaterialBanner products={entry.collection.products} />
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
