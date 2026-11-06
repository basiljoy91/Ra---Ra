import type {
  Collection,
  Money,
  Product,
  ProductImage,
  ProductOption,
  ProductVariant,
} from "@/lib/commerce";
import {
  TEST_PRODUCT_PRICE_INR,
  testInventoryByProductHandle,
  type TestSize,
} from "@/data/development/inventory";

export const DEVELOPMENT_DATA_NOTICE =
  "Test catalogue content for the Shopify connection. Final EU launch details remain subject to approval.";

const sizes = ["S", "M", "L", "XL", "XXL"] as const;

const garmentTypes = [
  { slug: "sculptural-boxy-black", name: "Sculptural Boxy Tee", category: "Premium Streetwear", color: "Black", fit: "Boxy", gsm: "280 GSM", finish: "Screen print · Bio/enzyme wash · Compacted" },
  { slug: "washed-art-charcoal", name: "Washed Art Tee", category: "Premium Streetwear", color: "Washed Charcoal", fit: "Oversized", gsm: "250 GSM", finish: "Soft-hand screen print · Vintage garment wash" },
  { slug: "signature-regular-off-white", name: "Signature Regular Tee", category: "Premium Casual Fashion", color: "Off-White", fit: "Regular", gsm: "250 GSM", finish: "Screen print · Bio/enzyme wash · Compacted" },
  { slug: "relaxed-essential-chocolate", name: "Relaxed Essential Tee", category: "Premium Casual Fashion", color: "Chocolate Brown", fit: "Relaxed", gsm: "260 GSM", finish: "Screen print · Bio/enzyme wash · Compacted" },
] as const;

const designs = [
  { slug: "beyond-fear", name: "Beyond Fear", shortStory: "Courage is movement, not the absence of fear.", meaning: "A weathered figure and hourglass place courage inside the passage of time. Fear may remain; the choice to move can still be made." },
  { slug: "beyond-reality", name: "Beyond Reality", shortStory: "The visible world is only one version of what exists.", meaning: "A hooded celestial figure, orbital lines and flowing teal forms explore the edge between perception, imagination and the unknown." },
  { slug: "past-present-beyond", name: "Past Present Beyond", shortStory: "The past arrives edited by everything that followed.", meaning: "A classical portrait is interrupted by red, grids and distressed geometry—an image of identity inherited, altered and carried forward." },
  { slug: "beyond-limits", name: "Beyond Limits", shortStory: "Strength can mean questioning the burden itself.", meaning: "In classical myth Atlas carries the heavens, not the Earth. A fractured celestial sphere turns endurance into a question about release, possibility and imagined limits." },
] as const;

function createOptions(color: string): readonly ProductOption[] {
  return [
    { id: "colour", name: "Color", values: [color] },
    { id: "size", name: "Size", values: sizes },
  ];
}

function createVariants(productId: string, productHandle: string, color: string, price: Money, image: ProductImage): readonly ProductVariant[] {
  const inventory = testInventoryByProductHandle[productHandle];

  return sizes.map((size) => ({
    id: `${productId}-${size.toLowerCase()}`,
    title: `${color} / ${size}`,
    available: (inventory?.[size as TestSize] ?? 0) > 0,
    quantityAvailable: inventory?.[size as TestSize] ?? 0,
    sku: `${productHandle}-${size}`.toUpperCase(),
    size,
    color,
    selectedOptions: [{ name: "Color", value: color }, { name: "Size", value: size }],
    price,
    image,
  }));
}

