import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import type { Product } from "@/lib/commerce";

export function CollectionMaterialBanner({
  products,
}: {
  products: readonly Product[];
}) {
  const product = products.find((item) => item.details?.material || item.details?.fit);
  const image = product?.images.find((item) =>
    /fabric|detail|collar|neck/i.test(item.alt),
  ) ?? product?.images[0];

  if (!product || !image) return null;

  return (
    <section
      aria-labelledby="collection-material-heading"
      className="bg-[#f4efe8] pb-10 text-[#171513] [color-scheme:light] md:pb-14"
    >
      <Container>
        <div className="grid overflow-hidden bg-[#171513] text-white md:min-h-64 md:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10">
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/65 uppercase">
              The shared garment
            </p>
            <h2
              className="mt-3 font-serif text-[clamp(2.25rem,5vw,4.25rem)] font-normal italic leading-[0.88]"
              id="collection-material-heading"
            >
              One form.<br />Four meanings.
            </h2>
            {product.details?.material ? (
              <p className="mt-5 max-w-md text-sm leading-6 text-white/78">
                {product.details.material}
              </p>
            ) : null}
            {product.details?.fit ? (
              <p className="mt-2 max-w-md text-sm leading-6 text-white/78">
                {product.details.fit}
              </p>
            ) : null}
            <Link
              className="mt-6 inline-flex min-h-11 w-fit items-center gap-3 border border-white/60 px-5 text-xs font-semibold tracking-[0.08em] text-white no-underline hover:bg-white hover:text-[#171513]"
              href="/size-guide"
            >
              View size guidance <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="relative min-h-56 md:min-h-full">
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              loading="lazy"
              sizes="(min-width: 768px) 58vw, 100vw"
              src={image.url}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,21,19,0.5),transparent_50%)]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
