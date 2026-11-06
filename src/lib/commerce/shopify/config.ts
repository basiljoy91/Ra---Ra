const SHOPIFY_DOMAIN_PATTERN = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i;

export interface ShopifyConfig {
  storeDomain: string;
  privateToken: string;
  apiVersion: string;
  countryCode: string;
}

function normalizeDomain(value: string): string {
  return value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/$/, "");
}

export function getShopifyConfig(): ShopifyConfig | null {
  const rawDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();

  if (!rawDomain && !privateToken) {
    return null;
  }

  if (!rawDomain || !privateToken) {
    throw new Error(
      "SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_PRIVATE_TOKEN must be configured together.",
    );
  }

  const storeDomain = normalizeDomain(rawDomain);
  if (!SHOPIFY_DOMAIN_PATTERN.test(storeDomain)) {
    throw new Error(
      "SHOPIFY_STORE_DOMAIN must be a valid *.myshopify.com domain.",
    );
  }

  const apiVersion =
    process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || "2026-10";
  if (!/^\d{4}-(?:01|04|07|10)$/.test(apiVersion)) {
    throw new Error(
      "SHOPIFY_STOREFRONT_API_VERSION must be a stable YYYY-MM Shopify version.",
    );
  }
  const countryCode = (
    process.env.SHOPIFY_DEFAULT_COUNTRY?.trim() || "IN"
  ).toUpperCase();
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new Error("SHOPIFY_DEFAULT_COUNTRY must be a two-letter country code.");
  }

  return {
    storeDomain,
    privateToken,
    apiVersion,
    countryCode,
  };
}

export function isShopifyConfigured(): boolean {
  return getShopifyConfig() !== null;
}
