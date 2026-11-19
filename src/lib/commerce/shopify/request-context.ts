import { cookies, headers } from "next/headers";

import {
  EU_STOREFRONT_MARKETS,
  GERMANY_STOREFRONT_MARKETS,
  INDIA_STOREFRONT_MARKETS,
  type StorefrontMarketOption,
} from "@/config/storefront-markets";
import type { CommerceRequestContext } from "@/lib/commerce/provider";
import { getShopifyConfig } from "@/lib/commerce/shopify/config";

export const MARKET_COOKIE = "ra_storefront_country";

function marketMode(): "DE" | "IN" | "EU" {
  const configured = process.env.SHOPIFY_MARKET_MODE?.trim().toUpperCase();
  if (configured === "DE" || configured === "IN" || configured === "EU") return configured;
  const defaultCountry =
    process.env.SHOPIFY_DEFAULT_COUNTRY?.trim().toUpperCase() ??
    getShopifyConfig()?.countryCode;
  if (defaultCountry === "IN") return "IN";
  if (defaultCountry === "DE") return "DE";
  return "EU";
}

export function getAvailableStorefrontMarkets(): readonly StorefrontMarketOption[] {
  const mode = marketMode();
  if (mode === "IN") return INDIA_STOREFRONT_MARKETS;
  if (mode === "DE") return GERMANY_STOREFRONT_MARKETS;
  return EU_STOREFRONT_MARKETS;
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
    : options[0]?.countryCode ?? "DE";
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

