import type { Cart } from "@/lib/commerce";
import { shopifyFetch } from "@/lib/commerce/shopify/client";
import { getShopifyConfig } from "@/lib/commerce/shopify/config";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
} from "@/lib/commerce/shopify/documents";
import { mapShopifyCart } from "@/lib/commerce/shopify/mapper";
import type {
  ShopifyCart,
  ShopifyCartPayload,
} from "@/lib/commerce/shopify/types";

function countryCode(): string {
  return getShopifyConfig()?.countryCode ?? "IN";
}

function requireCart(payload: ShopifyCartPayload): Cart {
  if (payload.userErrors.length > 0) {
    throw new Error(payload.userErrors.map((error) => error.message).join(" "));
  }

  if (!payload.cart) {
    throw new Error("Shopify did not return an updated cart.");
  }

  return mapShopifyCart(payload.cart);
}

export async function getShopifyCart(
  cartId: string,
  buyerIp?: string,
): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: CART_QUERY,
    variables: { id: cartId, country: countryCode() },
    buyerIp,
  });
  return data.cart ? mapShopifyCart(data.cart) : null;
}

export async function createShopifyCart(
  variantId: string,
  quantity: number,
  buyerIp?: string,
): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: ShopifyCartPayload }>({
    query: CART_CREATE_MUTATION,
    variables: {
      country: countryCode(),
      input: {
        buyerIdentity: { countryCode: countryCode() },
        lines: [{ merchandiseId: variantId, quantity }],
      },
    },
    buyerIp,
  });
  return requireCart(data.cartCreate);
}

export async function addShopifyCartLine(
  cartId: string,
  variantId: string,
  quantity: number,
  buyerIp?: string,
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: ShopifyCartPayload }>({
    query: CART_LINES_ADD_MUTATION,
    variables: {
      cartId,
      country: countryCode(),
      lines: [{ merchandiseId: variantId, quantity }],
    },
    buyerIp,
  });
  return requireCart(data.cartLinesAdd);
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
  buyerIp?: string,
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: ShopifyCartPayload }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: {
      cartId,
      country: countryCode(),
      lines: [{ id: lineId, quantity }],
    },
    buyerIp,
  });
  return requireCart(data.cartLinesUpdate);
}

export async function removeShopifyCartLine(
  cartId: string,
  lineId: string,
  buyerIp?: string,
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: ShopifyCartPayload }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: {
      cartId,
      country: countryCode(),
      lineIds: [lineId],
    },
    buyerIp,
  });
  return requireCart(data.cartLinesRemove);
}
