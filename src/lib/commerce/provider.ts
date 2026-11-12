import type { Collection, Product } from "@/lib/commerce/types";

export interface ProductQuery {
  collectionHandle?: string;
  search?: string;
  limit?: number;
}

export interface CommerceRequestContext {
  buyerIp?: string;
  countryCode?: string;
}

/**
 * Storefront-only provider boundary. Transactional capabilities such as cart,
 * checkout, accounts and inventory synchronization are intentionally deferred.
 */
export interface CommerceProvider {
  getProducts(
    query?: ProductQuery,
    context?: CommerceRequestContext,
  ): Promise<readonly Product[]>;
  getProductByHandle(
    handle: string,
    context?: CommerceRequestContext,
  ): Promise<Product | null>;
  getCollections(context?: CommerceRequestContext): Promise<readonly Collection[]>;
  getCollectionByHandle(
    handle: string,
    context?: CommerceRequestContext,
  ): Promise<Collection | null>;
}
