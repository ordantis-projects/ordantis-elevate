"use client";

import { useMemo, useState } from "react";
import { agentDecisionLabels, evaluateAgentPolicy } from "@/lib/agent-evaluation";
import type { AgentEvaluationScenario, AgentPolicy } from "@/lib/agent-evaluation";

const policyControls: { key: keyof AgentPolicy; label: string; help: string }[] = [
  { key: "enforceToolScope", label: "Aplicar alcance por herramienta", help: "Deniega operaciones o recursos que no fueron concedidos para la tarea." },
  { key: "blockUntrustedInstructions", label: "Bloquear instrucciones de contenido", help: "Trata documentos y resultados recuperados como datos, no como órdenes." },
  { key: "blockSensitiveExternal", label: "Bloquear datos sensibles hacia fuera", help: "Impide enviar datos personales o sensibles a un destino externo." },
  { key: "blockDestructiveActions", label: "Bloquear acciones destructivas", help: "Retira de este agente operaciones permanentes o difíciles de recuperar." },
  { key: "requireApprovalForSideEffects", label: "Exigir aprobación para efectos", help: "Muestra antes de ejecutar escrituras, comunicaciones y acciones destructivas." },
];

const actionLabels = { read: "Lectura", write: "Escritura", external: "Efecto externo", destructive: "Destructiva" } as const;
const dataLabels = { public: "Dato público", internal: "Dato interno", personal: "Dato personal", sensitive: "Dato sensible" } as const;
const sourceLabels = { user: "Petición de la persona", trusted_system: "Sistema confiable", untrusted_content: "Contenido no confiable" } as const;

export function AgentEvaluationLab({
  scenarios,
  initialPolicy,
}: {
  scenarios: AgentEvaluationScenario[];
  initialPolicy: AgentPolicy;
}) {
  const [policy, setPolicy] = useState<AgentPolicy>({ ...initialPolicy });
  const report = useMemo(() => evaluateAgentPolicy(scenarios, policy), [policy, scenarios]);

  function toggleControl(key: keyof AgentPolicy) {
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
        scenarioCount: report.scenarioCount,
        correctCount: report.correctCount,
        unsafeAllows: report.unsafeAllows,
        missedApprovals: report.missedApprovals,
        overBlocked: report.overBlocked,
      },
      outcomes: report.outcomes.map((outcome) => ({
        scenarioId: outcome.scenario.id,
        title: outcome.scenario.title,
        expectedDecision: outcome.scenario.expectedDecision,
        policyDecision: outcome.decision,
        correct: outcome.correct,
        reason: outcome.reason,
      })),
      scope: "Escenarios sintéticos. La coincidencia con estas expectativas no certifica la seguridad de un agente.",
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ordantis-agent-evaluation-1.0.0.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="lab-workbench">
      <fieldset className="lab-contract">
        <legend>Controles de política</legend>
        <p>Activa o desactiva cada control. La expectativa de los escenarios no cambia.</p>
        <div className="agent-policy-grid">
          {policyControls.map((control) => <label className="agent-policy-toggle" key={control.key}>
            <input type="checkbox" checked={policy[control.key]} onChange={() => toggleControl(control.key)} />
            <span><strong>{control.label}</strong><small>{control.help}</small></span>
          </label>)}
        </div>
      </fieldset>

      <div className="lab-summary" role="status" aria-live="polite" aria-atomic="true">
        <strong>{report.correctCount} de {report.scenarioCount} decisiones coinciden con la expectativa preparada</strong>
        <div className="rag-metrics agent-metrics">
          <span><b>{report.unsafeAllows}</b> ejecuciones inseguras</span>
          <span><b>{report.missedApprovals}</b> aprobaciones omitidas</span>
          <span><b>{report.overBlocked}</b> lecturas permitidas bloqueadas</span>
          <span><b>{report.correctCount}/{report.scenarioCount}</b> decisiones correctas</span>
        </div>
        <p>{report.unsafeAllows > 0 ? "La política permite al menos una operación que debía denegar o someter a aprobación." : "Ninguna operación que debía detenerse o aprobarse quedó permitida directamente."}</p>
      </div>

      <div className="lab-table-scroll" role="region" aria-label="Resultado por escenario de la evaluación de agentes" tabIndex={0}>
        <table className="lab-table agent-table">
          <caption>Diez operaciones inventadas. En pantallas pequeñas puedes desplazar la tabla horizontalmente.</caption>
          <thead><tr><th scope="col">Escenario</th><th scope="col">Señales declaradas</th><th scope="col">Decisión esperada</th><th scope="col">Decisión de la política</th><th scope="col">Motivo aplicado</th></tr></thead>
          <tbody>{report.outcomes.map((outcome) => <tr key={outcome.scenario.id}>
            <th scope="row"><span className="rag-question-id">{outcome.scenario.id}</span>{outcome.scenario.title}<small>{outcome.scenario.request}</small><code>{outcome.scenario.tool}</code></th>
            <td><ul className="agent-signals">
              <li>{actionLabels[outcome.scenario.actionKind]}</li>
              <li>{dataLabels[outcome.scenario.dataClassification]}</li>
              <li>{sourceLabels[outcome.scenario.instructionSource]}</li>
              <li>{outcome.scenario.scopeMatched ? "Dentro del alcance" : "Fuera del alcance"}</li>
              <li>{outcome.scenario.reversible ? "Reversible" : "No reversible"}</li>
            </ul></td>
            <td><span className="agent-expected">{agentDecisionLabels[outcome.scenario.expectedDecision]}</span><small>{outcome.scenario.expectedReason}</small></td>
            <td><span className={outcome.correct ? "rag-decision rag-decision-correct" : "rag-decision rag-decision-wrong"}>{agentDecisionLabels[outcome.decision]} · {outcome.correct ? "correcto" : "incorrecto"}</span></td>
            <td>{outcome.reason}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="lab-caution">La autorización real debe aplicarse en el backend y en las credenciales. Una instrucción en el prompt no sustituye permisos efectivos.</p>
      <div className="inline-actions">
        <button className="button" type="button" onClick={downloadReport}>Descargar evaluación JSON</button>
        <button className="button button-ghost" type="button" onClick={reset}>Restablecer política</button>
      </div>
      <noscript>La metodología y los escenarios se describen en la página. Para cambiar la política o descargar el informe necesitas JavaScript.</noscript>
    </div>
  );
}
