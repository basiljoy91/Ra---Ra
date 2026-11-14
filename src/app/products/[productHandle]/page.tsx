import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { ProductPageTemplate } from "@/components/commerce/product-detail/product-page-template";
import { ProductStructuredData } from "@/components/commerce/product-detail/product-structured-data";
import { siteConfig } from "@/config/site";
import {
  commerceAddToCart,
  commerceBuyNow,
} from "@/features/cart/commerce-cart";
import { getProducts } from "@/lib/commerce/shopify/provider";
import { getCommerceRequestContext } from "@/lib/commerce/shopify/request-context";
import { buildAbsoluteUrl } from "@/lib/utilities";

interface ProductRouteProps {
  params: Promise<{ productHandle: string }>;
}

const getCatalogProducts = cache(
  async (countryCode: string | undefined, buyerIp: string | undefined) =>
    getProducts(
      { limit: 50 },
      {
        ...(countryCode ? { countryCode } : {}),
        ...(buyerIp ? { buyerIp } : {}),
      },
    ),
);

async function getProductRouteData(productHandle: string) {
  const context = await getCommerceRequestContext();
  const catalogProducts = await getCatalogProducts(
    context.countryCode,
    context.buyerIp,
  );
  const product =
    catalogProducts.find((candidate) => candidate.handle === productHandle) ??
    null;

  return { catalogProducts, product };
}

function formatCollectionTitle(handle: string | undefined): string | undefined {
  if (!handle) return undefined;

  return handle
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { productHandle } = await params;
  const { product } = await getProductRouteData(productHandle);

  if (!product) {
    return {};
  }

  const canonicalPath = `/products/${product.handle}`;
  const canonicalUrl = buildAbsoluteUrl(canonicalPath, siteConfig.siteUrl);
  const image = product.seo.image ?? product.images[0];

  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: canonicalUrl,
      type: "website",
      ...(image
        ? {
            images: [
              {
                url: image.url,
                ...(image.width ? { width: image.width } : {}),
                ...(image.height ? { height: image.height } : {}),
                alt: image.alt,
              },
            ],
          }
        : {}),
    },
    robots: {
      index: !product.seo.noIndex,
      follow: true,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductRouteProps) {
  const { productHandle } = await params;
  const { catalogProducts, product } = await getProductRouteData(productHandle);

  if (!product) {
    notFound();
  }

  const collectionHandle = product.collectionHandles[0];
  const collectionTitle = formatCollectionTitle(collectionHandle);
  const collection = collectionHandle && collectionTitle
    ? {
        handle: collectionHandle,
        title: collectionTitle,
      }
    : undefined;
  const relatedProducts = catalogProducts
    .filter((candidate) => candidate.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductStructuredData
        product={product}
        {...(collection ? { collection } : {})}
      />
      <ProductPageTemplate
        addToCartAction={commerceAddToCart}
        buyNowAction={commerceBuyNow}
        familyProducts={catalogProducts}
        product={product}
        relatedProducts={relatedProducts}
        {...(collection ? { collection } : {})}
      />
    </>
  );
}
