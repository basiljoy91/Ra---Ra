export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: readonly ShopifySelectedOption[];
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  availableForSale: boolean;
  tags: readonly string[];
  seo: { title: string | null; description: string | null };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  options: readonly {
    id: string;
    name: string;
    optionValues: readonly { name: string }[];
  }[];
  images: { nodes: readonly ShopifyImage[] };
  variants: { nodes: readonly ShopifyVariant[] };
  collections: { nodes: readonly { handle: string }[] };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  seo: { title: string | null; description: string | null };
  image: ShopifyImage | null;
  products?: { nodes: readonly ShopifyProduct[] };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    nodes: readonly {
      id: string;
      quantity: number;
      cost: { totalAmount: ShopifyMoney };
      merchandise: ShopifyVariant & {
        product: { id: string; handle: string; title: string };
      };
    }[];
  };
}

export interface ShopifyCartUserError {
  message: string;
  code?: string | null;
}

export interface ShopifyCartPayload {
  cart: ShopifyCart | null;
  userErrors: readonly ShopifyCartUserError[];
  warnings: readonly { message: string; code?: string | null }[];
}
