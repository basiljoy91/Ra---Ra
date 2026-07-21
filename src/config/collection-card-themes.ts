import type { CollectionThemeKey } from "@/lib/commerce";

interface CollectionCardTheme {
  frameClassName: string;
  placeholderClassName: string;
  statusClassName: string;
}

const collectionCardThemes = {
  default: {
    frameClassName: "border-border bg-surface",
    placeholderClassName: "bg-accent-soft text-foreground",
    statusClassName: "border-border bg-surface text-foreground-muted",
  },
} as const satisfies Record<CollectionThemeKey, CollectionCardTheme>;

export function getCollectionCardTheme(
  themeKey: CollectionThemeKey,
): CollectionCardTheme {
  return collectionCardThemes[themeKey];
}
