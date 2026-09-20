import { readFile, writeFile } from "node:fs/promises";
import { editorialProse, languageChunks } from "../lib/editorial-language.ts";

const endpoint = process.env.LANGUAGETOOL_URL;
if (!endpoint) {
  console.log("LanguageTool NO EJECUTADO: define LANGUAGETOOL_URL (servicio local). No cuenta como revisión aprobada.");
  process.exit(0);
}

const url = new URL(endpoint);
if (!["127.0.0.1", "localhost", "[::1]"].includes(url.hostname)) {
  throw new Error("La revisión editorial debe usar LanguageTool local; no se envían los borradores a servicios externos.");
}
const pages = JSON.parse(await readFile(".quality/pages.json", "utf8"));
const dictionary = JSON.parse(await readFile("quality/spanish-terms.json", "utf8"));
const reviewed = JSON.parse(await readFile("quality/language-reviewed.json", "utf8"));
const allowedTerms = new Set([...dictionary.terms, ...dictionary.corporateTerms, ...dictionary.technicalTerms, ...dictionary.literalTerms].map((term) => term.toLocaleLowerCase("es")));
const findings = [];
const acceptedTerms = [];
const reviewedFindings = [];
let version;

for (const page of pages) {
  const text = editorialProse(await readFile(page.file, "utf8"));
  for (const [chunkIndex, chunk] of languageChunks(text).entries()) {
    const body = new URLSearchParams({ text: chunk, language: "es", enabledOnly: "false" });
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body, signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`LanguageTool: ${page.route}: HTTP ${response.status}.`);
    const result = await response.json();
    version = result.software?.version;
    for (const match of result.matches ?? []) {
      const excerpt = chunk.slice(match.offset, match.offset + match.length);
      const finding = { route: page.route, chunk: chunkIndex + 1, rule: match.rule?.id, type: match.rule?.issueType, excerpt, message: match.message, context: match.context, replacements: match.replacements?.slice(0, 4).map((item) => item.value) };
      const exception = reviewed.find((item) => item.route === page.route && item.rule === match.rule?.id && item.excerpt === excerpt && match.context?.text.includes(item.contextIncludes));
      if (match.rule?.id === "MORFOLOGIK_RULE_ES" && allowedTerms.has(excerpt.toLocaleLowerCase("es"))) {
        acceptedTerms.push(finding);
      } else if (exception) {
        reviewedFindings.push({ ...finding, reason: exception.reason });
      } else {
        findings.push(finding);
      }
    }
  }
}
await writeFile(".quality/languagetool.json", JSON.stringify({ version, language: "es", pages: pages.length, findings, acceptedTerms, reviewedFindings }, null, 2));
console.log(`LanguageTool ${version}: ${pages.length} páginas; ${findings.length} observaciones; ${acceptedTerms.length} términos técnicos reconocidos. Informe: .quality/languagetool.json`);
const blocking = findings.filter((finding) => ["misspelling", "grammar", "inconsistency"].includes(finding.type));
for (const finding of blocking.slice(0, 20)) console.error(`${finding.route}: ${finding.rule}: ${finding.excerpt} — ${finding.message}`);
if (blocking.length) process.exitCode = 1;
