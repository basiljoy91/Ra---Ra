export const editorialHomepage = {
  hero: {
    eyebrow: "Limited Edition",
    titleLines: ["BEYOND", "LIMITS"],
    descriptionLines: [
      "More than just a T-shirt.",
      "A statement of mindset.",
    ],
    cta: {
      label: "Explore the collection",
      href: "/collections/beyond",
    },
    image: {
      src: "/campaign/beyond-limits-hero.png",
      alt: "A model wearing a washed charcoal Beyond Limits oversized tee in a concrete interior crossed by warm window light.",
      width: 1536,
      height: 1024,
    },
  },
  featuredEdit: {
    eyebrow: "The limited edit",
    items: [
      {
        productId: "product-beyond-fear-sculptural-boxy-black",
        displayName: "Beyond Fear",
        category: "Sculptural Boxy Tee",
        imagePosition: "50% 50%",
      },
      {
        productId: "product-beyond-fear-signature-regular-off-white",
        displayName: "Beyond Fear",
        category: "Signature Regular Tee",
        imagePosition: "50% 50%",
      },
      {
        productId: "product-beyond-reality-washed-art-charcoal",
        displayName: "Beyond Reality",
        category: "Washed Art Tee",
        imagePosition: "50% 50%",
      },
      {
        productId: "product-beyond-limits-relaxed-essential-chocolate",
        displayName: "Beyond Limits",
        category: "Relaxed Essential Tee",
        imagePosition: "50% 50%",
      },
    ],
  },
  benefits: [
    { id: "meaningful", label: "100% Premium Cotton" },
    { id: "artwork", label: "Ultra Soft Feel" },
    { id: "collections", label: "Limited Edition Drops" },
    { id: "market", label: "Worldwide Shipping" },
    { id: "checkout", label: "Secure Checkout" },
  ],
  quality: {
    eyebrow: "Premium Quality",
    headingLines: ["Crafted for", "Comfort"],
    description:
      "Made from premium cotton, our tees offer a relaxed fit, breathable comfort and long-lasting quality.",
    action: {
      label: "Learn more",
      href: "/collections/beyond",
    },
    image: {
      src: "/editorial/washed-cotton-macro.png",
      alt: "Macro view of washed charcoal premium cotton, ribbed collar and reinforced stitching.",
      width: 1536,
      height: 864,
    },
    productImage: {
      src: "/editorial/washed-tee-flatlay.png",
      alt: "Washed charcoal oversized tee with the small Beyond Limits celestial chest mark.",
      width: 1536,
      height: 1024,
    },
    qualities: [
      "Washed finish",
      "Soft hand feel",
      "Durable stitching",
      "Oversized fit",
    ],
  },
  campaign: {
    eyebrow: "Limited edition",
    heading: ["Once It’s Gone,", "It’s Gone."],
    description: "Be part of something rare.",
    action: {
      label: "Shop the collection",
      href: "/collections/beyond",
    },
    image: {
      src: "/products/beyond-limits/washed-art-charcoal/lifestyle-back.png",
      alt: "Back view of the Beyond Limits washed charcoal oversized tee.",
      width: 1536,
      height: 2048,
    },
  },
  journey: {
    eyebrow: "Seen in the ra&ra world",
    gallery: [
      {
        src: "/products/beyond-limits/sculptural-boxy-black/lifestyle-back.png",
        alt: "Beyond Limits Sculptural Boxy Tee.",
        position: "50% 32%",
      },
      {
        src: "/products/beyond-reality/relaxed-essential-chocolate/lifestyle-back.png",
        alt: "Beyond Reality Relaxed Essential Tee.",
        position: "50% 32%",
      },
      {
        src: "/products/beyond-fear/washed-art-charcoal/lifestyle-back.png",
        alt: "Beyond Fear Washed Art Tee.",
        position: "50% 34%",
      },
      {
        src: "/products/past-present-beyond/sculptural-boxy-black/lifestyle-back.png",
        alt: "Past Present Beyond Sculptural Boxy Tee.",
        position: "50% 32%",
      },
    ],
    socialTitle: "Follow our journey",
    socialDescription: "Get inspired. Stay updated.",
    socialNote: "Wear beyond limits.",
  },
  newsletter: {
    id: "ra-ra-newsletter",
    eyebrow: "Join the movement",
    heading: "Subscribe for exclusive drops & updates.",
    description: "Limited drops, new artwork and release notes from ra&ra.",
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
