import { getShopifyConfig } from "@/lib/commerce/shopify/config";

interface GraphQLError {
  message: string;
}

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: readonly GraphQLError[];
}

export class ShopifyStorefrontError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopifyStorefrontError";
  }
}

export async function shopifyFetch<TData>({
  query,
  variables,
  buyerIp,
}: {
  query: string;
  variables?: Readonly<Record<string, unknown>>;
  buyerIp?: string | undefined;
}): Promise<TData> {
  const config = getShopifyConfig();
  if (!config) {
    throw new ShopifyStorefrontError("Shopify is not configured.");
  }

  const response = await fetch(
    `https://${config.storeDomain}/api/${config.apiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": config.privateToken,
        ...(buyerIp ? { "Shopify-Storefront-Buyer-IP": buyerIp } : {}),
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new ShopifyStorefrontError(
      `Shopify Storefront API request failed with status ${response.status}.`,
    );
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;
  if (payload.errors?.length) {
    throw new ShopifyStorefrontError(
      payload.errors.map((error) => error.message).join(" "),
    );
  }

  if (!payload.data) {
    throw new ShopifyStorefrontError(
      "Shopify returned an empty Storefront API response.",
    );
  }

  return payload.data;
}
