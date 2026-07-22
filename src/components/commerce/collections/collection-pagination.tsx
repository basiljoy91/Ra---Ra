import Link from "next/link";

import { buildCollectionHref } from "@/lib/collections";
import type { CollectionQueryState } from "@/types/collection";

interface CollectionPaginationProps {
  collectionHandle: string;
  page: number;
  state: CollectionQueryState;
  totalPages: number;
}

const controlClassName =
  "type-small inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface px-3 font-semibold no-underline hover:border-foreground";

export function CollectionPagination({
  collectionHandle,
  page,
  state,
  totalPages,
}: CollectionPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="mt-12 border-t border-border pt-8">
      <ul className="flex flex-wrap items-center justify-center gap-2" role="list">
        <li>
          {page > 1 ? (
            <Link
              className={controlClassName}
              href={buildCollectionHref(collectionHandle, state, {
                page: page - 1,
              })}
              scroll={false}
            >
              Previous
            </Link>
          ) : (
            <span aria-disabled="true" className={`${controlClassName} opacity-45`}>
              Previous
            </span>
          )}
        </li>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <li key={pageNumber}>
              <Link
                aria-current={pageNumber === page ? "page" : undefined}
                aria-label={`Page ${pageNumber}`}
                className={`${controlClassName} ${
                  pageNumber === page
                    ? "border-primary bg-primary text-primary-foreground"
                    : ""
                }`}
                href={buildCollectionHref(collectionHandle, state, {
                  page: pageNumber,
                })}
                scroll={false}
              >
                {pageNumber}
              </Link>
            </li>
          ),
        )}
        <li>
          {page < totalPages ? (
            <Link
              className={controlClassName}
              href={buildCollectionHref(collectionHandle, state, {
                page: page + 1,
              })}
              scroll={false}
            >
              Next
            </Link>
          ) : (
            <span aria-disabled="true" className={`${controlClassName} opacity-45`}>
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
