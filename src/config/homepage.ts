import type { DiscoveryConfig } from "@/types/discovery";
import type { FeaturedCollectionPresentation } from "@/types/featured-collection";
import type { HeroConfig } from "@/types/hero";

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
