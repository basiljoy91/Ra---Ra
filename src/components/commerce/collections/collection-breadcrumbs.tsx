import Link from "next/link";

interface CollectionBreadcrumbsProps {
  currentLabel?: string;
}

export function CollectionBreadcrumbs({
  currentLabel,
}: CollectionBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="type-caption text-foreground-muted">
      <ol className="flex flex-wrap items-center gap-2" role="list">
        <li>
          <Link className="hover:text-foreground" href="/">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          {currentLabel ? (
            <Link className="hover:text-foreground" href="/collections">
              Collections
            </Link>
          ) : (
            <span aria-current="page">Collections</span>
          )}
        </li>
        {currentLabel ? (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page" className="text-foreground">
                {currentLabel}
              </span>
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
