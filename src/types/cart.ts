import type { Cart, Money, ProductImage } from "@/lib/commerce";

export type CartReadResult =
  | { status: "success"; configured: boolean; cart: Cart | null }
  | { status: "error"; configured: boolean; message: string };

export type CartMutationResult =
  | { status: "success"; cart: Cart; message?: string }
  | { status: "error"; message: string };

export type CheckoutResult =
  | { status: "success"; checkoutUrl: string }
  | { status: "error"; message: string };

export interface GiftWrapService {
  variantId: string;
  productHandle: string;
  title: string;
  price: Money;
  image?: ProductImage;
  available: boolean;
}

export interface FreeShippingThreshold {
  countryCode: string;
  threshold: Money;
  basis: "shopify-subtotal" | "merchandise-excluding-gift-wrap";
}
