import type {
  Cart,
  Collection,
  Product,
  ProductImage,
  ProductVariant,
} from "@/lib/commerce/types";
import type {
  ShopifyCart,
  ShopifyCollection,
  ShopifyImage,
  ShopifyProduct,
  ShopifyVariant,
} from "@/lib/commerce/shopify/types";

function mapImage(
  image: ShopifyImage,
  fallbackAlt: string,
): ProductImage {
  return {
    url: image.url,
    alt: image.altText?.trim() || fallbackAlt,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
  };
}

function selectedValue(
  variant: ShopifyVariant,
  target: "size" | "color",
): string | undefined {
  return variant.selectedOptions.find((option) => {
    const normalized = option.name.toLowerCase();
    return target === "color"
      ? normalized === "color" || normalized === "colour"
      : normalized === target;
  })?.value;
}

function mapVariant(
  variant: ShopifyVariant,
  productTitle: string,
): ProductVariant {
  const size = selectedValue(variant, "size");
  const color = selectedValue(variant, "color");

  return {
    id: variant.id,
    title: variant.title,
    ...(variant.sku ? { sku: variant.sku } : {}),
    available: variant.availableForSale,
    ...(typeof variant.quantityAvailable === "number"
      ? { quantityAvailable: variant.quantityAvailable }
      : {}),
    ...(size ? { size } : {}),
    ...(color ? { color } : {}),
    selectedOptions: variant.selectedOptions,
    price: variant.price,
    ...(variant.compareAtPrice
      ? { compareAtPrice: variant.compareAtPrice }
      : {}),
    ...(variant.image
      ? { image: mapImage(variant.image, `${productTitle} variant`) }
      : {}),
  };
}

export function mapShopifyProduct(product: ShopifyProduct): Product {
  const shopifyImages = product.images.nodes.map((image) =>
    mapImage(image, product.title),
  );
  const images = shopifyImages;
  const variants = product.variants.nodes.map((variant) =>
    mapVariant(variant, product.title),
  );
  const compareAt = product.compareAtPriceRange.minVariantPrice;
  const price = product.priceRange.minVariantPrice;
  const showCompareAt =
    compareAt.currencyCode === price.currencyCode &&
    Number(compareAt.amount) > Number(price.amount);

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    images,
    price,
    ...(showCompareAt ? { compareAtPrice: compareAt } : {}),
    variants,
    options: product.options.map((option) => ({
      id: option.id,
      name: option.name,
      values: option.optionValues.map((value) => value.name),
    })),
    collectionHandles: product.collections.nodes.map(
      (collection) => collection.handle,
    ),
    ...(product.productType ? { productType: product.productType } : {}),
    seo: {
      title: product.seo.title?.trim() || product.title,
      description:
        product.seo.description?.trim() ||
        product.description ||
        product.title,
      ...(images[0] ? { image: images[0] } : {}),
      noIndex: false,
    },
    contentStatus: "production",
    isNew: product.tags.some((tag) => tag.toLowerCase() === "new"),
    isBestSeller: product.tags.some(
      (tag) => tag.toLowerCase() === "best-seller",
    ),
    isLimitedEdition: Boolean(
      product.tags.some((tag) => tag.toLowerCase() === "limited-edition"),
    ),
  };
}

export function mapShopifyCollection(
  collection: ShopifyCollection,
): Collection {
  const products = (collection.products?.nodes ?? []).map(mapShopifyProduct);
  const fallbackImage = products[0]?.images[0];
  const image = collection.image
    ? mapImage(collection.image, collection.title)
    : fallbackImage;

  return {
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    ...(image ? { heroImage: image } : {}),
    themeKey: collection.handle === "beyond" ? "beyond" : "default",
    products,
    seo: {
      title: collection.seo.title?.trim() || collection.title,
      description:
        collection.seo.description?.trim() ||
        collection.description ||
        collection.title,
      ...(image ? { image } : {}),
      noIndex: false,
    },
    contentStatus: "production",
  };
}

export function mapShopifyCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: cart.cost.subtotalAmount,
    total: cart.cost.totalAmount,
    ...(cart.buyerIdentity.countryCode
      ? { buyerCountryCode: cart.buyerIdentity.countryCode }
      : {}),
    lines: cart.lines.nodes.map((line) => ({
      id: line.id,
      quantity: line.quantity,
      variant: mapVariant(line.merchandise, line.merchandise.product.title),
      product: line.merchandise.product,
      total: line.cost.totalAmount,
    })),
  };
}
