export type HeroMediaType = "image" | "video";
export type HeroAlignment = "left" | "center";
export type HeroTheme = "light" | "dark";

export interface HeroFocalPoint {
  desktop?: string;
  tablet?: string;
  mobile?: string;
}

export interface HeroMedia {
  type: HeroMediaType;
  desktopSrc: string;
  tabletSrc?: string;
  mobileSrc?: string;
  posterSrc?: string;
  width: number;
  height: number;
  alt: string;
  focalPoint?: HeroFocalPoint;
}

export interface HeroAction {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HeroConfig {
  eyebrow?: string;
  heading: string;
  description?: string;
  campaignLine?: string;
  media: HeroMedia;
  actions: readonly HeroAction[];
  alignment?: HeroAlignment;
  theme?: HeroTheme;
}
