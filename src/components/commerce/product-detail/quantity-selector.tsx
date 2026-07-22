import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onChange,
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-semibold">Quantity</span>
      <div aria-label="Quantity" className="flex w-fit items-center rounded-[var(--radius-control)] border border-border bg-surface" role="group">
        <Button
          aria-label="Decrease quantity"
          className="size-11 border-0 p-0"
          disabled={disabled || quantity <= 1}
          onClick={() => onChange(Math.max(1, quantity - 1))}
          variant="quiet"
        >
          <Minus aria-hidden="true" className="size-4" strokeWidth={1.7} />
        </Button>
        <output
          aria-label={`Quantity ${quantity}`}
          className="min-w-10 text-center text-sm font-semibold tabular-nums"
        >
          {quantity}
        </output>
        <Button
          aria-label="Increase quantity"
          className="size-11 border-0 p-0"
          disabled={disabled}
          onClick={() => onChange(quantity + 1)}
          variant="quiet"
        >
          <Plus aria-hidden="true" className="size-4" strokeWidth={1.7} />
        </Button>
      </div>
    </div>
  );
}
