import fs from "node:fs/promises";
import { Workbook } from "@oai/artifact-tool";

const stage1Path = "C:/VScode/ra-ra-shopify-stage-1-products-completed.csv";
const stage2Path = "C:/VScode/ra&ta raw/shopify excelsheet/ra-ra-shopify-stage-2-product-links.csv";
const outputDir = "C:/VScode/Ra---Ra/outputs/stage2-shopify-image-links";
const outputPath = `${outputDir}/ra-ra-shopify-stage-2-product-links-with-images.csv`;
const previewPath = "C:/VScode/Ra---Ra/.codex-work/stage2-image-links/previews/stage2-with-images.png";

const imageColumns = [
  "Product image URL",
  "Image position",
  "Image alt text",
  "Variant image URL",
];

const [stage1Text, stage2Text] = await Promise.all([
  fs.readFile(stage1Path, "utf8"),
  fs.readFile(stage2Path, "utf8"),
]);

const [stage1, stage2] = await Promise.all([
  Workbook.fromCSV(stage1Text, { sheetName: "Stage 1" }),
  Workbook.fromCSV(stage2Text, { sheetName: "Stage 2" }),
]);

const stage1Sheet = stage1.worksheets.getItem("Stage 1");
const stage2Sheet = stage2.worksheets.getItem("Stage 2");
const stage1Values = stage1Sheet.getUsedRange().values;
const stage2Values = stage2Sheet.getUsedRange().values;
const stage1Headers = stage1Values[0];
const stage2Headers = stage2Values[0];

const findColumns = (headers, names) => Object.fromEntries(
  names.map((name) => {
    const index = headers.indexOf(name);
    if (index < 0) throw new Error(`Missing required column: ${name}`);
    return [name, index];
  }),
);

const stage1Cols = findColumns(stage1Headers, ["URL handle", "SKU", ...imageColumns]);
const stage2Cols = findColumns(stage2Headers, ["URL handle", "SKU", ...imageColumns]);

if (stage1Values.length !== stage2Values.length) {
  throw new Error(`Row count mismatch: Stage 1=${stage1Values.length - 1}, Stage 2=${stage2Values.length - 1}`);
}

const stage1BySku = new Map();
for (const row of stage1Values.slice(1)) {
  const sku = row[stage1Cols.SKU];
  if (!sku) throw new Error("Stage 1 contains a row without SKU");
  if (stage1BySku.has(sku)) throw new Error(`Duplicate Stage 1 SKU: ${sku}`);
  stage1BySku.set(sku, row);
}

const imageMatrix = [];
for (const row of stage2Values.slice(1)) {
  const sku = row[stage2Cols.SKU];
  const source = stage1BySku.get(sku);
  if (!source) throw new Error(`No Stage 1 image mapping for Stage 2 SKU: ${sku}`);
  const sourceHandle = source[stage1Cols["URL handle"]];
  const targetHandle = row[stage2Cols["URL handle"]];
  if (sourceHandle !== targetHandle) {
    throw new Error(`Handle mismatch for ${sku}: ${sourceHandle} != ${targetHandle}`);
  }
  imageMatrix.push(imageColumns.map((column) => source[stage1Cols[column]] ?? ""));
}

const firstImageColumn = Math.min(...imageColumns.map((column) => stage2Cols[column]));
const expectedImageIndexes = imageColumns.map((column) => stage2Cols[column]);
for (let i = 0; i < expectedImageIndexes.length; i += 1) {
  if (expectedImageIndexes[i] !== firstImageColumn + i) {
    throw new Error("Stage 2 image columns are not contiguous");
  }
}

stage2Sheet
  .getRangeByIndexes(1, firstImageColumn, imageMatrix.length, imageColumns.length)
  .values = imageMatrix;

stage2.recalculate();

const finalValues = stage2Sheet.getUsedRange().values;
const csvEscape = (value) => {
  const text = value == null ? "" : String(value);
  if (/[",\r\n]/.test(text) || /^\s|\s$/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
};
const outputText = finalValues.map((row) => row.map(csvEscape).join(",")).join("\n") + "\n";

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(outputPath, outputText, "utf8");

const preview = await stage2.render({
  sheetName: "Stage 2",
  range: "AJ1:AN8",
  scale: 1,
  format: "png",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const outputWorkbook = await Workbook.fromCSV(await fs.readFile(outputPath, "utf8"), {
  sheetName: "Output",
});
const outputSheet = outputWorkbook.worksheets.getItem("Output");
const outputValues = outputSheet.getUsedRange().values;

if (outputValues.length !== stage2Values.length || outputValues[0].length !== stage2Values[0].length) {
  throw new Error("Output shape differs from Stage 2 source");
}

let unrelatedDifferences = 0;
let imageDifferences = 0;
for (let r = 0; r < outputValues.length; r += 1) {
  for (let c = 0; c < outputValues[0].length; c += 1) {
    if (imageColumns.includes(stage2Headers[c])) continue;
    if ((outputValues[r][c] ?? "") !== (stage2Values[r][c] ?? "")) unrelatedDifferences += 1;
  }
}

const outputHeaders = outputValues[0];
const outputCols = findColumns(outputHeaders, ["URL handle", "SKU", ...imageColumns]);
const positionSets = new Map();
let httpsUrlCount = 0;
let altTextCount = 0;
for (const row of outputValues.slice(1)) {
  const sku = row[outputCols.SKU];
  const source = stage1BySku.get(sku);
  for (const column of imageColumns) {
    if ((row[outputCols[column]] ?? "") !== (source[stage1Cols[column]] ?? "")) imageDifferences += 1;
  }
  const url = row[outputCols["Product image URL"]];
  const alt = row[outputCols["Image alt text"]];
  const handle = row[outputCols["URL handle"]];
  const position = row[outputCols["Image position"]];
  if (String(url).startsWith("https://cdn.shopify.com/")) httpsUrlCount += 1;
  if (String(alt).trim()) altTextCount += 1;
  if (!positionSets.has(handle)) positionSets.set(handle, new Set());
  positionSets.get(handle).add(String(position));
}

const invalidPositionHandles = [...positionSets.entries()]
  .filter(([, positions]) => ["1", "2", "3", "4", "5"].some((p) => !positions.has(p)))
  .map(([handle]) => handle);

const inspect = await outputWorkbook.inspect({
  kind: "table",
  range: "'Output'!AJ1:AN8",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 5,
  maxChars: 8000,
});
const formulaErrors = await outputWorkbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});

if (unrelatedDifferences !== 0) throw new Error(`Found ${unrelatedDifferences} unrelated cell differences`);
if (imageDifferences !== 0) throw new Error(`Found ${imageDifferences} image mapping differences`);
if (httpsUrlCount !== outputValues.length - 1) throw new Error(`Only ${httpsUrlCount} of ${outputValues.length - 1} rows have Shopify HTTPS image URLs`);
if (altTextCount !== outputValues.length - 1) throw new Error(`Only ${altTextCount} of ${outputValues.length - 1} rows have image alt text`);
if (invalidPositionHandles.length) throw new Error(`Invalid image positions: ${invalidPositionHandles.join(", ")}`);

console.log(JSON.stringify({
  outputPath,
  rows: outputValues.length - 1,
  columns: outputValues[0].length,
  products: positionSets.size,
  httpsUrlCount,
  altTextCount,
  unrelatedDifferences,
  imageDifferences,
  invalidPositionHandles,
  inspect: inspect.ndjson,
  formulaErrors: formulaErrors.ndjson,
}, null, 2));
