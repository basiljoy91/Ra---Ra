import fs from "node:fs/promises";
import { Workbook } from "@oai/artifact-tool";

const sourcePath = "C:/VScode/ra-ra-shopify-stage-1-products-completed.csv";
const outputDir = "C:/VScode/Ra---Ra/outputs/shopify-bootstrap";
const outputPath = `${outputDir}/ra-ra-shopify-bootstrap-12-missing-products.csv`;
const previewPath = "C:/VScode/Ra---Ra/.codex-work/stage2-recovery/previews/bootstrap-products.png";

const existingHandles = new Set([
  "past-present-beyond-sculptural-boxy-black",
  "beyond-reality-sculptural-boxy-black",
  "beyond-fear-sculptural-boxy-black",
  "beyond-limits-sculptural-boxy-black",
]);

const outputHeaders = [
  "Title",
  "URL handle",
  "Vendor",
  "Type",
  "Status",
  "SKU",
  "Option1 name",
  "Option1 value",
  "Price",
];

const sourceText = await fs.readFile(sourcePath, "utf8");
const sourceWorkbook = await Workbook.fromCSV(sourceText, { sheetName: "Stage 1" });
const sourceSheet = sourceWorkbook.worksheets.getItem("Stage 1");
const sourceValues = sourceSheet.getUsedRange().values;
const sourceHeaders = sourceValues[0];

const sourceIndexes = Object.fromEntries(outputHeaders.map((header) => {
  const index = sourceHeaders.indexOf(header);
  if (index < 0) throw new Error(`Missing source column: ${header}`);
  return [header, index];
}));

const handleIndex = sourceIndexes["URL handle"];
const filteredRows = sourceValues
  .slice(1)
  .filter((row) => !existingHandles.has(row[handleIndex]))
  .map((row) => outputHeaders.map((header) => row[sourceIndexes[header]] ?? ""));
const outputValues = [outputHeaders, ...filteredRows];

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Bootstrap");
sheet.getRange("A1").write(outputValues);
workbook.recalculate();

const csvEscape = (value) => {
  const text = value == null ? "" : String(value);
  if (/[",\r\n]/.test(text) || /^\s|\s$/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
};
const outputText = sheet.getUsedRange().values
  .map((row) => row.map(csvEscape).join(","))
  .join("\n") + "\n";

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(outputPath, outputText, "utf8");

const preview = await workbook.render({
  sheetName: "Bootstrap",
  range: "A1:I22",
  scale: 1,
  format: "png",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const savedWorkbook = await Workbook.fromCSV(await fs.readFile(outputPath, "utf8"), {
  sheetName: "Saved",
});
const savedValues = savedWorkbook.worksheets.getItem("Saved").getUsedRange().values;

if (savedValues.length !== 61) throw new Error(`Expected 61 total rows, found ${savedValues.length}`);
if (savedValues[0].length !== outputHeaders.length) throw new Error(`Expected ${outputHeaders.length} columns, found ${savedValues[0].length}`);
if (savedValues[0].join("|") !== outputHeaders.join("|")) throw new Error("Bootstrap headers changed after saving");

const handleCol = outputHeaders.indexOf("URL handle");
const titleCol = outputHeaders.indexOf("Title");
const skuCol = outputHeaders.indexOf("SKU");
const optionNameCol = outputHeaders.indexOf("Option1 name");
const optionValueCol = outputHeaders.indexOf("Option1 value");
const priceCol = outputHeaders.indexOf("Price");
const groups = new Map();
const skus = new Set();
let titleCount = 0;

for (const row of savedValues.slice(1)) {
  const handle = row[handleCol];
  if (!handle || existingHandles.has(handle)) throw new Error(`Unexpected handle: ${handle}`);
  if (!groups.has(handle)) groups.set(handle, []);
  groups.get(handle).push(row);
  if (row[titleCol]) titleCount += 1;
  if (!row[skuCol] || skus.has(row[skuCol])) throw new Error(`Missing or duplicate SKU: ${row[skuCol]}`);
  skus.add(row[skuCol]);
  if (row[optionNameCol] && row[optionNameCol] !== "Size") throw new Error(`Unexpected option name for ${handle}`);
  if (!["S", "M", "L", "XL", "XXL"].includes(row[optionValueCol])) throw new Error(`Unexpected size for ${handle}`);
  if (!row[priceCol]) throw new Error(`Missing price for ${handle}`);
}

const invalidGroups = [...groups.entries()].filter(([, rows]) => {
  const sizes = new Set(rows.map((row) => row[optionValueCol]));
  return rows.length !== 5 || ["S", "M", "L", "XL", "XXL"].some((size) => !sizes.has(size));
});

const inspect = await savedWorkbook.inspect({
  kind: "table",
  range: "'Saved'!A1:I22",
  include: "values,formulas",
  tableMaxRows: 22,
  tableMaxCols: 9,
  maxChars: 10000,
});
const errors = await savedWorkbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});

if (groups.size !== 12) throw new Error(`Expected 12 products, found ${groups.size}`);
if (titleCount !== 12) throw new Error(`Expected 12 title rows, found ${titleCount}`);
if (invalidGroups.length) throw new Error(`Invalid variant groups: ${invalidGroups.map(([handle]) => handle).join(", ")}`);

console.log(JSON.stringify({
  outputPath,
  products: groups.size,
  variants: savedValues.length - 1,
  columns: outputHeaders,
  titleRows: titleCount,
  handles: [...groups.keys()],
  inspect: inspect.ndjson,
  formulaErrors: errors.ndjson,
}, null, 2));
