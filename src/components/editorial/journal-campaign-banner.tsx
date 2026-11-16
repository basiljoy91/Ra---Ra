import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";

export function JournalCampaignBanner() {
  return (
    <section aria-labelledby="journal-campaign-heading" className="bg-[#171513] text-white">
      <Container className="grid min-h-[22rem] p-0 md:grid-cols-[minmax(20rem,0.78fr)_minmax(0,1.22fr)]">
        <div className="flex flex-col justify-center px-[var(--page-gutter)] py-9 md:px-10 md:py-12 lg:px-14">
          <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/65 uppercase">Behind the collection</p>
          <h2 className="mt-3 font-serif text-[clamp(2.75rem,5vw,5rem)] font-medium leading-[0.88] tracking-[-0.035em]" id="journal-campaign-heading">
            The things<br />we carry.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/78">
            Four human experiences translated into a visual language of lines, forms, light and space.
          </p>
          <Link className="mt-6 inline-flex min-h-11 w-fit items-center gap-3 border border-white/60 px-5 text-xs font-semibold tracking-[0.08em] text-white uppercase no-underline hover:bg-white hover:text-[#171513]" href="/about">
            Read the philosophy <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
        <div className="relative min-h-[19rem] md:min-h-full">
          <Image
            alt="Close view of the rib crew neck on the black Beyond Time T-shirt"
            className="object-cover"
            fill
            loading="lazy"
            sizes="(min-width: 768px) 62vw, 100vw"
            src="/products/beyond-time/collar-detail.png"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,21,19,0.5),transparent_48%)]" />
        </div>
      </Container>
    </section>
  );
}
