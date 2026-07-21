import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utilities";
import type { DiscoveryCategory } from "@/types/discovery";

interface DiscoveryCategoryCardProps {
  category: DiscoveryCategory;
}

function CategoryMedia({ category }: DiscoveryCategoryCardProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface-muted transition-colors duration-[var(--duration-base)] group-hover:border-accent/60 group-focus-visible:border-accent">
      {category.image ? (
        <Image
          alt={category.image.alt}
          className="object-cover transition-transform duration-[var(--duration-slow)] ease-out group-hover:scale-[1.025]"
          fill
          sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 72vw"
          src={category.image.src}
          style={{ objectPosition: category.image.focalPoint ?? "50% 50%" }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid h-full place-items-center bg-[linear-gradient(145deg,var(--surface),var(--accent-soft))]"
        >
          <span className="font-serif text-xl tracking-[0.12em] text-foreground-muted">
            Ra &amp; Ra
          </span>
        </div>
      )}

      {category.badge || category.comingSoon ? (
        <span className="type-caption absolute left-3 top-3 rounded-full border border-border bg-surface/95 px-3 py-1 font-semibold text-foreground shadow-[var(--shadow-soft)]">
          {category.badge ?? "Coming Soon"}
        </span>
      ) : null}
    </div>
  );
}

function CategoryContent({ category }: DiscoveryCategoryCardProps) {
  return (
    <>
      <CategoryMedia category={category} />
      <div className="grid gap-1.5 px-1 pb-1 pt-4">
        <h3 className="font-serif text-[1.2rem] font-semibold leading-tight tracking-[-0.01em] text-foreground">
          {category.title}
        </h3>
        {category.description ? (
          <p className="type-small text-foreground-muted">
            {category.description}
          </p>
        ) : null}
      </div>
    </>
  );
}

export function DiscoveryCategoryCard({
  category,
}: DiscoveryCategoryCardProps) {
  const isInteractive =
    category.enabled !== false && !category.comingSoon && Boolean(category.href);
  const cardClassName = cn(
    "group block rounded-[var(--radius-panel)] no-underline",
    isInteractive &&
      "transition-transform duration-[var(--duration-fast)] active:translate-y-px",
    !isInteractive && "opacity-70",
  );

  if (isInteractive && category.href) {
    return (
      <Link className={cardClassName} href={category.href}>
        <CategoryContent category={category} />
      </Link>
    );
  }

  return (
    <article className={cardClassName}>
      <CategoryContent category={category} />
    </article>
  );
}
