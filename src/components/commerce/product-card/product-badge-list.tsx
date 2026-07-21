import { productBadgeDefinitions } from "@/config/product-card";
import { cn } from "@/lib/utilities";
import type { ProductBadgeKind } from "@/types/product-card";

interface ProductBadgeListProps {
  badges: readonly ProductBadgeKind[];
}

export function ProductBadgeList({ badges }: ProductBadgeListProps) {
  if (badges.length === 0) {
    return null;
  }

  return (
    <ul
      className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5"
      role="list"
    >
      {badges.slice(0, 2).map((badge) => {
        const definition = productBadgeDefinitions[badge];

        return (
          <li
            className={cn(
              "type-caption rounded-full border px-2.5 py-1 font-semibold",
              definition.className,
            )}
            key={badge}
          >
            {definition.label}
          </li>
        );
      })}
    </ul>
  );
}
