import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductPageTemplate } from "@/components/commerce/product-detail/product-page-template";
import { ProductStructuredData } from "@/components/commerce/product-detail/product-structured-data";
import { siteConfig } from "@/config/site";
import {
  commerceAddToCart,
  commerceBuyNow,
} from "@/features/cart/commerce-cart";
import {
  getCollectionByHandle,
  getProductByHandle,
  getProducts,
} from "@/lib/commerce/shopify/provider";
import { getCommerceRequestContext } from "@/lib/commerce/shopify/request-context";
import { buildAbsoluteUrl } from "@/lib/utilities";

interface ProductRouteProps {
  params: Promise<{ productHandle: string }>;
}

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { productHandle } = await params;
  const context = await getCommerceRequestContext();
  const product = await getProductByHandle(productHandle, context);

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
  const context = await getCommerceRequestContext();
  const product = await getProductByHandle(productHandle, context);

  if (!product) {
    notFound();
  }

  const collectionHandle = product.collectionHandles[0];
  const commerceCollection = collectionHandle
    ? await getCollectionByHandle(collectionHandle, context)
    : null;
  const collection = commerceCollection
    ? {
        handle: commerceCollection.handle,
        title: commerceCollection.title,
      }
    : undefined;
  const catalogProducts = await getProducts({ limit: 50 }, context);
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
