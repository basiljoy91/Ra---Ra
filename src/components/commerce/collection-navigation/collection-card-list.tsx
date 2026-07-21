import { CollectionCard } from "@/components/commerce/collection-navigation/collection-card";
import type {
  CollectionCardData,
  ShopByCollectionConfig,
} from "@/types/collection-card";

interface CollectionCardListProps {
  collections: readonly CollectionCardData[];
  labels: Pick<
    ShopByCollectionConfig,
    "activeCtaLabel" | "activeStatusLabel" | "comingSoonStatusLabel"
  >;
}

export function CollectionCardList({
  collections,
  labels,
}: CollectionCardListProps) {
  return (
    <ul className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-2 lg:gap-8">
      {collections.map((collection) => (
        <li className="min-w-0" key={collection.id}>
          <CollectionCard collection={collection} labels={labels} />
        </li>
      ))}
    </ul>
  );
}
