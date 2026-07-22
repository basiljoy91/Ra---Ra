import type {
  Product,
  ProductOption,
  ProductVariant,
  SelectedOption,
} from "@/lib/commerce/types";

export type VariantResolution =
  | { status: "incomplete"; missingOptions: readonly string[] }
  | { status: "available"; variant: ProductVariant }
  | { status: "unavailable"; variant: ProductVariant }
  | { status: "invalid" };

export type OptionValueAvailability = "available" | "unavailable" | "invalid";

function normalizeOptionName(name: string): string {
  const normalized = name.trim().toLowerCase();
  return normalized === "colour" ? "color" : normalized;
}

function hasSelectedOption(
  variant: ProductVariant,
  optionName: string,
  value: string,
): boolean {
  const normalizedName = normalizeOptionName(optionName);

  return variant.selectedOptions.some(
    (option) =>
      normalizeOptionName(option.name) === normalizedName &&
      option.value === value,
  );
}

function variantMatchesSelections(
  variant: ProductVariant,
  selections: Readonly<Record<string, string>>,
): boolean {
  return Object.entries(selections).every(([name, value]) =>
    hasSelectedOption(variant, name, value),
  );
}

export function getProductOptions(product: Product): readonly ProductOption[] {
  if (product.options?.length) {
    return product.options;
  }

  const options = new Map<string, { name: string; values: string[] }>();

  for (const variant of product.variants) {
    for (const selectedOption of variant.selectedOptions) {
      const key = normalizeOptionName(selectedOption.name);
      const current = options.get(key) ?? {
        name: selectedOption.name,
        values: [],
      };

      if (!current.values.includes(selectedOption.value)) {
        current.values.push(selectedOption.value);
      }

      options.set(key, current);
    }
  }

  return Array.from(options.entries()).map(([id, option]) => ({
    id,
    name: option.name,
    values: option.values,
  }));
}

export function getInitialProductSelections(
  product: Product,
): Readonly<Record<string, string>> {
  const options = getProductOptions(product);
  const selections: Record<string, string> = {};

  for (const option of product.defaultSelectedOptions ?? []) {
    const hasPurchasableMatch = product.variants.some(
      (variant) =>
        variant.available &&
        hasSelectedOption(variant, option.name, option.value),
    );

    if (hasPurchasableMatch) {
      selections[normalizeOptionName(option.name)] = option.value;
    }
  }

  for (const option of options) {
    const key = normalizeOptionName(option.name);
    const onlyValue = option.values.length === 1 ? option.values[0] : undefined;

    if (
      !selections[key] &&
      onlyValue &&
      product.variants.some(
        (variant) =>
          variant.available && hasSelectedOption(variant, option.name, onlyValue),
      )
    ) {
      selections[key] = onlyValue;
    }
  }

  return selections;
}

export function resolveProductVariant(
  product: Product,
  selections: Readonly<Record<string, string>>,
): VariantResolution {
  const options = getProductOptions(product);
  const missingOptions = options
    .filter((option) => !selections[normalizeOptionName(option.name)])
    .map((option) => option.name);

  if (missingOptions.length > 0) {
    return { status: "incomplete", missingOptions };
  }

  const variant = product.variants.find((candidate) =>
    variantMatchesSelections(candidate, selections),
  );

  if (!variant) {
    return { status: "invalid" };
  }

  return variant.available
    ? { status: "available", variant }
    : { status: "unavailable", variant };
}

export function getOptionValueAvailability(
  product: Product,
  selections: Readonly<Record<string, string>>,
  optionName: string,
  value: string,
): OptionValueAvailability {
  const optionKey = normalizeOptionName(optionName);
  const candidateSelections = Object.fromEntries(
    Object.entries(selections).filter(
      ([selectionName]) => normalizeOptionName(selectionName) !== optionKey,
    ),
  );
  candidateSelections[optionKey] = value;

  const matchingVariants = product.variants.filter((variant) =>
    variantMatchesSelections(variant, candidateSelections),
  );

  if (matchingVariants.some((variant) => variant.available)) {
    return "available";
  }

  return matchingVariants.length > 0 ? "unavailable" : "invalid";
}

export function getOptionSelectionKey(name: string): string {
  return normalizeOptionName(name);
}

export function selectedOptionsToRecord(
  options: readonly SelectedOption[],
): Readonly<Record<string, string>> {
  return Object.fromEntries(
    options.map((option) => [normalizeOptionName(option.name), option.value]),
  );
}
