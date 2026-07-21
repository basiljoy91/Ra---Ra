"use client";

import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { getProductColourDefinition } from "@/config/product-card";
import { cn } from "@/lib/utilities";
import type { ProductColourOption } from "@/types/product-card";

interface ProductColourOptionsProps {
  options: readonly ProductColourOption[];
  selectedValue: string | null;
  onChange: (value: string) => void;
  label?: string;
  maxVisible?: number;
}

export function ProductColourOptions({
  options,
  selectedValue,
  onChange,
  label = "Available colours",
  maxVisible = 4,
}: ProductColourOptionsProps) {
  const visibleOptions = options.slice(0, maxVisible);
  const hiddenCount = Math.max(0, options.length - visibleOptions.length);

  if (options.length <= 1) {
    return null;
  }

  return (
    <div aria-label={label} className="flex flex-wrap items-center gap-1" role="group">
      {visibleOptions.map((option) => {
        const definition = getProductColourDefinition(option.value);
        const selected = selectedValue === option.value;

        return (
          <button
            aria-pressed={selected}
            className={cn(
              "inline-grid size-11 place-items-center rounded-full border border-transparent transition-colors duration-[var(--duration-fast)]",
              selected && "border-foreground",
              !option.available && "cursor-not-allowed opacity-40",
            )}
            disabled={!option.available}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-5 rounded-full border",
                definition.swatchClassName,
              )}
            />
            <VisuallyHidden>
              {option.label}
              {!option.available ? ", unavailable" : ""}
            </VisuallyHidden>
          </button>
        );
      })}
      {hiddenCount > 0 ? (
        <span
          aria-label={`${hiddenCount} more colours`}
          className="type-caption px-1 font-semibold text-foreground-muted"
        >
          +{hiddenCount}
        </span>
      ) : null}
    </div>
  );
}
