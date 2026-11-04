"use client";

import { ChevronDown, Plus, Ruler, X } from "lucide-react";

import { ModalDialog } from "@/components/ui/modal-dialog";
import {
  garmentSizes,
  getSizeChartForProductType,
  isGarmentSize,
  type GarmentSize,
} from "@/data/size-charts";
import { cn } from "@/lib/utilities";

interface SizeGuideDrawerProps {
  instanceId: string;
  open: boolean;
  onClose: () => void;
  productType: string | undefined;
  selectedSize?: string | undefined;
  onSelectSize?: (size: GarmentSize) => void;
}

const measurements = [
  ["Chest width", "Lay the T-shirt flat and measure straight across from pit to pit."],
  ["Body length", "Measure from the highest shoulder point beside the collar to the bottom hem."],
  ["Shoulder", "Measure across the back from one shoulder seam to the other."],
  ["Sleeve", "Measure from the shoulder seam to the sleeve opening."],
] as const;

export function SizeGuideDrawer({
  instanceId,
  open,
  onClose,
  productType,
  selectedSize,
  onSelectSize,
}: SizeGuideDrawerProps) {
  const chart = getSizeChartForProductType(productType);
  const activeSize = isGarmentSize(selectedSize) ? selectedSize : undefined;
  const titleId = `${instanceId}-size-guide-title`;
  const descriptionId = `${instanceId}-size-guide-description`;

  if (!chart) {
    return null;
  }

  return (
    <ModalDialog
      className="flex justify-end"
      descriptionId={descriptionId}
      dialogId={`${instanceId}-size-guide-dialog`}
      onClose={onClose}
      open={open}
      panelClassName="flex flex-col overflow-hidden border-white/15 !bg-[#181818] !text-[#f6f1ea]"
      placement="right"
      titleId={titleId}
    >
      <header className="flex shrink-0 items-start justify-between gap-6 border-b border-white/15 px-5 py-5 sm:px-8 sm:py-6">
        <div>
          <p className="text-[0.65rem] font-medium tracking-[0.13em] text-white/55 uppercase">
            {chart.code} · Garment measurements
          </p>
          <h2 className="mt-2 font-serif text-[clamp(2rem,5vw,3rem)] font-normal leading-none" id={titleId}>
            {chart.productType}
          </h2>
        </div>
        <button
          aria-label="Close size guide"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black"
          data-autofocus
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" size={20} strokeWidth={1.5} />
        </button>
      </header>

      <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
        <p className="max-w-xl text-sm leading-6 text-white/70" id={descriptionId}>
          {chart.fitNote} Measurements below are taken from the garment laid flat and are shown in centimetres.
        </p>

        <details className="group mt-6 border-y border-white/15 py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 text-sm font-medium marker:content-none">
            <span className="inline-flex items-center gap-3">
              <Ruler aria-hidden="true" size={18} strokeWidth={1.5} />
              How to take the measurements
            </span>
            <Plus aria-hidden="true" className="transition-transform group-open:rotate-45" size={20} strokeWidth={1.4} />
          </summary>
          <dl className="grid gap-4 pb-5 text-sm sm:grid-cols-2">
            {measurements.map(([term, definition]) => (
              <div key={term}>
                <dt className="font-medium text-white">{term}</dt>
                <dd className="mt-1 leading-5 text-white/60">{definition}</dd>
              </div>
            ))}
          </dl>
        </details>

        <section aria-labelledby={`${instanceId}-choose-size`} className="mt-8">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-[0.65rem] font-medium tracking-[0.13em] text-white/50 uppercase">Choose your size</p>
              <h3 className="mt-2 font-serif text-2xl font-normal" id={`${instanceId}-choose-size`}>
                Compare garment dimensions
              </h3>
            </div>
            <ChevronDown aria-hidden="true" className="mb-1 text-white/45" size={18} />
          </div>

          <div className="mt-5 grid grid-cols-5 gap-2">
            {garmentSizes.map((size) => (
              <button
                aria-pressed={activeSize === size}
                className={cn(
                  "min-h-11 border border-white/25 text-xs font-medium transition-colors",
                  activeSize === size
                    ? "bg-[#f3eee7] text-[#151515]"
                    : "hover:border-white hover:bg-white/10",
                )}
                key={size}
                onClick={() => onSelectSize?.(size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-7 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm tabular-nums">
            <caption className="sr-only">{chart.productType} garment measurements in centimetres</caption>
            <thead>
              <tr className="border-b border-white/25 text-[0.65rem] tracking-[0.08em] text-white/55 uppercase">
                <th className="px-3 py-3 font-medium" scope="col">Size</th>
                <th className="px-3 py-3 font-medium" scope="col">Chest</th>
                <th className="px-3 py-3 font-medium" scope="col">Length</th>
                <th className="px-3 py-3 font-medium" scope="col">Shoulder</th>
                <th className="px-3 py-3 font-medium" scope="col">Sleeve</th>
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row) => (
                <tr
                  className={cn(
                    "border-b border-white/15 transition-colors",
                    activeSize === row.size && "bg-white/[0.09]",
                  )}
                  key={row.size}
                >
                  <th className="px-3 py-4 font-medium" scope="row">{row.size}</th>
                  <td className="px-3 py-4 text-white/75">{row.chest}</td>
                  <td className="px-3 py-4 text-white/75">{row.bodyLength}</td>
                  <td className="px-3 py-4 text-white/75">{row.shoulder}</td>
                  <td className="px-3 py-4 text-white/75">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs leading-5 text-white/50">
          All values are garment measurements in cm. Compare them with a T-shirt you already own and like the fit of.
        </p>
      </div>
    </ModalDialog>
  );
}
