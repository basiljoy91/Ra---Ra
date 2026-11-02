export const editorialHomepage = {
  hero: {
    eyebrow: "Dogs & Their Humans",
    titleLines: ["BEYOND", "WORDS."],
    descriptionLines: [
      "For the ones who walk beside us.",
      "A first collection about the bond that needs no explanation.",
    ],
    cta: {
      label: "Explore the collection",
      href: "/collections/pets",
    },
    image: {
      src: "/hero/hero-dog-owner.png",
      alt: "A man sharing a quiet moment with his golden retriever and a dog-illustrated T-shirt in a warm, sunlit interior.",
      width: 1717,
      height: 916,
    },
  },
  featuredEdit: {
    eyebrow: "The first edit",
    items: [
      {
        productId: "development-product-chosen-companion",
        displayName: "Chosen Companion",
        category: "Statement print",
        imagePosition: "50% 50%",
      },
      {
        productId: "development-product-peeking-friend",
        displayName: "Peeking Friend",
        category: "Small chest print",
        imagePosition: "50% 50%",
      },
      {
        productId: "development-product-loyal-line",
        displayName: "Loyal Line",
        category: "Limited edition preview",
        imagePosition: "50% 50%",
      },
      {
        productId: "development-product-pretzel-companion",
        displayName: "Pretzel Companion",
        category: "Chest artwork",
        imagePosition: "50% 50%",
      },
    ],
  },
  benefits: [
    { id: "meaningful", label: "Story-led design" },
    { id: "artwork", label: "Considered artwork" },
    { id: "collections", label: "Collection-led" },
    { id: "market", label: "EU launch planned" },
    { id: "checkout", label: "Secure checkout planned" },
  ],
  quality: {
    eyebrow: "Considered in every line",
    headingLines: ["Details with", "meaning."],
    description:
      "The first ra&ra collection begins with a familiar relationship, then translates it into restrained linework and everyday pieces shaped around a story.",
    action: {
      label: "Read the collection story",
      href: "/about",
    },
    image: {
      src: "/homepage/fabric-detail-editorial-v2.jpg",
      alt: "Close crop of black ra&ra T-shirt cotton and stitched hem, shown in warm directional light.",
      width: 1220,
      height: 650,
    },
    productImage: {
      src: "/homepage/chosen-companion-editorial.jpg",
      alt: "Black ra&ra T-shirt with a seated dog illustration beneath an outlined heart.",
      width: 740,
      height: 1122,
    },
    qualities: [
      "Original dog illustration",
      "Statement chest artwork",
      "Black and white palette",
      "Story-led collection piece",
    ],
  },
  campaign: {
    eyebrow: "Limited edition",
    heading: ["Once It’s Gone,", "It’s Gone."],
    description: "Be part of something rare.",
    action: {
      label: "Shop the collection",
      href: "/products/development-loyal-line-tee",
    },
    image: {
      src: "/homepage/campaign-dog-owner-close.jpg",
      alt: "A woman and her golden retriever with a dog-illustrated ra&ra T-shirt in a warm wardrobe setting.",
      width: 992,
      height: 941,
    },
  },
  journey: {
    eyebrow: "Seen in the ra&ra world",
    gallery: [
      {
        src: "/homepage/campaign-dog-owner-close.jpg",
        alt: "A woman sharing a quiet wardrobe moment with her golden retriever.",
        position: "58% 50%",
      },
      {
        src: "/hero/hero-dog-owner.png",
        alt: "A relaxed dog owner and his companion in warm natural light.",
        position: "66% 50%",
      },
      {
        src: "/development-products/pretzel-companion-detail.jpeg",
        alt: "Running puppy carrying a pretzel, drawn in fine black linework.",
        position: "50% 50%",
      },
      {
        src: "/development-products/loyal-line-detail.jpeg",
        alt: "Detailed German Shepherd line illustration with editorial typography.",
        position: "50% 46%",
      },
    ],
    socialTitle: "Follow our journey",
    socialDescription: "Get inspired. Stay updated.",
    socialNote: "Official channels are being prepared.",
  },
  newsletter: {
    id: "ra-ra-newsletter",
    eyebrow: "Join the movement",
    heading: "Subscribe for exclusive drops & updates.",
    description:
      "First collection notes, new stories and future release news from ra&ra.",
    emailLabel: "Email address",
    emailPlaceholder: "Your email address",
    submitLabel: "Subscribe",
    pendingLabel: "Sending…",
    consentText:
      "Email delivery is not yet connected. Valid submissions stop at development validation and are not stored.",
    privacyLabel: "Review the current FAQ.",
    privacyHref: "/faq",
  },
} as const;
