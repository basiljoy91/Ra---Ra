import { siteConfig } from "@/config/site";
import type { Product } from "@/lib/commerce";
import { buildAbsoluteUrl } from "@/lib/utilities";

interface ProductStructuredDataProps {
  product: Product;
  collection?: { handle: string; title: string };
}

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function ProductStructuredData({
  product,
  collection,
}: ProductStructuredDataProps) {
  const productUrl = buildAbsoluteUrl(
    `/products/${product.handle}`,
    siteConfig.siteUrl,
  );
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription ?? product.description,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: siteConfig.siteName,
    },
    ...(product.images.length > 0
      ? {
          image: product.images.map((image) =>
            buildAbsoluteUrl(image.url, siteConfig.siteUrl),
          ),
        }
      : {}),
  };
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: buildAbsoluteUrl("/", siteConfig.siteUrl),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Collections",
      item: buildAbsoluteUrl("/collections", siteConfig.siteUrl),
    },
    ...(collection
      ? [
          {
            "@type": "ListItem",
            position: 3,
            name: collection.title,
            item: buildAbsoluteUrl(
              `/collections/${collection.handle}`,
              siteConfig.siteUrl,
            ),
          },
        ]
      : []),
    {
      "@type": "ListItem",
      position: collection ? 4 : 3,
      name: product.title,
      item: productUrl,
    },
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productData) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems,
          }),
        }}
        type="application/ld+json"
      />
    </>
  );
}
