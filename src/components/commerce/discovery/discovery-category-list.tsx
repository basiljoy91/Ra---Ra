import { DiscoveryCategoryCard } from "@/components/commerce/discovery/discovery-category-card";
import type { DiscoveryCategory } from "@/types/discovery";

interface DiscoveryCategoryListProps {
  categories: readonly DiscoveryCategory[];
  navigationLabel: string;
}

export function DiscoveryCategoryList({
  categories,
  navigationLabel,
}: DiscoveryCategoryListProps) {
  return (
    <nav aria-label={navigationLabel}>
      <ul
        className="discovery-scroll -mx-[var(--page-gutter)] flex snap-x snap-proximity gap-4 overflow-x-auto px-[var(--page-gutter)] pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 lg:gap-6 xl:grid-cols-6"
        role="list"
      >
        {categories.map((category) => (
          <li
            className="w-[clamp(13.5rem,72vw,17rem)] shrink-0 snap-start md:w-auto"
            key={category.id}
          >
            <DiscoveryCategoryCard category={category} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
