export type DocumentPage = {
  page: number;
  text: string;
};

export type ExtractionRisk = "low" | "medium" | "high";
export type ExtractionDecision = "accept" | "review" | "reject";
export type EvidenceState = "supported" | "contradicted" | "missing" | "invalid_citation" | "unsupported";

export type ExtractionCandidate = {
  id: string;
  field: string;
  value: string;
  page: number | null;
  excerpt: string | null;
  supportText: string;
  conflictingText?: string;
  confidence: number;
  risk: ExtractionRisk;
  expectedDecision: ExtractionDecision;
  expectedReason: string;
};

export type DocumentExtractionPolicy = {
  minimumConfidence: number;
  requireEvidence: boolean;
  reviewContradictions: boolean;
  reviewHighRisk: boolean;
};

export const extractionDecisionLabels: Record<ExtractionDecision, string> = {
  accept: "Aceptar",
  review: "Revisar",
  reject: "Rechazar",
};

export const evidenceStateLabels: Record<EvidenceState, string> = {
  supported: "Respaldada",
  contradicted: "Contradicha",
  missing: "Sin evidencia",
  invalid_citation: "Cita inválida",
  unsupported: "No respaldada",
};

function normalizeEvidence(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/\s+/g, " ")
    .trim();
}

export function evaluateEvidence(
  pages: readonly DocumentPage[],
  candidate: ExtractionCandidate,
): EvidenceState {
  if (candidate.page === null || candidate.excerpt === null || candidate.excerpt.trim() === "") return "missing";

  const sourcePage = pages.find((page) => page.page === candidate.page);
  if (!sourcePage) return "invalid_citation";

  const pageText = normalizeEvidence(sourcePage.text);
  const excerpt = normalizeEvidence(candidate.excerpt);
  if (!pageText.includes(excerpt)) return "invalid_citation";

  if (candidate.conflictingText && excerpt.includes(normalizeEvidence(candidate.conflictingText))) return "contradicted";
  if (excerpt.includes(normalizeEvidence(candidate.supportText))) return "supported";
  return "unsupported";
}

export function evaluateExtractionCandidate(
  pages: readonly DocumentPage[],
  candidate: ExtractionCandidate,
  policy: DocumentExtractionPolicy,
) {
  if (!Number.isFinite(policy.minimumConfidence) || policy.minimumConfidence < 0 || policy.minimumConfidence > 1) {
    throw new RangeError("minimumConfidence must be a number between 0 and 1");
  }

  const evidenceState = evaluateEvidence(pages, candidate);
  let decision: ExtractionDecision = "accept";
  let reason = "La extracción tiene evidencia exacta, supera el umbral y no activa una revisión por riesgo.";

  if (policy.requireEvidence && ["missing", "invalid_citation", "unsupported"].includes(evidenceState)) {
    decision = "reject";
    reason = "No existe un fragmento verificable en la página indicada que respalde el valor extraído.";
  } else if (policy.reviewContradictions && evidenceState === "contradicted") {
    decision = "review";
    reason = "El fragmento citado contradice el valor extraído; una persona debe resolver el conflicto.";
  } else if (policy.reviewHighRisk && candidate.risk === "high") {
    decision = "review";
    reason = "El campo es de alto riesgo y requiere revisión humana aunque la evidencia sea exacta.";
  } else if (candidate.confidence < policy.minimumConfidence) {
    decision = "review";
    reason = `La confianza ${candidate.confidence.toFixed(2)} queda por debajo del umbral ${policy.minimumConfidence.toFixed(2)}.`;
  }

  return {
    evidenceState,
    decision,
    reason,
    correct: decision === candidate.expectedDecision,
  };
}

export function evaluateDocumentExtraction(
  pages: readonly DocumentPage[],
  candidates: readonly ExtractionCandidate[],
  policy: DocumentExtractionPolicy,
) {
  if (!Number.isFinite(policy.minimumConfidence) || policy.minimumConfidence < 0 || policy.minimumConfidence > 1) {
    throw new RangeError("minimumConfidence must be a number between 0 and 1");
  }

  const outcomes = candidates.map((candidate) => ({
    candidate,
    ...evaluateExtractionCandidate(pages, candidate, policy),
  }));

  return {
    methodologyVersion: "1.0.0",
    dataKind: "synthetic-contract-extraction" as const,
    policy: { ...policy },
    candidateCount: candidates.length,
    correctCount: outcomes.filter((outcome) => outcome.correct).length,
    autoAccepted: outcomes.filter((outcome) => outcome.decision === "accept").length,
    manualReview: outcomes.filter((outcome) => outcome.decision === "review").length,
    rejected: outcomes.filter((outcome) => outcome.decision === "reject").length,
    unsafeAccepts: outcomes.filter((outcome) => outcome.decision === "accept" && outcome.candidate.expectedDecision !== "accept").length,
    acceptedWithoutSupport: outcomes.filter((outcome) => outcome.decision === "accept" && outcome.evidenceState !== "supported").length,
    outcomes,
  };
}
