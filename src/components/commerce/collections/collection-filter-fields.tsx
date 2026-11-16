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
            <details className="group border-b border-border lg:border-[#cfc6bb]" key={filter.id} open>
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-xs font-semibold tracking-[0.12em] text-foreground uppercase focus-visible:outline-2 focus-visible:outline-offset-2">
                {filter.label}
                <span aria-hidden="true" className="text-base transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
              </summary>
              <fieldset className="pb-5">
                <legend className="sr-only">{filter.label}</legend>
                <p className="type-caption text-foreground-muted">
                  Price range: {formatMoney(filter.min)}–{formatMoney(filter.max)}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <label className="type-caption grid gap-1 text-foreground-muted" htmlFor={`${idPrefix}-price-min`}>
                    Minimum
                    <input
                      className="min-h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-foreground lg:rounded-none lg:border-[#bfb5a9] lg:bg-[#faf7f2]"
                      defaultValue={state.priceMin ?? ""}
                      id={`${idPrefix}-price-min`}
                      inputMode="decimal"
                      name="price-min"
                      placeholder={filter.min.amount}
                      type="text"
                    />
                  </label>
                  <label className="type-caption grid gap-1 text-foreground-muted" htmlFor={`${idPrefix}-price-max`}>
                    Maximum
                    <input
                      className="min-h-11 w-full rounded-[var(--radius-control)] border border-border bg-surface px-3 text-foreground lg:rounded-none lg:border-[#bfb5a9] lg:bg-[#faf7f2]"
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
            </details>
          );
        }

        return (
          <details className="group border-b border-border lg:border-[#cfc6bb]" key={filter.id} open>
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-xs font-semibold tracking-[0.12em] text-foreground uppercase focus-visible:outline-2 focus-visible:outline-offset-2">
              {filter.label}
              <span aria-hidden="true" className="text-base transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
            </summary>
            <fieldset className="pb-4">
              <legend className="sr-only">{filter.label}</legend>
              <div className="grid gap-1">
                {filter.options.map((option) => (
                  <label
                    className="type-small flex min-h-11 items-center gap-3 rounded-[var(--radius-control)] px-1 text-foreground hover:bg-surface-muted lg:rounded-none lg:text-[0.82rem] lg:hover:bg-[#e9e0d6]"
                    key={option.value}
                  >
                    <input
                      className="size-5 shrink-0 accent-[var(--accent)]"
                      defaultChecked={state.selected[filter.id].includes(option.value)}
                      disabled={option.disabled}
                      name={filter.id}
                      type="checkbox"
                      value={option.value}
                    />
                    <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                      <span>{option.label}</span>
                      {option.count !== undefined ? (
                        <span className="type-caption text-foreground-muted">{option.count}</span>
                      ) : null}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </details>
        );
      })}
    </div>
  );
}
