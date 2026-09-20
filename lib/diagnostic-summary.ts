import { diagnosticProfileFields, diagnosticSteps } from "../content/diagnostic.ts";
import { getDiagnosticRecommendation } from "./diagnostic-recommendation.ts";

type DiagnosticProfile = Record<string, string | string[]>;

const profileSections = [
  { step: 0, title: "Organización" },
  { step: 1, title: "Proyecto y datos" },
  { step: 2, title: "Datos de contacto" },
] as const;

function answeredValue(value: string | string[] | undefined) {
  const text = Array.isArray(value) ? value.join(", ") : (value ?? "");
  return text.trim() || "Sin indicar";
}

export function diagnosticProfileRows(profile: DiagnosticProfile) {
  return diagnosticProfileFields.map((field) => ({
    label: field.label,
    step: field.step,
    value: answeredValue(profile[field.id]),
  }));
}

export function buildDiagnosticSummary({
  answers,
  profile,
  context,
}: {
  answers: Record<string, string>;
  profile: DiagnosticProfile;
  context: string;
}) {
  const profileRows = diagnosticProfileRows(profile);
  const recommendation = getDiagnosticRecommendation(answers);
  const sections = [
    [
      "Preguntas principales",
      ...diagnosticSteps.map((item) => `${item.title}\n${answeredValue(answers[item.id])}`),
    ].join("\n\n"),
    ...profileSections.map((section) => [
      section.title,
      ...profileRows
        .filter((row) => row.step === section.step)
        .map((row) => `${row.label}\n${row.value}`),
    ].join("\n\n")),
    [
      "Recomendación inicial",
      `Ruta sugerida\n${recommendation.title}`,
      `Por qué\n${recommendation.reason}`,
      `Primer entregable\n${recommendation.firstDeliverable}`,
      `Condición de los datos\n${recommendation.dataCondition}`,
      `Control obligatorio\n${recommendation.requiredControl}`,
    ].join("\n\n"),
    `Contexto adicional\n${answeredValue(context)}`,
  ];

  return sections.join("\n\n---\n\n");
}
