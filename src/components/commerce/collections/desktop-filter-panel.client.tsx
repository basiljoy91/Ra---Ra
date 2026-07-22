"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition, type FormEvent } from "react";

import { CollectionFilterFields } from "@/components/commerce/collections/collection-filter-fields";
import { Button } from "@/components/ui/button";
import { canonicalizeCollectionParams } from "@/lib/collections";
import type {
  CollectionFilter,
  CollectionQueryState,
} from "@/types/collection";

interface DesktopFilterPanelProps {
  filters: readonly CollectionFilter[];
  state: CollectionQueryState;
  clearHref: string;
  activeCount: number;
}

function formStringEntries(form: HTMLFormElement): Array<[string, string]> {
  return Array.from(new FormData(form).entries()).flatMap(([key, value]) =>
    typeof value === "string" ? [[key, value] as [string, string]] : [],
  );
}

export function DesktopFilterPanel({
  filters,
  state,
  clearHref,
  activeCount,
}: DesktopFilterPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = canonicalizeCollectionParams(
      formStringEntries(event.currentTarget),
    );
    const query = params.toString();

    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  }

  return (
    <aside aria-label="Product filters" className="hidden lg:block">
      <div className="sticky top-[calc(var(--header-height-desktop)+var(--space-6))] rounded-[var(--radius-panel)] border border-border bg-surface p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="type-subheading font-semibold">Filter</h2>
          {activeCount > 0 ? (
            <Link
              className="type-caption font-semibold underline"
              href={clearHref}
              scroll={false}
            >
              Clear all
            </Link>
          ) : null}
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <input name="sort" type="hidden" value={state.sort} />
          <CollectionFilterFields
            filters={filters}
            idPrefix="desktop-filter"
            state={state}
          />
          <Button className="mt-6 w-full" disabled={isPending} type="submit">
            {isPending ? "Updating…" : "Apply Filters"}
          </Button>
        </form>
      </div>
    </aside>
  );
}
