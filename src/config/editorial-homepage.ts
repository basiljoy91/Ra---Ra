export const editorialHomepage = {
  hero: {
    eyebrow: "RA & RA / COLLECTION 01",
    titleLines: ["BEYOND", "THE THINGS WE CARRY"],
    descriptionLines: [
      "Four designs. Four human experiences.",
      "One way of making the invisible personal.",
    ],
    cta: { label: "Explore BEYOND", href: "#beyond-products" },
    image: {
      src: "/campaign/beyond-v2/desktop/collection.png",
      alt: "Models wearing black RA & RA BEYOND T-shirts in an urban landscape",
      width: 1672,
      height: 941,
    },
  },
  featuredEdit: {
    eyebrow: "The four designs",
    items: [
      { productId: "product-beyond-time", displayName: "Beyond Time", category: "What remains", imagePosition: "50% 35%" },
      { productId: "product-beyond-fear", displayName: "Beyond Fear", category: "The courage to be seen", imagePosition: "50% 35%" },
      { productId: "product-beyond-reality", displayName: "Beyond Reality", category: "The space for another truth", imagePosition: "50% 35%" },
      { productId: "product-beyond-limits", displayName: "Beyond Limits", category: "The freedom to outgrow yourself", imagePosition: "50% 35%" },
    ],
  },
  benefits: [
    { id: "cotton", label: "100% Supima Cotton" },
    { id: "weight", label: "280 GSM" },
    { id: "structure", label: "Double-Jersey Knit" },
    { id: "fit", label: "Boxy Oversized Unisex Fit" },
  ],
  quality: {
    eyebrow: "The shared garment",
    headingLines: ["One form.", "Four meanings."],
    description:
      "Solid deep black, with a dense, smooth, matte and softly structured surface.",
    action: { label: "View specifications", href: "/size-guide" },
    image: {
      src: "/products/beyond-time/collar-detail.png",
      alt: "Close view of the rib crew neck on the black Beyond Time T-shirt",
      width: 979,
      height: 1024,
    },
    productImage: {
      src: "/products/beyond-limits/garment-detail.png",
      alt: "Close view of the black Beyond Limits T-shirt fabric and artwork",
      width: 1536,
      height: 1024,
    },
    qualities: ["Dense matte surface", "Dropped shoulders", "Wide straight sleeves", "Reinforced construction"],
  },
  campaign: {
    eyebrow: "BEYOND",
    heading: ["We create the design.", "You give it meaning."],
    description: "The artwork is intentional. The interpretation is personal.",
    action: { label: "Read the philosophy", href: "/about" },
    image: {
      src: "/campaign/beyond-v2/desktop/beyond-reality.png",
      alt: "Two models wearing black RA & RA T-shirts beside a misty lake",
      width: 1672,
      height: 941,
    },
  },
  journey: {
    eyebrow: "A closer look",
    gallery: [
      { src: "/products/beyond-time/male-back.png", alt: "Male model showing the Beyond Time back artwork", position: "50% 35%" },
      { src: "/products/beyond-fear/female-back.png", alt: "Female model showing the Beyond Fear back artwork", position: "50% 35%" },
      { src: "/products/beyond-reality/male-back.png", alt: "Male model showing the Beyond Reality back artwork", position: "50% 35%" },
      { src: "/products/beyond-limits/male-back.png", alt: "Male model showing the Beyond Limits back artwork", position: "50% 35%" },
    ],
    socialTitle: "The four stories",
    socialDescription: "Time. Fear. Reality. Limits.",
    socialNote: "The things we carry.",
  },
  newsletter: {
    id: "ra-ra-newsletter",
    eyebrow: "Letters from the studio",
    heading: "Collection stories and release updates.",
    description: "We write only when there is something worth sharing.",
    emailLabel: "Email address",
    emailPlaceholder: "Your email address",
    submitLabel: "Subscribe",
    pendingLabel: "Sending…",
    consentText:
      "Email delivery is not yet connected. Development submissions are validated but not stored.",
    privacyLabel: "Datenschutzerklärung lesen.",
    privacyHref: "/privacy",
  },
} as const;
