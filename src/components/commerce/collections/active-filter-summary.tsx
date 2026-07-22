import Link from "next/link";

import {
  buildCollectionHref,
  COLLECTION_FILTER_KEYS,
  getFilterLabel,
  removeSelectedFilter,
} from "@/lib/collections";
import { formatMoney } from "@/lib/utilities";
import type {
  CollectionFilter,
  CollectionPriceFilter,
  CollectionQueryState,
} from "@/types/collection";

interface ActiveFilterSummaryProps {
  clearHref: string;
  collectionHandle: string;
  filters: readonly CollectionFilter[];
  state: CollectionQueryState;
}

export function ActiveFilterSummary({
  clearHref,
  collectionHandle,
  filters,
  state,
}: ActiveFilterSummaryProps) {
  const tokens = COLLECTION_FILTER_KEYS.flatMap((key) =>
    state.selected[key].map((value) => {
      const label = getFilterLabel(filters, key, value);
      return {
        id: `${key}-${value}`,
        label,
        href: buildCollectionHref(collectionHandle, state, {
          selected: removeSelectedFilter(state, key, value),
          page: 1,
        }),
      };
    }),
  );
  const priceFilter = filters.find(
    (filter): filter is CollectionPriceFilter => filter.type === "range",
  );
  const currencyCode = priceFilter?.min.currencyCode ?? "EUR";

  if (state.priceMin) {
    tokens.push({
      id: "price-min",
      label: `From ${formatMoney({ amount: state.priceMin, currencyCode })}`,
      href: buildCollectionHref(collectionHandle, state, {
        priceMin: undefined,
        page: 1,
      }),
    });
  }

  if (state.priceMax) {
    tokens.push({
      id: "price-max",
      label: `Up to ${formatMoney({ amount: state.priceMax, currencyCode })}`,
      href: buildCollectionHref(collectionHandle, state, {
        priceMax: undefined,
        page: 1,
      }),
    });
  }

  if (tokens.length === 0) {
    return null;
  }

  return (
    <div aria-label="Active filters" className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        {tokens.map((token) => (
          <Link
            aria-label={`Remove filter: ${token.label}`}
            className="type-caption inline-flex min-h-11 items-center rounded-full border border-border bg-surface px-4 font-semibold no-underline hover:border-foreground"
            href={token.href}
            key={token.id}
            scroll={false}
          >
            {token.label} <span aria-hidden="true" className="ml-2">×</span>
          </Link>
        ))}
        <Link
          className="type-caption inline-flex min-h-11 items-center px-2 font-semibold underline"
          href={clearHref}
          scroll={false}
        >
          Clear all
        </Link>
      </div>
    </div>
  );
}
