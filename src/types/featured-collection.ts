export type FeaturedCollectionLayout = "story-left" | "story-right";

export interface FeaturedCollectionFocalPoint {
  desktop?: string;
  mobile?: string;
}

export interface FeaturedCollectionPresentation {
  eyebrow?: string;
  campaignLine?: string;
  href: string;
  ctaLabel: string;
  productPreviewHeading: string;
  featuredProductIds: readonly string[];
  layout?: FeaturedCollectionLayout;
  mediaFocalPoint?: FeaturedCollectionFocalPoint;
}
