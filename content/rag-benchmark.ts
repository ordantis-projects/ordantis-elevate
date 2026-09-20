import { getInsight } from "./site.ts";
import type { RagBenchmarkDocument, RagBenchmarkQuestion } from "../lib/rag-benchmark.ts";

export const ragBenchmarkLab = {
  path: "/labs/rag-evaluacion",
  title: "RAG Benchmark: recuperación, abstención y evidencia",
  description: "Benchmark reproducible de recuperación para RAG: mide fuente correcta, abstención ante preguntas sin respuesta y ambigüedad entre documentos de Ordantis.",
  updatedAt: "2026-09-02",
  lead: "Una respuesta con cita puede seguir siendo incorrecta. Este Lab separa tres decisiones: recuperar la fuente esperada, abstenerse cuando el corpus no responde y detenerse cuando dos resultados quedan demasiado próximos.",
  scope: "Benchmark determinista sobre seis guías públicas de Ordantis y nueve preguntas preparadas para esta prueba. No llama a un LLM, no genera respuestas y no mide calidad semántica general. Evalúa únicamente este corpus, estas preguntas y esta función de recuperación.",
  method: [
    "Normaliza mayúsculas y tildes, elimina signos y palabras funcionales frecuentes, y conserva términos de al menos tres caracteres.",
    "Representa pregunta y documentos con frecuencia de término e IDF suavizado; ordena por similitud coseno.",
    "Solo devuelve una fuente cuando la primera puntuación supera el umbral y mantiene una distancia mínima respecto a la segunda.",
    "Una pregunta respondible es correcta si recupera el documento esperado. Una pregunta sin respuesta o deliberadamente ambigua es correcta si el sistema se abstiene.",
    "Esta versión publica los parámetros junto con el resultado. Se ajustaron sobre este conjunto preparado, de modo que no estiman rendimiento fuera de la muestra; la interfaz permite cambiarlos para observar el intercambio entre recuperación y falsas respuestas.",
  ],
  limitations: [
    "El corpus es pequeño y fue preparado por Ordantis; no representa documentos de clientes, PDF escaneados ni permisos reales.",
    "La coincidencia léxica no detecta por sí sola paráfrasis, contradicciones, vigencia ni si una cita respalda cada afirmación generada.",
    "Las preguntas forman parte del benchmark y no son una muestra aleatoria de consultas de producción.",
    "Un resultado correcto identifica una fuente esperada; no demuestra que una respuesta posterior sea fiel, completa o segura.",
    "No existe un conjunto de calibración separado en esta demo. Los umbrales no se recomiendan para otro corpus y una evaluación real necesita preguntas representativas que no hayan servido para ajustarlos.",
  ],
  related: [
    { path: "/insights/rag-abstencion-evidencia", label: "RAG con abstención y evidencia" },
    { path: "/insights/prompt-injection-agentes-herramientas", label: "Prompt injection en agentes y herramientas" },
    { path: "/capacidades/document-intelligence", label: "Document Intelligence: alcance y entregables" },
  ],
} as const;

const sourceDefinitions = [
  { id: "abstencion", slug: "rag-abstencion-evidencia" },
  { id: "permisos", slug: "permisos-aprobacion-herramientas-agentes" },
  { id: "temporal", slug: "data-leakage-validacion-temporal" },
  { id: "inyeccion", slug: "prompt-injection-agentes-herramientas" },
  { id: "drift", slug: "drift-calibracion-modelos" },
  { id: "sensores", slug: "sensores-defectuosos-confianza-dato" },
] as const;

export const ragBenchmarkDocuments: RagBenchmarkDocument[] = sourceDefinitions.map(({ id, slug }) => {
  const insight = getInsight(slug);
  if (!insight) throw new Error(`Falta la guía del benchmark RAG: ${slug}`);
  return {
    id,
    title: insight.title,
    path: `/insights/${slug}`,
    text: [
      insight.description,
      insight.answer,
      ...insight.context,
      ...insight.checks,
      ...insight.method.flatMap((step) => [step.title, step.text]),
      ...insight.stopSignals,
      insight.example.title,
      insight.example.situation,
      insight.example.decision,
    ].join(" "),
  };
});

export const ragBenchmarkQuestions: RagBenchmarkQuestion[] = [
  {
    id: "q01",
    question: "¿Qué debe hacer un RAG cuando los fragmentos recuperados no respaldan la respuesta?",
    expectedDocumentId: "abstencion",
    expectation: "Recuperar la guía sobre abstención y evidencia.",
  },
  {
    id: "q02",
    question: "¿Dónde deben aplicarse los permisos de una herramienta y cuándo hace falta aprobación humana?",
    expectedDocumentId: "permisos",
    expectation: "Recuperar la guía sobre permisos y aprobación.",
  },
  {
    id: "q03",
    question: "¿Cómo se evita usar información futura durante una validación temporal?",
    expectedDocumentId: "temporal",
    expectation: "Recuperar la guía sobre data leakage y corte temporal.",
  },
  {
    id: "q04",
    question: "¿Cómo impedir que una instrucción dentro de un documento active una herramienta?",
    expectedDocumentId: "inyeccion",
    expectation: "Recuperar la guía sobre prompt injection.",
  },
  {
    id: "q05",
    question: "¿Qué señales permiten detectar drift y pérdida de calibración en un modelo?",
    expectedDocumentId: "drift",
    expectation: "Recuperar la guía sobre deriva y calibración.",
  },
  {
    id: "q06",
    question: "¿Cómo distinguir un sensor bloqueado de un proceso que permanece estable?",
    expectedDocumentId: "sensores",
    expectation: "Recuperar la guía sobre sensores defectuosos.",
  },
  {
    id: "q07",
    question: "¿Cuál es el precio mensual del servicio y qué descuento tiene el plan anual?",
    expectedDocumentId: null,
    expectation: "Abstenerse: el corpus no contiene precios ni planes.",
  },
  {
    id: "q08",
    question: "¿Cuántas personas trabajan en cada oficina de Ordantis?",
    expectedDocumentId: null,
    expectation: "Abstenerse: el corpus no contiene plantilla por oficinas.",
  },
  {
    id: "q09",
    question: "¿Cómo revisar permisos de herramientas, aprobación humana, fragmentos, citas y evidencia?",
    expectedDocumentId: null,
    expectation: "Abstenerse por ambigüedad entre las guías de permisos y evidencia.",
  },
];

export const defaultRagBenchmarkParameters = { threshold: 0.08, minimumMargin: 0.01 } as const;
