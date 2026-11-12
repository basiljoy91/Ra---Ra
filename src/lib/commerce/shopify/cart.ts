import type { Cart, CommerceRequestContext } from "@/lib/commerce";
import { shopifyFetch } from "@/lib/commerce/shopify/client";
import { getShopifyConfig } from "@/lib/commerce/shopify/config";
import {
  CART_CREATE_MUTATION,
  CART_BUYER_IDENTITY_UPDATE_MUTATION,
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

function countryCode(context: CommerceRequestContext): string {
  return context.countryCode ?? getShopifyConfig()?.countryCode ?? "IN";
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
  context: CommerceRequestContext = {},
): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: CART_QUERY,
    variables: { id: cartId, country: countryCode(context) },
    buyerIp: context.buyerIp,
  });
  return data.cart ? mapShopifyCart(data.cart) : null;
}

export async function createShopifyCart(
  variantId: string,
  quantity: number,
  context: CommerceRequestContext = {},
): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: ShopifyCartPayload }>({
    query: CART_CREATE_MUTATION,
    variables: {
      country: countryCode(context),
      input: {
        buyerIdentity: { countryCode: countryCode(context) },
        lines: [{ merchandiseId: variantId, quantity }],
      },
    },
    buyerIp: context.buyerIp,
  });
  return requireCart(data.cartCreate);
}

export async function addShopifyCartLine(
  cartId: string,
  variantId: string,
  quantity: number,
  context: CommerceRequestContext = {},
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: ShopifyCartPayload }>({
    query: CART_LINES_ADD_MUTATION,
    variables: {
      cartId,
      country: countryCode(context),
      lines: [{ merchandiseId: variantId, quantity }],
    },
    buyerIp: context.buyerIp,
  });
  return requireCart(data.cartLinesAdd);
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
  context: CommerceRequestContext = {},
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: ShopifyCartPayload }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: {
      cartId,
      country: countryCode(context),
      lines: [{ id: lineId, quantity }],
    },
    buyerIp: context.buyerIp,
  });
  return requireCart(data.cartLinesUpdate);
}

export async function removeShopifyCartLine(
  cartId: string,
  lineId: string,
  context: CommerceRequestContext = {},
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: ShopifyCartPayload }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: {
      cartId,
      country: countryCode(context),
      lineIds: [lineId],
    },
    buyerIp: context.buyerIp,
  });
  return requireCart(data.cartLinesRemove);
}

export async function updateShopifyCartBuyerIdentity(
  cartId: string,
  context: CommerceRequestContext,
): Promise<Cart> {
  const country = countryCode(context);
  const data = await shopifyFetch<{
    cartBuyerIdentityUpdate: ShopifyCartPayload;
  }>({
    query: CART_BUYER_IDENTITY_UPDATE_MUTATION,
    variables: {
      cartId,
      country,
      buyerIdentity: { countryCode: country },
    },
    buyerIp: context.buyerIp,
  });
  return requireCart(data.cartBuyerIdentityUpdate);
}
