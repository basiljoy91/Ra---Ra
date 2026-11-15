import fs from "node:fs/promises";
import path from "node:path";

import {
  FileBlob,
  SpreadsheetFile,
  Workbook,
} from "file:///C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const outputDir = "C:/VScode/Ra---Ra/outputs/01a1de70-7667-7c91-acf7-0c743b5e3998";
const previewDir = "C:/VScode/Ra---Ra/tmp/shopify-beyond-builder/previews";
const workbookPath = path.join(outputDir, "ra-ra-beyond-shopify-two-stage-import.xlsx");
const stage1CsvPath = path.join(outputDir, "01-ra-ra-beyond-products-draft.csv");
const stage2CsvPath = path.join(outputDir, "02-ra-ra-beyond-images-FILL-URLS.csv");

const sizes = ["S", "M", "L", "XL", "XXL"];
const price = 699;
const inventoryBySize = {
  S: 8,
  M: 19,
  L: 25,
  XL: 17,
  XXL: 6,
};

const sizeRows = [
  ["S", "56 cm", "70 cm", "53 cm", "23 cm"],
  ["M", "59 cm", "72 cm", "56 cm", "24 cm"],
  ["L", "62 cm", "74 cm", "59 cm", "25 cm"],
  ["XL", "65 cm", "76 cm", "62 cm", "26 cm"],
  ["XXL", "68 cm", "78 cm", "65 cm", "27 cm"],
];

