import type { Collection, Product } from "@/lib/commerce/types";

export interface ProductQuery {
  collectionHandle?: string;
  search?: string;
  limit?: number;
}

/**
 * Storefront-only provider boundary. Transactional capabilities such as cart,
 * checkout, accounts and inventory synchronization are intentionally deferred.
 */
export interface CommerceProvider {
  getProducts(query?: ProductQuery): Promise<readonly Product[]>;
  getProductByHandle(handle: string): Promise<Product | null>;
  getCollections(): Promise<readonly Collection[]>;
  getCollectionByHandle(handle: string): Promise<Collection | null>;
}
