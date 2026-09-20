export type Observation = {
  id: string;
  sensor: string;
  observedAt: string;
  value: number | null;
  unit: string;
};

export type DataContract = {
  referenceTime: string;
  expectedUnit: string;
  minValue: number;
  maxValue: number;
  maxAgeHours: number;
};

export const qualityRuleLabels = {
  missing_id: "Identificador ausente",
  duplicate_id: "Identificador duplicado",
  missing_sensor: "Sensor ausente",
  missing_value: "Lectura ausente",
  invalid_value: "Valor no finito",
  out_of_range: "Fuera del rango",
  wrong_unit: "Unidad incompatible",
  invalid_time: "Fecha no válida",
  future_time: "Fecha posterior al corte",
  stale: "Lectura antigua",
} as const;

export type QualityRule = keyof typeof qualityRuleLabels;
export type QualityFinding = { row: number; rule: QualityRule; explanation: string };

// El formato de esta demo es UTC explícito. Rechaza fechas imposibles que Date normaliza.
export function parseObservationTime(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) return null;
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return null;
  return new Date(timestamp).toISOString().replace(".000Z", "Z") === value ? timestamp : null;
}

export function analyzeObservations(observations: readonly Observation[], contract: DataContract) {
  const referenceTime = parseObservationTime(contract.referenceTime);
  if (referenceTime === null || !contract.expectedUnit.trim()
    || !Number.isFinite(contract.minValue) || !Number.isFinite(contract.maxValue)
    || contract.minValue > contract.maxValue
    || !Number.isFinite(contract.maxAgeHours) || contract.maxAgeHours < 0) {
    throw new Error("Contrato no válido: revisa fecha, unidad, rango y antigüedad.");
  }

  const ids = new Map<string, number>();
  for (const observation of observations) {
    const key = observation.id.trim();
    if (key) ids.set(key, (ids.get(key) ?? 0) + 1);
  }

  const findings: QualityFinding[] = [];
  observations.forEach((observation, index) => {
    const add = (rule: QualityRule, explanation: string) => findings.push({ row: index + 1, rule, explanation });
    const key = observation.id.trim();
    if (!key) add("missing_id", "El registro no puede identificarse.");
    else if ((ids.get(key) ?? 0) > 1) add("duplicate_id", `El identificador aparece ${ids.get(key)} veces. Se marcan todas sus filas; no se elige una automáticamente.`);
    if (!observation.sensor.trim()) add("missing_sensor", "No se identifica el sensor de origen.");
    if (observation.value === null) add("missing_value", "No hay una lectura. No se sustituye por cero.");
    else if (!Number.isFinite(observation.value)) add("invalid_value", "La lectura no es un número finito.");
    else if (observation.unit === contract.expectedUnit
      && (observation.value < contract.minValue || observation.value > contract.maxValue)) {
      add("out_of_range", `El valor queda fuera de [${contract.minValue}, ${contract.maxValue}] ${contract.expectedUnit}, con extremos incluidos.`);
    }
    if (observation.unit !== contract.expectedUnit) add("wrong_unit", `Se esperaba ${contract.expectedUnit}. No se convierte la unidad ni se evalúa el rango numérico de esta fila.`);

    const observedTime = parseObservationTime(observation.observedAt);
    if (observedTime === null) add("invalid_time", "Se exige una fecha UTC existente con formato AAAA-MM-DDTHH:mm:ssZ.");
    else if (observedTime > referenceTime) add("future_time", "La observación es posterior al instante fijo de evaluación.");
    else if (referenceTime - observedTime > contract.maxAgeHours * 3_600_000) {
      add("stale", `Supera la antigüedad máxima de ${contract.maxAgeHours} horas respecto al corte, no respecto al reloj actual.`);
    }
  });

  const affectedRows = new Set(findings.map((finding) => finding.row)).size;
  return {
    methodologyVersion: "1.0.0",
    dataKind: "synthetic" as const,
    contract: { ...contract },
    totalRows: observations.length,
    affectedRows,
    rowsWithoutFindings: observations.length - affectedRows,
    status: observations.length === 0 ? "no-data" as const : findings.length ? "review" as const : "no-findings" as const,
    findings,
  };
}
