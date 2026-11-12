import { cookies, headers } from "next/headers";

import {
  EU_STOREFRONT_MARKETS,
  INDIA_STOREFRONT_MARKETS,
  type StorefrontMarketOption,
} from "@/config/storefront-markets";
import type { CommerceRequestContext } from "@/lib/commerce/provider";
import { getShopifyConfig } from "@/lib/commerce/shopify/config";

export const MARKET_COOKIE = "ra_storefront_country";

function marketMode(): "IN" | "EU" {
  const configured = process.env.SHOPIFY_MARKET_MODE?.trim().toUpperCase();
  if (configured === "IN" || configured === "EU") return configured;
  const defaultCountry =
    process.env.SHOPIFY_DEFAULT_COUNTRY?.trim().toUpperCase() ??
    getShopifyConfig()?.countryCode;
  return defaultCountry === "IN" ? "IN" : "EU";
}

export function getAvailableStorefrontMarkets(): readonly StorefrontMarketOption[] {
  return marketMode() === "IN" ? INDIA_STOREFRONT_MARKETS : EU_STOREFRONT_MARKETS;
}

export function resolveStorefrontCountry(value?: string): string {
  const options = getAvailableStorefrontMarkets();
  const normalized = value?.trim().toUpperCase();
  if (options.some((option) => option.countryCode === normalized)) {
    return normalized!;
  }
  const configuredDefault =
    process.env.SHOPIFY_DEFAULT_COUNTRY?.trim().toUpperCase() ??
    getShopifyConfig()?.countryCode;
  return options.some((option) => option.countryCode === configuredDefault)
    ? configuredDefault!
    : options[0]?.countryCode ?? "IN";
}

export async function getCommerceRequestContext(): Promise<CommerceRequestContext> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const buyerIp = forwarded || requestHeaders.get("x-real-ip") || undefined;
  const selectedCountry = (await cookies()).get(MARKET_COOKIE)?.value;

  return {
    countryCode: resolveStorefrontCountry(selectedCountry),
    ...(buyerIp ? { buyerIp } : {}),
  };
}

