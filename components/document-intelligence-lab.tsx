"use client";

import { useMemo, useState } from "react";
import {
  evidenceStateLabels,
  evaluateDocumentExtraction,
  extractionDecisionLabels,
} from "@/lib/document-intelligence";
import type {
  DocumentExtractionPolicy,
  DocumentPage,
  ExtractionCandidate,
  ExtractionRisk,
} from "@/lib/document-intelligence";

const riskLabels: Record<ExtractionRisk, string> = {
  low: "Bajo",
  medium: "Medio",
  high: "Alto",
};

const policyControls: { key: "requireEvidence" | "reviewContradictions" | "reviewHighRisk"; label: string; help: string }[] = [
  { key: "requireEvidence", label: "Exigir página y fragmento válidos", help: "Rechaza valores sin una cita comprobable en el contrato mostrado." },
  { key: "reviewContradictions", label: "Revisar contradicciones", help: "Evita aceptar un valor cuando su propia cita dice otra cosa." },
  { key: "reviewHighRisk", label: "Revisar campos de alto riesgo", help: "Envía a una persona importes, obligaciones y condiciones sensibles aunque estén respaldados." },
];

export function DocumentIntelligenceLab({
  pages,
  candidates,
  initialPolicy,
}: {
  pages: DocumentPage[];
  candidates: ExtractionCandidate[];
  initialPolicy: DocumentExtractionPolicy;
}) {
  const [policy, setPolicy] = useState<DocumentExtractionPolicy>({ ...initialPolicy });
  const report = useMemo(() => evaluateDocumentExtraction(pages, candidates, policy), [pages, candidates, policy]);

  function toggleControl(key: "requireEvidence" | "reviewContradictions" | "reviewHighRisk") {
    setPolicy((current) => ({ ...current, [key]: !current[key] }));
  }

  function reset() {
    setPolicy({ ...initialPolicy });
  }

  function downloadReport() {
    const payload = {
      methodologyVersion: report.methodologyVersion,
      dataKind: report.dataKind,
      policy: report.policy,
      metrics: {
        candidateCount: report.candidateCount,
        correctCount: report.correctCount,
        autoAccepted: report.autoAccepted,
        manualReview: report.manualReview,
        rejected: report.rejected,
        unsafeAccepts: report.unsafeAccepts,
        acceptedWithoutSupport: report.acceptedWithoutSupport,
      },
      outcomes: report.outcomes.map((outcome) => ({
        candidateId: outcome.candidate.id,
        field: outcome.candidate.field,
        value: outcome.candidate.value,
        page: outcome.candidate.page,
        excerpt: outcome.candidate.excerpt,
        evidenceState: outcome.evidenceState,
        confidence: outcome.candidate.confidence,
        risk: outcome.candidate.risk,
        expectedDecision: outcome.candidate.expectedDecision,
        policyDecision: outcome.decision,
        correct: outcome.correct,
        reason: outcome.reason,
      })),
      scope: "Contrato y extracciones sintéticos. No mide OCR ni modelos y no constituye asesoramiento jurídico o certificación.",
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ordantis-document-intelligence-1.0.0.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="lab-workbench">
      <div className="document-source" aria-labelledby="synthetic-contract-title">
        <h3 id="synthetic-contract-title">Contrato sintético que se comprueba</h3>
        <p>Estas son las cuatro páginas completas de la fuente de demostración.</p>
        <div className="document-page-grid">
          {pages.map((page) => <article className="document-page" key={page.page}>
            <strong>Página {page.page}</strong>
            <p>{page.text}</p>
          </article>)}
        </div>
      </div>

      <fieldset className="lab-contract">
        <legend>Política de extracción</legend>
        <div className="lab-fields document-policy-threshold">
          <label className="lab-field">
            <span>Confianza mínima</span>
            <input
              aria-label="Confianza mínima"
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={policy.minimumConfidence}
              onChange={(event) => {
                const nextValue = event.currentTarget.valueAsNumber;
                if (Number.isNaN(nextValue)) return;
                setPolicy((current) => ({ ...current, minimumConfidence: Math.min(1, Math.max(0, nextValue)) }));
              }}
            />
            <small>De 0 a 1. Por debajo del valor, la extracción pasa a revisión.</small>
          </label>
        </div>
        <div className="agent-policy-grid document-policy-grid">
          {policyControls.map((control) => <label className="agent-policy-toggle" key={control.key}>
            <input type="checkbox" checked={policy[control.key]} onChange={() => toggleControl(control.key)} />
            <span><strong>{control.label}</strong><small>{control.help}</small></span>
          </label>)}
        </div>
      </fieldset>

      <div className="lab-summary" role="status" aria-live="polite" aria-atomic="true">
        <strong>{report.correctCount} de {report.candidateCount} decisiones coinciden con la expectativa preparada</strong>
        <div className="rag-metrics document-metrics">
          <span><b>{report.autoAccepted}</b> aceptadas</span>
          <span><b>{report.manualReview}</b> a revisión</span>
          <span><b>{report.rejected}</b> rechazadas</span>
          <span><b>{report.unsafeAccepts}</b> aceptaciones inseguras</span>
          <span><b>{report.acceptedWithoutSupport}</b> aceptadas sin respaldo</span>
        </div>
        <p>{report.unsafeAccepts > 0 ? "La política acepta al menos un valor que debía revisar o rechazar." : "Ningún valor preparado para revisión o rechazo se acepta automáticamente."}</p>
      </div>

      <div className="lab-table-scroll" role="region" aria-label="Resultado por extracción documental" tabIndex={0}>
        <table className="lab-table document-table">
          <caption>Diez candidatos preparados. En pantallas pequeñas puedes desplazar la tabla horizontalmente.</caption>
          <thead><tr><th scope="col">Campo y valor</th><th scope="col">Evidencia</th><th scope="col">Riesgo y confianza</th><th scope="col">Decisión esperada</th><th scope="col">Decisión de la política</th></tr></thead>
          <tbody>{report.outcomes.map((outcome) => <tr key={outcome.candidate.id}>
            <th scope="row"><span className="rag-question-id">{outcome.candidate.id}</span>{outcome.candidate.field}<strong>{outcome.candidate.value}</strong></th>
            <td>
              <span className={`evidence-state evidence-${outcome.evidenceState}`}>{evidenceStateLabels[outcome.evidenceState]}</span>
              <small>{outcome.candidate.page === null ? "Sin página" : `Página ${outcome.candidate.page}`}</small>
              <q>{outcome.candidate.excerpt ?? "No se aportó fragmento."}</q>
            </td>
            <td><strong>{riskLabels[outcome.candidate.risk]}</strong><small>Confianza: {outcome.candidate.confidence.toFixed(2)}</small></td>
            <td><span className="agent-expected">{extractionDecisionLabels[outcome.candidate.expectedDecision]}</span><small>{outcome.candidate.expectedReason}</small></td>
            <td><span className={outcome.correct ? "rag-decision rag-decision-correct" : "rag-decision rag-decision-wrong"}>{extractionDecisionLabels[outcome.decision]} · {outcome.correct ? "correcto" : "incorrecto"}</span><small>{outcome.reason}</small></td>
          </tr>)}</tbody>
        </table>
      </div>

      <p className="lab-caution">La aceptación en esta prueba no debe escribir el dato automáticamente en un ERP, CRM o expediente. Esa acción necesita autorización y controles propios.</p>
      <div className="inline-actions">
        <button className="button" type="button" onClick={downloadReport}>Descargar evaluación JSON</button>
        <button className="button button-ghost" type="button" onClick={reset}>Restablecer política</button>
      </div>
      <noscript>La fuente, el método y las limitaciones siguen visibles. Para cambiar la política o descargar el informe necesitas JavaScript.</noscript>
    </div>
  );
}
