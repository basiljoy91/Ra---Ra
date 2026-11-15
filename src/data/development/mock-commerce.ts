import {
  BEYOND_COLLECTION_HANDLE,
  BEYOND_GARMENT_TYPE,
  beyondCollectionHero,
  beyondCollectionPhilosophy,
  beyondDesigns,
  createBeyondProductStory,
} from "@/data/beyond-collection";
import {
  developmentSizes,
  TEST_PRODUCT_PRICE_INR,
} from "@/data/development/inventory";
import type {
  Collection,
  Money,
  Product,
  ProductImage,
  ProductOption,
  ProductVariant,
} from "@/lib/commerce";

export const DEVELOPMENT_DATA_NOTICE =
  "Development-only commerce fixture. Price, inventory and launch availability are not approved.";

function createOptions(): readonly ProductOption[] {
  return [
    { id: "colour", name: "Color", values: ["Deep Black"] },
    { id: "size", name: "Size", values: developmentSizes },
  ];
}

function createVariants(
  productId: string,
  handle: string,
  price: Money,
  image: ProductImage,
): readonly ProductVariant[] {
  return developmentSizes.map((size) => ({
    id: `${productId}-${size.toLowerCase()}`,
    title: `Deep Black / ${size}`,
    available: true,
    sku: `${handle}-${size}`.toUpperCase(),
    size,
    color: "Deep Black",
    selectedOptions: [
      { name: "Color", value: "Deep Black" },
      { name: "Size", value: size },
    ],
    price,
    image,
  }));
}

export const developmentProducts: readonly Product[] = beyondDesigns.map(
  (design) => {
    const id = `product-${design.handle}`;
    const price = {
      amount: TEST_PRODUCT_PRICE_INR,
      currencyCode: "INR",
    } as const;
    const primaryImage = design.images[0];

    if (!primaryImage) {
      throw new Error(`Missing primary image for ${design.handle}`);
    }

    return {
      id,
      handle: design.handle,
      title: design.title,
      description: design.productStoryParagraphs.join(" "),
      shortDescription: design.shortDescription,
      images: design.images,
      price,
      priceIsPlaceholder: true,
      variants: createVariants(id, design.handle, price, primaryImage),
      options: createOptions(),
      defaultSelectedOptions: [
        { name: "Color", value: "Deep Black" },
        { name: "Size", value: "M" },
      ],
      collectionHandles: [BEYOND_COLLECTION_HANDLE],
      productType: BEYOND_GARMENT_TYPE,
      artworkPlacement: design.artworkDescription,
      details: {
        material: "280 GSM, 100% Supima cotton, double-jersey knit",
        fit: "Boxy oversized unisex fit with dropped shoulders and a standard oversized length",
        artworkPlacement: design.artworkDescription,
        construction: [
          "Wide, straight short sleeves",
          "Reinforced 2.5–3 cm rib crew neck",
          "Reinforced shoulder-to-shoulder tape",
          "Double-needle sleeve and bottom hems",
        ],
        surface: "Dense, smooth, matte and softly structured",
      },
      story: createBeyondProductStory(design),
      seo: {
        title: `${design.title} — RA & RA BEYOND`,
        description: design.shortDescription,
        canonicalPath: `/products/${design.handle}`,
        noIndex: true,
        image: primaryImage,
      },
      contentStatus: "development",
    } satisfies Product;
  },
);

export const developmentCollection = {
  id: "beyond-collection-01",
  handle: BEYOND_COLLECTION_HANDLE,
  title: "BEYOND",
  subtitle: "THE THINGS WE CARRY.",
  description:
    "Four designs. Four human experiences. One way of making the invisible personal.",
  story: beyondCollectionPhilosophy.join(" "),
  heroImage: beyondCollectionHero.desktop,
  mobileHeroImage: beyondCollectionHero.mobile,
  themeKey: "beyond",
  products: developmentProducts,
  seo: {
    title: "BEYOND — The Things We Carry | RA & RA",
    description:
      "Explore Beyond Time, Beyond Fear, Beyond Reality and Beyond Limits: four designs translating human experience into lines, forms, light and space.",
    noIndex: true,
    image: beyondCollectionHero.desktop,
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
  const byId = new Map(developmentProducts.map((product) => [product.id, product]));
  return ids.flatMap((id) => {
    const product = byId.get(id);
    return product ? [product] : [];
  });
}
