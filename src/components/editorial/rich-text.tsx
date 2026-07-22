import Image from "next/image";

import { cn } from "@/lib/utilities";
import type { EditorialBlock } from "@/types/editorial";

interface RichTextProps {
  blocks: readonly EditorialBlock[];
  className?: string;
}

export function RichText({ blocks, className }: RichTextProps) {
  return (
    <div className={cn("editorial-prose", className)}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "paragraph":
            return (
              <p className="editorial-paragraph" key={key}>
                {block.content}
              </p>
            );
          case "heading": {
            const Heading = block.level === 2 ? "h2" : "h3";
            return (
              <Heading
                className={
                  block.level === 2
                    ? "type-section-heading editorial-heading"
                    : "editorial-subheading font-serif text-2xl font-semibold leading-tight sm:text-3xl"
                }
                id={block.id}
                key={key}
              >
                {block.content}
              </Heading>
            );
          }
          case "list": {
            const List = block.style === "ordered" ? "ol" : "ul";
            return (
              <List
                className={cn(
                  "editorial-list space-y-2 pl-6 text-foreground-muted",
                  block.style === "ordered" ? "list-decimal" : "list-disc",
                )}
                key={key}
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            );
          }
          case "image":
            return (
              <figure className="editorial-image" key={key}>
                <div className="relative overflow-hidden rounded-[var(--radius-media)] bg-surface-muted">
                  <Image
                    alt={block.image.alt}
                    className="h-auto w-full"
                    height={block.image.height ?? 1000}
                    loading="lazy"
                    sizes="(min-width: 768px) 46rem, 100vw"
                    src={block.image.url}
                    width={block.image.width ?? 1400}
                  />
                </div>
                {block.caption ? (
                  <figcaption className="type-caption mt-3 text-foreground-muted">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "quote":
            return (
              <figure
                className="editorial-quote border-y border-border py-8 text-center sm:py-10"
                key={key}
              >
                <blockquote className="mx-auto max-w-3xl font-serif text-3xl font-medium leading-tight sm:text-4xl">
                  “{block.quote}”
                </blockquote>
                {block.attribution ? (
                  <figcaption className="type-caption mt-4 text-foreground-muted">
                    {block.attribution}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "callout":
            return (
              <aside
                className={cn(
                  "editorial-callout rounded-[var(--radius-panel)] border px-5 py-5 sm:px-6",
                  block.tone === "notice"
                    ? "border-warning/35 bg-accent-soft/45"
                    : "border-border bg-surface-muted",
                )}
                key={key}
              >
                {block.title ? (
                  <p className="font-semibold text-foreground">{block.title}</p>
                ) : null}
                <p className={cn("text-foreground-muted", block.title && "mt-2")}>
                  {block.body}
                </p>
              </aside>
            );
          case "two-column":
            return (
              <div
                className="editorial-columns grid gap-10 border-y border-border py-10 md:grid-cols-2 md:gap-12"
                key={key}
              >
                <RichText blocks={block.left} className="min-w-0" />
                <RichText blocks={block.right} className="min-w-0" />
              </div>
            );
          case "divider":
            return <hr className="editorial-divider border-border" key={key} />;
        }
      })}
    </div>
  );
}
