import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buildJournalHref } from "@/lib/journal";
import type { JournalCategory, JournalQueryState } from "@/lib/journal";

export function JournalCategoryNavigation({
  categories,
  state,
  totalArticles,
}: {
  categories: readonly JournalCategory[];
  state: JournalQueryState;
  totalArticles: number;
}) {
  return (
    <nav
      aria-label="Journal categories"
      className="border-b border-[#d5cbc0] bg-[#f4eee7] py-3 text-[#171513] [color-scheme:light] md:py-4"
    >
      <Container>
        <ul
          className="journal-category-scroll -mx-[var(--page-gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--page-gutter)] md:mx-0 md:grid md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] md:gap-0 md:overflow-visible md:px-0"
          role="list"
        >
          <li className="shrink-0 snap-start md:border-r md:border-[#c7bdb2]">
            <Link
              aria-current={!state.category ? "page" : undefined}
              className="inline-flex min-h-11 min-w-[8.5rem] items-center justify-center gap-2 border border-[#bfb5a9] px-5 text-xs font-semibold tracking-[0.08em] no-underline hover:border-[#171513] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171513] aria-[current=page]:border-[#171513] aria-[current=page]:bg-[#171513] aria-[current=page]:text-white md:w-full md:border-0"
              href={buildJournalHref(state, { category: undefined })}
              scroll={false}
            >
              All Articles <span aria-hidden="true" className="opacity-60">{totalArticles}</span>
            </Link>
          </li>
          {categories.map((category, index) => (
            <li
              className="shrink-0 snap-start md:border-r md:border-[#c7bdb2] md:last:border-r-0"
              key={category.value}
            >
              <Link
                aria-current={state.category === category.value ? "page" : undefined}
                className="inline-flex min-h-11 min-w-[8.5rem] items-center justify-center gap-2 border border-[#bfb5a9] px-5 text-xs font-semibold tracking-[0.08em] no-underline hover:border-[#171513] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171513] aria-[current=page]:border-[#171513] aria-[current=page]:bg-[#171513] aria-[current=page]:text-white md:w-full md:border-0"
                href={buildJournalHref(state, { category: category.value })}
                scroll={false}
              >
                {category.label} <span aria-hidden="true" className="opacity-60">{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
