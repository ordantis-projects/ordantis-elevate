import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildKeywordPlannerResult } from "../lib/keyword-planner.ts";

const sourceFile = new URL("../quality/keyword-planner-exports/2026-08-29/google-ads-keyword-stats-original.csv", import.meta.url);
const sourceBytes = readFileSync(sourceFile);
assert.equal(sourceBytes[0], 0xff);
assert.equal(sourceBytes[1], 0xfe);
const raw = sourceBytes.subarray(2).toString("utf16le");
const seeds = JSON.parse(readFileSync(new URL("../quality/keyword-planner-seeds.json", import.meta.url), "utf8"));
const result = buildKeywordPlannerResult({
  raw,
  seeds,
  capturedAt: "2026-08-29",
  sourceFile: "quality/keyword-planner-exports/2026-08-29/google-ads-keyword-stats-original.csv",
  sourceSha256: createHash("sha256").update(sourceBytes).digest("hex"),
  actualScope: {
    country: "España",
    language: "Todos los idiomas",
    queryLanguage: "Consultas introducidas en español",
    network: "Google",
    startDate: "2025-08-01",
    endDate: "2026-07-31",
    currency: "EUR",
  },
});

test("the Google Ads export maps one-to-one to all 50 requested keywords", () => {
  assert.equal(result.summary.keywordsRequested, 50);
  assert.equal(result.summary.keywordsReturned, 50);
  assert.equal(result.summary.duplicateKeywords, 0);
  assert.equal(result.summary.unmatchedSeeds, 0);
  assert.equal(result.summary.unmatchedExports, 0);
});

test("the result distinguishes the requested language from the filter actually used", () => {
  assert.equal(result.requestedScope.language, "es");
  assert.equal(result.actualScope.language, "Todos los idiomas");
  assert.equal(result.actualScope.queryLanguage, "Consultas introducidas en español");
});

test("missing Planner estimates remain null rather than becoming zero", () => {
  assert.equal(result.summary.keywordsWithAverage, 19);
  assert.equal(result.summary.keywordsWithoutAverage, 31);
  assert.equal(result.summary.averageCoverageRate, 0.38);
  assert.equal(result.summary.keywordsWithMonthlySeries, 0);
  assert.equal(result.rows.find((row) => row.keyword === "RAG para empresas")?.averageMonthlySearches, null);
});

test("observed averages and paid metrics retain their source meaning", () => {
  const businessAi = result.rows.find((row) => row.keyword === "inteligencia artificial para empresas")!;
  assert.equal(businessAi.averageMonthlySearches, 500);
  assert.equal(businessAi.advertisingCompetition, "Media");
  assert.equal(businessAi.topOfPageBidLowEur, 4.32);
  assert.equal(businessAi.topOfPageBidHighEur, 13.77);
  assert.ok(result.interpretationRules.some((rule) => /no equivalen a dificultad SEO/.test(rule)));
});

test("growth from a zero base is not converted into a finite percentage", () => {
  const agentDevelopment = result.rows.find((row) => row.keyword === "desarrollo de agentes de IA")!;
  assert.equal(agentDevelopment.yearOverYearChangeRaw, "∞");
  assert.equal(agentDevelopment.yearOverYearChangePercent, null);
  assert.equal(agentDevelopment.yearOverYearChangeFromZero, true);
});
