import type {
  Collection,
  Money,
  Product,
  ProductImage,
  ProductOption,
  ProductVariant,
} from "@/lib/commerce";

export const DEVELOPMENT_DATA_NOTICE =
  "Product imagery reflects the supplied ra&ra design and garment references. Pricing remains a launch placeholder.";

const sizes = ["S", "M", "L", "XL", "XXL"] as const;

const garmentTypes = [
  { slug: "sculptural-boxy-black", name: "Sculptural Boxy Tee", category: "Premium Streetwear", color: "Black", fit: "Boxy", gsm: "280 GSM", finish: "Screen print · Bio/enzyme wash · Compacted", price: "49.00" },
  { slug: "washed-art-charcoal", name: "Washed Art Tee", category: "Premium Streetwear", color: "Washed Charcoal", fit: "Oversized", gsm: "250 GSM", finish: "Soft-hand screen print · Vintage garment wash", price: "52.00" },
  { slug: "signature-regular-off-white", name: "Signature Regular Tee", category: "Premium Casual Fashion", color: "Off-White", fit: "Regular", gsm: "250 GSM", finish: "Screen print · Bio/enzyme wash · Compacted", price: "46.00" },
  { slug: "relaxed-essential-chocolate", name: "Relaxed Essential Tee", category: "Premium Casual Fashion", color: "Chocolate Brown", fit: "Relaxed", gsm: "260 GSM", finish: "Screen print · Bio/enzyme wash · Compacted", price: "48.00" },
] as const;

const designs = [
  { slug: "beyond-fear", name: "Beyond Fear", shortStory: "Time changes everything except courage.", meaning: "Chronos and the hourglass turn change into a reminder that fear fades while courage remains." },
  { slug: "beyond-reality", name: "Beyond Reality", shortStory: "A journey beyond the visible world.", meaning: "A hooded celestial figure and flowing teal forms explore the unknown, hidden dimensions and infinite possibility." },
  { slug: "past-present-beyond", name: "Past Present Beyond", shortStory: "Same soul. Different time.", meaning: "A fractured classical portrait joins past and present through distressed geometry and a vivid red interruption." },
  { slug: "beyond-limits", name: "Beyond Limits", shortStory: "Push further. Discover more.", meaning: "Atlas carries a breaking world as a symbol of strength beyond physical, mental and imagined limits." },
] as const;

function createOptions(color: string): readonly ProductOption[] {
  return [
    { id: "colour", name: "Color", values: [color] },
    { id: "size", name: "Size", values: sizes },
  ];
}

function createVariants(productId: string, color: string, price: Money, image: ProductImage): readonly ProductVariant[] {
  return sizes.map((size) => ({
    id: `${productId}-${size.toLowerCase()}`,
    title: `${color} / ${size}`,
    available: true,
    size,
    color,
    selectedOptions: [{ name: "Color", value: color }, { name: "Size", value: size }],
    price,
    image,
  }));
}

function createProduct(design: (typeof designs)[number], garment: (typeof garmentTypes)[number]): Product {
  const id = `product-${design.slug}-${garment.slug}`;
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
  const price = { amount: garment.price, currencyCode: "EUR" } as const;

  return {
    id,
    handle: `${design.slug}-${garment.slug}`,
    title: `${design.name} — ${garment.name}`,
    description: `${design.meaning} ${DEVELOPMENT_DATA_NOTICE}`,
    shortDescription: `${design.shortStory} ${garment.color} · ${garment.fit} fit · ${garment.gsm}.`,
    images: galleryImages,
    price,
    variants: createVariants(id, garment.color, price, image),
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
