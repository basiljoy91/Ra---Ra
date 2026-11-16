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
      <div className="sticky top-[calc(var(--header-height-desktop)+1.5rem)] border-r border-[#cfc6bb] pr-6">
        <div className="flex min-h-11 items-center justify-between gap-4 border-b border-[#cfc6bb] pb-4">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-[#171513] uppercase">
            Filters
            {activeCount > 0 ? (
              <span className="ml-2 text-[#71685f]" aria-hidden="true">
                {activeCount}
              </span>
            ) : null}
          </h2>
          {activeCount > 0 ? (
            <Link
              className="type-caption font-semibold text-[#4f4943] underline underline-offset-4"
              href={clearHref}
              scroll={false}
            >
              Clear all
            </Link>
          ) : null}
        </div>
        <form onSubmit={handleSubmit}>
          <input name="sort" type="hidden" value={state.sort} />
          {state.selected.type.map((value) => (
            <input key={value} name="type" type="hidden" value={value} />
          ))}
          <CollectionFilterFields
            filters={filters}
            idPrefix="desktop-filter"
            state={state}
          />
          <Button
            className="mt-6 w-full rounded-none bg-[#171513] text-xs tracking-[0.08em] uppercase"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Updating…" : "Apply Filters"}
          </Button>
        </form>
      </div>
    </aside>
  );
}
