import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { buildKeywordPlannerResult, type PlannerSeedPlan } from "../lib/keyword-planner.ts";

const sourceFile = "quality/keyword-planner-exports/2026-08-29/google-ads-keyword-stats-original.csv";
const outputFile = "quality/keyword-planner-results-2026-08-29.json";
const [sourceBytes, seedText] = await Promise.all([
  readFile(sourceFile),
  readFile("quality/keyword-planner-seeds.json", "utf8"),
]);
if (sourceBytes[0] !== 0xff || sourceBytes[1] !== 0xfe) throw new Error("Expected the original UTF-16LE Google Ads export");
const raw = sourceBytes.subarray(2).toString("utf16le");
const result = buildKeywordPlannerResult({
  raw,
  seeds: JSON.parse(seedText) as PlannerSeedPlan,
  capturedAt: "2026-08-29",
  sourceFile,
  sourceSha256: createHash("sha256").update(sourceBytes).digest("hex"),
  actualScope: {
    country: "España",
    language: "Todos los idiomas",
    queryLanguage: "Consultas introducidas en español",
    network: "Google",
    startDate: "2025-08-01",
    endDate: "2026-07-31",
    currency: "EUR",
  },
});
await writeFile(outputFile, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputFile, summary: result.summary }));
