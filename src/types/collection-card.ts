import type { CollectionThemeKey, ProductImage } from "@/lib/commerce";

interface CollectionCardBase {
  id: string;
  title: string;
  handle?: string;
  description?: string;
  image?: ProductImage;
  placeholderLabel?: string;
  themeKey: CollectionThemeKey;
}

export type CollectionCardData =
  | (CollectionCardBase & {
      status: "active";
      href: string;
    })
  | (CollectionCardBase & {
      status: "coming-soon" | "hidden";
      href?: never;
    });

export interface ShopByCollectionConfig {
  eyebrow?: string;
  heading: string;
  description?: string;
  activeStatusLabel: string;
  comingSoonStatusLabel: string;
  activeCtaLabel: string;
  collections: readonly CollectionCardData[];
}
