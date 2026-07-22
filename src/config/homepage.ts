import type { BrandPromiseConfig } from "@/types/brand-promise";
import type { ShopByCollectionConfig } from "@/types/collection-card";
import type { CommunityGridConfig } from "@/types/community";
import type { DiscoveryConfig } from "@/types/discovery";
import type { EditorialBannerConfig } from "@/types/editorial-banner";
import type { FeaturedCollectionPresentation } from "@/types/featured-collection";
import type { HeroConfig } from "@/types/hero";
import type { HomepageProductSectionConfig } from "@/types/homepage-product-section";
import type { ReviewSectionConfig } from "@/types/review";
import type { NewsletterSectionConfig } from "@/types/newsletter";

export const homepageHero = {
  eyebrow: "The First Story: Dogs & Their Humans",
  heading: "Wear What Matters.",
  description:
    "Minimal designs inspired by the stories, passions and connections that stay with us. Our first collection celebrates the bond between dogs and their humans.",
  campaignLine: "Chosen by paws. Worn by love.",
  media: {
    type: "image",
    desktopSrc: "/hero/hero-dog-owner.png",
    width: 1717,
    height: 916,
    alt: "Golden retriever presenting a dog-illustrated T-shirt to its owner in a warm home interior.",
    focalPoint: {
      desktop: "50% 50%",
      tablet: "55% 48%",
      mobile: "68% 50%",
    },
  },
  actions: [
    {
      label: "Shop the Pet Collection",
      href: "/collections/pets",
      variant: "primary",
    },
    {
      label: "Discover the Story",
      href: "/about",
      variant: "secondary",
    },
  ],
  alignment: "left",
  theme: "light",
} as const satisfies HeroConfig;

export const homepageDiscovery = {
  eyebrow: "Find Your Story",
  heading: "Explore the Collection",
  description:
    "Discover minimal designs inspired by the moments, companions and connections that matter most.",
  navigationLabel: "Collection discovery",
  categories: [
    {
      id: "all-t-shirts",
      title: "All T-Shirts",
      href: "/shop",
      description: "The complete first-story edit.",
      image: {
        src: "/discovery/all-t-shirts.jpeg",
        alt: "",
        width: 1402,
        height: 1122,
        focalPoint: "50% 50%",
      },
    },
    {
      id: "minimal-dog-art",
      title: "Minimal Dog Art",
      href: "/shop?style=minimal-dog-art",
      description: "Quiet linework with everyday meaning.",
      image: {
        src: "/discovery/minimal-dog-art.jpeg",
        alt: "",
        width: 1402,
        height: 1122,
        focalPoint: "50% 48%",
      },
    },
    {
      id: "dog-and-human",
      title: "Dog & Human",
      href: "/collections/pets",
      description: "Designs inspired by companionship.",
      image: {
        src: "/discovery/dog-and-human.jpeg",
        alt: "",
        width: 1254,
        height: 1254,
        focalPoint: "50% 50%",
      },
    },
    {
      id: "small-chest-prints",
      title: "Small Chest Prints",
      href: "/shop?placement=small-chest",
      description: "Subtle artwork, close to the heart.",
      image: {
        src: "/discovery/small-chest-prints.jpeg",
        alt: "",
        width: 1402,
        height: 1122,
        focalPoint: "50% 45%",
      },
    },
    {
      id: "statement-prints",
      title: "Statement Prints",
      href: "/shop?placement=statement",
      description: "Larger illustrations with a clear story.",
      image: {
        src: "/discovery/statement-prints.jpeg",
        alt: "",
        width: 1402,
        height: 1122,
        focalPoint: "50% 48%",
      },
    },
    {
      id: "gifts-for-dog-lovers",
      title: "Gifts for Dog Lovers",
      href: "/shop?category=gifts",
      description: "Thoughtful pieces for meaningful bonds.",
      image: {
        src: "/discovery/gifts-for-dog-lovers.jpeg",
        alt: "",
        width: 1402,
        height: 1122,
        focalPoint: "50% 46%",
      },
    },
  ],
} as const satisfies DiscoveryConfig;

export const homepageFeaturedCollection = {
  eyebrow: "Featured Collection",
  href: "/collections/pets",
  ctaLabel: "Explore the Collection",
  productPreviewHeading: "Selected designs",
  featuredProductIds: [
    "development-product-chosen-companion",
    "development-product-peeking-friend",
    "development-product-loyal-line",
  ],
  layout: "story-left",
  mediaFocalPoint: {
    desktop: "50% 50%",
    mobile: "50% 50%",
  },
} as const satisfies FeaturedCollectionPresentation;

export const homepageNewArrivals = {
  id: "new-arrivals",
  eyebrow: "Just Arrived",
  heading: "New Stories to Wear",
  description:
    "The latest minimal designs inspired by the connections and everyday moments that matter.",
  cta: {
    label: "View All New Arrivals",
    href: "/shop?sort=newest",
  },
  collectionLabel: "Development Pet Stories",
  productLimit: 4,
  mobileLayout: "rail",
  tone: "surface",
  hideWhenEmpty: true,
  emptyMessage: "New stories will appear here when they are ready.",
} as const satisfies HomepageProductSectionConfig;

