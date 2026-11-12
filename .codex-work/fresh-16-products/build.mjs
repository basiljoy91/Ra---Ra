import fs from "node:fs/promises";
import { Workbook } from "@oai/artifact-tool";

const sourcePath = "C:/VScode/Ra---Ra/outputs/stage2-shopify-image-links/ra-ra-shopify-stage-2-product-links-with-images.csv";
const outputDir = "C:/VScode/Ra---Ra/outputs/shopify-fresh-import";
const outputPath = `${outputDir}/02-ra-ra-related-product-links-with-options.csv`;
const previewPath = "C:/VScode/Ra---Ra/.codex-work/fresh-16-products/previews/related-links-with-options.png";

const relatedDesignsHeader = "Related designs; (product.metafields.custom.related_designs)";
const relatedTypesHeader = "Related tee types; (product.metafields.custom.related_tee_types)";
const outputHeaders = [
  "Title",
  "URL handle",
  "SKU",
  "Option1 name",
  "Option1 value",
  relatedDesignsHeader,
  relatedTypesHeader,
];

const sourceText = await fs.readFile(sourcePath, "utf8");
const sourceWorkbook = await Workbook.fromCSV(sourceText, { sheetName: "Source" });
const sourceValues = sourceWorkbook.worksheets.getItem("Source").getUsedRange().values;
const sourceHeaders = sourceValues[0];
const sourceIndexes = Object.fromEntries(outputHeaders.map((header) => {
  const column = sourceHeaders.indexOf(header);
  if (column < 0) throw new Error(`Missing source header: ${header}`);
  return [header, column];
}));

const outputValues = [
  outputHeaders,
  ...sourceValues.slice(1).map((row) => outputHeaders.map((header) => row[sourceIndexes[header]] ?? "")),
];

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Related links");
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
  sheetName: "Related links",
  range: "A1:G22",
  scale: 1,
  format: "png",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const savedWorkbook = await Workbook.fromCSV(await fs.readFile(outputPath, "utf8"), {
  sheetName: "Saved",
});
const savedValues = savedWorkbook.worksheets.getItem("Saved").getUsedRange().values;
const savedHeaders = savedValues[0];

if (savedValues.length !== 81) throw new Error(`Expected 80 variant rows, found ${savedValues.length - 1}`);
if (savedHeaders.join("|") !== outputHeaders.join("|")) throw new Error("Saved headers differ from the required update headers");

const titleIndex = outputHeaders.indexOf("Title");
const handleIndex = outputHeaders.indexOf("URL handle");
const skuIndex = outputHeaders.indexOf("SKU");
const optionNameIndex = outputHeaders.indexOf("Option1 name");
const optionValueIndex = outputHeaders.indexOf("Option1 value");
const relatedDesignsIndex = outputHeaders.indexOf(relatedDesignsHeader);
const relatedTypesIndex = outputHeaders.indexOf(relatedTypesHeader);
const groups = new Map();
const skus = new Set();
let titleRows = 0;
let linkedProductRows = 0;

for (const row of savedValues.slice(1)) {
  const handle = row[handleIndex];
  if (!handle) throw new Error("Missing URL handle");
  if (!groups.has(handle)) groups.set(handle, []);
  groups.get(handle).push(row);
  if (!row[skuIndex] || skus.has(row[skuIndex])) throw new Error(`Missing or duplicate SKU: ${row[skuIndex]}`);
  skus.add(row[skuIndex]);
  if (!["S", "M", "L", "XL", "XXL"].includes(row[optionValueIndex])) throw new Error(`Unexpected option value for ${handle}`);
  if (row[titleIndex]) {
    titleRows += 1;
    if (row[optionNameIndex] !== "Size") throw new Error(`First row for ${handle} is missing Option1 name Size`);
    if (!row[relatedDesignsIndex] || !row[relatedTypesIndex]) throw new Error(`First row for ${handle} is missing related-product links`);
    linkedProductRows += 1;
  } else if (row[relatedDesignsIndex] || row[relatedTypesIndex]) {
    throw new Error(`Related-product links must only be present on the first row for ${handle}`);
  }
}

const allHandles = new Set(groups.keys());
const invalidGroups = [];
const invalidReferences = [];
for (const [handle, rows] of groups) {
  const sizes = new Set(rows.map((row) => row[optionValueIndex]));
  if (rows.length !== 5 || ["S", "M", "L", "XL", "XXL"].some((size) => !sizes.has(size))) {
    invalidGroups.push(handle);
  }
  const first = rows.find((row) => row[titleIndex]);
  if (!first) {
    invalidGroups.push(`${handle}: missing title row`);
    continue;
  }
  for (const value of [first[relatedDesignsIndex], first[relatedTypesIndex]]) {
    const refs = String(value).split(";").map((item) => item.trim()).filter(Boolean);
    if (refs.length !== 3) invalidReferences.push(`${handle}: expected 3 references`);
    for (const ref of refs) {
      if (!allHandles.has(ref)) invalidReferences.push(`${handle}: missing reference ${ref}`);
      if (ref === handle) invalidReferences.push(`${handle}: self reference`);
    }
  }
}

const inspect = await savedWorkbook.inspect({
  kind: "table",
  range: "'Saved'!A1:G22",
  include: "values,formulas",
  tableMaxRows: 22,
  tableMaxCols: 7,
  maxChars: 12000,
});
const errors = await savedWorkbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});

if (groups.size !== 16) throw new Error(`Expected 16 products, found ${groups.size}`);
if (titleRows !== 16 || linkedProductRows !== 16) throw new Error(`Expected 16 linked title rows, found ${linkedProductRows}`);
if (invalidGroups.length) throw new Error(`Invalid variant groups: ${invalidGroups.join(", ")}`);
if (invalidReferences.length) throw new Error(`Invalid references: ${invalidReferences.join(" | ")}`);

console.log(JSON.stringify({
  outputPath,
  products: groups.size,
  variantRows: savedValues.length - 1,
  linkedProductRows,
  columns: savedHeaders,
  invalidGroups,
  invalidReferences,
  inspect: inspect.ndjson,
  formulaErrors: errors.ndjson,
}, null, 2));
