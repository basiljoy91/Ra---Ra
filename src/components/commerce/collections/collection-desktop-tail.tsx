import { ArrowRight, BookOpen, Ruler, Shirt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import type { ProductImage } from "@/lib/commerce";

const benefits = [
  {
    title: "Compare the fit",
    description: "Use the provisional finished-garment measurements.",
    href: "/size-guide",
    Icon: Ruler,
  },
  {
    title: "Read the specification",
    description: "See what is confirmed and what still requires approval.",
    href: "/faq#products",
    Icon: Shirt,
  },
  {
    title: "Understand the collection",
    description: "Discover the philosophy behind the four BEYOND stories.",
    href: "/about",
    Icon: BookOpen,
  },
] as const;

export function CollectionDesktopTail({
  image,
}: {
  image?: ProductImage | undefined;
}) {
  return (
    <div className="hidden bg-[#f4efe8] lg:block">
      <section aria-label="Shopping guidance" className="border-y border-[#d8d0c6]">
        <Container>
          <ul className="grid grid-cols-3 divide-x divide-[#d8d0c6]" role="list">
            {benefits.map(({ title, description, href, Icon }) => (
              <li key={title}>
                <Link
                  className="group flex min-h-32 items-center gap-4 px-6 py-6 no-underline first:pl-0 last:pr-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#171513]"
                  href={href}
                >
                  <Icon aria-hidden="true" className="size-7 shrink-0 text-[#27231f]" strokeWidth={1.25} />
                  <span>
                    <strong className="block font-serif text-xl font-medium text-[#171513]">
                      {title}
                    </strong>
                    <span className="mt-1 block max-w-[18rem] text-sm leading-5 text-[#686057]">
                      {description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {image ? (
        <section className="py-10" aria-labelledby="collection-editorial-title">
          <Container>
            <div className="relative min-h-[18rem] overflow-hidden bg-[#191715] text-white">
              <Image
                alt={image.alt}
                className="object-cover object-center"
                fill
                sizes="(min-width: 1024px) calc(100vw - 5.5rem), 1px"
                src={image.url}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,9,8,0.08)_25%,rgba(10,9,8,0.78)_68%,rgba(10,9,8,0.94)_100%)]" />
              <div className="relative ml-auto flex min-h-[18rem] max-w-[34rem] flex-col justify-center px-10 py-10">
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/70 uppercase">
                  RA &amp; RA / COLLECTION 01
                </p>
                <h2 className="mt-3 font-serif text-[clamp(2.4rem,4vw,4.4rem)] font-normal italic leading-[0.9]" id="collection-editorial-title">
                  We create the design. You give it meaning.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/78">
                  The artwork is intentional. The interpretation is personal.
                </p>
                <Link
                  className="mt-6 inline-flex min-h-11 w-fit items-center gap-3 bg-white px-5 text-xs font-semibold tracking-[0.08em] text-[#171513] no-underline transition-colors hover:bg-[#eee7de]"
                  href="/about"
                >
                  Read the philosophy <ArrowRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </div>
  );
}
