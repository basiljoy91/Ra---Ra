export const TEST_PRODUCT_PRICE_INR = "699.00";

export type TestSize = "S" | "M" | "L" | "XL" | "XXL";

type SizeInventory = Readonly<Record<TestSize, number>>;

/**
 * Test inventory transcribed from the Quantity Plan sheet in the supplied RFQ
 * workbook. "Beyond Time" maps to the storefront's "Past Present Beyond"
 * artwork name.
 */
export const testInventoryByProductHandle: Readonly<
  Record<string, SizeInventory>
> = {
  "past-present-beyond-sculptural-boxy-black": { S: 3, M: 6, L: 7, XL: 5, XXL: 2 },
  "beyond-reality-sculptural-boxy-black": { S: 3, M: 6, L: 7, XL: 5, XXL: 2 },
  "beyond-fear-sculptural-boxy-black": { S: 3, M: 6, L: 7, XL: 4, XXL: 2 },
  "beyond-limits-sculptural-boxy-black": { S: 3, M: 6, L: 7, XL: 4, XXL: 2 },
  "past-present-beyond-washed-art-charcoal": { S: 2, M: 4, L: 5, XL: 3, XXL: 1 },
  "beyond-reality-washed-art-charcoal": { S: 2, M: 4, L: 5, XL: 3, XXL: 1 },
  "beyond-fear-washed-art-charcoal": { S: 2, M: 4, L: 5, XL: 3, XXL: 1 },
  "beyond-limits-washed-art-charcoal": { S: 2, M: 4, L: 5, XL: 3, XXL: 1 },
  "past-present-beyond-signature-regular-off-white": { S: 3, M: 8, L: 9, XL: 5, XXL: 2 },
  "beyond-reality-signature-regular-off-white": { S: 3, M: 7, L: 9, XL: 5, XXL: 2 },
  "beyond-fear-signature-regular-off-white": { S: 3, M: 7, L: 9, XL: 5, XXL: 2 },
  "beyond-limits-signature-regular-off-white": { S: 3, M: 7, L: 9, XL: 5, XXL: 2 },
  "past-present-beyond-relaxed-essential-chocolate": { S: 2, M: 3, L: 4, XL: 2, XXL: 1 },
  "beyond-reality-relaxed-essential-chocolate": { S: 1, M: 3, L: 4, XL: 2, XXL: 1 },
  "beyond-fear-relaxed-essential-chocolate": { S: 1, M: 3, L: 4, XL: 2, XXL: 1 },
  "beyond-limits-relaxed-essential-chocolate": { S: 1, M: 3, L: 4, XL: 2, XXL: 1 },
};
