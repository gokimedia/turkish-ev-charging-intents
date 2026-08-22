import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputDirectory = path.join(root, "distribution", "kaggle");
const outputFile = path.join(outputDirectory, "turkish-ev-charging-intents.csv");
const coverFile = path.join(outputDirectory, "dataset-cover-image.png");
const columns = [
  "id",
  "text",
  "intent",
  "intent_label_tr",
  "target_path",
  "split",
  "language",
  "provenance",
];

function escapeCsv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const rows = [];
for (const split of ["train", "validation", "test"]) {
  const content = await readFile(path.join(root, "data", `${split}.jsonl`), "utf8");
  for (const line of content.trim().split(/\r?\n/).filter(Boolean)) {
    const row = JSON.parse(line);
    if (row.split !== split) {
      throw new Error(`${row.id}: expected split ${split}, found ${row.split}`);
    }
    rows.push(row);
  }
}

if (rows.length !== 192) {
  throw new Error(`Expected 192 rows, found ${rows.length}`);
}

const csv = [
  columns.join(","),
  ...rows.map((row) => columns.map((column) => escapeCsv(row[column])).join(",")),
].join("\n");

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, `${csv}\n`, "utf8");
await copyFile(path.join(root, "docs", "og.png"), coverFile);

console.log(`Exported ${rows.length} rows to ${path.relative(root, outputFile)}.`);
console.log(`Copied the publication cover to ${path.relative(root, coverFile)}.`);
