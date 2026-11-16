import { CollectionSortControl } from "@/components/commerce/collections/collection-sort-control.client";
import { MobileFilterDrawer } from "@/components/commerce/collections/mobile-filter-drawer.client";
import type {
  CollectionFilter,
  CollectionQueryState,
} from "@/types/collection";

interface CollectionToolbarProps {
  collectionHandle: string;
  collectionLabel: string;
  filters: readonly CollectionFilter[];
  state: CollectionQueryState;
  activeCount: number;
  clearHref: string;
  filteredTotal: number;
  totalProducts: number;
  hasActiveQuery: boolean;
}

export function CollectionToolbar({
  collectionHandle,
  collectionLabel,
  filters,
  state,
  activeCount,
  clearHref,
  filteredTotal,
  totalProducts,
  hasActiveQuery,
}: CollectionToolbarProps) {
  return (
    <div className="grid gap-4 border-b border-border pb-6 sm:grid-cols-[minmax(0,1fr)_minmax(13rem,auto)] sm:items-end lg:border-[#cfc6bb] lg:pb-7">
      <div>
        <p className="type-label text-accent lg:text-[0.62rem] lg:tracking-[0.18em] lg:text-[#71685f]">
          <span className="lg:hidden">Shop / {collectionLabel}</span>
          <span className="hidden lg:inline">Shop / {collectionLabel}</span>
        </p>
        <h2
          className="type-subheading mt-1 font-semibold text-[#171513] lg:mt-2 lg:font-serif lg:text-[clamp(2.25rem,3.2vw,3.75rem)] lg:font-normal lg:leading-none lg:tracking-[-0.035em]"
          id="collection-products-heading"
        >
          <span className="lg:hidden">{collectionLabel} Collection</span>
          <span className="hidden lg:inline">Shop {collectionLabel}</span>
        </h2>
        <p
          aria-atomic="true"
          aria-live="polite"
          className="type-small mt-2 text-foreground-muted lg:text-sm lg:text-[#686057]"
          role="status"
        >
          {hasActiveQuery ? "Filtered to" : "Showing"} {filteredTotal} of {totalProducts}{" "}
          {totalProducts === 1 ? "product" : "products"}
        </p>
      </div>
      <div className="grid grid-cols-2 items-end gap-3 sm:flex sm:justify-end">
        <div className="lg:hidden">
          <MobileFilterDrawer
            activeCount={activeCount}
            clearHref={clearHref}
            currentResultCount={filteredTotal}
            filters={filters}
            state={state}
          />
        </div>
        <CollectionSortControl
          collectionHandle={collectionHandle}
          state={state}
        />
      </div>
    </div>
  );
}
