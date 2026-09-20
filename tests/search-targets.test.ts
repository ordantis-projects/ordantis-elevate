import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { allIndexableRoutes } from "../content/pages.ts";

const plan = JSON.parse(readFileSync(new URL("../quality/keyword-planner-seeds.json", import.meta.url), "utf8"));

test("keyword hypotheses map to existing pages and contain no invented demand", () => {
  const routes = new Set<string>(allIndexableRoutes);
  const keywords = new Set<string>();
  for (const cluster of plan.clusters) {
    assert.ok(routes.has(cluster.targetPath), cluster.targetPath);
    assert.equal(cluster.measuredMetrics, null);
    assert.ok(cluster.intentHypothesis.trim());
    for (const keyword of cluster.keywords) {
      const normalized = keyword.normalize("NFKC").trim().toLocaleLowerCase("es");
      assert.ok(normalized);
      assert.ok(!keywords.has(normalized), `Duplicate keyword: ${keyword}`);
      keywords.add(normalized);
    }
  }
  assert.equal(keywords.size, 50);
  assert.equal(plan.status, "measured_2026-08-29");
  assert.equal(plan.resultFile, "quality/keyword-planner-results-2026-08-29.json");
  assert.equal(plan.requestedContext.network, "Google");
});
