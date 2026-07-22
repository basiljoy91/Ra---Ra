import type {
  CollectionFilterKey,
  CollectionQueryState,
  CollectionSearchParams,
} from "@/types/collection";

export const COLLECTION_FILTER_KEYS = [
  "size",
  "colour",
  "type",
  "placement",
  "availability",
] as const satisfies readonly CollectionFilterKey[];

const COLLECTION_QUERY_KEY_ORDER = [
  ...COLLECTION_FILTER_KEYS,
  "price-min",
  "price-max",
  "sort",
  "page",
] as const;

export function searchParamsToEntries(
  searchParams: CollectionSearchParams,
): Array<[string, string]> {
  return Object.entries(searchParams).flatMap(([key, value]) => {
    if (value === undefined) {
      return [];
    }

    return (Array.isArray(value) ? value : [value]).map(
      (item) => [key, item] as [string, string],
    );
  });
}

export function canonicalizeCollectionParams(
  entries: Iterable<[string, string]>,
): URLSearchParams {
  const allowedKeys = new Set<string>(COLLECTION_QUERY_KEY_ORDER);
  const valuesByKey = new Map<string, string[]>();

  for (const [key, rawValue] of entries) {
    const value = rawValue.trim();

    if (!allowedKeys.has(key) || value.length === 0) {
      continue;
    }

    valuesByKey.set(key, [...(valuesByKey.get(key) ?? []), value]);
  }

  const params = new URLSearchParams();

  for (const key of COLLECTION_QUERY_KEY_ORDER) {
    const values = Array.from(new Set(valuesByKey.get(key) ?? []));

    if (key === "sort") {
      const value = values.at(-1);
      if (value && value !== "featured") {
        params.set(key, value);
      }
      continue;
    }

    if (key === "page") {
      const value = values.at(-1);
      if (value && value !== "1") {
        params.set(key, value);
      }
      continue;
    }

    if (key === "price-min" || key === "price-max") {
      const value = values.at(-1);
      if (value) {
        params.set(key, value);
      }
      continue;
    }

    values.sort().forEach((value) => params.append(key, value));
  }

  return params;
}

export function buildCollectionHref(
  handle: string,
  state: CollectionQueryState,
  overrides: {
    sort?: CollectionQueryState["sort"];
    page?: number;
    priceMin?: string | undefined;
    priceMax?: string | undefined;
    selected?: CollectionQueryState["selected"];
  } = {},
): string {
  const selected = overrides.selected ?? state.selected;
  const entries: Array<[string, string]> = [];

  for (const key of COLLECTION_FILTER_KEYS) {
    for (const value of selected[key]) {
      entries.push([key, value]);
    }
  }

  const priceMin =
    "priceMin" in overrides ? overrides.priceMin : state.priceMin;
  const priceMax =
    "priceMax" in overrides ? overrides.priceMax : state.priceMax;
  const sort = overrides.sort ?? state.sort;
  const page = overrides.page ?? state.page;

  if (priceMin) {
    entries.push(["price-min", priceMin]);
  }
  if (priceMax) {
    entries.push(["price-max", priceMax]);
  }
  entries.push(["sort", sort]);
  entries.push(["page", String(page)]);

  const query = canonicalizeCollectionParams(entries).toString();
  const base = `/collections/${handle}`;

  return query ? `${base}?${query}` : base;
}
