export interface DiscoveryCategoryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint?: string;
}

export interface DiscoveryCategory {
  id: string;
  title: string;
  href?: string;
  image?: DiscoveryCategoryImage;
  description?: string;
  badge?: string;
  enabled?: boolean;
  comingSoon?: boolean;
}

export interface DiscoveryConfig {
  eyebrow?: string;
  heading: string;
  description?: string;
  navigationLabel: string;
  categories: readonly DiscoveryCategory[];
}
