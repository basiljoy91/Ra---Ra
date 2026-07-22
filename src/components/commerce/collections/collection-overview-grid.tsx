import { CollectionOverviewCard } from "@/components/commerce/collections/collection-overview-card";
import type { CollectionSummary } from "@/types/collection";

interface CollectionOverviewGridProps {
  collections: readonly CollectionSummary[];
}

export function CollectionOverviewGrid({
  collections,
}: CollectionOverviewGridProps) {
  return (
    <ul className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-8" role="list">
      {collections.map((collection) => (
        <li className="min-w-0" key={collection.id}>
          <CollectionOverviewCard summary={collection} />
        </li>
      ))}
    </ul>
  );
}
