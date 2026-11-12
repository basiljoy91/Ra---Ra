"use server";

import type {
  ProductCardQuickAddHandler,
  QuickAddInput,
  QuickAddResult,
} from "@/types/product-card";

export const developmentQuickAdd: ProductCardQuickAddHandler = async (
  input: QuickAddInput,
): Promise<QuickAddResult> => {
  if (!input.productId || !input.variantId || input.quantity !== 1) {
    return {
      status: "error",
      message: "Choose an available development variant and try again.",
    };
  }

  return {
    status: "success",
    message: "Component preview only. Use a storefront product page to test the Shopify cart.",
  };
};
