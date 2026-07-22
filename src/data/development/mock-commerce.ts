import type {
  Collection,
  Money,
  Product,
  ProductImage,
  ProductOption,
  ProductVariant,
} from "@/lib/commerce";

export const DEVELOPMENT_DATA_NOTICE =
  "Development mock content only. Not approved product, price, availability, or production information.";

const sizes = ["S", "M", "L"] as const;
const colors = ["Black", "White"] as const;

interface DevelopmentVariantContext {
  color: string;
  size: string;
}

interface DevelopmentVariantOptions {
  colors?: readonly string[];
  sizes?: readonly string[];
  isAvailable?: (context: DevelopmentVariantContext) => boolean;
  priceFor?: (context: DevelopmentVariantContext) => Money;
  imageFor?: (context: DevelopmentVariantContext) => ProductImage | undefined;
}

function createDevelopmentVariants(
  productId: string,
  price: Money,
  options: DevelopmentVariantOptions = {},
): readonly ProductVariant[] {
  const variantColors = options.colors ?? colors;
  const variantSizes = options.sizes ?? sizes;

  return variantColors.flatMap((color) =>
    variantSizes.map((size) => {
      const context = { color, size };
      const variantImage = options.imageFor?.(context);

      return {
        id: `${productId}-${color.toLowerCase()}-${size.toLowerCase()}`,
        title: `${color} / ${size}`,
        available: options.isAvailable?.(context) ?? true,
        size,
        color,
        selectedOptions: [
          { name: "Color", value: color },
          { name: "Size", value: size },
        ],
        price: options.priceFor?.(context) ?? price,
        ...(variantImage ? { image: variantImage } : {}),
      };
    }),
  );
}

function createDevelopmentOptions(
  optionColors: readonly string[] = colors,
  optionSizes: readonly string[] = sizes,
): readonly ProductOption[] {
  return [
    { id: "colour", name: "Color", values: optionColors },
    { id: "size", name: "Size", values: optionSizes },
  ];
}

const chosenCompanionImage: ProductImage = {
  url: "/development-products/chosen-companion-mock.jpeg",
  alt: "Development mockup of black and white T-shirts with a seated dog illustration",
  width: 1402,
  height: 1122,
};

const chosenCompanionDetailImage: ProductImage = {
  url: "/development-products/chosen-companion-detail.jpeg",
  alt: "Development artwork detail of a seated golden retriever beneath a heart",
  width: 1254,
  height: 1254,
};

const peekingFriendImage: ProductImage = {
  url: "/development-products/peeking-friend-mock.jpeg",
  alt: "Development mockup of black and white T-shirts with a small peeking dog illustration",
  width: 1402,
  height: 1122,
};

const loyalLineImage: ProductImage = {
  url: "/development-products/loyal-line-mock.jpeg",
  alt: "Development mockup of black and white T-shirts with a small German Shepherd illustration",
  width: 1402,
  height: 1122,
};

const loyalLineDetailImage: ProductImage = {
  url: "/development-products/loyal-line-detail.jpeg",
  alt: "Development artwork detail of a German Shepherd line illustration with surrounding German text",
  width: 1254,
  height: 1254,
};

const pretzelCompanionImage: ProductImage = {
  url: "/development-products/pretzel-companion-mock.jpeg",
  alt: "Development mockup of black and white T-shirts with a small running dog and pretzel illustration",
  width: 1402,
  height: 1122,
};

const pretzelCompanionDetailImage: ProductImage = {
  url: "/development-products/pretzel-companion-detail.jpeg",
  alt: "Development artwork detail of a running puppy carrying a pretzel",
  width: 1254,
  height: 1254,
};

const cityCompanionImage: ProductImage = {
  url: "/development-products/city-companion-mock.jpeg",
  alt: "Development mockup of black and white T-shirts with a puppy and city-landmark illustration",
  width: 1402,
  height: 1122,
};

const collectionCampaignImage: ProductImage = {
  url: "/featured-collection/dogs-and-humans-campaign.jpeg",
  alt: "Black and white T-shirts featuring a small dog illustration beneath a heart",
  width: 1402,
  height: 1122,
};

