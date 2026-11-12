"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { updateMarketAction } from "@/features/cart/commerce-cart";
import type { StorefrontMarketOption } from "@/config/storefront-markets";
import { publishCartUpdated } from "@/lib/commerce/cart-events";

export function MarketSelector({
  initialCountryCode,
  markets,
}: {
  initialCountryCode: string;
  markets: readonly StorefrontMarketOption[];
}) {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState(initialCountryCode);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function changeMarket(nextCountry: string) {
    const previous = countryCode;
    setCountryCode(nextCountry);
    setMessage("");
    startTransition(async () => {
      const result = await updateMarketAction(nextCountry);
      if (result.status === "success") {
        publishCartUpdated(result.cart?.totalQuantity ?? 0);
        router.refresh();
      } else {
        setCountryCode(previous);
        setMessage(result.message);
      }
    });
  }

  return (
    <div>
      <label className="sr-only" htmlFor="storefront-market">
        Shopping country
      </label>
      <select
        className="min-h-9 max-w-full rounded-full border border-foreground/50 bg-background px-3 text-[0.625rem] font-medium tracking-[0.08em] uppercase"
        disabled={isPending || markets.length < 2}
        id="storefront-market"
        onChange={(event) => changeMarket(event.currentTarget.value)}
        value={countryCode}
      >
        {markets.map((market) => (
          <option key={market.countryCode} value={market.countryCode}>
            {market.name} · {market.countryCode}
          </option>
        ))}
      </select>
      <p aria-live="polite" className="mt-1 max-w-56 text-[0.625rem] text-error" role="status">
        {message}
      </p>
    </div>
  );
}

