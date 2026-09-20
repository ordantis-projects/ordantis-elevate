import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const command = process.env.VALE_BIN || "vale";
const pages = JSON.parse(await readFile(".quality/pages.json", "utf8"));
function run(args, input) {
  const result = spawnSync(command, ["--no-global", "--config=.vale.ini", "--output=JSON", ...args], { input, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
  if (result.error || ![0, 1].includes(result.status)) throw new Error(result.error?.message || result.stderr || result.stdout);
  return JSON.parse(result.stdout);
}
// A positive control prevents a missing/disabled config from looking like a pass.
const control = run(["--ext=.md"], "Una solución innovadora garantiza cero errores.");
if (!Object.values(control).flat().some((item) => item.Check === "Ordantis.Evidence")) throw new Error("Vale no ha cargado las reglas de Ordantis.");
const reports = pages.map((page) => ({ route: page.route, findings: Object.values(run([page.file])).flat() }));
await writeFile(".quality/vale-pages.json", JSON.stringify({ positiveControl: true, pages: pages.length, reports }, null, 2));
const errors = reports.flatMap((report) => report.findings.map((finding) => ({ route: report.route, ...finding })));
console.log(`Vale: ${pages.length} páginas comprobadas y control positivo correcto. ${errors.length} observaciones. Informe: .quality/vale-pages.json`);
for (const error of errors.slice(0, 15)) console.error(`${error.route}: ${error.Check}: ${error.Message}`);
if (errors.length) process.exitCode = 1;
