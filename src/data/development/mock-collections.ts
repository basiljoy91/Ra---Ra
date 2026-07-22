import type { Collection } from "@/lib/commerce";
import { developmentCollection } from "@/data/development/mock-commerce";
import type {
  CollectionCatalogEntry,
  CollectionSummary,
} from "@/types/collection";

export const COLLECTION_DEVELOPMENT_NOTICE =
  "Development collection content only. Product availability, prices and merchandising are not approved for production.";

const developmentTravelCollection = {
  id: "development-collection-travel-reuse-test",
  handle: "travel-development",
  title: "Journeys & Keepsakes",
  subtitle: "Development Collection — Not Available for Purchase",
  description:
    "An intentionally empty coming-soon fixture used to verify that the reusable collection template can support a different theme without fabricating inventory.",
  story:
    "This development-only record tests a future collection mood, alternate hero orientation and an empty catalogue state.",
  themeKey: "travel-development",
  products: [],
  seo: {
    title: "Journeys & Keepsakes — Development Collection",
    description:
      "A non-purchasable development fixture for the reusable Ra & Ra collection system.",
    canonicalPath: "/collections/travel-development",
    noIndex: true,
  },
  contentStatus: "development",
} as const satisfies Collection;

export const collectionCatalog: readonly CollectionCatalogEntry[] = [
  {
    collection: developmentCollection,
    status: "active",
    href: "/collections/pets",
    heroLayout: "story-left",
    developmentNotice: COLLECTION_DEVELOPMENT_NOTICE,
    story: {
      eyebrow: "Collection One",
      title: "Dogs & Their Humans",
      introduction:
        "Minimal apparel inspired by the companionship, rituals and quiet moments shared between dogs and the people who love them.",
      longDescription:
        "The collection turns familiar glances, daily walks and the comfort of always having a companion nearby into restrained, story-led artwork.",
      campaignLine: "Chosen by paws. Worn by love.",
      quote: "A familiar bond, translated into something you can carry.",
      heroMedia: {
        desktop: {
          url: "/featured-collection/dogs-and-humans-campaign.jpeg",
          alt: "Black and white T-shirts featuring a small dog illustration beneath a heart",
          width: 1402,
          height: 1122,
        },
        focalPoint: {
          desktop: "50% 50%",
          tablet: "50% 50%",
          mobile: "50% 50%",
        },
      },
      editorialBlocks: [
        {
          type: "quote",
          quote:
            "The artwork is small. The relationship behind it is anything but.",
        },
      ],
    },
  },
  {
    collection: developmentTravelCollection,
    status: "coming-soon",
    heroLayout: "story-right",
    developmentNotice:
      "Development Collection — Not Available for Purchase",
    story: {
      eyebrow: "Reusable Template Test",
      title: "Journeys & Keepsakes",
      introduction:
        "Development Collection — Not Available for Purchase. This intentionally empty story verifies a second collection theme without suggesting a launch or available inventory.",
      longDescription:
        "No travel products, dates or production claims are attached to this fixture. It exists only to validate the collection architecture and coming-soon state.",
      campaignLine: "A future story, intentionally unstocked.",
    },
  },
];

export function getCollectionCatalogEntry(
  handle: string,
): CollectionCatalogEntry | undefined {
  return collectionCatalog.find(
    (entry) =>
      entry.status !== "hidden" && entry.collection.handle === handle,
  );
}

export function getVisibleCollectionSummaries(): readonly CollectionSummary[] {
  return collectionCatalog
    .filter((entry) => entry.status !== "hidden")
    .map((entry) => ({
      id: entry.collection.id,
      handle: entry.collection.handle,
      title: entry.collection.title,
      ...(entry.collection.subtitle
        ? { subtitle: entry.collection.subtitle }
        : {}),
      description: entry.story.introduction,
      ...(entry.story.heroMedia?.desktop
        ? { image: entry.story.heroMedia.desktop }
        : {}),
      ...(entry.status === "active" && entry.href
        ? { href: entry.href }
        : {}),
      status: entry.status,
      themeKey: entry.collection.themeKey,
      ...(entry.developmentNotice
        ? { developmentNotice: entry.developmentNotice }
        : {}),
    }));
}
