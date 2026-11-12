"use server";

import { cookies } from "next/headers";

import {
  addShopifyCartLine,
  createShopifyCart,
  getShopifyCart,
  removeShopifyCartLine,
  updateShopifyCartBuyerIdentity,
  updateShopifyCartLine,
} from "@/lib/commerce/shopify/cart";
import { isShopifyConfigured } from "@/lib/commerce/shopify/config";
import {
  getAvailableStorefrontMarkets,
  getCommerceRequestContext,
  MARKET_COOKIE,
  resolveStorefrontCountry,
} from "@/lib/commerce/shopify/request-context";
import type { Cart, CommerceRequestContext } from "@/lib/commerce";
import type { CheckoutResult, CartMutationResult, CartReadResult } from "@/types/cart";
import type {
  AddToCartInput,
  AddToCartResult,
  BuyNowResult,
} from "@/types/product-detail";
import type { QuickAddInput, QuickAddResult } from "@/types/product-card";

const CART_COOKIE = "ra_shopify_cart";

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

async function getSynchronizedCart(
  cartId: string,
  context: CommerceRequestContext,
): Promise<Cart | null> {
  const cart = await getShopifyCart(cartId, context);
  if (
    cart &&
    context.countryCode &&
    cart.buyerCountryCode !== context.countryCode
  ) {
    return updateShopifyCartBuyerIdentity(cartId, context);
  }
  return cart;
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
    const context = await getCommerceRequestContext();
    const cart = await getSynchronizedCart(cartId, context);
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
    return {
      status: "error",
      message:
        "Shopify is not connected to this website yet. Add the store domain and private Storefront token, then restart the server.",
    };
  }

  if (!input.variantId || input.quantity < 1 || input.quantity > 99) {
    return { status: "error", message: "Choose a valid quantity and variant." };
  }

  try {
    const context = await getCommerceRequestContext();
    const cartId = await readCartId();
    const existingCart = cartId
      ? await getSynchronizedCart(cartId, context)
      : null;
    if (cartId && !existingCart) {
      await clearCartId();
    }
    const cart = existingCart && cartId
      ? await addShopifyCartLine(
          cartId,
          input.variantId,
          input.quantity,
          context,
        )
      : await createShopifyCart(input.variantId, input.quantity, context);

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

export async function commerceBuyNow(
  input: AddToCartInput,
): Promise<BuyNowResult> {
  if (!isShopifyConfigured()) {
    return {
      status: "error",
      message:
        "Shopify is not connected to this website yet. Add the store domain and private Storefront token, then restart the server.",
    };
  }

  if (!input.variantId || input.quantity < 1 || input.quantity > 99) {
    return { status: "error", message: "Choose a valid quantity and variant." };
  }

  try {
    const context = await getCommerceRequestContext();
    const cart = await createShopifyCart(
      input.variantId,
      input.quantity,
      context,
    );
    await saveCartId(cart.id);
    return {
      status: "success",
      checkoutUrl: cart.checkoutUrl,
      cartCount: cart.totalQuantity,
    };
  } catch (error) {
    return { status: "error", message: errorMessage(error) };
  }
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
    const context = await getCommerceRequestContext();
    const cart = quantity <= 0
      ? await removeShopifyCartLine(cartId, lineId, context)
      : await updateShopifyCartLine(
          cartId,
          lineId,
          Math.min(quantity, 99),
          context,
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

export async function updateMarketAction(countryCode: string): Promise<
  | { status: "success"; countryCode: string; cart: Cart | null }
  | { status: "error"; message: string }
> {
  const normalized = countryCode.trim().toUpperCase();
  const allowed = getAvailableStorefrontMarkets().some(
    (market) => market.countryCode === normalized,
  );
  if (!allowed) {
    return { status: "error", message: "That market is not available." };
  }

  const country = resolveStorefrontCountry(normalized);
  (await cookies()).set(MARKET_COOKIE, country, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  if (!isShopifyConfigured()) {
    return { status: "success", countryCode: country, cart: null };
  }

  try {
    const cartId = await readCartId();
    if (!cartId) {
      return { status: "success", countryCode: country, cart: null };
    }
    const requestContext = await getCommerceRequestContext();
    const cart = await updateShopifyCartBuyerIdentity(cartId, {
      ...requestContext,
      countryCode: country,
    });
    return { status: "success", countryCode: country, cart };
  } catch (error) {
    return { status: "error", message: errorMessage(error) };
  }
}
