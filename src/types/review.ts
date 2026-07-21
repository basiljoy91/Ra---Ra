import type { ContentStatus } from "@/lib/commerce";

export interface Review {
  id: string;
  productId?: string;
  customerDisplayName: string;
  rating: number;
  title?: string;
  content: string;
  verifiedPurchase?: boolean;
  publishedAt?: string;
  source?: string;
  contentStatus: ContentStatus;
}

export interface ReviewSectionConfig {
  id: string;
  eyebrow?: string;
  heading: string;
  description?: string;
  hideWhenEmpty?: boolean;
}
