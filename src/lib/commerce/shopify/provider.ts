import {
  developmentCollection,
  developmentProducts,
} from "@/data/development/mock-commerce";
import type {
  Collection,
  CommerceProvider,
  Product,
  ProductQuery,
} from "@/lib/commerce";
import { shopifyFetch } from "@/lib/commerce/shopify/client";
import { getShopifyConfig } from "@/lib/commerce/shopify/config";
import {
  COLLECTION_BY_HANDLE_QUERY,
  COLLECTIONS_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
} from "@/lib/commerce/shopify/documents";
import {
  mapShopifyCollection,
  mapShopifyProduct,
} from "@/lib/commerce/shopify/mapper";
import type {
  ShopifyCollection,
  ShopifyProduct,
} from "@/lib/commerce/shopify/types";

function developmentQuery(query: ProductQuery = {}): readonly Product[] {
  const search = query.search?.trim().toLowerCase();
  const products = query.collectionHandle
    ? developmentProducts.filter((product) =>
        product.collectionHandles.includes(query.collectionHandle!),
      )
    : developmentProducts;
  const filtered = search
    ? products.filter((product) =>
        [product.title, product.description, product.productType]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search),
      )
    : products;

  return filtered.slice(0, query.limit ?? filtered.length);
}

const developmentProvider: CommerceProvider = {
  async getProducts(query) {
    return developmentQuery(query);
  },
  async getProductByHandle(handle) {
    return developmentProducts.find((product) => product.handle === handle) ?? null;
  },
  async getCollections() {
    return [developmentCollection];
  },
  async getCollectionByHandle(handle) {
    return handle === developmentCollection.handle ? developmentCollection : null;
  },
};

const shopifyProvider: CommerceProvider = {
  async getProducts(query = {}) {
    if (query.collectionHandle) {
      const collection = await shopifyProvider.getCollectionByHandle(
        query.collectionHandle,
      );
      const products = collection?.products ?? [];
      return products.slice(0, query.limit ?? products.length);
    }

    const config = getShopifyConfig();
    const data = await shopifyFetch<{
      products: { nodes: readonly ShopifyProduct[] };
    }>({
      query: PRODUCTS_QUERY,
      variables: {
        first: Math.min(query.limit ?? 50, 250),
        query: query.search?.trim() || null,
        country: config?.countryCode ?? "IN",
      },
    });
    return data.products.nodes.map(mapShopifyProduct);
  },
  async getProductByHandle(handle) {
    const config = getShopifyConfig();
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle, country: config?.countryCode ?? "IN" },
    });
    return data.product ? mapShopifyProduct(data.product) : null;
  },
  async getCollections() {
    const config = getShopifyConfig();
    const data = await shopifyFetch<{
      collections: { nodes: readonly ShopifyCollection[] };
    }>({
      query: COLLECTIONS_QUERY,
      variables: { first: 50, country: config?.countryCode ?? "IN" },
    });
    return data.collections.nodes.map(mapShopifyCollection);
  },
  async getCollectionByHandle(handle) {
    const config = getShopifyConfig();
    const data = await shopifyFetch<{
      collection: ShopifyCollection | null;
    }>({
      query: COLLECTION_BY_HANDLE_QUERY,
      variables: {
        handle,
        first: 250,
        country: config?.countryCode ?? "IN",
      },
    });
    return data.collection ? mapShopifyCollection(data.collection) : null;
  },
};

export function getCommerceProvider(): CommerceProvider {
  return getShopifyConfig() ? shopifyProvider : developmentProvider;
}

export async function getProducts(
  query?: ProductQuery,
): Promise<readonly Product[]> {
  return getCommerceProvider().getProducts(query);
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  return getCommerceProvider().getProductByHandle(handle);
}

export async function getCollections(): Promise<readonly Collection[]> {
  return getCommerceProvider().getCollections();
}

export async function getCollectionByHandle(
  handle: string,
): Promise<Collection | null> {
  return getCommerceProvider().getCollectionByHandle(handle);
}
