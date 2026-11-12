import {
  developmentCollection,
  developmentProducts,
} from "@/data/development/mock-commerce";
import type {
  Collection,
  CommerceRequestContext,
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
  async getProducts(query = {}, context = {}) {
    if (query.collectionHandle) {
      const collection = await shopifyProvider.getCollectionByHandle(
        query.collectionHandle,
        context,
      );
      const products = collection?.products ?? [];
      return products.slice(0, query.limit ?? products.length);
    }

    const config = getShopifyConfig();
    const data = await shopifyFetch<{
      products: { nodes: readonly ShopifyProduct[] };
    }>({
      query: PRODUCTS_QUERY,
      revalidate: 60,
      variables: {
        first: Math.min(query.limit ?? 50, 250),
        query: query.search?.trim() || null,
        country: context.countryCode ?? config?.countryCode ?? "IN",
      },
      buyerIp: context.buyerIp,
    });
    return data.products.nodes.map(mapShopifyProduct);
  },
  async getProductByHandle(handle, context = {}) {
    const config = getShopifyConfig();
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      revalidate: 60,
      variables: {
        handle,
        country: context.countryCode ?? config?.countryCode ?? "IN",
      },
      buyerIp: context.buyerIp,
    });
    return data.product ? mapShopifyProduct(data.product) : null;
  },
  async getCollections(context = {}) {
    const config = getShopifyConfig();
    const data = await shopifyFetch<{
      collections: { nodes: readonly ShopifyCollection[] };
    }>({
      query: COLLECTIONS_QUERY,
      revalidate: 60,
      variables: {
        first: 50,
        country: context.countryCode ?? config?.countryCode ?? "IN",
      },
      buyerIp: context.buyerIp,
    });
    return data.collections.nodes.map(mapShopifyCollection);
  },
  async getCollectionByHandle(handle, context = {}) {
    const config = getShopifyConfig();
    const data = await shopifyFetch<{
      collection: ShopifyCollection | null;
    }>({
      query: COLLECTION_BY_HANDLE_QUERY,
      revalidate: 60,
      variables: {
        handle,
        first: 250,
        country: context.countryCode ?? config?.countryCode ?? "IN",
      },
      buyerIp: context.buyerIp,
    });
    return data.collection ? mapShopifyCollection(data.collection) : null;
  },
};

export function getCommerceProvider(): CommerceProvider {
  return getShopifyConfig() ? shopifyProvider : developmentProvider;
}

export async function getProducts(
  query?: ProductQuery,
  context?: CommerceRequestContext,
): Promise<readonly Product[]> {
  return getCommerceProvider().getProducts(query, context);
}

export async function getProductByHandle(
  handle: string,
  context?: CommerceRequestContext,
): Promise<Product | null> {
  return getCommerceProvider().getProductByHandle(handle, context);
}

export async function getCollections(
  context?: CommerceRequestContext,
): Promise<readonly Collection[]> {
  return getCommerceProvider().getCollections(context);
}

export async function getCollectionByHandle(
  handle: string,
  context?: CommerceRequestContext,
): Promise<Collection | null> {
  return getCommerceProvider().getCollectionByHandle(handle, context);
}
