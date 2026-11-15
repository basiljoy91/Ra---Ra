import { BEYOND_GARMENT_TYPE } from "@/data/beyond-collection";

export const garmentSizes = ["S", "M", "L", "XL", "XXL"] as const;

export type GarmentSize = (typeof garmentSizes)[number];

export interface SizeChartRow {
  size: GarmentSize;
  chest: number;
  bodyLength: number;
  shoulder: number;
  sleeve: number;
}

export interface ProductSizeChart {
  code: string;
  productType: string;
  fitNote: string;
  provisionalNote: string;
  rows: readonly SizeChartRow[];
}

export const beyondSizeChart = {
  code: "COLLECTION 01",
  productType: BEYOND_GARMENT_TYPE,
  fitNote:
    "Boxy oversized unisex fit with dropped shoulders, a straight body and a standard oversized length.",
  provisionalNote:
    "Proposed finished garment measurements, not body measurements. All dimensions remain provisional until supplier sampling and fit approval.",
  rows: [
    { size: "S", chest: 56, bodyLength: 70, shoulder: 53, sleeve: 23 },
    { size: "M", chest: 59, bodyLength: 72, shoulder: 56, sleeve: 24 },
    { size: "L", chest: 62, bodyLength: 74, shoulder: 59, sleeve: 25 },
    { size: "XL", chest: 65, bodyLength: 76, shoulder: 62, sleeve: 26 },
    { size: "XXL", chest: 68, bodyLength: 78, shoulder: 65, sleeve: 27 },
  ],
} as const satisfies ProductSizeChart;

export const productSizeCharts: readonly ProductSizeChart[] = [beyondSizeChart];

export function getSizeChartForProductType(
  productType: string | undefined,
): ProductSizeChart | undefined {
  if (!productType) return beyondSizeChart;
  return productSizeCharts.find((chart) => chart.productType === productType);
}

export function isGarmentSize(value: string | undefined): value is GarmentSize {
  return garmentSizes.some((size) => size === value);
}
