import assert from "node:assert/strict";
import test from "node:test";
import { defaultDataContract, qualityScenarios } from "../content/labs.ts";
import { analyzeObservations, parseObservationTime } from "../lib/data-quality.ts";

test("synthetic scenario reports affected rows separately from findings", () => {
  const report = analyzeObservations(qualityScenarios[0].observations, defaultDataContract);
  assert.equal(report.totalRows, 8);
  assert.equal(report.affectedRows, 7);
  assert.equal(report.findings.length, 8);
  assert.deepEqual(report.findings.filter((finding) => finding.rule === "duplicate_id").map((finding) => finding.row), [2, 3]);
  assert.equal(report.findings.filter((finding) => finding.row === 7).length, 2);
});

test("clean scenario does not claim truth or certification", () => {
  assert.equal(analyzeObservations(qualityScenarios[1].observations, defaultDataContract).status, "no-findings");
  assert.equal(analyzeObservations([], defaultDataContract).status, "no-data");
});

test("invalid calendar dates, timezone-less strings and future times remain distinguishable", () => {
  assert.equal(parseObservationTime("2026-02-30T10:00:00Z"), null);
  assert.equal(parseObservationTime("2026-08-26T10:00:00"), null);
  assert.notEqual(parseObservationTime("2024-02-29T10:00:00Z"), null);
  assert.equal(parseObservationTime("2026-02-29T10:00:00Z"), null);
  const report = analyzeObservations(qualityScenarios[0].observations, defaultDataContract);
  assert.ok(report.findings.some((finding) => finding.rule === "future_time"));
  assert.ok(report.findings.some((finding) => finding.rule === "invalid_time"));
});

test("range and age boundaries are inclusive and zero is not absence", () => {
  const row = { ...qualityScenarios[1].observations[0], observedAt: "2026-08-25T10:00:00Z", value: 0 };
  assert.equal(analyzeObservations([row], defaultDataContract).findings.length, 0);
  assert.equal(analyzeObservations([{ ...row, value: 30 }], defaultDataContract).findings.length, 0);
  assert.equal(analyzeObservations([{ ...row, value: 30.01 }], defaultDataContract).findings[0].rule, "out_of_range");
});

test("changing contract does not mutate data or silently convert units", () => {
  const original = JSON.stringify(qualityScenarios[0].observations);
  const report = analyzeObservations(qualityScenarios[0].observations, { ...defaultDataContract, maxAgeHours: 200 });
  assert.equal(report.affectedRows, 6);
  assert.equal(JSON.stringify(qualityScenarios[0].observations), original);
  const wrongUnit = { ...qualityScenarios[1].observations[0], value: 1000, unit: "m³/h" };
  assert.deepEqual(analyzeObservations([wrongUnit], defaultDataContract).findings.map((finding) => finding.rule), ["wrong_unit"]);
});

test("missing and non-finite values and invalid contracts are handled explicitly", () => {
  const row = { ...qualityScenarios[1].observations[0], id: "", sensor: "", value: Infinity };
  assert.deepEqual(analyzeObservations([row], defaultDataContract).findings.map((finding) => finding.rule), ["missing_id", "missing_sensor", "invalid_value"]);
  assert.throws(() => analyzeObservations([], { ...defaultDataContract, maxValue: -1 }), /Contrato no válido/);
  assert.throws(() => analyzeObservations([], { ...defaultDataContract, maxAgeHours: NaN }), /Contrato no válido/);
});
