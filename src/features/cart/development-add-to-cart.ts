"use server";

import { developmentProducts } from "@/data/development/mock-commerce";
import type {
  AddToCartHandler,
  AddToCartInput,
  AddToCartResult,
} from "@/types/product-detail";

export const developmentAddToCart: AddToCartHandler = async (
  input: AddToCartInput,
): Promise<AddToCartResult> => {
  const product = developmentProducts.find(
    (candidate) => candidate.id === input.productId,
  );
  const variant = product?.variants.find(
    (candidate) => candidate.id === input.variantId,
  );

  if (!product || !variant || !variant.available || input.quantity < 1) {
    return {
      status: "error",
      message: "Choose an available development variant and try again.",
    };
  }

  return {
    status: "success",
    message: "Development selection confirmed. No cart was updated.",
  };
};
