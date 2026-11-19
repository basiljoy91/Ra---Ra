import Image from "next/image";

import { Container } from "@/components/layout/container";
import type { EditorialHeroConfig } from "@/types/editorial";

export function JournalIndexHero({ config }: { config: EditorialHeroConfig }) {
  const image = config.image;

  return (
    <section
      aria-labelledby="journal-index-heading"
      className="relative min-h-[23rem] overflow-hidden bg-[#171513] text-white md:min-h-[27rem] lg:min-h-[30rem]"
    >
      {image ? (
        <picture className="absolute inset-0">
          {config.mobileImage ? (
            <source media="(max-width: 767px)" srcSet={config.mobileImage.url} />
          ) : null}
          <Image
            alt={image.alt}
            className="h-full w-full object-cover"
            height={image.height ?? 941}
            priority
            sizes="100vw"
            src={image.url}
            style={{ objectPosition: config.imagePosition ?? "50% 50%" }}
            width={image.width ?? 1672}
          />
        </picture>
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,9,8,0.92)_0%,rgba(10,9,8,0.67)_38%,rgba(10,9,8,0.1)_74%),linear-gradient(0deg,rgba(10,9,8,0.48),transparent_55%)]" />
      <Container className="relative flex min-h-[23rem] items-end py-8 md:min-h-[27rem] md:items-center md:py-10 lg:min-h-[30rem]">
        <div className="max-w-[40rem]">
          <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-white/72 uppercase md:text-xs">
            {config.eyebrow ?? "Ra & Ra Journal"}
          </p>
          <h1
            className="mt-3 max-w-[38rem] font-serif text-[clamp(2.8rem,11vw,5rem)] font-medium leading-[0.88] tracking-[-0.04em] text-white md:text-[clamp(4.5rem,6vw,6.5rem)]"
            id="journal-index-heading"
          >
            {config.title}
          </h1>
          {config.lead ? (
            <p className="mt-4 max-w-[29rem] text-sm leading-6 text-white/82 md:text-base">
              {config.lead}
            </p>
          ) : null}
          <a
            className="mt-6 inline-flex min-h-11 items-center border border-white/75 bg-white px-5 text-xs font-semibold tracking-[0.1em] text-[#171513] no-underline hover:bg-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="#journal-stories"
          >
            Explore stories
          </a>
        </div>
      </Container>
    </section>
  );
}
