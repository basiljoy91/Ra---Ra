import { CollectionSortControl } from "@/components/commerce/collections/collection-sort-control.client";
import { MobileFilterDrawer } from "@/components/commerce/collections/mobile-filter-drawer.client";
import type {
  CollectionFilter,
  CollectionQueryState,
} from "@/types/collection";

interface CollectionToolbarProps {
  collectionHandle: string;
  filters: readonly CollectionFilter[];
  state: CollectionQueryState;
  activeCount: number;
  clearHref: string;
  filteredTotal: number;
  totalProducts: number;
}

export function CollectionToolbar({
  collectionHandle,
  filters,
  state,
  activeCount,
  clearHref,
  filteredTotal,
  totalProducts,
}: CollectionToolbarProps) {
  return (
    <div className="grid gap-4 border-y border-border py-5 sm:grid-cols-[minmax(0,1fr)_minmax(13rem,auto)] sm:items-end">
      <div>
        <p className="type-label text-accent">The Collection Edit</p>
        <h2
          className="type-subheading mt-1 font-semibold"
          id="collection-products-heading"
        >
          Development Products
        </h2>
        <p
          aria-live="polite"
          className="type-small mt-2 text-foreground-muted"
          role="status"
        >
          Showing {filteredTotal} of {totalProducts} development {totalProducts === 1 ? "product" : "products"}
        </p>
      </div>
      <div className="grid grid-cols-2 items-end gap-3 sm:flex sm:justify-end">
        <MobileFilterDrawer
          activeCount={activeCount}
          clearHref={clearHref}
          currentResultCount={filteredTotal}
          filters={filters}
          state={state}
        />
        <CollectionSortControl
          collectionHandle={collectionHandle}
          state={state}
        />
      </div>
    </div>
  );
}
