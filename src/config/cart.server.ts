import "server-only";

import type { FreeShippingThreshold } from "@/types/cart";

const DECIMAL_PATTERN = /^\d+(?:\.\d{1,2})?$/;

export interface CartServiceConfiguration {
  giftWrapVariantId?: string;
  giftWrapProductHandle?: string;
}

export function getCartServiceConfiguration(): CartServiceConfiguration {
  const giftWrapVariantId = process.env.SHOPIFY_GIFT_WRAP_VARIANT_ID?.trim();
  const giftWrapProductHandle = process.env.SHOPIFY_GIFT_WRAP_PRODUCT_HANDLE?.trim();
  return {
    ...(giftWrapVariantId ? { giftWrapVariantId } : {}),
    ...(giftWrapProductHandle ? { giftWrapProductHandle } : {}),
  };
}

/**
 * Thresholds are opt-in business configuration. A market is omitted unless an
 * approved decimal threshold is supplied, so the storefront never invents a
 * free-shipping promise from the reference design.
 */
export function getFreeShippingThreshold(
  countryCode: string | undefined,
): FreeShippingThreshold | undefined {
  const country = countryCode?.trim().toUpperCase();
  if (!country) return undefined;
  const currencyCode = process.env[`SHOPIFY_FREE_SHIPPING_CURRENCY_${country}`]
    ?.trim()
    .toUpperCase();
  const value = process.env[`SHOPIFY_FREE_SHIPPING_THRESHOLD_${country}`]?.trim();
  const basis = process.env.SHOPIFY_FREE_SHIPPING_SUBTOTAL_BASIS?.trim();
  if (
    !currencyCode ||
    !/^[A-Z]{3}$/.test(currencyCode) ||
    !value ||
    !DECIMAL_PATTERN.test(value) ||
    (basis !== "shopify-subtotal" && basis !== "merchandise-excluding-gift-wrap")
  ) return undefined;
  return {
    countryCode: country,
    threshold: { amount: value, currencyCode },
    basis,
  };
}
