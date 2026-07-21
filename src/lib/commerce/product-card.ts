import type { Product } from "@/lib/commerce/types";
import type {
  ProductBadgeKind,
  ProductCardActionVariant,
  ProductColourOption,
} from "@/types/product-card";

export function isProductSoldOut(product: Product): boolean {
  return !product.variants.some((variant) => variant.available);
}

export function getProductBadges(
  product: Product,
  soldOut = isProductSoldOut(product),
): readonly ProductBadgeKind[] {
  if (soldOut) {
    return ["sold-out"];
  }

  const badges: ProductBadgeKind[] = [];

  if (product.isNew) {
    badges.push("new");
  }

  if (product.isBestSeller) {
    badges.push("best-seller");
  }

  if (product.isLimitedEdition) {
    badges.push("limited-edition");
  }

  return badges.slice(0, 2);
}

export function getProductColourOptions(
  product: Product,
): readonly ProductColourOption[] {
  const colours = new Map<string, ProductColourOption>();

  for (const variant of product.variants) {
    if (!variant.color) {
      continue;
    }

    const existing = colours.get(variant.color);
    colours.set(variant.color, {
      value: variant.color,
      label: variant.color,
      available: Boolean(existing?.available || variant.available),
    });
  }

  return Array.from(colours.values());
}

export function getProductCardActionVariants(
  product: Product,
): readonly ProductCardActionVariant[] {
  return product.variants.map((variant) => ({
    id: variant.id,
    title: variant.title,
    available: variant.available,
    ...(variant.size ? { size: variant.size } : {}),
    ...(variant.color ? { color: variant.color } : {}),
  }));
}
