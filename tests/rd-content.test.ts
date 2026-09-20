import assert from "node:assert/strict";
import test from "node:test";
import { allIndexableRoutes, getStaticPage } from "../content/pages.ts";
import { insights } from "../content/site.ts";
import { rdInsights } from "../content/rd-insights.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";
import { renderLlmsIndex } from "../lib/llms.ts";
import { pageUpdatedAt } from "../content/page-updates.ts";

test("R&D guides preserve provenance, sources, examples and their own publication dates", () => {
  assert.equal(rdInsights.length, 5);
  for (const draft of rdInsights) {
    const guide = insights.find((entry) => entry.slug === draft.slug)!;
    const path = `/insights/${guide.slug}`;
    assert.ok(allIndexableRoutes.includes(path), path);
    assert.equal(guide.publishedAt, "2026-09-17");
    assert.equal(guide.updatedAt, guide.publishedAt);
    assert.equal(pageUpdatedAt(path), guide.updatedAt);
    assert.ok(guide.sources && guide.sources.length >= 2);
    assert.match(guide.evidenceNote!, /propuestas técnicas internas/);
    const markdown = renderMarkdownForPath(path)!;
    for (const step of guide.method) assert.ok(markdown.includes(step.text));
    assert.ok(markdown.includes(guide.example.situation));
    assert.doesNotMatch(markdown, /Nota de evidencia|Pregunta de investigación elaborada a partir de propuestas técnicas internas/);
    assert.match(markdown, /Situación inventada; no representa un resultado de clientes/);
    for (const source of guide.sources) assert.ok(markdown.includes(source.url));
    assert.ok(renderLlmsIndex().includes(`/markdown${path}`));
  }
  assert.equal(pageUpdatedAt("/insights/data-leakage-validacion-temporal"), "2026-08-27");
});

test("the publishable corpus does not identify the confidential engagement", () => {
  // Identificadores restringidos: la prueba no publica estos valores.
  const forbidden = /\bCRIDA\b|PISA[-\s]?MaT|\bLEBL\b|GEST[-\s]?PPT[-\s]?SERV[-\s]?IA|millas\s+a\s+toma/iu;
  for (const path of allIndexableRoutes) {
    assert.doesNotMatch(renderMarkdownForPath(path)!, forbidden, path);
  }
  assert.doesNotMatch(renderLlmsIndex(), forbidden);
  assert.doesNotMatch(JSON.stringify(rdInsights), /\b(?:NEXAQUA|CICLOVIVO|KONTRASTA|LINDEA|DEPORVIA|HILO360|ZAINDU|ONCE|PULSO)\b/u);
});

test("GovTech scenarios expose their limits and the same matrix in Markdown", () => {
  const govtech = getStaticPage("/govtech")!;
  const matrix = govtech.sections.find((section) => section.table)?.table;
  assert.ok(matrix);
  assert.equal(matrix.rows.length, 4);
  const markdown = renderMarkdownForPath("/govtech")!;
  for (const row of matrix.rows) for (const cell of row) assert.ok(markdown.includes(cell));
  assert.match(markdown, /no describen proyectos ejecutados/);
  for (const section of govtech.sections) {
    for (const link of section.links ?? []) {
      if (link.path.startsWith("/")) assert.ok(renderMarkdownForPath(link.path), link.path);
    }
  }
});
