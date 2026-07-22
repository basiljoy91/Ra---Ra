"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { buildCollectionHref } from "@/lib/collections";
import type {
  CollectionQueryState,
  CollectionSort,
} from "@/types/collection";

const sortOptions: ReadonlyArray<{ value: CollectionSort; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Name: A to Z" },
];

interface CollectionSortControlProps {
  collectionHandle: string;
  state: CollectionQueryState;
}

export function CollectionSortControl({
  collectionHandle,
  state,
}: CollectionSortControlProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(nextSort: CollectionSort) {
    const href = buildCollectionHref(collectionHandle, state, {
      sort: nextSort,
      page: 1,
    });

    startTransition(() => {
      router.push(href, { scroll: false });
    });
  }

  return (
    <label className="type-caption grid gap-1 font-semibold text-foreground-muted">
      Sort products
      <select
        aria-busy={isPending}
        className="min-h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm text-foreground sm:min-w-52"
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value as CollectionSort)}
        value={state.sort}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
