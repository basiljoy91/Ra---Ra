export const TEST_PRODUCT_PRICE_INR = "699.00";

export type TestSize = "S" | "M" | "L" | "XL" | "XXL";

/** Development-only sizes used when Shopify is not configured. */
export const developmentSizes: readonly TestSize[] = [
  "S",
  "M",
  "L",
  "XL",
  "XXL",
];
