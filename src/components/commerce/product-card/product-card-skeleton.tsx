import { cn } from "@/lib/utilities";
import type {
  ProductCardImageRatio,
  ProductCardVariant,
} from "@/types/product-card";

interface ProductCardSkeletonProps {
  variant?: ProductCardVariant;
  imageRatio?: ProductCardImageRatio;
  className?: string;
}

const ratioClasses: Record<ProductCardImageRatio, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

export function ProductCardSkeleton({
  variant = "standard",
  imageRatio = "portrait",
  className,
}: ProductCardSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse motion-reduce:animate-none", className)}
    >
      <div
        className={cn(
          "rounded-[var(--radius-media)] border border-border bg-surface-muted",
          ratioClasses[imageRatio],
        )}
      />
      <div className="grid gap-3 pt-4">
        {variant === "editorial" ? (
          <span className="h-3 w-24 rounded-full bg-border" />
        ) : null}
        <span className="h-5 w-4/5 rounded-full bg-border" />
        <span className="h-4 w-20 rounded-full bg-border" />
        {variant === "standard" ? (
          <>
            <div className="flex gap-2">
              <span className="size-9 rounded-full bg-border" />
              <span className="size-9 rounded-full bg-border" />
            </div>
            <span className="h-11 w-full rounded-[var(--radius-control)] bg-border" />
          </>
        ) : null}
      </div>
    </div>
  );
}
