export type HeaderAppearance = "solid" | "overlay";

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  enabled?: boolean;
  external?: boolean;
  children?: readonly NavigationItem[];
  badge?: string;
}

export interface AnnouncementMessage {
  id: string;
  text: string;
  shortText?: string;
  href?: string;
  external?: boolean;
}

export interface AnnouncementBarConfig {
  enabled: boolean;
  messages: readonly AnnouncementMessage[];
}

export interface HeaderConfig {
  appearance: HeaderAppearance;
  sticky: boolean;
  searchEnabled: boolean;
  cartEnabled: boolean;
  developmentCartCount: number;
  announcementBar: AnnouncementBarConfig;
  primaryNavigation: readonly NavigationItem[];
  mobileSecondaryLinks: readonly NavigationItem[];
}
