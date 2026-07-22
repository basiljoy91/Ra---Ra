import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { CollectionPageTemplate } from "@/components/commerce/collections/collection-page-template";
import { CollectionStructuredData } from "@/components/commerce/collections/collection-structured-data";
import { siteConfig } from "@/config/site";
import {
  collectionCatalog,
  getCollectionCatalogEntry,
} from "@/data/development/mock-collections";
import { developmentQuickAdd } from "@/features/cart/development-quick-add";
import {
  buildCollectionFilters,
  buildCollectionHref,
  hasFacetedCollectionQuery,
  parseCollectionQuery,
  queryCollectionProducts,
} from "@/lib/collections";
import { buildAbsoluteUrl } from "@/lib/utilities";
import type { CollectionSearchParams } from "@/types/collection";

interface CollectionRouteProps {
  params: Promise<{ collectionHandle: string }>;
  searchParams: Promise<CollectionSearchParams>;
}

export function generateStaticParams() {
  return collectionCatalog
    .filter((entry) => entry.status !== "hidden")
    .map((entry) => ({ collectionHandle: entry.collection.handle }));
}

export async function generateMetadata({
  params,
  searchParams,
}: CollectionRouteProps): Promise<Metadata> {
  const { collectionHandle } = await params;
  const resolvedSearchParams = await searchParams;
  const entry = getCollectionCatalogEntry(collectionHandle);

  if (!entry) {
    return {};
  }

  const { collection, story } = entry;
  const canonicalPath = `/collections/${collection.handle}`;
  const canonicalUrl = buildAbsoluteUrl(canonicalPath, siteConfig.siteUrl);
  const faceted = hasFacetedCollectionQuery(resolvedSearchParams);
  const noIndex = Boolean(collection.seo.noIndex || faceted);
  const image = story.heroMedia?.desktop ?? collection.heroImage;

  return {
    title: collection.seo.title,
    description: collection.seo.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: collection.seo.title,
      description: collection.seo.description,
      url: canonicalUrl,
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
      index: !noIndex,
      follow: true,
    },
  };
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: CollectionRouteProps) {
  const { collectionHandle } = await params;
  const resolvedSearchParams = await searchParams;
  const entry = getCollectionCatalogEntry(collectionHandle);

  if (!entry) {
    notFound();
  }

  const filters = buildCollectionFilters(entry.collection.products);
  const state = parseCollectionQuery(resolvedSearchParams, filters);
  const query = queryCollectionProducts(entry.collection.products, state);

  if (query.totalPages > 0 && state.page > query.totalPages) {
    redirect(
      buildCollectionHref(entry.collection.handle, state, {
        page: query.totalPages,
      }),
    );
  }

  return (
    <>
      <CollectionStructuredData
        collectionHandle={entry.collection.handle}
        collectionTitle={entry.collection.title}
        products={query.products}
      />
      <CollectionPageTemplate
        entry={entry}
        filters={filters}
        query={query}
        state={{ ...state, page: query.page }}
        {...(entry.status === "active"
          ? { quickAddAction: developmentQuickAdd }
          : {})}
      />
    </>
  );
}
