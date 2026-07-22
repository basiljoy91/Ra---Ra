import type {
  Collection,
  CollectionThemeKey,
  Money,
  Product,
  ProductImage,
} from "@/lib/commerce";

export type CollectionStatus = "active" | "coming-soon" | "hidden";

export type CollectionSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "title-asc";

export type CollectionFilterKey =
  | "size"
  | "colour"
  | "type"
  | "placement"
  | "availability";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface CollectionMultiSelectFilter {
  id: CollectionFilterKey;
  label: string;
  type: "multi-select";
  options: readonly FilterOption[];
}

export interface CollectionPriceFilter {
  id: "price";
  label: string;
  type: "range";
  min: Money;
  max: Money;
}

export type CollectionFilter =
  | CollectionMultiSelectFilter
  | CollectionPriceFilter;

export type CollectionEditorialBlock = {
  type: "quote";
  quote: string;
  attribution?: string;
};

export interface CollectionHeroMedia {
  desktop: ProductImage;
  tablet?: ProductImage;
  mobile?: ProductImage;
  focalPoint?: {
    desktop?: string;
    tablet?: string;
    mobile?: string;
  };
}

export interface CollectionStory {
  eyebrow?: string;
  title: string;
  introduction: string;
  longDescription?: string;
  campaignLine?: string;
  quote?: string;
  inspiration?: string;
  heroMedia?: CollectionHeroMedia;
  editorialBlocks?: readonly CollectionEditorialBlock[];
}

export interface CollectionCatalogEntry {
  collection: Collection;
  status: CollectionStatus;
  story: CollectionStory;
  href?: string;
  heroLayout?: "story-left" | "story-right";
  developmentNotice?: string;
}

export interface CollectionSummary {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: ProductImage;
  href?: string;
  status: CollectionStatus;
  themeKey: CollectionThemeKey;
  productCount?: number;
  developmentNotice?: string;
}

export interface CollectionQueryState {
  sort: CollectionSort;
  selected: Readonly<Record<CollectionFilterKey, readonly string[]>>;
  priceMin?: string;
  priceMax?: string;
  page: number;
}

export interface CollectionQueryResult {
  products: readonly Product[];
  filteredProducts: readonly Product[];
  totalProducts: number;
  filteredTotal: number;
  page: number;
  totalPages: number;
  pageSize: number;
}

export interface ActiveFilterToken {
  id: string;
  label: string;
  href: string;
}

export type CollectionSearchParams = Record<
  string,
  string | readonly string[] | undefined
>;
