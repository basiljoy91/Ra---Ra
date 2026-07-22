import type { CommunityItem } from "@/types/community";

export const DEVELOPMENT_COMMUNITY_NOTICE =
  "Local campaign fixtures only. These images are not customer submissions and are approved solely for this development interface preview.";

export const developmentCommunityItems = [
  {
    id: "development-dog-and-human",
    image: {
      url: "/discovery/dog-and-human.jpeg",
      alt: "Dog-and-human themed artwork shown as part of a Ra & Ra campaign study",
      width: 1254,
      height: 1254,
    },
    caption: "Dog & Human campaign study",
    source: "campaign",
    approvedForUse: true,
    contentStatus: "development",
  },
  {
    id: "development-small-chest-print",
    image: {
      url: "/discovery/small-chest-prints.jpeg",
      alt: "Minimal dog illustration positioned as a small chest-print study",
      width: 1402,
      height: 1122,
    },
    caption: "Small chest-print study",
    source: "brand",
    approvedForUse: true,
    contentStatus: "development",
  },
  {
    id: "development-pretzel-companion",
    image: {
      url: "/development-products/pretzel-companion-detail.jpeg",
      alt: "Golden retriever illustration carrying a heart-shaped pretzel",
      width: 1254,
      height: 1254,
    },
    caption: "Pretzel Companion artwork study",
    source: "brand",
    approvedForUse: true,
    contentStatus: "development",
  },
  {
    id: "development-loyal-line",
    image: {
      url: "/development-products/loyal-line-detail.jpeg",
      alt: "Close view of a white dog line illustration on a black T-shirt",
      width: 1254,
      height: 1254,
    },
    caption: "Loyal Line artwork detail",
    source: "brand",
    approvedForUse: true,
    contentStatus: "development",
  },
  {
    id: "development-unapproved-suppressed",
    image: {
      url: "/hero/hero-dog-owner.png",
      alt: "Unapproved development filtering fixture",
      width: 1717,
      height: 916,
    },
    caption: "Unapproved fixture — must remain hidden",
    source: "campaign",
    approvedForUse: false,
    contentStatus: "development",
  },
] as const satisfies readonly CommunityItem[];
