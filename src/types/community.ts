import type { ContentStatus, ProductImage } from "@/lib/commerce";

export type CommunityItemSource = "brand" | "customer" | "campaign";

export type CommunityItem = {
  id: string;
  image: ProductImage;
  caption?: string;
  href?: string;
  source?: CommunityItemSource;
  approvedForUse: boolean;
  contentStatus: ContentStatus;
};

export type CommunityGridConfig = {
  id: string;
  eyebrow?: string;
  heading: string;
  description?: string;
  itemLimit?: number;
  hideWhenEmpty?: boolean;
  emptyMessage?: string;
};
