export type FooterLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export type FooterNavigationGroup = {
  id: string;
  label: string;
  links: readonly FooterLink[];
};

export type FooterSocialLink = FooterLink;

export type FooterConfig = {
  brandStatement: string;
  navigationGroups: readonly FooterNavigationGroup[];
  socialLinks: readonly FooterSocialLink[];
  market: {
    marketLabel: string;
    currencyLabel: string;
    languageLabel: string;
  };
  copyrightNotice: string;
  cookieSettings: {
    label: string;
    unavailableMessage: string;
    enabled: boolean;
  };
};
