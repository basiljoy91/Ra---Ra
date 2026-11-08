"use server";

import { cookies, headers } from "next/headers";

import { developmentAddToCart } from "@/features/cart/development-add-to-cart";
import {
  addShopifyCartLine,
  createShopifyCart,
  getShopifyCart,
  removeShopifyCartLine,
  updateShopifyCartLine,
} from "@/lib/commerce/shopify/cart";
import { isShopifyConfigured } from "@/lib/commerce/shopify/config";
import type { CheckoutResult, CartMutationResult, CartReadResult } from "@/types/cart";
import type { AddToCartInput, AddToCartResult } from "@/types/product-detail";
import type { QuickAddInput, QuickAddResult } from "@/types/product-card";

const CART_COOKIE = "ra_shopify_cart";

async function getBuyerIp(): Promise<string | undefined> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || requestHeaders.get("x-real-ip") || undefined;
}

async function readCartId(): Promise<string | undefined> {
  return (await cookies()).get(CART_COOKIE)?.value;
}

async function saveCartId(cartId: string): Promise<void> {
  (await cookies()).set(CART_COOKIE, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

async function clearCartId(): Promise<void> {
  (await cookies()).delete(CART_COOKIE);
}

function errorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "The Shopify cart could not be updated. Try again.";
}

export async function getCartAction(): Promise<CartReadResult> {
  if (!isShopifyConfigured()) {
    return { status: "success", configured: false, cart: null };
  }

  const cartId = await readCartId();
  if (!cartId) {
    return { status: "success", configured: true, cart: null };
  }

  try {
    const cart = await getShopifyCart(cartId, await getBuyerIp());
    if (!cart) {
      await clearCartId();
    }
    return { status: "success", configured: true, cart };
  } catch (error) {
    return {
      status: "error",
      configured: true,
      message: errorMessage(error),
    };
  }
}

export async function commerceAddToCart(
  input: AddToCartInput,
): Promise<AddToCartResult> {
  if (!isShopifyConfigured()) {
    return developmentAddToCart(input);
  }

  if (!input.variantId || input.quantity < 1 || input.quantity > 99) {
    return { status: "error", message: "Choose a valid quantity and variant." };
  }

  try {
    const buyerIp = await getBuyerIp();
    const cartId = await readCartId();
    const existingCart = cartId
      ? await getShopifyCart(cartId, buyerIp)
      : null;
    if (cartId && !existingCart) {
      await clearCartId();
    }
    const cart = existingCart && cartId
      ? await addShopifyCartLine(
          cartId,
          input.variantId,
          input.quantity,
          buyerIp,
        )
      : await createShopifyCart(input.variantId, input.quantity, buyerIp);

    await saveCartId(cart.id);
    return {
      status: "success",
      message: "Added to your bag.",
      cartCount: cart.totalQuantity,
    };
  } catch (error) {
    return { status: "error", message: errorMessage(error) };
  }
}

export async function commerceQuickAdd(
  input: QuickAddInput,
): Promise<QuickAddResult> {
  return commerceAddToCart(input);
}

export async function updateCartLineAction(
  lineId: string,
  quantity: number,
): Promise<CartMutationResult> {
  const cartId = await readCartId();
  if (!isShopifyConfigured() || !cartId) {
    return { status: "error", message: "Your Shopify cart is not available." };
  }

  try {
    const cart = quantity <= 0
      ? await removeShopifyCartLine(cartId, lineId, await getBuyerIp())
      : await updateShopifyCartLine(
          cartId,
          lineId,
          Math.min(quantity, 99),
          await getBuyerIp(),
        );
    return { status: "success", cart };
  } catch (error) {
    return { status: "error", message: errorMessage(error) };
  }
}

export async function removeCartLineAction(
  lineId: string,
): Promise<CartMutationResult> {
  return updateCartLineAction(lineId, 0);
}

export async function getCheckoutUrlAction(): Promise<CheckoutResult> {
  const result = await getCartAction();
  if (result.status === "error") {
    return result;
  }
  if (!result.cart || result.cart.totalQuantity < 1) {
    return { status: "error", message: "Your bag is empty." };
  }
  return { status: "success", checkoutUrl: result.cart.checkoutUrl };
}
