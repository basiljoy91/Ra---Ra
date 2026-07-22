"use client";

import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { CollectionFilterFields } from "@/components/commerce/collections/collection-filter-fields";
import { Button, buttonStyles } from "@/components/ui/button";
import { ModalDialog } from "@/components/ui/modal-dialog";
import { canonicalizeCollectionParams } from "@/lib/collections";
import type {
  CollectionFilter,
  CollectionQueryState,
} from "@/types/collection";

interface MobileFilterDrawerProps {
  filters: readonly CollectionFilter[];
  state: CollectionQueryState;
  activeCount: number;
  clearHref: string;
  currentResultCount: number;
}

function countTemporarySelections(form: HTMLFormElement): number {
  const checked = form.querySelectorAll<HTMLInputElement>(
    'input[type="checkbox"]:checked',
  ).length;
  const priceValues = Array.from(
    form.querySelectorAll<HTMLInputElement>(
      'input[name="price-min"], input[name="price-max"]',
    ),
  ).filter((input) => input.value.trim().length > 0).length;

  return checked + priceValues;
}

export function MobileFilterDrawer({
  filters,
  state,
  activeCount,
  clearHref,
  currentResultCount,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const [temporaryCount, setTemporaryCount] = useState(activeCount);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  function openDrawer() {
    setTemporaryCount(activeCount);
    setOpen(true);
  }

  function handleChange(event: ChangeEvent<HTMLFormElement>) {
    setTemporaryCount(countTemporarySelections(event.currentTarget));
  }

  function clearTemporarySelections() {
    const form = formRef.current;

    if (!form) {
      return;
    }

    form
      .querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
      .forEach((input) => {
        input.checked = false;
      });
    form
      .querySelectorAll<HTMLInputElement>(
        'input[name="price-min"], input[name="price-max"]',
      )
      .forEach((input) => {
        input.value = "";
      });
    setTemporaryCount(0);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const entries = Array.from(new FormData(event.currentTarget).entries()).flatMap(
      ([key, value]) =>
        typeof value === "string" ? [[key, value] as [string, string]] : [],
    );
    const params = canonicalizeCollectionParams(entries);
    const query = params.toString();

    setOpen(false);
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  }

  return (
    <div className="lg:hidden">
      <Button
        aria-controls="collection-filter-drawer"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="w-full"
        onClick={openDrawer}
        variant="secondary"
      >
        <SlidersHorizontal aria-hidden="true" size={18} strokeWidth={1.8} />
        Filters{activeCount > 0 ? ` (${activeCount})` : ""}
      </Button>

      <ModalDialog
        descriptionId="collection-filter-description"
        dialogId="collection-filter-drawer"
        onClose={() => setOpen(false)}
        open={open}
        panelClassName="flex flex-col overflow-hidden"
        placement="left"
        titleId="collection-filter-title"
      >
        <div className="flex min-h-[var(--header-height-mobile)] shrink-0 items-center justify-between border-b border-border px-[var(--page-gutter)]">
          <div>
            <h2 className="type-subheading font-semibold" id="collection-filter-title">
              Filter products
            </h2>
            <p className="type-caption text-foreground-muted" id="collection-filter-description">
              Changes apply only after you choose Apply Filters.
            </p>
          </div>
          <button
            aria-label="Close product filters"
            className="inline-flex size-11 items-center justify-center rounded-full border border-transparent hover:border-border hover:bg-surface-muted"
            data-autofocus
            onClick={() => setOpen(false)}
            type="button"
          >
            <X aria-hidden="true" size={21} strokeWidth={1.7} />
          </button>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onChange={handleChange}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <input name="sort" type="hidden" value={state.sort} />
          <div className="min-h-0 flex-1 overflow-y-auto px-[var(--page-gutter)] py-6">
            <div className="flex items-center justify-between gap-4 pb-5">
              <p className="type-small text-foreground-muted" aria-live="polite">
                {temporaryCount} selected
              </p>
              <button
                className="type-small min-h-11 font-semibold underline"
                onClick={clearTemporarySelections}
                type="button"
              >
                Clear selections
              </button>
            </div>
            <CollectionFilterFields
              filters={filters}
              idPrefix="mobile-filter"
              state={state}
            />
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-border bg-surface p-[var(--page-gutter)]">
            <Link
              className={buttonStyles({ variant: "quiet", size: "md" })}
              href={clearHref}
              onClick={() => setOpen(false)}
              scroll={false}
            >
              Clear all
            </Link>
            <Button disabled={isPending} type="submit">
              {isPending ? "Applying…" : "Apply Filters"}
            </Button>
            <p className="type-caption col-span-2 text-center text-foreground-muted">
              Currently {currentResultCount} matching {currentResultCount === 1 ? "product" : "products"}
            </p>
          </div>
        </form>
      </ModalDialog>
    </div>
  );
}
