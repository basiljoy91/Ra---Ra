import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const pathFilter = process.argv[2]?.replaceAll("/", path.sep).toLowerCase();
const sourceRoot = path.join(root, "src");
const catalogPath = path.join(sourceRoot, "i18n", "catalog.ts");
const customerRoots = [
  path.join(sourceRoot, "app"),
  path.join(sourceRoot, "components"),
  path.join(sourceRoot, "config"),
  path.join(sourceRoot, "data"),
  path.join(sourceRoot, "features"),
];

const customerKeys = new Set([
  "alt",
  "answer",
  "aria-label",
  "body",
  "caption",
  "category",
  "consentText",
  "content",
  "description",
  "developmentNotice",
  "emailLabel",
  "emailPlaceholder",
  "error",
  "eyebrow",
  "heading",
  "intro",
  "label",
  "lead",
  "message",
  "pendingLabel",
  "placeholder",
  "privacyLabel",
  "publicNote",
  "question",
  "quote",
  "reason",
  "shortDescription",
  "signatureStatement",
  "storage",
  "submitLabel",
  "subtitle",
  "text",
  "title",
  "titleLines",
  "purpose",
  "duration",
]);

const ignoredParts = [
  `${path.sep}development${path.sep}`,
  `${path.sep}i18n${path.sep}`,
];

const ignoredFiles = new Set(["development-showcases.ts"]);
const intentionallyUntranslated = new Set([
  "280 GSM",
  "apparel",
  "BEYOND",
  "Beyond Fear",
  "Beyond Limits",
  "Beyond Reality",
  "Beyond Time",
  "contact@raundra.com",
  "max-w-[var(--container-content)]",
  "Ra & Ra",
  "RA & RA",
  "RA & RA / COLLECTION 01",
  "RA & RA / COLLECTION 01 · BEYOND",
  "ra_shopify_cart",
  "ra_storefront_country",
]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (ignoredParts.some((part) => fullPath.includes(part))) return [];
    if (entry.isDirectory()) return walk(fullPath);
    if (ignoredFiles.has(entry.name)) return [];
    return /\.(?:ts|tsx)$/u.test(entry.name) ? [fullPath] : [];
  });
}

function decodeHtmlEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function readable(value) {
  const normalized = decodeHtmlEntities(value).replace(/\s+/gu, " ").trim();
  if (normalized.length < 2 || normalized.length > 1200) return null;
  if (!/[A-Za-zÄÖÜäöüß]/u.test(normalized)) return null;
  if (intentionallyUntranslated.has(normalized)) return null;
  if (/^(?:[a-z0-9_-]+(?:\s+[a-z0-9_:[\]/().%-]+)+)$/u.test(normalized)) return null;
  if (/^(?:https?:|\/|#|mailto:|tel:)/u.test(normalized)) return null;
  return normalized;
}

function propertyName(node) {
  if (!node) return null;
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return null;
}

const catalogSource = ts.createSourceFile(
  catalogPath,
  fs.readFileSync(catalogPath, "utf8"),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);
const translated = new Set();

function collectCatalog(node) {
  if (ts.isPropertyAssignment(node)) {
    const name = propertyName(node.name);
    if ((name === "en" || name === "de") && ts.isStringLiteralLike(node.initializer)) {
      translated.add(node.initializer.text.trim());
    }
  }
  ts.forEachChild(node, collectCatalog);
}
collectCatalog(catalogSource);

const candidates = new Map();

function addCandidate(value, file, line) {
  const candidate = readable(value);
  if (!candidate || translated.has(candidate)) return;
  const locations = candidates.get(candidate) ?? [];
  locations.push(`${path.relative(root, file)}:${line}`);
  candidates.set(candidate, locations);
}

for (const file of customerRoots.flatMap(walk)) {
  if (pathFilter && !path.relative(root, file).toLowerCase().includes(pathFilter)) continue;
  const sourceText = fs.readFileSync(file, "utf8");
  const source = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  function visit(node) {
    const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;

    if (ts.isJsxText(node)) addCandidate(node.getText(source), file, line);

    if (ts.isJsxAttribute(node)) {
      const name = node.name.getText(source);
      if (customerKeys.has(name) && node.initializer && ts.isStringLiteral(node.initializer)) {
        addCandidate(node.initializer.text, file, line);
      }
    }

    if (ts.isPropertyAssignment(node)) {
      const name = propertyName(node.name);
      if (name && customerKeys.has(name)) {
        if (ts.isStringLiteralLike(node.initializer)) addCandidate(node.initializer.text, file, line);
        if (ts.isArrayLiteralExpression(node.initializer)) {
          for (const item of node.initializer.elements) {
            if (ts.isStringLiteralLike(item)) addCandidate(item.text, file, line);
          }
        }
      }
    }

    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      ["title", "description"].includes(node.name.text) &&
      node.initializer &&
      ts.isStringLiteralLike(node.initializer)
    ) {
      addCandidate(node.initializer.text, file, line);
    }

    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      (node.expression.text === "verified" || node.expression.text === "pending")
    ) {
      const publicArgumentIndexes = node.expression.text === "verified" ? [0, 1] : [0];
      for (const index of publicArgumentIndexes) {
        const argument = node.arguments[index];
        if (argument && ts.isStringLiteralLike(argument)) {
          addCandidate(argument.text, file, line);
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(source);
}

const output = [...candidates.entries()].sort(([a], [b]) => a.localeCompare(b));
console.log(`Untranslated customer-facing candidates: ${output.length}`);
for (const [value, locations] of output) {
  console.log(`\n${JSON.stringify(value)}\n  ${locations.slice(0, 3).join("\n  ")}`);
}

process.exitCode = output.length > 0 ? 1 : 0;
