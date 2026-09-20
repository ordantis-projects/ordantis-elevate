"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { evaluateRagBenchmark } from "@/lib/rag-benchmark";
import type { RagBenchmarkDocument, RagBenchmarkQuestion } from "@/lib/rag-benchmark";

type Parameters = {
  threshold: number;
  minimumMargin: number;
};

export function RagBenchmarkLab({
  documents,
  questions,
  initialParameters,
}: {
  documents: RagBenchmarkDocument[];
  questions: RagBenchmarkQuestion[];
  initialParameters: Parameters;
}) {
  const [threshold, setThreshold] = useState(String(initialParameters.threshold));
  const [minimumMargin, setMinimumMargin] = useState(String(initialParameters.minimumMargin));
  const thresholdValue = Number(threshold);
  const marginValue = Number(minimumMargin);
  const validThreshold = threshold.trim() !== "" && Number.isFinite(thresholdValue) && thresholdValue >= 0 && thresholdValue <= 1;
  const validMargin = minimumMargin.trim() !== "" && Number.isFinite(marginValue) && marginValue >= 0 && marginValue <= 1;
  const report = useMemo(() => validThreshold && validMargin
    ? evaluateRagBenchmark({ documents, questions, threshold: thresholdValue, minimumMargin: marginValue })
    : null, [documents, marginValue, questions, thresholdValue, validMargin, validThreshold]);
  const documentById = useMemo(() => new Map(documents.map((document) => [document.id, document])), [documents]);

  function reset() {
    setThreshold(String(initialParameters.threshold));
    setMinimumMargin(String(initialParameters.minimumMargin));
  }

  function downloadReport() {
    if (!report) return;
    const payload = {
      methodologyVersion: report.methodologyVersion,
      corpusKind: report.corpusKind,
      parameters: { threshold: report.threshold, minimumMargin: report.minimumMargin },
      corpus: documents.map(({ id, title, path }) => ({ id, title, path })),
      metrics: {
        documentCount: report.documentCount,
        questionCount: report.questionCount,
        answerableCount: report.answerableCount,
        recovered: report.recovered,
        unanswerableCount: report.unanswerableCount,
        abstained: report.abstained,
        falseAnswers: report.falseAnswers,
        overallCorrect: report.overallCorrect,
      },
      outcomes: report.outcomes.map((outcome) => ({
        questionId: outcome.question.id,
        question: outcome.question.question,
        expectedDocumentId: outcome.question.expectedDocumentId,
        predictedDocumentId: outcome.predictedDocumentId,
        topDocumentId: outcome.top?.document.id ?? null,
        topScore: outcome.top?.score ?? 0,
        margin: outcome.margin,
        correct: outcome.correct,
      })),
      scope: "Corpus controlado de Ordantis. Evalúa recuperación léxica y abstención; no evalúa una respuesta generada por un LLM.",
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ordantis-rag-benchmark-1.0.0.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="lab-workbench">
      <fieldset className="lab-contract">
        <legend>Regla de abstención</legend>
        <p>La primera fuente debe superar ambos valores. Si no, el sistema se abstiene.</p>
        <div className="lab-fields">
          <div className="lab-field">
            <label htmlFor="rag-threshold">Puntuación mínima</label>
            <input id="rag-threshold" type="number" min="0" max="1" step="0.01" value={threshold} onChange={(event) => setThreshold(event.target.value)} aria-invalid={!validThreshold} aria-describedby="rag-threshold-help" />
            <small id="rag-threshold-help">Entre 0 y 1. Valor inicial: {initialParameters.threshold}.</small>
          </div>
          <div className="lab-field">
            <label htmlFor="rag-margin">Margen mínimo entre primera y segunda fuente</label>
            <input id="rag-margin" type="number" min="0" max="1" step="0.01" value={minimumMargin} onChange={(event) => setMinimumMargin(event.target.value)} aria-invalid={!validMargin} aria-describedby="rag-margin-help" />
            <small id="rag-margin-help">Entre 0 y 1. Valor inicial: {initialParameters.minimumMargin}.</small>
          </div>
        </div>
      </fieldset>

      <div className="lab-summary" role="status" aria-live="polite" aria-atomic="true">
        {report ? <>
          <strong>{report.overallCorrect} de {report.questionCount} decisiones correctas en esta prueba preparada</strong>
          <div className="rag-metrics">
            <span><b>{report.recovered}/{report.answerableCount}</b> fuentes respondibles recuperadas</span>
            <span><b>{report.abstained}/{report.unanswerableCount}</b> abstenciones correctas</span>
            <span><b>{report.falseAnswers}</b> respuestas falsas</span>
          </div>
          <p>{report.falseAnswers > 0 ? "El sistema responde al menos una pregunta que este corpus no permite contestar." : "Ninguna pregunta sin respuesta recibió una fuente como si fuera válida."}</p>
        </> : <p>Introduce una puntuación y un margen entre 0 y 1 para calcular la evaluación.</p>}
      </div>

      <div className="lab-table-scroll" role="region" aria-label="Resultado por pregunta del benchmark RAG" tabIndex={0}>
        <table className="lab-table rag-table">
          <caption>Nueve preguntas preparadas. En pantallas pequeñas puedes desplazar la tabla horizontalmente.</caption>
          <thead><tr><th scope="col">Pregunta</th><th scope="col">Resultado esperado</th><th scope="col">Primera fuente</th><th scope="col">Puntuación / margen</th><th scope="col">Decisión</th></tr></thead>
          <tbody>{questions.map((question) => {
            const outcome = report?.outcomes.find((item) => item.question.id === question.id);
            const expected = question.expectedDocumentId ? documentById.get(question.expectedDocumentId) : null;
            const predicted = outcome?.predictedDocumentId ? documentById.get(outcome.predictedDocumentId) : null;
            return <tr key={question.id}>
              <th scope="row"><span className="rag-question-id">{question.id}</span>{question.question}</th>
              <td>{expected ? <Link href={expected.path}>{expected.title}</Link> : "Abstención"}<small>{question.expectation}</small></td>
              <td>{outcome?.top ? <Link href={outcome.top.document.path}>{outcome.top.document.title}</Link> : "Sin evaluar"}</td>
              <td>{outcome ? <><code>{outcome.top?.score.toFixed(4) ?? "0.0000"}</code><small>Margen: {outcome.margin.toFixed(4)}</small></> : "—"}</td>
              <td>{outcome ? <span className={outcome.correct ? "rag-decision rag-decision-correct" : "rag-decision rag-decision-wrong"}>{predicted ? "Recupera fuente" : "Se abstiene"} · {outcome.correct ? "correcto" : "incorrecto"}</span> : "Sin evaluar"}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
      <p className="lab-caution">Un acierto solo indica que esta regla eligió la fuente esperada o se abstuvo. No demuestra que una respuesta generada sea fiel ni que el método funcione en otro corpus.</p>
      <div className="inline-actions">
        <button className="button" type="button" disabled={!report} onClick={downloadReport}>Descargar evaluación JSON</button>
        <button className="button button-ghost" type="button" onClick={reset}>Restablecer parámetros</button>
      </div>
      <noscript>La metodología, el corpus y el resultado inicial se describen en la página. Para cambiar los parámetros o descargar la evaluación necesitas JavaScript.</noscript>
    </div>
  );
}
