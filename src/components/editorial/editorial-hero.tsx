import Image from "next/image";

import { Container } from "@/components/layout/container";
import type { EditorialHeroConfig } from "@/types/editorial";

interface EditorialHeroProps {
  config: EditorialHeroConfig;
}

export function EditorialHero({ config }: EditorialHeroProps) {
  return (
    <header className="border-b border-border bg-surface">
      <Container>
        <div
          className={
            config.image
              ? "grid min-h-[30rem] items-center gap-10 py-[var(--section-space-md)] lg:grid-cols-[minmax(20rem,0.82fr)_minmax(0,1.18fr)] lg:gap-16"
              : "mx-auto max-w-[var(--container-content)] py-[var(--section-space-lg)] text-center"
          }
        >
          <div className={config.image ? "max-w-[38rem]" : undefined}>
            {config.eyebrow ? (
              <p className="type-label text-accent">{config.eyebrow}</p>
            ) : null}
            <h1 className="type-page-heading mt-4">{config.title}</h1>
            {config.lead ? (
              <p className="type-subheading mt-6 text-foreground-muted">
                {config.lead}
              </p>
            ) : null}
            {config.developmentNotice ? (
              <p className="type-caption mt-6 rounded-[var(--radius-control)] border border-warning/35 bg-accent-soft/45 px-4 py-3 text-left text-foreground">
                {config.developmentNotice}
              </p>
            ) : null}
          </div>
          {config.image ? (
            <figure className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] bg-surface-muted">
              <Image
                alt={config.image.alt}
                className="h-full w-full object-cover"
                fetchPriority="high"
                height={config.image.height ?? 1000}
                loading="eager"
                sizes="(min-width: 1024px) 54vw, 100vw"
                src={config.image.url}
                style={{ objectPosition: config.imagePosition ?? "50% 50%" }}
                width={config.image.width ?? 1600}
              />
            </figure>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
