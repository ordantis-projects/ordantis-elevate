import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const pages = JSON.parse(await readFile(".quality/pages.json", "utf8"));
const reviewed = JSON.parse(await readFile("quality/signsofai-reviewed.json", "utf8"));
// A portable runtime may be selected locally; CI uses the pinned global tool.
const command = process.env.SIGNSOFAI_DOTNET || "signsofai";
const prefix = process.env.SIGNSOFAI_DLL ? [process.env.SIGNSOFAI_DLL] : [];
const reports = [];
for (const page of pages) {
  const result = spawnSync(command, [...prefix, "check", page.file, "--lang", "es", "--rules", "quality/signsofai-ordantis.json", "--json"], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
  if (result.error || result.status !== 0) throw new Error(`SignsOfAI: ${page.route}: ${result.error?.message || result.stderr || result.stdout}`);
  const report = JSON.parse(result.stdout.replace(/^\uFEFF/, ""));
  if (!Number.isFinite(report.score)) throw new Error(`SignsOfAI no devolvió puntuación para ${page.route}.`);
  const hash = createHash("sha256").update(await readFile(page.file)).digest("hex");
  const review = reviewed.find((item) => item.route === page.route && item.sha256 === hash);
  reports.push({ route: page.route, score: report.score, verdict: report.verdict, words: page.words, findings: report.findings, artifacts: report.artifacts, editorialReview: review });
}
reports.sort((a, b) => b.score - a.score);
await writeFile(".quality/signsofai-pages.json", JSON.stringify({ version: "0.5.0", language: "es", threshold: 25, reports }, null, 2));
console.log(`SignsOfAI: ${reports.length} páginas analizadas en español. Informe: .quality/signsofai-pages.json`);
console.table(reports.slice(0, 8).map(({ route, score }) => ({ route, score })));
// A review is tied to the exact text, so edits require a fresh decision. Artifacts
// and our own unsupported-claim patterns are never waived by a score review.
const failures = reports.filter((report) => (report.score > 25 && !report.editorialReview) || report.artifacts?.length || report.findings?.some((finding) => finding.RuleId.startsWith("ordantis.")));
console.log(`${reports.filter((report) => report.score > 25 && report.editorialReview).length} alertas de puntuación con revisión editorial documentada; no son una prueba de autoría.`);
if (failures.length) {
  console.error("Revisión requerida en:", failures.map((report) => report.route).join(", "));
  process.exitCode = 1;
}
