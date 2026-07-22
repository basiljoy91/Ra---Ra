import Image from "next/image";
import Link from "next/link";

import { VisuallyHidden } from "@/components/ui/visually-hidden";
import type { CommunityItem } from "@/types/community";

type CommunityItemCardProps = {
  item: CommunityItem;
};

function CommunityItemContent({ item }: CommunityItemCardProps) {
  return (
    <figure>
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-media)] bg-surface-muted">
        <Image
          alt={item.image.alt}
          className="h-full w-full object-cover transition-transform duration-[var(--duration-slow)] ease-out motion-safe:group-hover:scale-[1.02]"
          height={item.image.height ?? 1000}
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, 50vw"
          src={item.image.url}
          width={item.image.width ?? 1000}
        />
      </div>
      {item.caption ? (
        <figcaption className="type-small mt-[var(--space-3)] text-foreground-muted">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function CommunityItemCard({ item }: CommunityItemCardProps) {
  if (!item.href) {
    return <CommunityItemContent item={item} />;
  }

  const external = /^https?:\/\//u.test(item.href);
  const className =
    "group block rounded-[var(--radius-media)] no-underline focus-visible:outline-offset-4";

  if (external) {
    return (
      <a
        className={className}
        href={item.href}
        rel="noreferrer"
        target="_blank"
      >
        <CommunityItemContent item={item} />
        <VisuallyHidden>Opens in a new tab</VisuallyHidden>
      </a>
    );
  }

  return (
    <Link className={className} href={item.href}>
      <CommunityItemContent item={item} />
    </Link>
  );
}
