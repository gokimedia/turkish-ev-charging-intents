import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = process.argv[2];

if (!outputDirectory) {
  throw new Error("Usage: node scripts/build-readthedocs.mjs <output-directory>");
}

await mkdir(outputDirectory, { recursive: true });
await cp("docs", outputDirectory, { recursive: true, force: true });

const canonicalBase = process.env.READTHEDOCS_CANONICAL_URL?.replace(/\/$/, "");

if (canonicalBase) {
  const indexPath = path.join(outputDirectory, "index.html");
  const currentSiteRoot = "https://gokimedia.github.io/turkish-ev-charging-intents/";
  const html = await readFile(indexPath, "utf8");
  const readTheDocsHtml = html.replaceAll(currentSiteRoot, `${canonicalBase}/`);

  await writeFile(indexPath, readTheDocsHtml, "utf8");
}
