"use client";

import { ArrowUpRight, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";

import { ModalDialog } from "@/components/ui/modal-dialog";
import { searchProductsAction } from "@/features/search/commerce-search";
import type { Product } from "@/lib/commerce";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<readonly Product[]>([]);
  const [completedQuery, setCompletedQuery] = useState("");
  const [searchError, setSearchError] = useState(false);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const searching = deferredQuery.length >= 2 && completedQuery !== deferredQuery;

  useEffect(() => {
    if (deferredQuery.length < 2) {
      return;
    }

    let active = true;
    searchProductsAction(deferredQuery)
      .then((products) => {
        if (active) {
          setResults(products);
          setCompletedQuery(deferredQuery);
          setSearchError(false);
        }
      })
      .catch(() => {
        if (active) {
          setResults([]);
          setCompletedQuery(deferredQuery);
          setSearchError(true);
        }
      });
    return () => {
      active = false;
    };
  }, [deferredQuery]);

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      dialogId="site-search-dialog"
      titleId="site-search-title"
      descriptionId="site-search-description"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="type-label text-accent">Find your piece</p>
            <h2 id="site-search-title" className="type-section-heading mt-2">
              Search
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            data-autofocus
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-[var(--duration-fast)] hover:bg-surface-muted"
          >
            <X aria-hidden="true" size={20} strokeWidth={1.7} />
          </button>
        </div>
        <label
          htmlFor="site-search-input"
          id="site-search-description"
          className="sr-only"
        >
          Search products by name or artwork
        </label>
        <div className="relative mt-6">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-foreground-muted"
            size={18}
            strokeWidth={1.5}
          />
          <input
            id="site-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search the collection"
            autoComplete="off"
            data-autofocus
            className="min-h-13 w-full rounded-none border border-border bg-background pr-4 pl-11 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-muted focus:border-foreground-muted"
          />
        </div>

        <div className="mt-6 border-t border-border" aria-live="polite">
          {deferredQuery.length < 2 ? (
            <p className="type-caption py-5 text-foreground-muted">
              Enter at least two characters to search the collection.
            </p>
          ) : searching ? (
            <p className="type-caption py-5 text-foreground-muted">Searching…</p>
          ) : searchError ? (
            <p className="type-caption py-5 text-error">
              Search is temporarily unavailable. Try again.
            </p>
          ) : results.length === 0 ? (
            <p className="type-caption py-5 text-foreground-muted">
              No pieces match “{query.trim()}”.
            </p>
          ) : (
            <ul role="list" className="divide-y divide-border">
              {results.map((product) => {
                const image = product.images[0];
                const title = product.title.replace(
                  " — Development Mock",
                  "",
                );

                return (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.handle}`}
                      onClick={onClose}
                      className="group grid min-h-20 grid-cols-[3.25rem_1fr_auto] items-center gap-4 py-3 no-underline"
                    >
                      <span className="relative aspect-square overflow-hidden bg-surface-muted">
                        {image ? (
                          <Image
                            alt=""
                            fill
                            sizes="52px"
                            src={image.url}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : null}
                      </span>
                      <span>
                        <span className="block font-serif text-lg leading-tight">
                          {title}
                        </span>
                        <span className="mt-1 block text-[0.6875rem] tracking-[0.12em] text-foreground-muted uppercase">
                          {product.artworkPlacement ?? "T-Shirt"}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        size={17}
                        strokeWidth={1.4}
                        className="text-foreground-muted transition-colors group-hover:text-foreground"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </ModalDialog>
  );
}
