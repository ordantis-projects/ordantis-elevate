import type { DataContract, Observation } from "../lib/data-quality.ts";

export const dataQualityLab = {
  path: "/labs/calidad-datos",
  title: "Ordantis Data Quality Lab",
  description: "Prueba reglas de duplicados, ausencia, unidades, rango y antigüedad con observaciones sintéticas. Ajusta el contrato y revisa cada incidencia.",
  updatedAt: "2026-09-17",
  lead: "Una misma lectura puede pasar o fallar según el contrato de datos. Cambia las reglas y comprueba qué filas se marcan, por qué y qué sigue sin saberse.",
  scope: "Demo interactiva con datos sintéticos inventados. No usa modelos de IA, no admite archivos ni datos reales y calcula los resultados en el navegador. No es un benchmark de clientes ni certifica la calidad de una fuente.",
  method: [
    "Cada fila representa una observación, con un identificador único propio; el sensor puede repetirse.",
    "Se comprueban identificador y sensor, duplicados, lectura ausente o no finita, unidad, rango y tiempo. Los extremos del rango son válidos.",
    "La antigüedad se calcula frente al 26 de agosto de 2026 a las 10:00 UTC. Ese corte fijo permite repetir el ejemplo sin que cambie con el reloj.",
    "Una unidad incompatible impide comprobar el rango numérico. Una fecha inválida impide evaluar su antigüedad. No se convierten unidades ni se corrigen filas.",
    "Una fila puede tener varias incidencias. El total de filas afectadas cuenta cada fila una sola vez; las incidencias se muestran por separado.",
  ],
  limitations: [
    "Pasar las reglas no demuestra que una lectura sea verdadera, representativa ni suficiente para decidir.",
    "El rango y la antigüedad son parámetros ilustrativos, no umbrales recomendados para una instalación.",
    "No se comprueban calibración, coherencia física entre sensores, persistencia ni la calidad de la hora de recepción.",
    "Ampliar un umbral puede quitar una bandera, pero no mejora ni corrige la observación original.",
    "Esta versión no importa CSV, no se conecta a sensores y no envía alertas. Esas funciones requieren otro alcance y pruebas con datos autorizados.",
  ],
  related: [
    { path: "/insights/sensores-defectuosos-confianza-dato", label: "Sensores defectuosos y confianza en el dato" },
    { path: "/insights/datos-publicos-mantenerlos-vivos", label: "Versiones y mantenimiento de datos públicos" },
    { path: "/capacidades/data-intelligence", label: "Ingeniería de datos: alcance y entregables" },
  ],
} as const;

export const defaultDataContract: DataContract = {
  referenceTime: "2026-08-26T10:00:00Z",
  expectedUnit: "L/s",
  minValue: 0,
  maxValue: 30,
  maxAgeHours: 24,
};

export const qualityScenarios: { id: string; label: string; note: string; observations: Observation[] }[] = [
  {
    id: "incidencias",
    label: "Lecturas con incidencias",
    note: "Ocho observaciones inventadas con duplicados, ausencia, valor negativo, retraso, unidad incompatible y fechas problemáticas.",
    observations: [
      { id: "obs-01", sensor: "demo-A", observedAt: "2026-08-26T10:00:00Z", value: 12.5, unit: "L/s" },
      { id: "obs-02", sensor: "demo-B", observedAt: "2026-08-26T10:00:00Z", value: 14, unit: "L/s" },
      { id: "obs-02", sensor: "demo-B", observedAt: "2026-08-26T10:00:00Z", value: 14, unit: "L/s" },
      { id: "obs-04", sensor: "demo-C", observedAt: "2026-08-26T10:00:00Z", value: null, unit: "L/s" },
      { id: "obs-05", sensor: "demo-D", observedAt: "2026-08-26T10:00:00Z", value: -3, unit: "L/s" },
      { id: "obs-06", sensor: "demo-E", observedAt: "2026-08-20T10:00:00Z", value: 10, unit: "L/s" },
      { id: "obs-07", sensor: "demo-F", observedAt: "2026-08-26T11:00:00Z", value: 21, unit: "m³/h" },
      { id: "obs-08", sensor: "demo-G", observedAt: "2026-02-30T10:00:00Z", value: 9, unit: "L/s" },
    ],
  },
  {
    id: "sin-incidencias",
    label: "Lecturas sin incidencias con el contrato inicial",
    note: "Tres observaciones inventadas que pasan las reglas iniciales. No son una versión corregida del otro escenario ni una prueba de que un sensor real funcione bien.",
    observations: [
      { id: "control-01", sensor: "demo-A", observedAt: "2026-08-26T10:00:00Z", value: 12.5, unit: "L/s" },
      { id: "control-02", sensor: "demo-A", observedAt: "2026-08-26T09:00:00Z", value: 13, unit: "L/s" },
      { id: "control-03", sensor: "demo-B", observedAt: "2026-08-26T08:00:00Z", value: 14, unit: "L/s" },
    ],
  },
];
