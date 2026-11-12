import { Workbook } from "@oai/artifact-tool";

const workbook = Workbook.create();
workbook.worksheets.add("Sheet1");
console.log(workbook.help("SpreadsheetFile", {
  search: "SpreadsheetFile|CSV",
  include: "index,examples,notes",
  maxChars: 6000,
}).ndjson);
