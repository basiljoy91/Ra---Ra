import fs from "node:fs/promises";
import { Workbook } from "@oai/artifact-tool";

const stage1Path = "C:/VScode/ra-ra-shopify-stage-1-products-completed.csv";
const stage2Path = "C:/VScode/ra&ta raw/shopify excelsheet/ra-ra-shopify-stage-2-product-links.csv";
const previewDir = "C:/VScode/Ra---Ra/.codex-work/stage2-image-links/previews";

const [stage1Text, stage2Text] = await Promise.all([
  fs.readFile(stage1Path, "utf8"),
  fs.readFile(stage2Path, "utf8"),
]);

const [stage1, stage2] = await Promise.all([
  Workbook.fromCSV(stage1Text, { sheetName: "Stage 1" }),
  Workbook.fromCSV(stage2Text, { sheetName: "Stage 2" }),
]);

const stage1Check = await stage1.inspect({
  kind: "table",
  range: "'Stage 1'!A1:AN8",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 40,
  maxChars: 12000,
});
const stage2Check = await stage2.inspect({
  kind: "table",
  range: "'Stage 2'!A1:AR8",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 44,
  maxChars: 12000,
});

await fs.mkdir(previewDir, { recursive: true });
for (const [name, workbook, sheetName] of [
  ["stage1-images.png", stage1, "Stage 1"],
  ["stage2-images.png", stage2, "Stage 2"],
]) {
  const preview = await workbook.render({
    sheetName,
    range: "AJ1:AN8",
    scale: 1,
    format: "png",
  });
  await fs.writeFile(`${previewDir}/${name}`, new Uint8Array(await preview.arrayBuffer()));
}

console.log(JSON.stringify({
  stage1Inspect: stage1Check.ndjson,
  stage2Inspect: stage2Check.ndjson,
  stage1Rows: stage1.worksheets.getItem("Stage 1").getUsedRange().values.length,
  stage2Rows: stage2.worksheets.getItem("Stage 2").getUsedRange().values.length,
}, null, 2));
