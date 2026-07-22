import type { Money, Product } from "@/lib/commerce";
import { isProductSoldOut } from "@/lib/commerce";
import { normalizeFilterValue } from "@/lib/collections/facets";
import { COLLECTION_FILTER_KEYS } from "@/lib/collections/query-params";
import { compareMoney } from "@/lib/utilities";
import type {
  CollectionFilter,
  CollectionFilterKey,
  CollectionQueryResult,
  CollectionQueryState,
  CollectionSearchParams,
  CollectionSort,
} from "@/types/collection";

const SORT_OPTIONS = new Set<CollectionSort>([
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "title-asc",
]);
const DECIMAL_PATTERN = /^\d+(?:\.\d{1,2})?$/;

export const DEVELOPMENT_COLLECTION_PAGE_SIZE = 4;

function rawValues(
  searchParams: CollectionSearchParams,
  key: string,
): readonly string[] {
  const rawValue = searchParams[key];

  if (rawValue === undefined) {
    return [];
  }

  return (Array.isArray(rawValue) ? rawValue : [rawValue]).flatMap((value) =>
    value.split(","),
  );
}

function validOptionsFor(
  filters: readonly CollectionFilter[],
  key: CollectionFilterKey,
): ReadonlySet<string> {
  const filter = filters.find(
    (candidate) => candidate.id === key && candidate.type === "multi-select",
  );

  return new Set(filter?.type === "multi-select" ? filter.options.map((option) => option.value) : []);
}

function decimalValue(value: string | undefined): string | undefined {
  const candidate = value?.trim();
  return candidate && DECIMAL_PATTERN.test(candidate) ? candidate : undefined;
}

export function parseCollectionQuery(
  searchParams: CollectionSearchParams,
  filters: readonly CollectionFilter[],
): CollectionQueryState {
  const selected = COLLECTION_FILTER_KEYS.reduce<
    Record<CollectionFilterKey, readonly string[]>
  >(
    (result, key) => {
      const allowed = validOptionsFor(filters, key);
      const values = rawValues(searchParams, key)
        .map(normalizeFilterValue)
        .filter((value) => allowed.has(value));

      return { ...result, [key]: Array.from(new Set(values)).sort() };
    },
    {
      size: [],
      colour: [],
      type: [],
      placement: [],
      availability: [],
    },
  );
  const rawSort = rawValues(searchParams, "sort").at(-1);
  const sort = SORT_OPTIONS.has(rawSort as CollectionSort)
    ? (rawSort as CollectionSort)
    : "featured";
  const parsedPage = Number.parseInt(rawValues(searchParams, "page").at(-1) ?? "1", 10);
  const priceMin = decimalValue(rawValues(searchParams, "price-min").at(-1));
  const priceMax = decimalValue(rawValues(searchParams, "price-max").at(-1));

  return {
    sort,
    selected,
    ...(priceMin ? { priceMin } : {}),
    ...(priceMax ? { priceMax } : {}),
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1,
  };
}

function productValues(product: Product, key: CollectionFilterKey): readonly string[] {
  switch (key) {
    case "size":
      return product.variants.flatMap((variant) =>
        variant.size ? [normalizeFilterValue(variant.size)] : [],
      );
    case "colour":
      return product.variants.flatMap((variant) =>
        variant.color ? [normalizeFilterValue(variant.color)] : [],
      );
    case "type":
      return product.productType
        ? [normalizeFilterValue(product.productType)]
        : [];
    case "placement":
      return product.artworkPlacement
        ? [normalizeFilterValue(product.artworkPlacement)]
        : [];
    case "availability":
      return [isProductSoldOut(product) ? "sold-out" : "available-now"];
  }
}

function matchesSelectedFilters(
  product: Product,
  state: CollectionQueryState,
): boolean {
  return COLLECTION_FILTER_KEYS.every((key) => {
    const selected = state.selected[key];

    if (selected.length === 0) {
      return true;
    }

    const values = new Set(productValues(product, key));
    return selected.some((value) => values.has(value));
  });
}

function matchesPrice(product: Product, state: CollectionQueryState): boolean {
  const currencyCode = product.price.currencyCode;
  const min: Money | undefined = state.priceMin
    ? { amount: state.priceMin, currencyCode }
    : undefined;
  const max: Money | undefined = state.priceMax
    ? { amount: state.priceMax, currencyCode }
    : undefined;

  if (min) {
    const compared = compareMoney(product.price, min);
    if (compared !== null && compared < 0) {
      return false;
    }
  }

  if (max) {
    const compared = compareMoney(product.price, max);
    if (compared !== null && compared > 0) {
      return false;
    }
  }

  return true;
}

function sortProducts(
  products: readonly Product[],
  sort: CollectionSort,
): readonly Product[] {
  const indexed = products.map((product, index) => ({ product, index }));

  indexed.sort((left, right) => {
    if (sort === "featured") {
      return left.index - right.index;
    }

    if (sort === "newest") {
      const newDifference = Number(Boolean(right.product.isNew)) - Number(Boolean(left.product.isNew));
      return newDifference || left.index - right.index;
    }

    if (sort === "title-asc") {
      return left.product.title.localeCompare(right.product.title, "en", {
        sensitivity: "base",
      });
    }

    const comparison = compareMoney(left.product.price, right.product.price) ?? 0;
    return sort === "price-desc" ? -comparison : comparison;
  });

  return indexed.map(({ product }) => product);
}

export function queryCollectionProducts(
  products: readonly Product[],
  state: CollectionQueryState,
  pageSize = DEVELOPMENT_COLLECTION_PAGE_SIZE,
): CollectionQueryResult {
  const filteredProducts = sortProducts(
    products.filter(
      (product) =>
        matchesSelectedFilters(product, state) && matchesPrice(product, state),
    ),
    state.sort,
  );
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const page = totalPages === 0 ? 1 : Math.min(state.page, totalPages);
  const start = (page - 1) * pageSize;

  return {
    products: filteredProducts.slice(start, start + pageSize),
    filteredProducts,
    totalProducts: products.length,
    filteredTotal: filteredProducts.length,
    page,
    totalPages,
    pageSize,
  };
}

export function countActiveFilters(state: CollectionQueryState): number {
  const selectedCount = COLLECTION_FILTER_KEYS.reduce(
    (count, key) => count + state.selected[key].length,
    0,
  );

  return selectedCount + Number(Boolean(state.priceMin)) + Number(Boolean(state.priceMax));
}

export function hasFacetedCollectionQuery(
  searchParams: CollectionSearchParams,
): boolean {
  return [
    ...COLLECTION_FILTER_KEYS,
    "price-min",
    "price-max",
    "sort",
    "page",
  ].some((key) => rawValues(searchParams, key).length > 0);
}

export function getFilterLabel(
  filters: readonly CollectionFilter[],
  key: CollectionFilterKey,
  value: string,
): string {
  const filter = filters.find(
    (candidate) => candidate.id === key && candidate.type === "multi-select",
  );

  if (!filter || filter.type !== "multi-select") {
    return value;
  }

  return filter.options.find((option) => option.value === value)?.label ?? value;
}

export function removeSelectedFilter(
  state: CollectionQueryState,
  key: CollectionFilterKey,
  value: string,
): CollectionQueryState["selected"] {
  return {
    ...state.selected,
    [key]: state.selected[key].filter((candidate) => candidate !== value),
  };
}

export function emptySelectedFilters(): CollectionQueryState["selected"] {
  return {
    size: [],
    colour: [],
    type: [],
    placement: [],
    availability: [],
  };
}
