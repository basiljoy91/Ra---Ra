import { ActiveFilterSummary } from "@/components/commerce/collections/active-filter-summary";
import { CollectionEmptyState } from "@/components/commerce/collections/collection-empty-state";
import { CollectionPagination } from "@/components/commerce/collections/collection-pagination";
import { CollectionProductGrid } from "@/components/commerce/collections/collection-product-grid";
import { CollectionToolbar } from "@/components/commerce/collections/collection-toolbar";
import { DesktopFilterPanel } from "@/components/commerce/collections/desktop-filter-panel.client";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  buildCollectionHref,
  countActiveFilters,
  emptySelectedFilters,
} from "@/lib/collections";
import type {
  CollectionFilter,
  CollectionQueryResult,
  CollectionQueryState,
} from "@/types/collection";
import type { ProductCardQuickAddHandler } from "@/types/product-card";

interface CollectionResultsProps {
  collectionHandle: string;
  collectionLabel: string;
  filters: readonly CollectionFilter[];
  query: CollectionQueryResult;
  quickAddAction?: ProductCardQuickAddHandler;
  state: CollectionQueryState;
}

export function CollectionResults({
  collectionHandle,
  collectionLabel,
  filters,
  query,
  quickAddAction,
  state,
}: CollectionResultsProps) {
  const activeCount = countActiveFilters(state);
  const clearHref = buildCollectionHref(collectionHandle, state, {
    selected: emptySelectedFilters(),
    priceMin: undefined,
    priceMax: undefined,
    page: 1,
  });
  const collectionHref = `/collections/${collectionHandle}`;

  return (
    <Section
      aria-labelledby="collection-products-heading"
      spacing="md"
      tone="background"
    >
      <Container>
        <CollectionToolbar
          activeCount={activeCount}
          clearHref={clearHref}
          collectionHandle={collectionHandle}
          filteredTotal={query.filteredTotal}
          filters={filters}
          state={state}
          totalProducts={query.totalProducts}
        />
        <p className="type-caption mt-4 max-w-3xl border-l-2 border-accent pl-3 text-foreground-muted">
          Development fixture: pagination uses four records per page to verify URL and navigation behavior.
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
          <DesktopFilterPanel
            activeCount={activeCount}
            clearHref={clearHref}
            filters={filters}
            key={`${state.sort}-${state.page}-${activeCount}-${state.priceMin ?? ""}-${state.priceMax ?? ""}`}
            state={state}
          />
          <div className="min-w-0">
            <ActiveFilterSummary
              clearHref={clearHref}
              collectionHandle={collectionHandle}
              filters={filters}
              state={state}
            />
            {query.products.length > 0 ? (
              <>
                <CollectionProductGrid
                  collectionLabel={collectionLabel}
                  products={query.products}
                  {...(quickAddAction ? { quickAddAction } : {})}
                />
                <CollectionPagination
                  collectionHandle={collectionHandle}
                  page={query.page}
                  state={state}
                  totalPages={query.totalPages}
                />
              </>
            ) : (
              <div className="mt-8">
                <CollectionEmptyState
                  clearHref={clearHref}
                  collectionHref={collectionHref}
                  kind="no-matches"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
