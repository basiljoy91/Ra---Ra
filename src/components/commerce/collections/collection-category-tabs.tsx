import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buildCollectionHref, normalizeFilterValue } from "@/lib/collections";
import type { Product } from "@/lib/commerce";
import type { CollectionQueryState } from "@/types/collection";

interface CollectionCategoryTabsProps {
  collectionHandle: string;
  products: readonly Product[];
  state: CollectionQueryState;
}

export function CollectionCategoryTabs({
  collectionHandle,
  products,
  state,
}: CollectionCategoryTabsProps) {
  const categories = Array.from(
    products.reduce((entries, product) => {
      if (!product.productType) return entries;

      const value = normalizeFilterValue(product.productType);
      const current = entries.get(value);
      entries.set(value, {
        value,
        label: current?.label ?? product.productType,
        count: (current?.count ?? 0) + 1,
      });
      return entries;
    }, new Map<string, { value: string; label: string; count: number }>()),
  ).map(([, category]) => category);
  const selectedType = state.selected.type[0];

  if (categories.length === 0) return null;

  function categoryHref(type?: string): string {
    return buildCollectionHref(collectionHandle, state, {
      page: 1,
      selected: {
        ...state.selected,
        type: type ? [type] : [],
      },
    });
  }

  return (
    <nav
      aria-label="Product categories"
      className="border-b border-[#d8d0c6] bg-[#f4efe8] py-3 text-[#171513] [color-scheme:light] md:py-4"
    >
      <Container>
        <ul
          className="collection-category-scroll -mx-[var(--page-gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--page-gutter)] md:mx-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] md:overflow-visible md:px-0"
          role="list"
        >
          <li className="shrink-0 snap-start">
            <Link
              aria-current={!selectedType ? "page" : undefined}
              className="inline-flex min-h-11 min-w-[7rem] items-center justify-center border border-[#bfb5a9] px-5 text-xs font-semibold tracking-[0.08em] no-underline transition-colors hover:border-[#171513] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171513] aria-[current=page]:border-[#171513] aria-[current=page]:bg-[#171513] aria-[current=page]:text-white md:w-full"
              href={categoryHref()}
              scroll={false}
            >
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li className="shrink-0 snap-start" key={category.value}>
              <Link
                aria-current={selectedType === category.value ? "page" : undefined}
                className="inline-flex min-h-11 min-w-[7rem] items-center justify-center border border-[#bfb5a9] px-5 text-xs font-semibold tracking-[0.08em] no-underline transition-colors hover:border-[#171513] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171513] aria-[current=page]:border-[#171513] aria-[current=page]:bg-[#171513] aria-[current=page]:text-white md:w-full"
                href={categoryHref(category.value)}
                scroll={false}
              >
                {category.label}
                <span className="ml-1.5 text-[0.65rem] opacity-65" aria-hidden="true">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
