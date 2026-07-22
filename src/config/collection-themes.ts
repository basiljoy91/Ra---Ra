import type { CollectionThemeKey } from "@/lib/commerce";

interface FeaturedCollectionTheme {
  sectionTone: "background" | "surface" | "muted";
  eyebrowClassName: string;
  campaignFrameClassName: string;
  productFrameClassName: string;
}

const featuredCollectionThemes = {
  default: {
    sectionTone: "muted",
    eyebrowClassName: "text-accent",
    campaignFrameClassName: "border-border bg-surface",
    productFrameClassName: "border-border bg-surface",
  },
  pets: {
    sectionTone: "muted",
    eyebrowClassName: "text-accent",
    campaignFrameClassName: "border-border bg-surface",
    productFrameClassName: "border-border bg-surface",
  },
  "travel-development": {
    sectionTone: "muted",
    eyebrowClassName: "text-accent",
    campaignFrameClassName: "border-border bg-surface",
    productFrameClassName: "border-border bg-surface",
  },
} as const satisfies Record<CollectionThemeKey, FeaturedCollectionTheme>;

export function getFeaturedCollectionTheme(
  themeKey: CollectionThemeKey,
): FeaturedCollectionTheme {
  return featuredCollectionThemes[themeKey];
}
