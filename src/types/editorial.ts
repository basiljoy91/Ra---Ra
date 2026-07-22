import type { ProductImage } from "@/lib/commerce";

export type EditorialBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; content: string; id?: string }
  | { type: "list"; style?: "unordered" | "ordered"; items: readonly string[] }
  | { type: "image"; image: ProductImage; caption?: string }
  | { type: "quote"; quote: string; attribution?: string }
  | { type: "callout"; title?: string; body: string; tone?: "default" | "notice" }
  | {
      type: "two-column";
      left: readonly EditorialBlock[];
      right: readonly EditorialBlock[];
    }
  | { type: "divider" };

export interface EditorialHeroConfig {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: ProductImage;
  imagePosition?: string;
  developmentNotice?: string;
}

export interface EditorialCtaConfig {
  eyebrow?: string;
  heading: string;
  description?: string;
  label: string;
  href: string;
}

export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  category?: string;
  readingTime?: string;
  heroImage?: ProductImage;
  content: readonly EditorialBlock[];
  relatedSlugs?: readonly string[];
  contentStatus: "development" | "production";
  featured?: boolean;
}

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategoryData {
  id: string;
  title: string;
  items: readonly FaqItemData[];
}

export interface SizeChartData {
  columns: readonly string[];
  rows: readonly {
    id: string;
    values: readonly string[];
  }[];
  caption: string;
  developmentNotice?: string;
}
