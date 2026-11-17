"use client";

import { Button } from "@/components/ui/button";

export default function CartError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="grid min-h-[32rem] place-items-center bg-[#f6f0ea] px-5 text-center text-[#181512]">
      <div className="max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.24em]">Cart unavailable</p>
        <h1 className="mt-4 font-serif text-5xl italic">We couldn’t open your cart.</h1>
        <p className="mt-5 text-black/65">Your selection has not been changed. Try loading it again.</p>
        <Button className="mt-7" onClick={reset} size="lg">Try again</Button>
      </div>
    </section>
  );
}
