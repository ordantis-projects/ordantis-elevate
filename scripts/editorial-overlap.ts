import { mkdir, writeFile } from "node:fs/promises";
import { insights } from "../content/site.ts";
import { findEditorialOverlap } from "../lib/editorial-overlap.ts";

const pairs = findEditorialOverlap(insights.map((insight) => ({
  slug: insight.slug,
  text: [insight.title, insight.description, insight.answer, ...insight.context,
    insight.example.situation, insight.example.decision, ...insight.checks,
    ...insight.method.map((step) => step.text), ...insight.stopSignals].join(" "),
})));

// Se excluyen fuentes, notas de evidencia y encabezados de plantilla compartidos.
// Es un filtro léxico para revisión, no una prueba de canibalización en buscadores.
const failures = pairs.filter((pair) => pair.similarity >= 0.82);
const report = `# Revisión de solapamiento editorial\n\nMétodo: coseno TF-IDF sobre texto propio, sin encabezados ni notas comunes. No usa embeddings ni datos de SERP. No mide autoría de IA ni demuestra canibalización.\n\n${insights.length} guías, ${pairs.length} pares. El gate bloquea pares con similitud léxica ≥ 0,82; los siguientes son candidatos a revisión manual, no errores automáticos.\n\n| Primera guía | Segunda guía | Similitud léxica |\n| --- | --- | --- |\n${pairs.slice(0, 12).map((pair) => `| ${pair.first} | ${pair.second} | ${pair.similarity.toFixed(3)} |`).join("\n")}\n`;
await mkdir(".quality", { recursive: true });
await writeFile(".quality/editorial-overlap.md", report, "utf8");
console.log(`${pairs.length} pares revisados. Informe: .quality/editorial-overlap.md`);
if (failures.length) {
  console.error("Guías casi duplicadas: revisa su intención y contenido.", failures);
  process.exitCode = 1;
}
