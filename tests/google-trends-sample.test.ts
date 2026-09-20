import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const sample = JSON.parse(
  readFileSync(new URL("../quality/google-trends-sample-2026-08-29.json", import.meta.url), "utf8"),
);

test("Google Trends evidence remains relative and separate from Keyword Planner demand", () => {
  assert.equal(sample.status, "exploratory_relative_signal");
  assert.match(sample.metricDefinition, /No es volumen mensual/);
  assert.equal(sample.comparisons.length, 2);
  assert.ok(sample.interpretationRules.some((rule: string) => /0 significa señal insuficiente/.test(rule)));

  for (const comparison of sample.comparisons) {
    assert.equal(comparison.rows.length, 5);
    assert.match(comparison.url, /^https:\/\/trends\.google\.com\/trends\/explore\?/);
    for (const row of comparison.rows) {
      assert.ok(Number.isInteger(row.averageRelativeIndex));
      assert.ok(row.intentEvidence.trim());
      assert.ok(row.decision.trim());
      assert.equal("monthlyVolume" in row, false);
    }
  }
});

test("the captured comparisons retain the observed averages", () => {
  assert.deepEqual(
    sample.comparisons[0].rows.map((row: { averageRelativeIndex: number }) => row.averageRelativeIndex),
    [18, 38, 0, 0, 34],
  );
  assert.deepEqual(
    sample.comparisons[1].rows.map((row: { averageRelativeIndex: number }) => row.averageRelativeIndex),
    [5, 0, 2, 0, 0],
  );
});
