import type { Money } from "@/lib/commerce";

const DECIMAL_MONEY_PATTERN = /^-?\d+(?:\.\d+)?$/;

export interface MoneyRange {
  min: Money;
  max: Money;
}

interface ParsedDecimalAmount {
  value: bigint;
  scale: number;
}

function parseDecimalAmount(amount: string): ParsedDecimalAmount | null {
  if (!DECIMAL_MONEY_PATTERN.test(amount)) {
    return null;
  }

  const negative = amount.startsWith("-");
  const unsignedAmount = negative ? amount.slice(1) : amount;
  const [whole = "0", fraction = ""] = unsignedAmount.split(".");
  const digits = `${whole}${fraction}`.replace(/^0+(?=\d)/, "");

  return {
    value: BigInt(`${negative ? "-" : ""}${digits || "0"}`),
    scale: fraction.length,
  };
}

export function compareMoney(left: Money, right: Money): number | null {
  if (left.currencyCode !== right.currencyCode) {
    return null;
  }

  const parsedLeft = parseDecimalAmount(left.amount);
  const parsedRight = parseDecimalAmount(right.amount);

  if (!parsedLeft || !parsedRight) {
    return null;
  }

  const scale = Math.max(parsedLeft.scale, parsedRight.scale);
  const normalizedLeft =
    parsedLeft.value * 10n ** BigInt(scale - parsedLeft.scale);
  const normalizedRight =
    parsedRight.value * 10n ** BigInt(scale - parsedRight.scale);

  if (normalizedLeft === normalizedRight) {
    return 0;
  }

  return normalizedLeft < normalizedRight ? -1 : 1;
}

export function getMoneyRange(values: readonly Money[]): MoneyRange | undefined {
  const firstValue = values[0];

  if (!firstValue) {
    return undefined;
  }

  let min = firstValue;
  let max = firstValue;

  for (const value of values.slice(1)) {
    const comparedToMin = compareMoney(value, min);
    const comparedToMax = compareMoney(value, max);

    if (comparedToMin !== null && comparedToMin < 0) {
      min = value;
    }

    if (comparedToMax !== null && comparedToMax > 0) {
      max = value;
    }
  }

  return { min, max };
}

export function formatMoney(money: Money, locale = "en-DE"): string {
  if (!DECIMAL_MONEY_PATTERN.test(money.amount)) {
    return `${money.amount} ${money.currencyCode}`;
  }

  const amount = Number(money.amount);

  if (!Number.isFinite(amount)) {
    return `${money.amount} ${money.currencyCode}`;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currencyCode,
  }).format(amount);
}
