import type { ProductBadgeKind } from "@/types/product-card";

interface ProductBadgeDefinition {
  label: string;
  className: string;
}

export const productBadgeDefinitions = {
  "sold-out": {
    label: "Sold Out",
    className: "border-primary bg-primary text-primary-foreground",
  },
  new: {
    label: "New",
    className: "border-border bg-surface text-foreground",
  },
  "best-seller": {
    label: "Best Seller",
    className: "border-accent bg-accent text-primary-foreground",
  },
  "limited-edition": {
    label: "Limited Edition",
    className: "border-border bg-accent-soft text-foreground",
  },
} as const satisfies Record<ProductBadgeKind, ProductBadgeDefinition>;

interface ProductColourDefinition {
  swatchClassName: string;
}

const productColourDefinitions: Record<string, ProductColourDefinition> = {
  black: { swatchClassName: "border-foreground bg-foreground" },
  white: { swatchClassName: "border-border bg-surface" },
  charcoal: { swatchClassName: "border-primary bg-primary" },
  oatmeal: { swatchClassName: "border-border bg-accent-soft" },
};

const fallbackProductColour: ProductColourDefinition = {
  swatchClassName: "border-border bg-surface-muted",
};

export function getProductColourDefinition(
  value: string,
): ProductColourDefinition {
  return productColourDefinitions[value.trim().toLowerCase()] ?? fallbackProductColour;
}
