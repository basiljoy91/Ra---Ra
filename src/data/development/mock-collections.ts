import type { CollectionCatalogEntry, CollectionSummary } from "@/types/collection";
import { developmentCollection } from "@/data/development/mock-commerce";
import {
  beyondCollectionHero,
  beyondCollectionPhilosophy,
} from "@/data/beyond-collection";

export const COLLECTION_DEVELOPMENT_NOTICE =
  "Shopify test catalogue for the India checkout connection. EU launch settings remain separate.";

export const collectionCatalog: readonly CollectionCatalogEntry[] = [
  {
    collection: developmentCollection,
    status: "active",
    href: "/collections/beyond",
    heroLayout: "story-left",
    developmentNotice: COLLECTION_DEVELOPMENT_NOTICE,
    story: {
      eyebrow: "RA & RA / COLLECTION 01",
      title: "BEYOND",
      introduction:
        "Four designs. Four human experiences. One way of making the invisible personal.",
      longDescriptionParagraphs: beyondCollectionPhilosophy,
      campaignLine: "THE THINGS WE CARRY.",
      quote: "We create the design. You give it meaning.",
      heroMedia: {
        desktop: beyondCollectionHero.desktop,
        mobile: beyondCollectionHero.mobile,
        focalPoint: {
          desktop: "66% 50%",
          tablet: "64% 50%",
          mobile: "68% 50%",
        },
      },
      editorialBlocks: [
        {
          type: "quote",
          quote: "The artwork is intentional. The interpretation is personal.",
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
