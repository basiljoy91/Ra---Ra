import { siteConfig } from "@/config/site";
import { buildAbsoluteUrl } from "@/lib/utilities";
import type { Product } from "@/lib/commerce";

interface CollectionStructuredDataProps {
  collectionHandle: string;
  collectionTitle: string;
  products: readonly Product[];
}

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function CollectionStructuredData({
  collectionHandle,
  collectionTitle,
  products,
}: CollectionStructuredDataProps) {
  const collectionUrl = buildAbsoluteUrl(
    `/collections/${collectionHandle}`,
    siteConfig.siteUrl,
  );
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
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
      {
        "@type": "ListItem",
        position: 3,
        name: collectionTitle,
        item: collectionUrl,
      },
    ],
  };
  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collectionTitle,
    url: collectionUrl,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.title,
      url: buildAbsoluteUrl(`/products/${product.handle}`, siteConfig.siteUrl),
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }}
        type="application/ld+json"
      />
      {products.length > 0 ? (
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListData) }}
          type="application/ld+json"
        />
      ) : null}
    </>
  );
}
