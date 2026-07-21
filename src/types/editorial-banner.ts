export interface EditorialBannerMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint?: {
    mobile?: string;
    desktop?: string;
  };
}

export interface EditorialBannerConfig {
  id: string;
  eyebrow?: string;
  heading: string;
  description: string;
  media: EditorialBannerMedia;
  action?: {
    label: string;
    href: string;
  };
}
