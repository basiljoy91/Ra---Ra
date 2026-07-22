import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPageTemplate } from "@/components/commerce/product-detail/product-page-template";
import { ProductStructuredData } from "@/components/commerce/product-detail/product-structured-data";
import { siteConfig } from "@/config/site";
import { getCollectionCatalogEntry } from "@/data/development/mock-collections";
import {
  developmentProducts,
  getDevelopmentProductByHandle,
  getDevelopmentProductsByIds,
} from "@/data/development/mock-commerce";
import { developmentAddToCart } from "@/features/cart/development-add-to-cart";
import { buildAbsoluteUrl } from "@/lib/utilities";

interface ProductRouteProps {
  params: Promise<{ productHandle: string }>;
}

export function generateStaticParams() {
  return developmentProducts.map((product) => ({
    productHandle: product.handle,
  }));
}

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { productHandle } = await params;
  const product = getDevelopmentProductByHandle(productHandle);

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
  const product = getDevelopmentProductByHandle(productHandle);

  if (!product) {
    notFound();
  }

  const collectionHandle = product.collectionHandles[0];
  const collectionEntry = collectionHandle
    ? getCollectionCatalogEntry(collectionHandle)
    : undefined;
  const collection = collectionEntry
    ? {
        handle: collectionEntry.collection.handle,
        title: collectionEntry.collection.title,
      }
    : undefined;
  const explicitRelatedProducts = getDevelopmentProductsByIds(
    product.relatedProductIds ?? [],
  ).filter((candidate) => candidate.id !== product.id);
  const relatedProducts =
    explicitRelatedProducts.length > 0
      ? explicitRelatedProducts
      : developmentProducts
          .filter(
            (candidate) =>
              candidate.id !== product.id &&
              candidate.collectionHandles.some((handle) =>
                product.collectionHandles.includes(handle),
              ),
          )
          .slice(0, 4);

  return (
    <>
      <ProductStructuredData
        product={product}
        {...(collection ? { collection } : {})}
      />
      <ProductPageTemplate
        addToCartAction={developmentAddToCart}
        product={product}
        relatedProducts={relatedProducts}
        {...(collection ? { collection } : {})}
      />
    </>
  );
}
