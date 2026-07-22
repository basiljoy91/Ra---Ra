export interface AddToCartInput {
  productId: string;
  variantId: string;
  quantity: number;
}

export type AddToCartResult =
  | { status: "success"; message: string; cartCount?: number }
  | { status: "error"; message: string };

export type AddToCartHandler = (
  input: AddToCartInput,
) => Promise<AddToCartResult>;
