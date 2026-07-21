import type { ProductImage } from "@/lib/commerce";

export type ProductCardVariant = "standard" | "compact" | "editorial";
export type ProductCardImageRatio = "portrait" | "square";
export type ProductCardHeadingLevel = 2 | 3 | 4;
export type ProductBadgeKind =
  | "new"
  | "best-seller"
  | "limited-edition"
  | "sold-out";

export interface ProductColourOption {
  value: string;
  label: string;
  image?: ProductImage;
  available: boolean;
}

export interface ProductCardActionVariant {
  id: string;
  title: string;
  available: boolean;
  size?: string;
  color?: string;
}

export interface QuickAddInput {
  productId: string;
  variantId: string;
  quantity: number;
}

export type QuickAddResult =
  | { status: "success"; message?: string }
  | { status: "error"; message: string };

export type ProductCardQuickAddHandler = (
  input: QuickAddInput,
) => Promise<QuickAddResult>;
