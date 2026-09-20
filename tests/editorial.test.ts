import assert from "node:assert/strict";
import test from "node:test";
import { capabilities, insights } from "../content/site.ts";
import { insightExamples } from "../content/insight-examples.ts";
import { capabilityEngagements } from "../content/capability-engagements.ts";
import { findEditorialOverlap } from "../lib/editorial-overlap.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";

test("all guides have distinct labelled examples, also present in Markdown", () => {
  assert.equal(Object.keys(insightExamples).length, insights.length);
  assert.equal(new Set(insights.map((insight) => insight.example.situation)).size, insights.length);
  for (const insight of insights) {
    assert.ok(insight.example.situation.length > 80, insight.slug);
    assert.ok(insight.example.decision.length > 80, insight.slug);
    const markdown = renderMarkdownForPath(`/insights/${insight.slug}`)!;
    assert.ok(markdown.includes(insight.example.situation), insight.slug);
    assert.ok(markdown.includes(insight.example.decision), insight.slug);
    assert.ok(markdown.includes("Situación inventada"), insight.slug);
  }
});

test("all capabilities have an input sample, deliverables, acceptance and exclusions", () => {
  assert.equal(Object.keys(capabilityEngagements).length, capabilities.length);
  for (const capability of capabilities) {
    const scope = capability.engagement;
    assert.ok(scope.inputs.length >= 3);
    assert.ok(scope.deliverables.length >= 3);
    const markdown = renderMarkdownForPath(`/capacidades/${capability.slug}`)!;
    assert.ok(markdown.includes(scope.acceptance));
    assert.ok(markdown.includes(scope.notIncluded));
  }
});

test("lexical overlap detects copies without claiming semantic equivalence", () => {
  const pairs = findEditorialOverlap([
    { slug: "a", text: "Sensores conservan tiempo unidad lectura original" },
    { slug: "b", text: "SENSORES conservan tiempo unidad lectura original" },
    { slug: "c", text: "Permisos herramienta destinatario aprobación" },
  ]);
  assert.ok(pairs[0].similarity > 0.999);
  assert.equal(pairs[1].similarity, 0);
  assert.equal(findEditorialOverlap([{ slug: "a", text: "" }, { slug: "b", text: "" }])[0].similarity, 0);
});
