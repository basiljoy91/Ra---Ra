import { forwardRef } from "react";

import { getProductColourDefinition } from "@/config/product-card";
import type { Product, ProductOption } from "@/lib/commerce";
import {
  getOptionSelectionKey,
  getOptionValueAvailability,
} from "@/lib/commerce";
import { cn } from "@/lib/utilities";

interface ProductOptionSelectorProps {
  option: ProductOption;
  product: Product;
  selections: Readonly<Record<string, string>>;
  onSelect: (optionName: string, value: string) => void;
}

export const ProductOptionSelector = forwardRef<
  HTMLFieldSetElement,
  ProductOptionSelectorProps
>(({ option, product, selections, onSelect }, ref) => {
  const selectionKey = getOptionSelectionKey(option.name);
  const selectedValue = selections[selectionKey];
  const isColour = selectionKey === "color";
  const displayName = isColour ? "Colour" : option.name;

  return (
    <fieldset className="grid gap-3" ref={ref} tabIndex={-1}>
      <legend className="text-sm font-semibold text-foreground">
        {displayName}
        {selectedValue ? (
          <span className="font-normal text-foreground-muted">: {selectedValue}</span>
        ) : null}
      </legend>
      <div className="flex flex-wrap gap-2">
        {option.values.map((value) => {
          const availability = getOptionValueAvailability(
            product,
            selections,
            option.name,
            value,
          );
          const unavailable = availability !== "available";
          const selected = selectedValue === value;
          const accessibleState =
            availability === "invalid"
              ? "not offered in this combination"
              : availability === "unavailable"
                ? "unavailable"
                : "available";

          if (isColour) {
            const swatch = getProductColourDefinition(value);

            return (
              <button
                aria-label={`${displayName} ${value}, ${accessibleState}`}
                aria-pressed={selected}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition-colors",
                  selected
                    ? "border-foreground bg-surface-muted"
                    : "border-border bg-surface",
                  unavailable && "cursor-not-allowed opacity-45",
                )}
                disabled={unavailable}
                key={value}
                onClick={() => onSelect(option.name, value)}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className={cn("size-5 rounded-full border", swatch.swatchClassName)}
                />
                {value}
              </button>
            );
          }

          return (
            <button
              aria-label={`${displayName} ${value}, ${accessibleState}`}
              aria-pressed={selected}
              className={cn(
                "relative min-h-11 min-w-12 rounded-[var(--radius-control)] border px-3 text-sm font-semibold transition-colors",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-foreground",
                unavailable &&
                  "cursor-not-allowed border-border bg-surface-muted text-foreground-muted opacity-65 after:absolute after:left-2 after:right-2 after:top-1/2 after:h-px after:-rotate-12 after:bg-current",
              )}
              disabled={unavailable}
              key={value}
              onClick={() => onSelect(option.name, value)}
              type="button"
            >
              {value}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
});

ProductOptionSelector.displayName = "ProductOptionSelector";
