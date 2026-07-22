import { formatMoney } from "@/lib/utilities";
import type {
  CollectionFilter,
  CollectionQueryState,
} from "@/types/collection";

interface CollectionFilterFieldsProps {
  filters: readonly CollectionFilter[];
  state: CollectionQueryState;
  idPrefix: string;
}

export function CollectionFilterFields({
  filters,
  state,
  idPrefix,
}: CollectionFilterFieldsProps) {
  return (
    <div>
      {filters.map((filter) => {
        if (filter.type === "range") {
          return (
            <fieldset
              className="border-b border-border py-6 first:pt-0"
              key={filter.id}
            >
              <legend className="type-label text-foreground">
                {filter.label}
              </legend>
              <p className="type-caption mt-2 text-foreground-muted">
                Development range: {formatMoney(filter.min)}–{formatMoney(filter.max)}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label
                  className="type-caption grid gap-1 text-foreground-muted"
                  htmlFor={`${idPrefix}-price-min`}
                >
                  Minimum
                  <input
                    className="min-h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-foreground"
                    defaultValue={state.priceMin ?? ""}
                    id={`${idPrefix}-price-min`}
                    inputMode="decimal"
                    name="price-min"
                    placeholder={filter.min.amount}
                    type="text"
                  />
                </label>
                <label
                  className="type-caption grid gap-1 text-foreground-muted"
                  htmlFor={`${idPrefix}-price-max`}
                >
                  Maximum
                  <input
                    className="min-h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-foreground"
                    defaultValue={state.priceMax ?? ""}
                    id={`${idPrefix}-price-max`}
                    inputMode="decimal"
                    name="price-max"
                    placeholder={filter.max.amount}
                    type="text"
                  />
                </label>
              </div>
            </fieldset>
          );
        }

        return (
          <fieldset
            className="border-b border-border py-6 first:pt-0"
            key={filter.id}
          >
            <legend className="type-label text-foreground">{filter.label}</legend>
            <div className="mt-3 grid gap-1">
              {filter.options.map((option) => (
                <label
                  className="type-small flex min-h-11 items-center gap-3 rounded-[var(--radius-control)] px-1 hover:bg-surface-muted"
                  key={option.value}
                >
                  <input
                    className="size-5 shrink-0 accent-[var(--accent)]"
                    defaultChecked={state.selected[filter.id].includes(
                      option.value,
                    )}
                    disabled={option.disabled}
                    name={filter.id}
                    type="checkbox"
                    value={option.value}
                  />
                  <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                    <span>{option.label}</span>
                    {option.count !== undefined ? (
                      <span className="type-caption text-foreground-muted">
                        {option.count}
                      </span>
                    ) : null}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
