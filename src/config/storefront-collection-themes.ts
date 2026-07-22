import type { CollectionThemeKey } from "@/lib/commerce";

interface StorefrontCollectionTheme {
  heroClassName: string;
  mediaClassName: string;
  placeholderClassName: string;
  eyebrowClassName: string;
  statusClassName: string;
  storyClassName: string;
}

const storefrontCollectionThemes = {
  default: {
    heroClassName: "border-border bg-surface",
    mediaClassName: "border-border bg-surface-muted",
    placeholderClassName: "bg-accent-soft text-foreground",
    eyebrowClassName: "text-accent",
    statusClassName: "border-border bg-surface text-foreground-muted",
    storyClassName: "border-border bg-surface",
  },
  pets: {
    heroClassName: "border-border bg-accent-soft",
    mediaClassName: "border-border bg-surface",
    placeholderClassName: "bg-accent-soft text-foreground",
    eyebrowClassName: "text-accent",
    statusClassName: "border-accent/35 bg-surface/80 text-foreground",
    storyClassName: "border-border bg-surface",
  },
  "travel-development": {
    heroClassName: "border-border bg-surface-muted",
    mediaClassName: "border-border bg-surface",
    placeholderClassName: "bg-primary text-primary-foreground",
    eyebrowClassName: "text-foreground-muted",
    statusClassName: "border-border bg-surface text-foreground-muted",
    storyClassName: "border-border bg-accent-soft",
  },
} as const satisfies Record<CollectionThemeKey, StorefrontCollectionTheme>;

export function getStorefrontCollectionTheme(
  themeKey: CollectionThemeKey,
): StorefrontCollectionTheme {
  return storefrontCollectionThemes[themeKey];
}
