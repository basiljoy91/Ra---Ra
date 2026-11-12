import type { Collection } from "@/lib/commerce";
import type { CollectionCatalogEntry } from "@/types/collection";

export function createCollectionCatalogEntry(
  collection: Collection,
): CollectionCatalogEntry {
  return {
    collection,
    status: "active",
    href: `/collections/${collection.handle}`,
    heroLayout: "story-left",
    story: {
      eyebrow: "Collection",
      title: collection.title,
      introduction: collection.description,
      ...(collection.description
        ? { longDescription: collection.description }
        : {}),
      ...(collection.heroImage
        ? {
            heroMedia: {
              desktop: collection.heroImage,
            },
          }
        : {}),
    },
  };
}

