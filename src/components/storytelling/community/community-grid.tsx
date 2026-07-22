import { CommunityItemCard } from "@/components/storytelling/community/community-item-card";
import type { CommunityItem } from "@/types/community";

type CommunityGridProps = {
  items: readonly CommunityItem[];
};

export function CommunityGrid({ items }: CommunityGridProps) {
  return (
    <ul
      className="mt-[var(--space-10)] grid grid-cols-2 gap-x-[var(--space-3)] gap-y-[var(--space-8)] sm:gap-x-[var(--space-5)] lg:grid-cols-4 lg:gap-x-[var(--space-6)]"
      role="list"
    >
      {items.map((item) => (
        <li key={item.id}>
          <CommunityItemCard item={item} />
        </li>
      ))}
    </ul>
  );
}
