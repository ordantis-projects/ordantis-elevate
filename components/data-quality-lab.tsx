"use client";

import { useState } from "react";
import { defaultDataContract, qualityScenarios } from "@/content/labs";
import { analyzeObservations, qualityRuleLabels } from "@/lib/data-quality";

export function DataQualityLab() {
  const [scenarioId, setScenarioId] = useState(qualityScenarios[0].id);
  const [maximum, setMaximum] = useState(String(defaultDataContract.maxValue));
  const [age, setAge] = useState(String(defaultDataContract.maxAgeHours));
  const scenario = qualityScenarios.find((item) => item.id === scenarioId)!;
  const maxValue = Number(maximum);
  const maxAgeHours = Number(age);
  const validMaximum = maximum.trim() !== "" && Number.isFinite(maxValue) && maxValue >= 0 && maxValue <= 500;
  const validAge = age.trim() !== "" && Number.isFinite(maxAgeHours) && maxAgeHours >= 0 && maxAgeHours <= 720;
  const report = validMaximum && validAge
    ? analyzeObservations(scenario.observations, { ...defaultDataContract, maxValue, maxAgeHours })
    : null;

  function reset() {
    setScenarioId(qualityScenarios[0].id);
    setMaximum(String(defaultDataContract.maxValue));
    setAge(String(defaultDataContract.maxAgeHours));
  }

  function downloadReport() {
    if (!report) return;
    const payload = { ...report, scenario: scenario.id, observations: scenario.observations,
      scope: "Datos sintéticos. Sin incidencias no significa datos verdaderos ni aptos para cualquier decisión." };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ordantis-data-quality-${scenario.id}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="lab-workbench">
      <div className="lab-controls">
        <div className="lab-field">
          <label htmlFor="quality-scenario">Escenario sintético</label>
          <select id="quality-scenario" value={scenarioId} onChange={(event) => setScenarioId(event.target.value)}>
            {qualityScenarios.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
          <p>{scenario.note}</p>
        </div>
        <fieldset className="lab-contract">
          <legend>Contrato de datos</legend>
          <p>Unidad L/s · mínimo 0 · corte fijo: 26/08/2026, 10:00 UTC.</p>
          <div className="lab-fields">
            <div className="lab-field">
              <label htmlFor="quality-maximum">Lectura máxima (L/s)</label>
              <input id="quality-maximum" type="number" min="0" max="500" step="any" value={maximum} onChange={(event) => setMaximum(event.target.value)} aria-invalid={!validMaximum} aria-describedby="maximum-help" />
              <small id="maximum-help">Entre 0 y 500, extremos incluidos.</small>
            </div>
            <div className="lab-field">
              <label htmlFor="quality-age">Antigüedad máxima (horas)</label>
              <input id="quality-age" type="number" min="0" max="720" step="any" value={age} onChange={(event) => setAge(event.target.value)} aria-invalid={!validAge} aria-describedby="age-help" />
              <small id="age-help">Entre 0 y 720. Se compara con el corte fijo.</small>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="lab-summary" role="status" aria-live="polite" aria-atomic="true">
        {report ? <>
          <strong>{report.affectedRows} de {report.totalRows} filas con incidencias</strong>
          <span>{report.findings.length} {report.findings.length === 1 ? "incidencia" : "incidencias"} · {report.rowsWithoutFindings} {report.rowsWithoutFindings === 1 ? "fila sin banderas" : "filas sin banderas"}.</span>
          <p>{report.findings.length ? "Revisa las reglas que fallan antes de utilizar estas observaciones." : "Sin incidencias con este contrato. No demuestra que las lecturas sean verdaderas."}</p>
        </> : <p>Introduce un máximo entre 0 y 500 y una antigüedad entre 0 y 720 horas para calcular.</p>}
      </div>

      <div className="lab-table-scroll" role="region" aria-label="Observaciones sintéticas y reglas por fila" tabIndex={0}>
        <table className="lab-table">
          <caption>Datos originales. En pantallas pequeñas puedes desplazar la tabla horizontalmente.</caption>
          <thead><tr><th scope="col">Fila / ID</th><th scope="col">Sensor</th><th scope="col">Fecha UTC</th><th scope="col">Lectura</th><th scope="col">Reglas que fallan</th></tr></thead>
          <tbody>{scenario.observations.map((observation, index) => {
            const findings = report?.findings.filter((finding) => finding.row === index + 1) ?? [];
            return <tr key={`${scenario.id}-${index}`}>
              <th scope="row">{index + 1} · {observation.id}</th>
              <td>{observation.sensor}</td>
              <td><code>{observation.observedAt}</code></td>
              <td>{observation.value === null ? "Ausente" : `${observation.value} ${observation.unit}`}</td>
              <td>{!report ? "Sin evaluar" : findings.length ? <ul>{findings.map((finding) => <li key={finding.rule}><strong>{qualityRuleLabels[finding.rule]}</strong><br />{finding.explanation}</li>)}</ul> : "Sin incidencias"}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
      <p className="lab-caution">Cambiar el contrato recalcula las banderas; no modifica los datos. La demo no comprueba calibración ni coherencia física.</p>
      <div className="inline-actions">
        <button className="button" type="button" disabled={!report} onClick={downloadReport}>Descargar evaluación JSON</button>
        <button className="button button-ghost" type="button" onClick={reset}>Restablecer ejemplo</button>
      </div>
      <noscript>La explicación y la muestra inicial se pueden leer sin JavaScript. Para cambiar el contrato o descargar la evaluación necesitas activarlo.</noscript>
    </div>
  );
}