function createProduct(design: (typeof designs)[number], garment: (typeof garmentTypes)[number]): Product {
  const id = `product-${design.slug}-${garment.slug}`;
  const handle = `${design.slug}-${garment.slug}`;
  const productImagePath = `/products/${design.slug}/${garment.slug}`;
  const image: ProductImage = {
    url: `${productImagePath}/lifestyle-back.png`,
    alt: `${design.name} back artwork on the ${garment.name} in ${garment.color}`,
    width: 1536,
    height: 2048,
  };
  const alternateBackGender = garment.slug === "relaxed-essential-chocolate" ? "male" : "female";
  const galleryImages: readonly ProductImage[] = [
    image,
    {
      url: `${productImagePath}/front-male-black.png`,
      alt: `Male front view of the black ${design.name} ${garment.name}`,
      width: 1536,
      height: 2048,
    },
    {
      url: `${productImagePath}/front-female-black.png`,
      alt: `Female front view of the black ${design.name} ${garment.name}`,
      width: 1536,
      height: 2048,
    },
    {
      url: `${productImagePath}/back-${alternateBackGender}-black.png`,
      alt: `${alternateBackGender === "male" ? "Male" : "Female"} back view of the black ${design.name} ${garment.name}`,
      width: 1536,
      height: 2048,
    },
    {
      url: `${productImagePath}/side-couple-black.png`,
      alt: `Male and female side views of the black ${design.name} ${garment.name}`,
      width: 1536,
      height: 2048,
    },
  ];
  const price = { amount: TEST_PRODUCT_PRICE_INR, currencyCode: "INR" } as const;

  return {
    id,
    handle,
    title: `${design.name} — ${garment.name}`,
    description: `${design.meaning} ${DEVELOPMENT_DATA_NOTICE}`,
    shortDescription: `${design.shortStory} ${garment.color} · ${garment.fit} fit.`,
    images: galleryImages,
    price,
    variants: createVariants(id, handle, garment.color, price, image),
    options: createOptions(garment.color),
    defaultSelectedOptions: [{ name: "Color", value: garment.color }, { name: "Size", value: "M" }],
    collectionHandles: ["beyond"],
    productType: garment.name,
    artworkPlacement: "Small chest mark + statement back print",
    details: {
      material: `${garment.gsm} 100% Supima cotton double jersey`,
      fit: garment.fit,
      care: ["Wash inside out", "Cold wash", "Do not iron directly on print"],
      artworkPlacement: "Small chest mark and large back artwork",
      manufacturing: garment.finish,
      shippingSummary: "Worldwide shipping is planned for launch.",
      returnSummary: "Final returns terms will be confirmed before checkout launch.",
    },
    story: {
      eyebrow: "Limited edition artwork",
      title: design.name,
      shortStory: design.shortStory,
      artworkMeaning: design.meaning,
      image,
    },
    seo: {
      title: `${design.name} ${garment.name}`,
      description: `${design.name} on the ${garment.name}: ${garment.color}, ${garment.fit.toLowerCase()} fit, ${garment.gsm}.`,
      noIndex: true,
      image,
    },
    contentStatus: "development",
    isNew: true,
    isLimitedEdition: true,
  };
}

export const developmentProducts: readonly Product[] = designs.flatMap((design) =>
  garmentTypes.map((garment) => createProduct(design, garment)),
);

const collectionCampaignImage: ProductImage = {
  url: "/campaign/beyond-limits-hero.png",
  alt: "Model in a washed charcoal Beyond Limits oversized T-shirt in a sunlit concrete interior",
  width: 1536,
  height: 1024,
};

export const developmentCollection = {
  id: "beyond-limited-edition",
  handle: "beyond",
  title: "Beyond",
  subtitle: "Four artworks. Four garment constructions.",
  description: "A limited-edition collection built around courage, perception, time and the strength to move past imagined boundaries.",
  story: "Each artwork is available across the Sculptural Boxy, Washed Art, Signature Regular and Relaxed Essential tee.",
  heroImage: collectionCampaignImage,
  themeKey: "beyond",
  products: developmentProducts,
  seo: {
    title: "Beyond — Limited Edition ra&ra T-Shirts",
    description: "Explore Beyond Fear, Beyond Reality, Past Present Beyond and Beyond Limits across four premium tee constructions.",
    noIndex: true,
  },
  contentStatus: "development",
} as const satisfies Collection;

export function getDevelopmentProductByHandle(handle: string): Product | undefined {
  return developmentProducts.find((product) => product.handle === handle);
}

export function getDevelopmentProductsByIds(ids: readonly string[]): readonly Product[] {
  const byId = new Map(developmentProducts.map((product) => [product.id, product]));
  return ids.flatMap((id) => {
    const product = byId.get(id);
    return product ? [product] : [];
  });
}
