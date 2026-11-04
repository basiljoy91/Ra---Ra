import type { CollectionCatalogEntry, CollectionSummary } from "@/types/collection";
import { developmentCollection } from "@/data/development/mock-commerce";

export const COLLECTION_DEVELOPMENT_NOTICE =
  "Product photography is based on the supplied ra&ra garment and artwork references. Final pricing and availability are still being prepared.";

export const collectionCatalog: readonly CollectionCatalogEntry[] = [
  {
    collection: developmentCollection,
    status: "active",
    href: "/collections/beyond",
    heroLayout: "story-left",
    developmentNotice: COLLECTION_DEVELOPMENT_NOTICE,
    story: {
      eyebrow: "Limited Edition 01",
      title: "Beyond",
      introduction:
        "Four original artworks expressed across four unisex constructions—from a structured 280 GSM boxy tee to washed charcoal, off-white and relaxed chocolate forms.",
      longDescription:
        "Beyond explores courage, perception, time and human limits through classical forms, celestial geometry and considered front-to-back artwork placement.",
      campaignLine: "Four questions. Four artworks. One connected edition.",
      quote: "The first look should be immediate. The second should reveal something new.",
      heroMedia: {
        desktop: {
          url: "/campaign/beyond-limits-hero.png",
          alt: "Model wearing a washed charcoal Beyond Limits oversized tee in directional light",
          width: 1536,
          height: 1024,
        },
        focalPoint: {
          desktop: "66% 50%",
          tablet: "64% 50%",
          mobile: "68% 50%",
        },
      },
      editorialBlocks: [
        {
          type: "quote",
          quote: "An edition, not an endless restock.",
        },
      ],
    },
  },
];

export function getCollectionCatalogEntry(
  handle: string,
): CollectionCatalogEntry | undefined {
  return collectionCatalog.find(
    (entry) => entry.status !== "hidden" && entry.collection.handle === handle,
  );
}

export function getVisibleCollectionSummaries(): readonly CollectionSummary[] {
  return collectionCatalog
    .filter((entry) => entry.status !== "hidden")
    .map((entry) => ({
      id: entry.collection.id,
      handle: entry.collection.handle,
      title: entry.collection.title,
      ...(entry.collection.subtitle ? { subtitle: entry.collection.subtitle } : {}),
      description: entry.story.introduction,
      ...(entry.story.heroMedia?.desktop ? { image: entry.story.heroMedia.desktop } : {}),
      ...(entry.status === "active" && entry.href ? { href: entry.href } : {}),
      status: entry.status,
      themeKey: entry.collection.themeKey,
      ...(entry.developmentNotice ? { developmentNotice: entry.developmentNotice } : {}),
    }));
}
