import assert from "node:assert/strict";
import test from "node:test";
import {
  defaultDocumentExtractionPolicy,
  documentIntelligenceLab,
  extractionCandidates,
  syntheticContractPages,
} from "../content/document-intelligence.ts";
import { evaluateDocumentExtraction } from "../lib/document-intelligence.ts";

test("the default document policy matches every declared synthetic expectation", () => {
  const report = evaluateDocumentExtraction(syntheticContractPages, extractionCandidates, defaultDocumentExtractionPolicy);
  assert.equal(report.candidateCount, 10);
  assert.equal(report.correctCount, 10);
  assert.equal(report.autoAccepted, 3);
  assert.equal(report.manualReview, 6);
  assert.equal(report.rejected, 1);
  assert.equal(report.unsafeAccepts, 0);
  assert.equal(report.acceptedWithoutSupport, 0);
});

test("removing evidence and review controls exposes unsafe automatic acceptance", () => {
  const report = evaluateDocumentExtraction(syntheticContractPages, extractionCandidates, {
    minimumConfidence: 0,
    requireEvidence: false,
    reviewContradictions: false,
    reviewHighRisk: false,
  });
  assert.equal(report.correctCount, 3);
  assert.equal(report.autoAccepted, 10);
  assert.equal(report.unsafeAccepts, 7);
  assert.equal(report.acceptedWithoutSupport, 3);
});

test("an invalid confidence threshold is rejected explicitly", () => {
  assert.throws(() => evaluateDocumentExtraction(syntheticContractPages, extractionCandidates, {
    ...defaultDocumentExtractionPolicy,
    minimumConfidence: 1.01,
  }), RangeError);
});

test("document evaluation does not mutate pages, candidates or policy", () => {
  const beforePages = structuredClone(syntheticContractPages);
  const beforeCandidates = structuredClone(extractionCandidates);
  const beforePolicy = { ...defaultDocumentExtractionPolicy };
  evaluateDocumentExtraction(syntheticContractPages, extractionCandidates, defaultDocumentExtractionPolicy);
  assert.deepEqual(syntheticContractPages, beforePages);
  assert.deepEqual(extractionCandidates, beforeCandidates);
  assert.deepEqual(defaultDocumentExtractionPolicy, beforePolicy);
});

test("the public copy distinguishes prepared data from model performance and client work", () => {
  assert.match(documentIntelligenceLab.scope, /no se tratan datos de clientes/i);
  assert.match(documentIntelligenceLab.scope, /no rendimiento medido/i);
  assert.match(documentIntelligenceLab.limitations.join(" "), /no constituyen un benchmark de modelos/i);
});
