import type { Product } from "@/lib/commerce";
import { isProductSoldOut } from "@/lib/commerce";
import { getMoneyRange } from "@/lib/utilities";
import type {
  CollectionFilter,
  CollectionFilterKey,
  FilterOption,
} from "@/types/collection";

export function normalizeFilterValue(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function optionCounts(values: readonly string[]): readonly FilterOption[] {
  const options = new Map<string, FilterOption>();

  for (const value of values) {
    const normalized = normalizeFilterValue(value);
    const current = options.get(normalized);

    options.set(normalized, {
      value: normalized,
      label: current?.label ?? value,
      count: (current?.count ?? 0) + 1,
    });
  }

  return Array.from(options.values());
}

function productOptions(
  products: readonly Product[],
  valuesForProduct: (product: Product) => readonly string[],
): readonly FilterOption[] {
  const values = products.flatMap((product) =>
    Array.from(new Set(valuesForProduct(product))),
  );

  return optionCounts(values);
}

function multiSelectFilter(
  id: CollectionFilterKey,
  label: string,
  options: readonly FilterOption[],
): CollectionFilter | undefined {
  if (options.length <= 1) {
    return undefined;
  }

  return { id, label, type: "multi-select", options };
}

export function buildCollectionFilters(
  products: readonly Product[],
): readonly CollectionFilter[] {
  if (products.length === 0) {
    return [];
  }

  const sizeOptions = productOptions(products, (product) =>
    product.variants.flatMap((variant) => (variant.size ? [variant.size] : [])),
  );
  const colourOptions = productOptions(products, (product) =>
    product.variants.flatMap((variant) =>
      variant.color ? [variant.color] : [],
    ),
  );
  const typeOptions = productOptions(products, (product) =>
    product.productType ? [product.productType] : [],
  );
  const placementOptions = productOptions(products, (product) =>
    product.artworkPlacement ? [product.artworkPlacement] : [],
  );
  const availabilityOptions = optionCounts(
    products.map((product) =>
      isProductSoldOut(product) ? "Sold Out" : "Available Now",
    ),
  );
  const moneyRange = getMoneyRange(products.map((product) => product.price));
  const filters: Array<CollectionFilter | undefined> = [
    multiSelectFilter("size", "Size", sizeOptions),
    multiSelectFilter("colour", "Colour", colourOptions),
    multiSelectFilter("type", "Product Type", typeOptions),
    multiSelectFilter("placement", "Artwork Placement", placementOptions),
    multiSelectFilter(
      "availability",
      "Availability",
      availabilityOptions,
    ),
  ];

  if (moneyRange && moneyRange.min.amount !== moneyRange.max.amount) {
    filters.push({
      id: "price",
      label: "Price",
      type: "range",
      min: moneyRange.min,
      max: moneyRange.max,
    });
  }

  return filters.filter(
    (filter): filter is CollectionFilter => filter !== undefined,
  );
}
