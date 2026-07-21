import type { Money } from "@/lib/commerce";
import {
  compareMoney,
  formatMoney,
  type MoneyRange,
} from "@/lib/utilities";

interface ProductPriceProps {
  price: Money;
  compareAtPrice?: Money | undefined;
  priceRange?: MoneyRange | undefined;
  locale?: string | undefined;
}

export function ProductPrice({
  price,
  compareAtPrice,
  priceRange,
  locale,
}: ProductPriceProps) {
  const rangeComparison = priceRange
    ? compareMoney(priceRange.min, priceRange.max)
    : 0;

  if (priceRange && rangeComparison !== null && rangeComparison !== 0) {
    return (
      <p className="type-small font-semibold tabular-nums text-foreground">
        <span className="sr-only">Price range: </span>
        {formatMoney(priceRange.min, locale)}
        <span aria-hidden="true"> – </span>
        <span className="sr-only">to </span>
        {formatMoney(priceRange.max, locale)}
      </p>
    );
  }

  const currentPrice = priceRange?.min ?? price;
  const showCompareAt =
    compareAtPrice && compareMoney(compareAtPrice, currentPrice) === 1;

  return (
    <p className="type-small flex flex-wrap items-baseline gap-x-2 font-semibold tabular-nums text-foreground">
      {showCompareAt ? <span className="sr-only">Current price: </span> : null}
      <span>{formatMoney(currentPrice, locale)}</span>
      {showCompareAt ? (
        <>
          <span className="sr-only">Original price: </span>
          <s className="font-normal text-foreground-muted">
            {formatMoney(compareAtPrice, locale)}
          </s>
        </>
      ) : null}
    </p>
  );
}
