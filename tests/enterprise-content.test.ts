import assert from "node:assert/strict";
import test from "node:test";
import { enterpriseInsights } from "../content/enterprise-insights.ts";
import { insights } from "../content/site.ts";
import { allIndexableRoutes } from "../content/pages.ts";
import { pageUpdatedAt } from "../content/page-updates.ts";
import { renderLlmsIndex } from "../lib/llms.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";

test("enterprise ML and data guides expose specific decisions without inventing model results", () => {
  assert.equal(enterpriseInsights.length, 2);
  for (const draft of enterpriseInsights) {
    const guide = insights.find((item) => item.slug === draft.slug)!;
    const path = `/insights/${guide.slug}`;
    assert.ok(allIndexableRoutes.includes(path));
    assert.equal(pageUpdatedAt(path), "2026-09-17");
    assert.ok(guide.sources && guide.sources.length >= 2);
    assert.match(guide.evidenceNote!, /no publica un modelo entrenado/);
    assert.ok(guide.example.title && guide.example.situation && guide.example.decision);
    const markdown = renderMarkdownForPath(path)!;
    for (const step of guide.method) assert.ok(markdown.includes(step.text));
    assert.ok(markdown.includes(guide.example.decision));
    assert.ok(renderLlmsIndex().includes(path));
  }
  assert.match(enterpriseInsights[0].answer, /averías independientes/);
  assert.match(enterpriseInsights[1].answer, /no demuestra una causa/);
});
