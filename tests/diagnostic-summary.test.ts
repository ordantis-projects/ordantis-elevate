import assert from "node:assert/strict";
import test from "node:test";
import { buildDiagnosticSummary } from "../lib/diagnostic-summary.ts";

test("the reviewed summary always contains the complete questionnaire", () => {
  const summary = buildDiagnosticSummary({
    answers: {
      decision: "Resolver un reto GovTech",
      data: "Datos dispersos o con errores conocidos",
      constraint: "La decisión necesita aprobación humana",
    },
    profile: {
      sector: "Industrial / Manufactura",
      infra: ["Servidores locales", "Bases de datos SQL / NoSQL"],
      email: "visitor@example.test",
    },
    context: "",
  });

  assert.match(summary, /Preguntas principales/);
  assert.match(summary, /Resolver un reto GovTech/);
  assert.match(summary, /Organización/);
  assert.match(summary, /Sector de actividad\nIndustrial \/ Manufactura/);
  assert.match(summary, /Tipo de organización\nSin indicar/);
  assert.match(summary, /Proyecto y datos/);
  assert.match(summary, /Infraestructura de datos disponible\nServidores locales, Bases de datos SQL \/ NoSQL/);
  assert.match(summary, /Datos de contacto/);
  assert.match(summary, /Email de contacto\nvisitor@example\.test/);
  assert.match(summary, /Recomendación inicial/);
  assert.match(summary, /Ruta sugerida\nGovTech e I\+D para administraciones públicas/);
  assert.match(summary, /Primer entregable\nDefinición del reto público, muestra autorizada/);
  assert.match(summary, /Condición de los datos\nMedir duplicados, ausencias/);
  assert.match(summary, /Control obligatorio\nLa prueba debe mostrar evidencia/);
  assert.match(summary, /Contexto adicional\nSin indicar/);
});
