"use client";

import { X } from "lucide-react";
import {
  useId,
  useState,
  useTransition,
  type FormEvent,
} from "react";

import { ProductColourOptions } from "@/components/commerce/product-card/product-colour-options.client";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/ui/modal-dialog";
import { cn } from "@/lib/utilities";
import type {
  ProductCardActionVariant,
  ProductCardQuickAddHandler,
  ProductColourOption,
} from "@/types/product-card";

interface QuickAddDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  productTitle: string;
  variants: readonly ProductCardActionVariant[];
  colourOptions: readonly ProductColourOption[];
  selectedColour: string | null;
  onColourChange: (value: string) => void;
  quickAddAction: ProductCardQuickAddHandler;
}

interface FeedbackState {
  kind: "success" | "error";
  message: string;
}

function getUniqueSizes(
  variants: readonly ProductCardActionVariant[],
): readonly string[] {
  return Array.from(
    new Set(
      variants.flatMap((variant) => (variant.size ? [variant.size] : [])),
    ),
  );
}

export function QuickAddDialog({
  open,
  onClose,
  productId,
  productTitle,
  variants,
  colourOptions,
  selectedColour,
  onColourChange,
  quickAddAction,
}: QuickAddDialogProps) {
  const reactId = useId().replaceAll(":", "");
  const titleId = `quick-add-title-${reactId}`;
  const descriptionId = `quick-add-description-${reactId}`;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isPending, startTransition] = useTransition();

  const sizes = getUniqueSizes(variants);
  const resolvedColour =
    selectedColour ??
    (colourOptions.length === 1 ? colourOptions[0]?.value ?? null : null);
  const resolvedSizeCandidate =
    selectedSize ?? (sizes.length === 1 ? sizes[0] ?? null : null);

  function isSizeAvailable(size: string): boolean {
    return variants.some(
      (variant) =>
        variant.available &&
        variant.size === size &&
        (!resolvedColour || variant.color === resolvedColour),
    );
  }

  const resolvedSize =
    resolvedSizeCandidate && isSizeAvailable(resolvedSizeCandidate)
      ? resolvedSizeCandidate
      : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);

    const selectedVariant = variants.find(
      (variant) =>
        variant.available &&
        (!resolvedColour || variant.color === resolvedColour) &&
        (!resolvedSize || variant.size === resolvedSize),
    );

    if (!selectedVariant || (colourOptions.length > 1 && !resolvedColour)) {
      setFeedback({
        kind: "error",
        message: "Choose an available colour and size before continuing.",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await quickAddAction({
          productId,
          variantId: selectedVariant.id,
          quantity: 1,
        });

        setFeedback({
          kind: result.status,
          message:
            result.message ??
            "Development selection confirmed. No cart was updated.",
        });
      } catch {
        setFeedback({
          kind: "error",
          message: "The development action could not be completed. Try again.",
        });
      }
    });
  }

  const selectionComplete =
    (colourOptions.length <= 1 || Boolean(resolvedColour)) &&
    (sizes.length <= 1 || Boolean(resolvedSize));

  return (
    <ModalDialog
      descriptionId={descriptionId}
      onClose={onClose}
      open={open}
      titleId={titleId}
    >
      <form className="p-6 sm:p-8" onSubmit={handleSubmit}>
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="type-label text-accent">Development quick add</p>
            <h2 className="type-section-heading mt-2" id={titleId}>
              Choose your options
            </h2>
          </div>
          <button
            aria-label="Close quick add"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-[var(--duration-fast)] hover:bg-surface-muted"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={20} strokeWidth={1.7} />
          </button>
        </div>

        <p className="type-body mt-5 font-semibold">{productTitle}</p>
        <p
          className="type-small mt-2 text-foreground-muted"
          id={descriptionId}
        >
          This validates product selection only. No live cart is connected or
          updated.
        </p>

        {colourOptions.length > 1 ? (
          <fieldset className="mt-6 border-0 p-0">
            <legend className="type-label mb-2 text-foreground-muted">
              Colour
            </legend>
            <ProductColourOptions
              label="Choose a colour"
              onChange={(value) => {
                onColourChange(value);
                setSelectedSize(null);
                setFeedback(null);
              }}
              options={colourOptions}
              selectedValue={selectedColour}
            />
          </fieldset>
        ) : null}

        {sizes.length > 1 ? (
          <fieldset className="mt-6 border-0 p-0">
            <legend className="type-label mb-2 text-foreground-muted">
              Size
            </legend>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {sizes.map((size) => {
                const available = isSizeAvailable(size);
                const selected = resolvedSize === size;

                return (
                  <button
                    aria-pressed={selected}
                    className={cn(
                      "min-h-11 rounded-[var(--radius-control)] border border-border bg-surface px-3 text-sm font-semibold transition-colors duration-[var(--duration-fast)] hover:border-foreground",
                      selected && "border-primary bg-primary text-primary-foreground",
                    )}
                    disabled={!available}
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setFeedback(null);
                    }}
                    type="button"
                  >
                    {size}
                    {!available ? <span className="sr-only"> unavailable</span> : null}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        <Button
          className="mt-7 w-full"
          disabled={!selectionComplete || isPending}
          size="lg"
          type="submit"
        >
          {isPending ? "Adding…" : "Add development selection"}
        </Button>

        <p
          aria-live="polite"
          className={cn(
            "type-small mt-4 min-h-6",
            feedback?.kind === "success" && "text-success",
            feedback?.kind === "error" && "text-error",
          )}
          role="status"
        >
          {feedback?.message ?? ""}
        </p>
      </form>
    </ModalDialog>
  );
}
