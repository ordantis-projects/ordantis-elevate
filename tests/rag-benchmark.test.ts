import assert from "node:assert/strict";
import test from "node:test";
import {
  defaultRagBenchmarkParameters,
  ragBenchmarkDocuments,
  ragBenchmarkLab,
  ragBenchmarkQuestions,
} from "../content/rag-benchmark.ts";
import { evaluateRagBenchmark, rankRagDocuments, tokenizeForRetrieval } from "../lib/rag-benchmark.ts";

test("RAG tokenization is deterministic across case, accents and punctuation", () => {
  assert.deepEqual(tokenizeForRetrieval("¿VALIDACIÓN temporal, con información?"), ["validacion", "temporal", "informacion"]);
});

test("the controlled benchmark recovers every answerable source and abstains on the declared gaps", () => {
  const report = evaluateRagBenchmark({
    documents: ragBenchmarkDocuments,
    questions: ragBenchmarkQuestions,
    ...defaultRagBenchmarkParameters,
  });
  assert.equal(report.documentCount, 6);
  assert.equal(report.questionCount, 9);
  assert.equal(report.recovered, report.answerableCount);
  assert.equal(report.abstained, report.unanswerableCount);
  assert.equal(report.falseAnswers, 0);
  assert.equal(report.overallCorrect, 9);
});

test("the public method discloses in-sample tuning instead of presenting a holdout result", () => {
  assert.match(ragBenchmarkLab.method.join(" "), /se ajustaron sobre este conjunto preparado/i);
  assert.match(ragBenchmarkLab.limitations.join(" "), /no existe un conjunto de calibración separado/i);
});

test("ranking and evaluation do not mutate the controlled corpus", () => {
  const before = structuredClone(ragBenchmarkDocuments);
  const ranking = rankRagDocuments(ragBenchmarkDocuments, ragBenchmarkQuestions[0].question);
  assert.equal(ranking[0].document.id, "abstencion");
  evaluateRagBenchmark({ documents: ragBenchmarkDocuments, questions: ragBenchmarkQuestions, threshold: 1, minimumMargin: 1 });
  assert.deepEqual(ragBenchmarkDocuments, before);
});

test("invalid benchmark thresholds are rejected instead of being clipped", () => {
  assert.throws(() => evaluateRagBenchmark({
    documents: ragBenchmarkDocuments,
    questions: ragBenchmarkQuestions,
    threshold: -0.01,
    minimumMargin: 0.1,
  }), /entre 0 y 1/);
});
