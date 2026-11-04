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
  rows: readonly SizeChartRow[];
}

export const productSizeCharts: readonly ProductSizeChart[] = [
  {
    code: "ST-01",
    productType: "Sculptural Boxy Tee",
    fitNote: "A structured, wide silhouette with a shorter boxy proportion.",
    rows: [
      { size: "S", chest: 54, bodyLength: 68, shoulder: 51, sleeve: 22 },
      { size: "M", chest: 57, bodyLength: 70, shoulder: 54, sleeve: 23 },
      { size: "L", chest: 60, bodyLength: 72, shoulder: 57, sleeve: 24 },
      { size: "XL", chest: 63, bodyLength: 74, shoulder: 60, sleeve: 25 },
      { size: "XXL", chest: 66, bodyLength: 76, shoulder: 63, sleeve: 26 },
    ],
  },
  {
    code: "ST-02",
    productType: "Washed Art Tee",
    fitNote: "An oversized fit with extra room through the chest and shoulder.",
    rows: [
      { size: "S", chest: 56, bodyLength: 70, shoulder: 53, sleeve: 23 },
      { size: "M", chest: 59, bodyLength: 72, shoulder: 56, sleeve: 24 },
      { size: "L", chest: 62, bodyLength: 74, shoulder: 59, sleeve: 25 },
      { size: "XL", chest: 65, bodyLength: 76, shoulder: 62, sleeve: 26 },
      { size: "XXL", chest: 68, bodyLength: 78, shoulder: 65, sleeve: 27 },
    ],
  },
  {
    code: "ES-01",
    productType: "Signature Regular Tee",
    fitNote: "A classic regular fit with a closer shoulder and straight body.",
    rows: [
      { size: "S", chest: 49, bodyLength: 68, shoulder: 43, sleeve: 20 },
      { size: "M", chest: 52, bodyLength: 70, shoulder: 45, sleeve: 21 },
      { size: "L", chest: 55, bodyLength: 72, shoulder: 47, sleeve: 22 },
      { size: "XL", chest: 58, bodyLength: 74, shoulder: 49, sleeve: 23 },
      { size: "XXL", chest: 61, bodyLength: 76, shoulder: 51, sleeve: 24 },
    ],
  },
  {
    code: "ES-02",
    productType: "Relaxed Essential Tee",
    fitNote: "A relaxed everyday fit with gentle ease through the body.",
    rows: [
      { size: "S", chest: 52, bodyLength: 69, shoulder: 47, sleeve: 21 },
      { size: "M", chest: 55, bodyLength: 71, shoulder: 49, sleeve: 22 },
      { size: "L", chest: 58, bodyLength: 73, shoulder: 51, sleeve: 23 },
      { size: "XL", chest: 61, bodyLength: 75, shoulder: 53, sleeve: 24 },
      { size: "XXL", chest: 64, bodyLength: 77, shoulder: 55, sleeve: 25 },
    ],
  },
] as const;

export function getSizeChartForProductType(
  productType: string | undefined,
): ProductSizeChart | undefined {
  return productSizeCharts.find((chart) => chart.productType === productType);
}

export function isGarmentSize(value: string | undefined): value is GarmentSize {
  return garmentSizes.some((size) => size === value);
}
