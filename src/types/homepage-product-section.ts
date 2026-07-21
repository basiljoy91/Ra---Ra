export type HomepageProductSectionTone =
  | "background"
  | "surface"
  | "muted";

export type HomepageProductMobileLayout = "grid" | "rail";

export interface HomepageProductSectionConfig {
  id: string;
  eyebrow?: string;
  heading: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  collectionLabel?: string;
  productLimit: number;
  mobileLayout?: HomepageProductMobileLayout;
  tone?: HomepageProductSectionTone;
  hideWhenEmpty?: boolean;
  emptyMessage?: string;
}