export const developmentProducts = [
  {
    id: "development-product-chosen-companion",
    handle: "development-chosen-companion-tee",
    title: "Chosen Companion Tee — Development Mock",
    description: DEVELOPMENT_DATA_NOTICE,
    shortDescription: "A development record for a story-led dog illustration.",
    images: [chosenCompanionImage, chosenCompanionDetailImage],
    price: { amount: "39.00", currencyCode: "EUR" },
    variants: createDevelopmentVariants(
      "chosen-companion",
      {
        amount: "39.00",
        currencyCode: "EUR",
      },
      {
        isAvailable: ({ color, size }) =>
          !(color === "Black" && size === "M"),
        priceFor: ({ color }) => ({
          amount: color === "White" ? "40.00" : "39.00",
          currencyCode: "EUR",
        }),
        imageFor: ({ color }) =>
          color === "White"
            ? chosenCompanionDetailImage
            : chosenCompanionImage,
      },
    ),
    options: createDevelopmentOptions(),
    defaultSelectedOptions: [{ name: "Color", value: "Black" }],
    collectionHandles: ["pets"],
    productType: "T-Shirt",
    artworkPlacement: "Statement Print",
    details: {
      artworkPlacement: "Statement print — development classification",
    },
    relatedProductIds: [
      "development-product-peeking-friend",
      "development-product-loyal-line",
      "development-product-pretzel-companion",
      "development-product-city-companion-sold-out",
    ],
    story: {
      eyebrow: "Development story",
      title: "Chosen by paws. Worn by love.",
      shortStory:
        "A temporary story sample about the companion who wants to follow every step.",
      emotionalMessage:
        "This copy exists only to validate the storytelling content model.",
    },
    seo: {
      title: "Chosen Companion Tee — Development Mock",
      description: DEVELOPMENT_DATA_NOTICE,
      noIndex: true,
    },
    contentStatus: "development",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "development-product-peeking-friend",
    handle: "development-peeking-friend-tee",
    title: "Peeking Friend Tee — Development Mock",
    description: DEVELOPMENT_DATA_NOTICE,
    shortDescription: "A development record for a minimal chest placement.",
    images: [peekingFriendImage],
    price: { amount: "36.00", currencyCode: "EUR" },
    variants: createDevelopmentVariants(
      "peeking-friend",
      {
        amount: "36.00",
        currencyCode: "EUR",
      },
      { colors: ["Black"] },
    ),
    options: createDevelopmentOptions(["Black"]),
    defaultSelectedOptions: [{ name: "Color", value: "Black" }],
    collectionHandles: ["pets"],
    productType: "T-Shirt",
    artworkPlacement: "Small Chest Print",
    story: {
      eyebrow: "Development story",
      title: "Always just around the corner.",
      shortStory:
        "A temporary story sample inspired by the familiar face waiting at the edge of the room.",
    },
    relatedProductIds: [
      "development-product-chosen-companion",
      "development-product-loyal-line",
    ],
    seo: {
      title: "Peeking Friend Tee — Development Mock",
      description: DEVELOPMENT_DATA_NOTICE,
      noIndex: true,
    },
    contentStatus: "development",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "development-product-loyal-line",
    handle: "development-loyal-line-tee",
    title: "Loyal Line Tee — Development Mock",
    description: DEVELOPMENT_DATA_NOTICE,
    shortDescription: "A development record for breed-inspired line artwork.",
    images: [loyalLineImage, loyalLineDetailImage],
    price: { amount: "38.00", currencyCode: "EUR" },
    variants: createDevelopmentVariants("loyal-line", {
      amount: "38.00",
      currencyCode: "EUR",
    }),
    options: createDevelopmentOptions(),
    defaultSelectedOptions: [{ name: "Color", value: "White" }],
    collectionHandles: ["pets"],
    productType: "T-Shirt",
    artworkPlacement: "Small Chest Print",
    story: {
      eyebrow: "Development story",
      title: "A quiet portrait of loyalty.",
      shortStory:
        "A temporary story sample used to test concise artwork meaning without production claims.",
    },
    relatedProductIds: [
      "development-product-chosen-companion",
      "development-product-peeking-friend",
    ],
    seo: {
      title: "Loyal Line Tee — Development Mock",
      description: DEVELOPMENT_DATA_NOTICE,
      noIndex: true,
    },
    contentStatus: "development",
    isNew: true,
    isLimitedEdition: true,
  },
  {
    id: "development-product-pretzel-companion",
    handle: "development-pretzel-companion-tee",
    title:
      "Ein stiller Begleiter für jeden gemeinsamen Weg — Development Mock",
    description: DEVELOPMENT_DATA_NOTICE,
    shortDescription:
      "A development record for a long German-ready product title.",
    images: [pretzelCompanionImage, pretzelCompanionDetailImage],
    price: { amount: "41.00", currencyCode: "EUR" },
    variants: createDevelopmentVariants(
      "pretzel-companion",
      { amount: "41.00", currencyCode: "EUR" },
      { colors: ["Black"], sizes: ["M"] },
    ),
    options: createDevelopmentOptions(["Black"], ["M"]),
    defaultSelectedOptions: [
      { name: "Color", value: "Black" },
      { name: "Size", value: "M" },
    ],
    collectionHandles: ["pets"],
    productType: "T-Shirt",
    artworkPlacement: "Small Chest Print",
    story: {
      eyebrow: "Development story",
      title: "A long-title and single-variant test record.",
      shortStory:
        "Temporary content used only to validate card wrapping and direct quick add.",
    },
    relatedProductIds: ["development-product-chosen-companion"],
    seo: {
      title: "German-ready title product — Development Mock",
      description: DEVELOPMENT_DATA_NOTICE,
      noIndex: true,
    },
    contentStatus: "development",
    isNew: true,
  },
  {
    id: "development-product-city-companion-sold-out",
    handle: "development-city-companion-sold-out-tee",
    title: "City Companion Tee — Sold-out Development Mock",
    description: DEVELOPMENT_DATA_NOTICE,
    shortDescription: "A development record for the sold-out card state.",
    images: [cityCompanionImage],
    price: { amount: "37.00", currencyCode: "EUR" },
    variants: createDevelopmentVariants(
      "city-companion",
      { amount: "37.00", currencyCode: "EUR" },
      { isAvailable: () => false },
    ),
    options: createDevelopmentOptions(),
    defaultSelectedOptions: [{ name: "Color", value: "Black" }],
    collectionHandles: ["pets"],
    productType: "T-Shirt",
    artworkPlacement: "Statement Print",
    relatedProductIds: ["development-product-chosen-companion"],
    seo: {
      title: "City Companion Tee — Sold-out Development Mock",
      description: DEVELOPMENT_DATA_NOTICE,
      noIndex: true,
    },
    contentStatus: "development",
  },
  {
    id: "development-product-missing-image",
    handle: "development-missing-image-tee",
    title: "Image Pending Tee — Development Mock",
    description: DEVELOPMENT_DATA_NOTICE,
    shortDescription: "A development record for missing-image handling.",
    images: [],
    price: { amount: "35.00", currencyCode: "EUR" },
    variants: createDevelopmentVariants("missing-image", {
      amount: "35.00",
      currencyCode: "EUR",
    }),
    options: createDevelopmentOptions(),
    defaultSelectedOptions: [{ name: "Color", value: "Black" }],
    collectionHandles: ["pets"],
    productType: "T-Shirt",
    artworkPlacement: "Statement Print",
    relatedProductIds: ["development-product-chosen-companion"],
    seo: {
      title: "Image Pending Tee — Development Mock",
      description: DEVELOPMENT_DATA_NOTICE,
      noIndex: true,
    },
    contentStatus: "development",
  },
] as const satisfies readonly Product[];

export const developmentCollection = {
  id: "development-collection-pet-stories",
  handle: "pets",
  title: "Dogs & Their Humans",
  subtitle: "Development collection preview.",
  description:
    "A collection of minimal T-shirts created around the moments that make the bond between people and their dogs feel impossible to explain—and instantly recognizable.",
  story:
    "Inspired by the quiet rituals, familiar glances and unconditional companionship that dog owners understand.",
  heroImage: collectionCampaignImage,
  themeKey: "pets",
  products: developmentProducts,
  seo: {
    title: "Dogs & Their Humans — Development Collection",
    description: DEVELOPMENT_DATA_NOTICE,
    noIndex: true,
  },
  contentStatus: "development",
} as const satisfies Collection;

export function getDevelopmentProductByHandle(
  handle: string,
): Product | undefined {
  return developmentProducts.find((product) => product.handle === handle);
}

export function getDevelopmentProductsByIds(
  ids: readonly string[],
): readonly Product[] {
  const productById = new Map<string, Product>(
    developmentProducts.map((product) => [product.id, product] as const),
  );

  return ids.flatMap((id) => {
    const product = productById.get(id);
    return product ? [product] : [];
  });
}
