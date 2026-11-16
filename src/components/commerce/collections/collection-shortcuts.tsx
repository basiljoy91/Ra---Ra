import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import type { Product } from "@/lib/commerce";

export function CollectionShortcuts({
  products,
}: {
  products: readonly Product[];
}) {
  const shortcuts = products.slice(0, 4);

  if (!shortcuts.length) return null;

  return (
    <nav
      aria-label="Explore products in this collection"
      className="hidden border-b border-[#d8d0c6] bg-[#f4efe8] py-5 lg:block"
    >
      <Container>
        <ul className="grid grid-cols-4 gap-3" role="list">
          {shortcuts.map((product) => {
            const image = product.images[2] ?? product.images[0];

            return (
              <li key={product.id}>
                <Link
                  className="group grid min-h-[6.25rem] grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 border border-[#cfc6bb] bg-[#eee7de] p-2.5 no-underline transition-colors hover:border-[#1b1917] hover:bg-[#e9e0d6] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1b1917]"
                  href={`/products/${product.handle}`}
                >
                  <span className="relative aspect-[4/5] overflow-hidden bg-[#dfd7cd]">
                    {image ? (
                      <Image
                        alt=""
                        aria-hidden="true"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none"
                        fill
                        sizes="72px"
                        src={image.url}
                      />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.62rem] font-semibold tracking-[0.16em] text-[#6f675f] uppercase">
                      Explore
                    </span>
                    <span className="mt-1 block font-serif text-xl leading-tight text-[#171513]">
                      {product.title}
                    </span>
                    <span className="mt-2 block text-xs font-medium text-[#4f4943]">
                      View product <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
