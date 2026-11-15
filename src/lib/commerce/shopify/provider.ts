import {
  developmentCollection,
  developmentProducts,
} from "@/data/development/mock-commerce";
import { BEYOND_PRODUCT_HANDLES } from "@/data/beyond-collection";
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

const legacyDesignPrefixes: Readonly<Record<string, string>> = {
  "beyond-time": "past-present-beyond",
  "beyond-fear": "beyond-fear",
  "beyond-reality": "beyond-reality",
  "beyond-limits": "beyond-limits",
};

function normalizeBeyondProducts(
  products: readonly Product[],
  includeDevelopmentFallbacks = true,
): readonly Product[] {
  const approvedByHandle = new Map(
    developmentProducts.map((product) => [product.handle, product]),
  );
  const normalized = BEYOND_PRODUCT_HANDLES.flatMap((handle) => {
    const approved = approvedByHandle.get(handle);
    if (!approved) return [];

    const legacyPrefix = legacyDesignPrefixes[handle] ?? handle;
    const commerceProduct =
      products.find((product) => product.handle === handle) ??
      products.find(
        (product) =>
          product.handle === `${legacyPrefix}-sculptural-boxy-black`,
      ) ??
      products.find((product) => product.handle.startsWith(`${legacyPrefix}-`));

    if (!commerceProduct) {
      return includeDevelopmentFallbacks ? [approved] : [];
    }

    return [
      {
        ...approved,
        id: commerceProduct.id,
        price: commerceProduct.price,
        ...(commerceProduct.compareAtPrice
          ? { compareAtPrice: commerceProduct.compareAtPrice }
          : {}),
        variants: commerceProduct.variants,
        ...(commerceProduct.options
          ? { options: commerceProduct.options }
          : {}),
        ...(commerceProduct.defaultSelectedOptions
          ? { defaultSelectedOptions: commerceProduct.defaultSelectedOptions }
          : {}),
        collectionHandles: commerceProduct.collectionHandles.length
          ? commerceProduct.collectionHandles
          : approved.collectionHandles,
        contentStatus: "production",
        priceIsPlaceholder: false,
        seo: {
          ...approved.seo,
          noIndex: false,
        },
      } satisfies Product,
    ];
  });

  return normalized;
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
    const products = data.products.nodes.map(mapShopifyProduct);
    return normalizeBeyondProducts(products, !query.search).slice(
      0,
      query.limit ?? 50,
    );
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
    if (!data.product) {
      return developmentProducts.find((product) => product.handle === handle) ?? null;
    }
    const mapped = mapShopifyProduct(data.product);
    const canonicalHandle =
      BEYOND_PRODUCT_HANDLES.find(
        (candidate) =>
          candidate === handle ||
          mapped.handle === candidate ||
          mapped.handle.startsWith(`${legacyDesignPrefixes[candidate]}-`),
      ) ?? handle;
    return (
      normalizeBeyondProducts([mapped], false).find(
        (product) => product.handle === canonicalHandle,
      ) ?? mapped
    );
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
    if (!data.collection) return null;
    const collection = mapShopifyCollection(data.collection);
    if (collection.handle !== "beyond") return collection;

    return {
      ...developmentCollection,
      id: collection.id,
      products: normalizeBeyondProducts(collection.products),
      contentStatus: "production",
      seo: {
        ...developmentCollection.seo,
        noIndex: false,
      },
    };
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
