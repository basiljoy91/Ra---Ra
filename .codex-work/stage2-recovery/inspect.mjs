import fs from "node:fs/promises";
import { Workbook } from "@oai/artifact-tool";

const sourcePath = "C:/VScode/ra-ra-shopify-stage-1-products-completed.csv";
const previewDir = "C:/VScode/Ra---Ra/.codex-work/stage2-recovery/previews";
const csvText = await fs.readFile(sourcePath, "utf8");
const workbook = await Workbook.fromCSV(csvText, { sheetName: "Stage 1" });

const overview = await workbook.inspect({
  kind: "table",
  range: "'Stage 1'!A1:AN26",
  include: "values,formulas",
  tableMaxRows: 26,
  tableMaxCols: 40,
  maxChars: 16000,
});

await fs.mkdir(previewDir, { recursive: true });
for (const [name, range] of [
  ["stage1-transition.png", "A17:N27"],
  ["stage1-transition-images.png", "AJ17:AN27"],
]) {
  const preview = await workbook.render({
    sheetName: "Stage 1",
    range,
    scale: 1,
    format: "png",
  });
  await fs.writeFile(`${previewDir}/${name}`, new Uint8Array(await preview.arrayBuffer()));
}

console.log(JSON.stringify({
  rows: workbook.worksheets.getItem("Stage 1").getUsedRange().values.length,
  inspect: overview.ndjson,
}, null, 2));
