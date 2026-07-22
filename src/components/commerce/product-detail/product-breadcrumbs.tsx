import Link from "next/link";

interface ProductBreadcrumbsProps {
  collectionHandle?: string;
  collectionTitle?: string;
  productTitle: string;
}

export function ProductBreadcrumbs({
  collectionHandle,
  collectionTitle,
  productTitle,
}: ProductBreadcrumbsProps) {
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
          <Link className="hover:text-foreground" href="/collections">
            Collections
          </Link>
        </li>
        {collectionHandle && collectionTitle ? (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                className="hover:text-foreground"
                href={`/collections/${collectionHandle}`}
              >
                {collectionTitle}
              </Link>
            </li>
          </>
        ) : null}
        <li aria-hidden="true">/</li>
        <li className="min-w-0">
          <span aria-current="page" className="line-clamp-1 text-foreground">
            {productTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
