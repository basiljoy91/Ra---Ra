import type { Cart } from "@/lib/commerce";

export type CartReadResult =
  | { status: "success"; configured: boolean; cart: Cart | null }
  | { status: "error"; configured: boolean; message: string };

export type CartMutationResult =
  | { status: "success"; cart: Cart; message?: string }
  | { status: "error"; message: string };

export type CheckoutResult =
  | { status: "success"; checkoutUrl: string }
  | { status: "error"; message: string };