const products = [
  {
    design: "Beyond Time",
    handle: "beyond-time",
    heading: "What Remains",
    signature: "The day was ordinary. What it left behind wasn't.",
    story: [
      "An ordinary moment. A lasting meaning.",
      "Some moments stay with us long after they have passed.",
      "An evening with friends. A familiar voice. A place that once felt like home.",
      "BEYOND TIME explores the difference between time as something we measure and time as something we experience.",
      "Two textured lunar forms, a measured line and continuing marks create a composition inspired by the passage of time. The regularity of those marks contrasts with the unpredictable ways memories remain.",
      "A personal reminder of the people, places and moments that become part of us.",
    ],
    seoDescription:
      "Beyond Time explores memory and the moments that remain through lunar forms, measured lines and a deep-black boxy oversized unisex T-shirt.",
    images: [
      ["ChatGPT Image Nov 15, 2026, 01_16_50 PM-1.png", "Male model wearing the black Beyond Time T-shirt from the front"],
      ["ChatGPT Image Nov 15, 2026, 01_16_53 PM-2.png", "Female model wearing the black Beyond Time T-shirt from the front"],
      ["ChatGPT Image Nov 15, 2026, 01_16_55 PM-3.png", "Male model showing the back artwork of the black Beyond Time T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_16_56 PM-4.png", "Female model showing the back artwork of the black Beyond Time T-shirt"],
      ["08_female_seated_editorial.png", "Seated female model wearing the black Beyond Time T-shirt"],
      ["09_male_walking_editorial.png", "Male model walking in the black Beyond Time T-shirt"],
      ["10_unisex_studio_duo.png", "Male and female models wearing black Beyond Time T-shirts in the studio"],
      ["11_unisex_lifestyle_duo.png", "Male and female models showing front and back views of the Beyond Time T-shirt"],
      ["06_front_print_detail.png", "Close view of the Beyond Time chest artwork on black fabric"],
      ["07_back_print_detail.png", "Close view of the Beyond Time lunar back artwork on black fabric"],
      ["05_fabric_collar_detail.png", "Close view of the rib crew neck and black fabric of the Beyond Time T-shirt"],
    ],
  },
  {
    design: "Beyond Fear",
    handle: "beyond-fear",
    heading: "The Courage to Be Seen",
    signature: "You don't have to sound certain to speak honestly.",
    story: [
      "For the moments that require quiet courage.",
      "There is a particular kind of courage in saying something honest without knowing how it will be received.",
      "BEYOND FEAR is inspired by those private moments.",
      "A narrow mark on the chest and a wavering vertical line on the back express uncertainty without trying to eliminate it. The irregular path is not a flaw in the composition. It is its meaning.",
      "For the conversation you finally had, the truth you shared, or the moment you let someone see a little more of who you are.",
      "Not every act of courage needs an audience.",
    ],
    seoDescription:
      "Beyond Fear expresses quiet courage through a narrow chest mark and wavering back line on a deep-black boxy oversized unisex T-shirt.",
    images: [
      ["ChatGPT Image Nov 15, 2026, 01_23_07 PM-1.png", "Male model wearing the black Beyond Fear T-shirt from the front"],
      ["ChatGPT Image Nov 15, 2026, 01_23_08 PM-2.png", "Female model wearing the black Beyond Fear T-shirt from the front"],
      ["ChatGPT Image Nov 15, 2026, 01_23_10 PM-3.png", "Male model showing the back artwork of the black Beyond Fear T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_23_11 PM-4.png", "Female model showing the back artwork of the black Beyond Fear T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_23_15 PM-8.png", "Male model in a three-quarter view wearing the black Beyond Fear T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_23_16 PM-9.png", "Female model in a three-quarter view wearing the black Beyond Fear T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_23_18 PM-10.png", "Male model showing the Beyond Fear back artwork in a concrete setting"],
      ["ChatGPT Image Nov 15, 2026, 01_23_13 PM-6.png", "Close view of the Beyond Fear chest artwork on black fabric"],
      ["ChatGPT Image Nov 15, 2026, 01_23_14 PM-7.png", "Close view of the wavering Beyond Fear back artwork on black fabric"],
      ["ChatGPT Image Nov 15, 2026, 01_23_12 PM-5.png", "Close view of the rib crew neck and black fabric of the Beyond Fear T-shirt"],
    ],
  },
  {
    design: "Beyond Reality",
    handle: "beyond-reality",
    heading: "The Part We Haven't Seen",
    signature: "What you see can be real without being the whole story.",
    story: [
      "There is always more to discover.",
      "An impression can feel complete long before we know the whole story.",
      "BEYOND REALITY is an exploration of the distance between seeing and understanding.",
      "An eclipse-like form on the chest and a larger circular composition on the back use partial visibility, light, shadow and geometric lines to represent the limits of a single perspective.",
      "The artwork leaves something unresolved, inviting a closer look.",
      "For those who value curiosity, welcome unfamiliar perspectives, and know that understanding often begins with listening.",
    ],
    seoDescription:
      "Beyond Reality explores seeing and understanding through eclipse-inspired artwork on a deep-black boxy oversized unisex T-shirt.",
    images: [
      ["ChatGPT Image Nov 15, 2026, 01_20_08 PM-1.png", "Male model wearing the black Beyond Reality T-shirt from the front"],
      ["ChatGPT Image Nov 15, 2026, 01_20_08 PM-2.png", "Female model wearing the black Beyond Reality T-shirt from the front"],
      ["ChatGPT Image Nov 15, 2026, 01_20_09 PM-3.png", "Male model showing the circular back artwork of the black Beyond Reality T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_20_10 PM-4.png", "Female model showing the circular back artwork of the black Beyond Reality T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_20_14 PM-8.png", "Seated female model wearing the black Beyond Reality T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_20_15 PM-9.png", "Male model walking in the black Beyond Reality T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_20_16 PM-10.png", "Male and female models showing front and back views of the Beyond Reality T-shirt"],
      ["ChatGPT Image Nov 15, 2026, 01_20_12 PM-6.png", "Close view of the eclipse-inspired Beyond Reality chest artwork"],
      ["ChatGPT Image Nov 15, 2026, 01_20_13 PM-7.png", "Close view of the circular Beyond Reality back artwork"],
      ["ChatGPT Image Nov 15, 2026, 01_20_11 PM-5.png", "Close view of the rib crew neck and black fabric of the Beyond Reality T-shirt"],
    ],
  },
  {
    design: "Beyond Limits",
    handle: "beyond-limits",
    heading: "More Than Who You Were",
    signature: "An old definition doesn't deserve the final word.",
    story: [
      "You are allowed to change.",
      "We all develop ideas about who we are. Some guide us. Others become too small for the lives we're growing into.",
      "BEYOND LIMITS is about noticing when an old definition no longer fits.",
      "A solid line crosses a boundary and continues as separated dots. Its structure changes, leaving the direction open rather than prescribing a destination.",
      "The artwork represents self-discovery without the expectation of endless achievement.",
      "For anyone who has found something new in themselves, changed their mind, or begun to feel comfortable becoming someone they didn't expect.",
    ],
    seoDescription:
      "Beyond Limits explores the freedom to outgrow old definitions through line artwork on a deep-black boxy oversized unisex T-shirt.",
    images: [
      ["Beyond Limits Streetwear Portrait-1.png", "Male model wearing the black Beyond Limits T-shirt from the front"],
      ["Beyond Limits_ Monochrome Streetwear-3.png", "Female model wearing the black Beyond Limits T-shirt from the front"],
      ["Beyond Limits Editorial Portrait-4.png", "Female model in a portrait view wearing the black Beyond Limits T-shirt"],
      ["Beyond Limits_ Monochrome Editorial-2.png", "Male model in a portrait view wearing the black Beyond Limits T-shirt"],
      ["Beyond Limits Streetwear Portrait-5.png", "Male model showing the back artwork of the black Beyond Limits T-shirt"],
      ["Beyond Limits Studio Portrait-7.png", "Female model showing the back artwork of the black Beyond Limits T-shirt"],
      ["Beyond Limits_ Concrete Streetwear Portrait-8.png", "Female model showing the Beyond Limits back artwork in a concrete setting"],
      ["Beyond Limits_ Infinity Graphic-6.png", "Male model showing the dotted Beyond Limits back artwork"],
      ["Beyond Limits_ Minimalist Black Tee-11.png", "Close view of the Beyond Limits chest artwork on black fabric"],
      ["Beyond Limits Oversized Tee-12.png", "Close view of the Beyond Limits line artwork on the black T-shirt"],
      ["Premium Black Crewneck Collar Detail-9.png", "Close view of the rib crew neck on the black Beyond Limits T-shirt"],
      ["Premium Black Crewneck Detail-10.png", "Close view of the Beyond Limits chest artwork and rib crew neck"],
    ],
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function productDescription(product) {
  const storyHtml = product.story
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  const sizeBody = sizeRows
    .map(
      ([size, chest, length, shoulder, sleeve]) =>
        `<tr><td>${size}</td><td>${chest}</td><td>${length}</td><td>${shoulder}</td><td>${sleeve}</td></tr>`,
    )
    .join("");

  return [
    `<h2>${escapeHtml(product.heading)}</h2>`,
    storyHtml,
    `<blockquote>${escapeHtml(product.signature)}</blockquote>`,
    "<h3>Product details</h3>",
    "<ul>",
    "<li>Planned 280 GSM 100% Supima cotton construction</li>",
    "<li>Double-jersey knit; interlock construction is proposed</li>",
    "<li>Solid deep black with a smooth, dense, matte surface</li>",
    "<li>Boxy oversized unisex fit with dropped shoulders</li>",
    "<li>Wide straight short sleeves and a reinforced rib crew neck</li>",
    "<li>Shoulder-to-shoulder tape and double-needle sleeve and bottom hems</li>",
    "</ul>",
    "<h3>Finished garment measurements</h3>",
    "<table><thead><tr><th>Size</th><th>Chest flat</th><th>Length</th><th>Shoulder</th><th>Sleeve</th></tr></thead>",
    `<tbody>${sizeBody}</tbody></table>`,
    "<p><em>Construction, Supima traceability, rib material, finishing and measurements remain provisional until supplier sampling and fit approval.</em></p>",
  ].join("");
}

const stage1Headers = [
  "Title",
  "URL handle",
  "Description",
  "Vendor",
  "Product category",
  "Type",
  "Tags",
  "Published on online store",
  "Status",
  "SKU",
  "Option1 name",
  "Option1 value",
  "Price",
  "Charge tax",
  "Inventory tracker",
  "Inventory quantity",
  "Continue selling when out of stock",
  "Requires shipping",
  "Fulfillment service",
  "Gift card",
  "SEO title",
  "SEO description",
  "Google Shopping / Google product category",
  "Google Shopping / Gender",
  "Google Shopping / Age group",
  "Google Shopping / Manufacturer part number (MPN)",
  "Google Shopping / Condition",
];

const stage1Rows = [];
for (const product of products) {
  for (const [index, size] of sizes.entries()) {
    const first = index === 0;
    const sku = `RR-${product.handle.replaceAll("-", "-").toUpperCase()}-BLK-${size}`;
    stage1Rows.push([
      first ? `${product.design} T-Shirt` : "",
      product.handle,
      first ? productDescription(product) : "",
      first ? "Ra & Ra" : "",
      first ? "Apparel & Accessories > Clothing > Clothing Tops > T-Shirts" : "",
      first ? "Boxy Oversized T-Shirt" : "",
      first
        ? `Beyond, Collection 01, ${product.design}, Unisex, T-Shirt, Heavyweight, Boxy Oversized, Deep Black, 280 GSM, Supima Cotton`
        : "",
      first ? "FALSE" : "",
      first ? "draft" : "",
      sku,
      first ? "Size" : "",
      size,
      price,
      "TRUE",
      "shopify",
      inventoryBySize[size],
      "DENY",
      "TRUE",
      "manual",
      first ? "FALSE" : "",
      first ? `${product.design} T-Shirt | Ra & Ra` : "",
      first ? product.seoDescription : "",
      first ? "Apparel & Accessories > Clothing > Shirts & Tops" : "",
      first ? "Unisex" : "",
      first ? "Adult (13+ years old)" : "",
      sku,
      first ? "New" : "",
    ]);
  }
}

const imageInputHeaders = [
  "Product",
  "URL handle",
  "Original image filename",
  "Suggested upload filename",
  "Image position",
  "Image alt text",
  "Shopify HTTPS image URL",
  "Status",
];

const imageRows = [];
for (const product of products) {
  product.images.forEach(([originalFilename, altText], index) => {
    const suffix = String(index + 1).padStart(2, "0");
    imageRows.push({
      product: product.design,
      handle: product.handle,
      originalFilename,
      suggestedFilename: `ra-ra-${product.handle}-${suffix}.png`,
      position: index + 1,
      altText,
      first: index === 0,
    });
  });
}

const stage2Headers = [
  "Title",
  "URL handle",
  "Product image URL",
  "Image position",
  "Image alt text",
  "Design; (product.metafields.custom.design)",
  "Tee type; (product.metafields.custom.tee_type)",
  "Related designs; (product.metafields.custom.related_designs)",
];

function relatedHandles(handle) {
  return products
    .filter((product) => product.handle !== handle)
    .map((product) => product.handle)
    .join("; ");
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  return /[",\n\r]/u.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(headers, rows) {
  return [headers, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n") + "\n";
}

function setHeaderStyle(range) {
  range.format = {
    fill: "#252525",
    font: { name: "Arial", size: 10, bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "inside", style: "thin", color: "#FFFFFF" },
  };
  range.format.rowHeight = 54;
}

function styleImportSheet(sheet, rowCount, colCount, widths) {
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(1);
  const used = sheet.getRangeByIndexes(0, 0, rowCount, colCount);
  used.format.font = { name: "Arial", size: 10, color: "#222222" };
  used.format.verticalAlignment = "top";
  setHeaderStyle(sheet.getRangeByIndexes(0, 0, 1, colCount));
  widths.forEach((width, index) => {
    sheet.getRangeByIndexes(0, index, rowCount, 1).format.columnWidth = width;
  });
}

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const workbook = Workbook.create();
const readMe = workbook.worksheets.add("Read Me");
const stage1 = workbook.worksheets.add("Stage 1 Products");
const imageInput = workbook.worksheets.add("Image URL Input");
const stage2 = workbook.worksheets.add("Stage 2 Import");

readMe.showGridLines = false;
readMe.tabColor = "#252525";
stage1.tabColor = "#414141";
imageInput.tabColor = "#C49000";
stage2.tabColor = "#6B6B6B";

readMe.getRange("A2:F2").merge();
readMe.getRange("A2").values = [["RA & RA BEYOND Shopify import"]];
readMe.getRange("A2").format.font = { name: "Arial", size: 16, bold: true, color: "#111111" };
readMe.getRange("A3:F3").format.borders = { bottom: { style: "thin", color: "#9B9B9B" } };

readMe.getRange("A5:E7").values = [
  ["Stage", "Purpose", "File", "Current status", "Required action"],
  ["1", "Create four draft products and 20 size variants", path.basename(stage1CsvPath), "Inventory loaded; ready for review", "Confirm price, then import from Shopify Products"],
  ["2", "Optional image and related-design template", path.basename(stage2CsvPath), "Optional; images will be added manually", "Skip this CSV when adding images directly in Shopify"],
];
setHeaderStyle(readMe.getRange("A5:E5"));
readMe.getRange("A6:E7").format.font = { name: "Arial", size: 10, color: "#222222" };
readMe.getRange("A6:E7").format.verticalAlignment = "center";
readMe.getRange("A6:E7").format.borders = { preset: "inside", style: "thin", color: "#E3E3E3" };
readMe.getRange("A7:E7").format.fill = "#FFF4CC";

readMe.getRange("A10:B16").values = [
  ["Review item", "Current value"],
  ["Product status", "Draft; not published"],
  ["Price", "699 in the Shopify store's base currency; retained from the earlier development import and not confirmed by the supplied documents"],
  ["Inventory", "300 units total; 75 per design — S 8, M 19, L 25, XL 17, XXL 6"],
  ["Product count", 4],
  ["Variant count", 20],
  ["Optional image plan rows", 43],
];
setHeaderStyle(readMe.getRange("A10:B10"));
readMe.getRange("A11:B16").format.font = { name: "Arial", size: 10, color: "#222222" };
readMe.getRange("A11:B16").format.verticalAlignment = "top";
readMe.getRange("A11:B16").format.borders = { preset: "inside", style: "thin", color: "#E3E3E3" };
readMe.getRange("B12").format.fill = "#FFF4CC";

readMe.getRange("A19:B25").values = [
  ["Source", "Use"],
  ["Beyond Story.txt", "Product stories, story headings and signature statements"],
  ["Website content ver1.docx", "Short website copy reference"],
  ["Spec details for website.docx", "Garment construction and finished measurements"],
  ["Product images folder", "Four product image sets and image ordering"],
  ["Shopify Help Center: https://help.shopify.com/en/manual/products/import-export/using-csv", "Current CSV and product-image import requirements"],
  ["300-piece pilot inventory plan", "User-provided stock by design and size: S 8, M 19, L 25, XL 17, XXL 6"],
];
setHeaderStyle(readMe.getRange("A19:B19"));
readMe.getRange("A20:B25").format.font = { name: "Arial", size: 10, color: "#222222" };
readMe.getRange("A20:B25").format.borders = { preset: "inside", style: "thin", color: "#E3E3E3" };
readMe.getRange("A20:B25").format.verticalAlignment = "top";

readMe.getRange("B26:F28").merge(true);
readMe.getRange("A26:A28").values = [["Important"], ["Stage 1"], ["Stage 2"]];
readMe.getRange("B26:B28").values = [
  ["Shopify imports CSV files, not XLSX files. Use this workbook to review the product and inventory data."],
  ["Import the supplied Stage 1 CSV. Inventory is loaded. Keep the products as drafts until price and supplier specifications are approved."],
  ["Stage 2 is optional because images will be added manually. Do not import its blank image-URL template."],
];
readMe.getRange("A26:A28").format.font = { name: "Arial", size: 10, bold: true, color: "#7A2200" };
readMe.getRange("A26:F28").format.fill = "#FFF0E8";
readMe.getRange("A26:F28").format.font = { name: "Arial", size: 10, color: "#7A2200" };
readMe.getRange("A26:F28").format.wrapText = true;
readMe.getRange("A26:F28").format.verticalAlignment = "center";

readMe.getRange("A1:F30").format.font.name = "Arial";
readMe.getRange("A1:A30").format.columnWidth = 22;
readMe.getRange("B1:B30").format.columnWidth = 58;
readMe.getRange("C1:C30").format.columnWidth = 40;
readMe.getRange("D1:D30").format.columnWidth = 22;
readMe.getRange("E1:E30").format.columnWidth = 54;
readMe.getRange("F1:F30").format.columnWidth = 16;
readMe.getRange("A2:F30").format.wrapText = true;
readMe.getRange("A26:F28").format.rowHeight = 42;

stage1.getRangeByIndexes(0, 0, 1, stage1Headers.length).values = [stage1Headers];
stage1.getRangeByIndexes(1, 0, stage1Rows.length, stage1Headers.length).values = stage1Rows;
styleImportSheet(
  stage1,
  stage1Rows.length + 1,
  stage1Headers.length,
  [28, 24, 70, 16, 42, 24, 52, 18, 12, 30, 15, 14, 12, 12, 18, 15, 22, 16, 18, 12, 34, 50, 44, 15, 22, 34, 14],
);
stage1.getRange(`C2:C${stage1Rows.length + 1}`).format.wrapText = true;
stage1.getRange(`E2:G${stage1Rows.length + 1}`).format.wrapText = true;
stage1.getRange(`G2:G${stage1Rows.length + 1}`).format.wrapText = true;
stage1.getRange(`V2:V${stage1Rows.length + 1}`).format.wrapText = true;
stage1.getRange(`W2:Z${stage1Rows.length + 1}`).format.wrapText = true;
stage1.getRange(`M2:M${stage1Rows.length + 1}`).format.numberFormat = "0.00";
stage1.getRange(`P2:P${stage1Rows.length + 1}`).format.numberFormat = "0";
stage1.tables.add(`A1:AA${stage1Rows.length + 1}`, true, "Stage1ProductsTable").style = "TableStyleMedium2";

imageInput.getRangeByIndexes(0, 0, 1, imageInputHeaders.length).values = [imageInputHeaders];
const imageInputValues = imageRows.map((row) => [
  row.product,
  row.handle,
  row.originalFilename,
  row.suggestedFilename,
  row.position,
  row.altText,
  "",
  "",
]);
imageInput.getRangeByIndexes(1, 0, imageInputValues.length, imageInputHeaders.length).values = imageInputValues;
imageInput.getRange("H2").formulas = [["=IF(G2=\"\",\"ADD URL\",\"READY\")"]];
imageInput.getRange(`H2:H${imageRows.length + 1}`).fillDown();
styleImportSheet(imageInput, imageRows.length + 1, imageInputHeaders.length, [20, 22, 48, 38, 14, 60, 58, 14]);
imageInput.getRange(`F2:F${imageRows.length + 1}`).format.wrapText = true;
imageInput.getRange(`G2:G${imageRows.length + 1}`).format.fill = "#FFF4CC";
imageInput.getRange(`E2:E${imageRows.length + 1}`).format.numberFormat = "0";
imageInput
  .getRange(`H2:H${imageRows.length + 1}`)
  .conditionalFormats.add("containsText", {
    text: "ADD URL",
    format: { fill: "#FFF0E8", font: { bold: true, color: "#9C2D00" } },
  });
imageInput
  .getRange(`H2:H${imageRows.length + 1}`)
  .conditionalFormats.add("containsText", {
    text: "READY",
    format: { fill: "#E5F4EA", font: { bold: true, color: "#176B3A" } },
  });
imageInput.tables.add(`A1:H${imageRows.length + 1}`, true, "ImageUrlInputTable").style = "TableStyleMedium2";

stage2.getRangeByIndexes(0, 0, 1, stage2Headers.length).values = [stage2Headers];
const stage2Static = imageRows.map((row) => [
  row.first ? `${row.product} T-Shirt` : "",
  "",
  "",
  "",
  "",
  row.first ? row.product : "",
  row.first ? "Boxy Oversized T-Shirt" : "",
  row.first ? relatedHandles(row.handle) : "",
]);
stage2.getRangeByIndexes(1, 0, stage2Static.length, stage2Headers.length).values = stage2Static;
for (let index = 0; index < imageRows.length; index += 1) {
  const excelRow = index + 2;
  stage2.getRange(`B${excelRow}:E${excelRow}`).formulas = [[
    `='Image URL Input'!B${excelRow}`,
    `=IF('Image URL Input'!G${excelRow}=\"\",\"\",'Image URL Input'!G${excelRow})`,
    `='Image URL Input'!E${excelRow}`,
    `='Image URL Input'!F${excelRow}`,
  ]];
}
styleImportSheet(stage2, imageRows.length + 1, stage2Headers.length, [28, 24, 60, 15, 62, 28, 28, 58]);
stage2.getRange(`C2:C${imageRows.length + 1}`).format.fill = "#FFF4CC";
stage2.getRange(`E2:E${imageRows.length + 1}`).format.wrapText = true;
stage2.getRange(`D2:D${imageRows.length + 1}`).format.numberFormat = "0";
stage2.tables.add(`A1:H${imageRows.length + 1}`, true, "Stage2ImportTable").style = "TableStyleMedium2";

workbook.recalculate();

const readMeCheck = await workbook.inspect({
  kind: "table",
  range: "Read Me!A2:F28",
  include: "values,formulas",
  tableMaxRows: 30,
  tableMaxCols: 8,
  maxChars: 12000,
});
console.log(readMeCheck.ndjson);

const stage1Check = await workbook.inspect({
  kind: "table",
  range: "Stage 1 Products!A1:AA21",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 27,
  maxChars: 16000,
});
console.log(stage1Check.ndjson);

const stage2Check = await workbook.inspect({
  kind: "table",
  range: "Stage 2 Import!A1:H44",
  include: "values,formulas",
  tableMaxRows: 10,
  tableMaxCols: 8,
  maxChars: 12000,
});
console.log(stage2Check.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

for (const [sheetName, fileName] of [
  ["Read Me", "read-me.png"],
  ["Stage 1 Products", "stage-1-products.png"],
  ["Image URL Input", "image-url-input.png"],
  ["Stage 2 Import", "stage-2-import.png"],
]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(path.join(previewDir, fileName), new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(workbookPath);

const savedWorkbook = await FileBlob.load(workbookPath);
const reopenedWorkbook = await SpreadsheetFile.importXlsx(savedWorkbook);
const reopenedSheets = await reopenedWorkbook.inspect({
  kind: "sheet",
  include: "id,name",
  maxChars: 3000,
});
console.log(reopenedSheets.ndjson);

await fs.writeFile(stage1CsvPath, toCsv(stage1Headers, stage1Rows), "utf8");

const stage2CsvRows = imageRows.map((row) => [
  row.first ? `${row.product} T-Shirt` : "",
  row.handle,
  "",
  row.position,
  row.altText,
  row.first ? row.product : "",
  row.first ? "Boxy Oversized T-Shirt" : "",
  row.first ? relatedHandles(row.handle) : "",
]);
await fs.writeFile(stage2CsvPath, toCsv(stage2Headers, stage2CsvRows), "utf8");

await fs.rm(`${workbookPath}.inspect.ndjson`, { force: true });

console.log(JSON.stringify({
  workbookPath,
  stage1CsvPath,
  stage2CsvPath,
  products: products.length,
  variants: stage1Rows.length,
  inventory: stage1Rows.reduce((total, row) => total + row[15], 0),
  images: imageRows.length,
}, null, 2));
