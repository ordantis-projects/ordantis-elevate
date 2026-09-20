import {
  diagnosticControlByConstraint,
  diagnosticDataCondition,
  diagnosticRouteByDecision,
  type DiagnosticRoute,
} from "../content/diagnostic.ts";

export type DiagnosticRecommendation = DiagnosticRoute & {
  dataCondition: string;
  requiredControl: string;
};

const fallbackRoute: DiagnosticRoute = {
  capability: "investigacion-desarrollo",
  title: "Revisión inicial",
  reason: "Falta concretar la decisión que debe mejorar el proyecto antes de recomendar una capacidad.",
  firstDeliverable: "Definición de la decisión, los usuarios afectados y una señal observable de mejora.",
};

export function getDiagnosticRecommendation(answers: Record<string, string>): DiagnosticRecommendation {
  const route = diagnosticRouteByDecision[answers.decision] ?? fallbackRoute;

  return {
    ...route,
    dataCondition: diagnosticDataCondition[answers.data]
      ?? "Revisar disponibilidad, procedencia, permisos y representatividad de una muestra.",
    requiredControl: diagnosticControlByConstraint[answers.constraint]
      ?? "Acordar riesgos, responsable de aprobación y criterio de parada antes de ejecutar la prueba.",
  };
}
