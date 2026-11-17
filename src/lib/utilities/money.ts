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

function normalizeAmount(amount: ParsedDecimalAmount, scale: number): bigint {
  return amount.value * 10n ** BigInt(scale - amount.scale);
}

function serializeAmount(value: bigint, scale: number): string {
  const negative = value < 0n;
  const digits = (negative ? -value : value).toString().padStart(scale + 1, "0");
  if (scale === 0) return `${negative ? "-" : ""}${digits}`;
  const whole = digits.slice(0, -scale);
  const fraction = digits.slice(-scale).replace(/0+$/, "");
  return `${negative ? "-" : ""}${whole}${fraction ? `.${fraction}` : ""}`;
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
  const normalizedLeft = normalizeAmount(parsedLeft, scale);
  const normalizedRight = normalizeAmount(parsedRight, scale);

  if (normalizedLeft === normalizedRight) {
    return 0;
  }

  return normalizedLeft < normalizedRight ? -1 : 1;
}

export function subtractMoney(left: Money, right: Money): Money | null {
  if (left.currencyCode !== right.currencyCode) return null;
  const parsedLeft = parseDecimalAmount(left.amount);
  const parsedRight = parseDecimalAmount(right.amount);
  if (!parsedLeft || !parsedRight) return null;
  const scale = Math.max(parsedLeft.scale, parsedRight.scale);
  return {
    amount: serializeAmount(
      normalizeAmount(parsedLeft, scale) - normalizeAmount(parsedRight, scale),
      scale,
    ),
    currencyCode: left.currencyCode,
  };
}

export function getMoneyProgress(current: Money, target: Money): number | null {
  if (current.currencyCode !== target.currencyCode) return null;
  const parsedCurrent = parseDecimalAmount(current.amount);
  const parsedTarget = parseDecimalAmount(target.amount);
  if (!parsedCurrent || !parsedTarget) return null;
  const scale = Math.max(parsedCurrent.scale, parsedTarget.scale);
  const currentValue = normalizeAmount(parsedCurrent, scale);
  const targetValue = normalizeAmount(parsedTarget, scale);
  if (targetValue <= 0n) return null;
  const basisPoints = (currentValue * 10_000n) / targetValue;
  return Math.max(0, Math.min(100, Number(basisPoints) / 100));
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

export function formatMoney(money: Money, locale = "en-IN"): string {
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
