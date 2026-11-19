import { Search, X } from "lucide-react";
import Link from "next/link";

import { buildJournalHref } from "@/lib/journal";
import type { JournalQueryState } from "@/lib/journal";

export function JournalSearch({
  resultCount,
  state,
  totalArticles,
}: {
  resultCount: number;
  state: JournalQueryState;
  totalArticles: number;
}) {
  return (
    <div className="grid gap-4 border-b border-[#cfc6bb] pb-7 md:grid-cols-[minmax(0,1fr)_minmax(19rem,30rem)] md:items-end">
      <div>
        <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-[#6a625a] uppercase">
          Time. Fear. Reality. Limits.
        </p>
        <h2 className="mt-2 font-serif text-4xl font-semibold leading-none tracking-[-0.03em] text-[#171513] sm:text-5xl">
          Stories from BEYOND
        </h2>
        <p aria-atomic="true" aria-live="polite" className="mt-3 text-sm text-[#686057]" role="status">
          Showing {resultCount} of {totalArticles} {totalArticles === 1 ? "article" : "articles"}
        </p>
      </div>
      <form action="/journal" className="grid grid-cols-[minmax(0,1fr)_auto] gap-2" method="get" role="search">
        {state.category ? <input name="category" type="hidden" value={state.category} /> : null}
        <label className="sr-only" htmlFor="journal-search-input">Search Journal articles</label>
        <div className="relative">
          <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a625a]" size={18} />
          <input
            className="min-h-12 w-full border border-[#bfb5a9] bg-[#faf7f2] py-3 pr-4 pl-11 text-sm text-[#171513] placeholder:text-[#7a7169] hover:border-[#171513] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171513]"
            defaultValue={state.query}
            id="journal-search-input"
            maxLength={100}
            name="q"
            placeholder="Search the Journal"
            type="search"
          />
        </div>
        <button className="inline-flex min-h-12 items-center justify-center bg-[#171513] px-5 text-xs font-semibold tracking-[0.08em] text-white uppercase hover:bg-[#39342f]" type="submit">
          Search
        </button>
        {state.query ? (
          <Link
            className="col-span-2 inline-flex min-h-11 items-center justify-end gap-2 text-xs font-semibold text-[#4f4943] underline underline-offset-4"
            href={buildJournalHref(state, { query: undefined })}
            scroll={false}
          >
            <X aria-hidden="true" size={15} /> Clear search
          </Link>
        ) : null}
      </form>
    </div>
  );
}
