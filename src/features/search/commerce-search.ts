"use server";

import type { Product } from "@/lib/commerce";
import { getProducts } from "@/lib/commerce/shopify/provider";
import { getCommerceRequestContext } from "@/lib/commerce/shopify/request-context";

export async function searchProductsAction(
  search: string,
): Promise<readonly Product[]> {
  const query = search.trim();
  if (query.length < 2) return [];
  return getProducts(
    { search: query, limit: 5 },
    await getCommerceRequestContext(),
  );
}
