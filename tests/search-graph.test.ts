import assert from "node:assert/strict";
import test from "node:test";
import { searchGraph } from "../content/search-graph.ts";
import { allIndexableRoutes } from "../content/pages.ts";
import { insights } from "../content/site.ts";
import { enterpriseInsights } from "../content/enterprise-insights.ts";
import { rdInsights } from "../content/rd-insights.ts";
import { servicePhases } from "../content/services.ts";
import { renderLlmsIndex } from "../lib/llms.ts";
import { renderMarkdownForPath } from "../lib/markdown.ts";
import { siteConfig } from "../content/identity.ts";

test("the decision graph resolves existing pages, anchors and unique published questions", () => {
  const guideSlugs: string[] = searchGraph.flatMap((topic) => [...topic.guides]);
  assert.equal(new Set(guideSlugs).size, guideSlugs.length);
  const anchors = servicePhases.flatMap((phase) => [phase.id, ...phase.services.map((service) => service.id)]);
  for (const topic of searchGraph) {
    const [path, anchor] = topic.path.split("#");
    assert.ok(allIndexableRoutes.includes(path), path);
    if (anchor) assert.ok(anchors.includes(anchor), anchor);
    for (const slug of topic.guides) {
      assert.ok(insights.some((guide) => guide.slug === slug), slug);
      assert.ok(allIndexableRoutes.includes(`/insights/${slug}`));
    }
  }
  for (const guide of [...enterpriseInsights, ...rdInsights]) assert.ok(guideSlugs.includes(guide.slug), guide.slug);
});

test("llms follows the current decision graph and keeps integration specialties secondary", () => {
  const llms = renderLlmsIndex();
  assert.deepEqual(searchGraph.map((topic) => topic.id), ["prediccion", "datos", "planificacion", "investigacion", "sistemas", "govtech"]);
  for (const topic of searchGraph) {
    assert.ok(llms.includes(`## ${topic.title}`));
    assert.ok(llms.includes(`/markdown${topic.path.split("#")[0]}`));
    assert.ok(llms.includes(topic.decision));
    for (const slug of topic.guides) assert.ok(llms.includes(`/markdown/insights/${slug}`));
  }
  assert.ok(llms.indexOf("## Especialidades complementarias de integración") > llms.indexOf("## Evidencia y límites"));
  assert.match(llms, /confirma el envío a contacto@ordantis\.com/);
  assert.match(llms, /No acredita implantaciones predictivas/);
  assert.doesNotMatch(llms, /no acredita viabilidad ni envía datos por sí sola/);
  assert.doesNotMatch(llms, /\/markdown\/capacidades#/);
  assert.ok(llms.split(/\s+/).length < 1500, "Keep the index curated rather than duplicating the corpus");
});

test("every curated internal Markdown link resolves to the published content source", () => {
  for (const match of renderLlmsIndex().matchAll(/\]\(([^)]+)\)/g)) {
    const url = new URL(match[1]);
    if (url.origin !== siteConfig.url || !url.pathname.startsWith("/markdown")) continue;
    const path = url.pathname.slice("/markdown".length) || "/";
    assert.ok(renderMarkdownForPath(path), path);
    assert.equal(url.hash, "", "Markdown does not expose HTML service anchors");
  }
});
