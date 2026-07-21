import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";

interface ProductSectionHeaderProps {
  description?: string | undefined;
  eyebrow?: string | undefined;
  heading: string;
  headingId: string;
  cta?:
    | {
        label: string;
        href: string;
      }
    | undefined;
}

export function ProductSectionHeader({
  description,
  eyebrow,
  heading,
  headingId,
  cta,
}: ProductSectionHeaderProps) {
  return (
    <header className="grid gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="type-label text-accent">{eyebrow}</p>
        ) : null}
        <h2 className="type-section-heading mt-3" id={headingId}>
          {heading}
        </h2>
        {description ? (
          <p className="type-body mt-4 max-w-[42rem] text-foreground-muted">
            {description}
          </p>
        ) : null}
      </div>

      {cta ? (
        <Link
          className={buttonStyles({
            variant: "secondary",
            size: "md",
            className: "w-fit",
          })}
          href={cta.href}
        >
          {cta.label}
        </Link>
      ) : null}
    </header>
  );
}
