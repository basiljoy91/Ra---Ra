import type { Collection } from "@/lib/commerce";
import type { CollectionCatalogEntry } from "@/types/collection";
import {
  beyondCollectionHero,
  beyondCollectionPhilosophy,
} from "@/data/beyond-collection";

export function createCollectionCatalogEntry(
  collection: Collection,
): CollectionCatalogEntry {
  if (collection.handle === "beyond") {
    return {
      collection,
      status: "active",
      href: "/collections/beyond",
      heroLayout: "story-left",
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
            desktop: "50% 50%",
            tablet: "50% 50%",
            mobile: "50% 42%",
          },
        },
        editorialBlocks: [
          {
            type: "quote",
            quote: "The artwork is intentional. The interpretation is personal.",
          },
        ],
      },
    };
  }

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

