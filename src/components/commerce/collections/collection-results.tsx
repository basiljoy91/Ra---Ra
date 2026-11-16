import { ActiveFilterSummary } from "@/components/commerce/collections/active-filter-summary";
import { CollectionEmptyState } from "@/components/commerce/collections/collection-empty-state";
import { CollectionMobileProductList } from "@/components/commerce/collections/collection-mobile-product-list";
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
  const sidebarActiveCount = activeCount - state.selected.type.length;
  const visibleFilters = filters.filter((filter) => filter.id !== "type");
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
      className="bg-[#f4efe8] py-8 [--accent:#171513] [--background:#f4efe8] [--border:#cfc6bb] [--button:#171513] [--button-foreground:#ffffff] [--foreground:#171513] [--foreground-muted:#686057] [--surface-muted:#e9e0d6] [--surface:#faf7f2] [color-scheme:light] md:py-10 lg:py-12"
      spacing="md"
      tone="background"
    >
      <Container>
        <CollectionToolbar
          activeCount={sidebarActiveCount}
          clearHref={clearHref}
          collectionHandle={collectionHandle}
          collectionLabel={collectionLabel}
          filteredTotal={query.filteredTotal}
          filters={visibleFilters}
          state={state}
          totalProducts={query.totalProducts}
          hasActiveQuery={activeCount > 0}
        />
        <div className="mt-7 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start xl:grid-cols-[15.5rem_minmax(0,1fr)] xl:gap-10">
          <DesktopFilterPanel
            activeCount={sidebarActiveCount}
            clearHref={clearHref}
            filters={visibleFilters}
            key={`${state.sort}-${state.page}-${sidebarActiveCount}-${state.priceMin ?? ""}-${state.priceMax ?? ""}`}
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
                <CollectionMobileProductList
                  products={query.products}
                  quickAddAction={quickAddAction}
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
