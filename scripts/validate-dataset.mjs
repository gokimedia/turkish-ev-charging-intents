import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const expectedSplits = { train: 128, validation: 32, test: 32 };
const expectedIntents = new Set([
  "FIND_STATION",
  "COMPARE_PRICE",
  "ROUTE_PLANNING",
  "CHARGING_SPEED",
  "VEHICLE_COMPARISON",
  "HOME_CHARGING",
  "BATTERY_HEALTH",
  "OWNERSHIP_COST",
]);
const requiredFields = [
  "id",
  "text",
  "intent",
  "intent_label_tr",
  "target_path",
  "split",
  "language",
  "provenance",
];
const directIdentifierPatterns = [
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /\b(?:\+?90|0)?5\d{9}\b/,
  /\b\d{11}\b/,
];

const rows = [];
const errors = [];

for (const [split, expectedCount] of Object.entries(expectedSplits)) {
  const file = path.join(root, "data", `${split}.jsonl`);
  const content = await readFile(file, "utf8");
  const lines = content.trim().split(/\r?\n/).filter(Boolean);

  if (lines.length !== expectedCount) {
    errors.push(`${split}: expected ${expectedCount} rows, found ${lines.length}`);
  }

  lines.forEach((line, lineIndex) => {
    try {
      rows.push(JSON.parse(line));
    } catch (error) {
      errors.push(`${split}:${lineIndex + 1}: invalid JSON (${error.message})`);
    }
  });
}

const ids = new Set();
const texts = new Set();
const intentCounts = new Map();

for (const [index, row] of rows.entries()) {
  const location = `row ${index + 1}`;

  for (const field of requiredFields) {
    if (typeof row[field] !== "string" || row[field].trim() === "") {
      errors.push(`${location}: missing or invalid ${field}`);
    }
  }

  if (ids.has(row.id)) errors.push(`${location}: duplicate id ${row.id}`);
  ids.add(row.id);

  const normalizedText = row.text?.trim().toLocaleLowerCase("tr-TR");
  if (texts.has(normalizedText)) errors.push(`${location}: duplicate text`);
  texts.add(normalizedText);

  if (!expectedIntents.has(row.intent)) errors.push(`${location}: unknown intent ${row.intent}`);
  if (!Object.hasOwn(expectedSplits, row.split)) errors.push(`${location}: unknown split ${row.split}`);
  if (row.language !== "tr") errors.push(`${location}: language must be tr`);
  if (row.provenance !== "synthetic-editorial") errors.push(`${location}: unexpected provenance`);
  if (!row.target_path?.startsWith("/")) errors.push(`${location}: target_path must be relative`);
  if (directIdentifierPatterns.some((pattern) => pattern.test(row.text ?? ""))) {
    errors.push(`${location}: possible direct identifier found`);
  }

  intentCounts.set(row.intent, (intentCounts.get(row.intent) ?? 0) + 1);
}

if (rows.length !== 192) errors.push(`expected 192 total rows, found ${rows.length}`);
for (const intent of expectedIntents) {
  if (intentCounts.get(intent) !== 24) {
    errors.push(`${intent}: expected 24 rows, found ${intentCounts.get(intent) ?? 0}`);
  }
}

if (errors.length > 0) {
  console.error(`Dataset validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validated ${rows.length} rows, ${expectedIntents.size} balanced intents, and 3 fixed splits.`);

