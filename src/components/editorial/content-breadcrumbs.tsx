import Link from "next/link";

interface ContentBreadcrumbsProps {
  current: string;
  parent?: { label: string; href: string };
}

export function ContentBreadcrumbs({
  current,
  parent,
}: ContentBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="type-small text-foreground-muted">
      <ol className="flex flex-wrap items-center gap-2" role="list">
        <li>
          <Link className="hover:text-foreground" href="/">
            Home
          </Link>
        </li>
        {parent ? (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="hover:text-foreground" href={parent.href}>
                {parent.label}
              </Link>
            </li>
          </>
        ) : null}
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-foreground">
          {current}
        </li>
      </ol>
    </nav>
  );
}