export const homepageBrandPromise = {
  eyebrow: "Why Ra & Ra",
  heading: "Created Around What Matters.",
  description:
    "Ra & Ra starts with meaning, then translates it into restrained everyday apparel—one collection and one community at a time.",
  principles: [
    {
      id: "meaningful-design",
      title: "Meaningful Design",
      description:
        "Every collection begins with a story, passion or emotional connection.",
    },
    {
      id: "thoughtful-minimalism",
      title: "Thoughtful Minimalism",
      description:
        "Restrained artwork designed to feel personal without becoming loud or novelty-driven.",
    },
    {
      id: "stories-beyond-one-theme",
      title: "Stories Beyond One Theme",
      description:
        "A collection-based brand designed to explore pets, travel, music, coffee and other meaningful communities.",
    },
  ],
} as const satisfies BrandPromiseConfig;

export const homepageCollections = {
  eyebrow: "Collection Stories",
  heading: "Shop by Collection",
  description:
    "Each Ra & Ra collection begins with a theme that connects people through shared passions, rituals and everyday meaning.",
  activeStatusLabel: "Current Collection",
  comingSoonStatusLabel: "Coming Soon",
  activeCtaLabel: "Explore the Collection",
  collections: [
    {
      id: "pets",
      title: "Dogs & Their Humans",
      handle: "pets",
      href: "/collections/pets",
      description:
        "Minimal apparel inspired by companionship, familiar routines and the bond between dogs and their humans.",
      image: {
        url: "/collections/pets-collection.png",
        alt: "Golden retriever presenting a dog-illustrated T-shirt to its owner in a warm home",
        width: 1717,
        height: 916,
      },
      status: "active",
      themeKey: "pets",
    },
    {
      id: "limited-editions",
      title: "Limited Editions",
      description:
        "Reserved for confirmed limited releases when real collection content is available.",
      status: "hidden",
      themeKey: "default",
    },
    {
      id: "future-story",
      title: "Future Story",
      description:
        "The next themed collection will be revealed when its story and products are ready.",
      placeholderLabel: "A new story will begin here.",
      status: "coming-soon",
      themeKey: "default",
    },
  ],
} as const satisfies ShopByCollectionConfig;

export const homepageBestSellers = {
  id: "featured-favourites",
  eyebrow: "Development Merchandising Preview",
  heading: "Featured Favourites",
  description:
    "A mock selection used to preview how manually curated favourites will appear until genuine commerce or merchandising data is connected.",
  collectionLabel: "Development Pet Stories",
  productLimit: 2,
  maxColumns: 2,
  mobileLayout: "grid",
  tone: "muted",
  hideWhenEmpty: true,
  emptyMessage:
    "Featured favourites will appear here when merchandising data is available.",
} as const satisfies HomepageProductSectionConfig;

export const homepageEditorialBanner = {
  id: "wear-the-love",
  eyebrow: "The Bond We Carry",
  heading: "Wear the love that waits for you.",
  description:
    "A small reminder of the companion who is always part of where you go.",
  media: {
    src: "/editorial/dog-owner-love.png",
    alt: "Golden retriever holding a dog-illustrated white T-shirt beside its smiling owner in a warm home",
    width: 1672,
    height: 941,
    focalPoint: {
      mobile: "90% 50%",
      desktop: "100% 50%",
    },
  },
  action: {
    label: "Discover the Story",
    href: "/about",
  },
} as const satisfies EditorialBannerConfig;

export const homepageReviews = {
  id: "customer-reviews",
  eyebrow: "Community Stories",
  heading: "Worn with Meaning",
  description:
    "Genuine customer experiences will appear here after an approved review provider or verified first-party process is connected.",
  hideWhenEmpty: true,
} as const satisfies ReviewSectionConfig;

export const developmentReviewShowcase = {
  id: "development-review-showcase",
  eyebrow: "Development Fixtures",
  heading: "Review Layout States",
  description:
    "Interface-only examples for rating text, optional titles and different review lengths.",
  hideWhenEmpty: false,
} as const satisfies ReviewSectionConfig;

export const homepageNewsletter = {
  id: "homepage-newsletter",
  eyebrow: "From Ra & Ra",
  heading: "Stories Worth Wearing",
  description:
    "Join us for new collections, meaningful designs and limited releases.",
  emailLabel: "Email address",
  emailPlaceholder: "you@example.com",
  submitLabel: "Join the Story",
  pendingLabel: "Joining…",
  consentText:
    "Newsletter consent wording and provider disclosure will be finalized before launch.",
  privacyLabel: "View the privacy policy placeholder.",
  privacyHref: "/privacy",
} as const satisfies NewsletterSectionConfig;

export const developmentNewsletterShowcase = {
  ...homepageNewsletter,
  id: "development-newsletter-showcase",
  eyebrow: "Development Form",
  description:
    "Test the email field, validation and status messages without storing an address or creating a subscription.",
  consentText:
    "This development form does not create a marketing subscription. Final consent wording, provider disclosure and double opt-in details are pending review.",
} as const satisfies NewsletterSectionConfig;

export const homepageCommunity = {
  id: "homepage-community",
  eyebrow: "Ra & Ra Stories",
  heading: "Worn in Everyday Moments",
  description:
    "Approved campaign and community imagery will appear here as the Ra & Ra story grows.",
  itemLimit: 8,
  hideWhenEmpty: true,
  emptyMessage:
    "Approved campaign and community imagery will appear here when available.",
} as const satisfies CommunityGridConfig;

export const developmentCommunityShowcase = {
  ...homepageCommunity,
  id: "development-community-showcase",
  eyebrow: "Development Campaign Fixtures",
  heading: "A Curated Visual Rhythm",
  description:
    "A static local-image grid used to validate cropping, captions and responsive layout without a social embed or customer-content claim.",
  hideWhenEmpty: false,
} as const satisfies CommunityGridConfig;
