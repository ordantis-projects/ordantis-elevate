export type AgentDecision = "allow" | "require_approval" | "deny";
export type AgentActionKind = "read" | "write" | "external" | "destructive";
export type AgentDataClassification = "public" | "internal" | "personal" | "sensitive";
export type AgentInstructionSource = "user" | "trusted_system" | "untrusted_content";

export type AgentEvaluationScenario = {
  id: string;
  title: string;
  request: string;
  tool: string;
  target: string;
  actionKind: AgentActionKind;
  dataClassification: AgentDataClassification;
  instructionSource: AgentInstructionSource;
  scopeMatched: boolean;
  externalDestination: boolean;
  reversible: boolean;
  expectedDecision: AgentDecision;
  expectedReason: string;
};

export type AgentPolicy = {
  enforceToolScope: boolean;
  blockUntrustedInstructions: boolean;
  blockSensitiveExternal: boolean;
  blockDestructiveActions: boolean;
  requireApprovalForSideEffects: boolean;
};

export const agentDecisionLabels: Record<AgentDecision, string> = {
  allow: "Permitir",
  require_approval: "Pedir aprobación",
  deny: "Denegar",
};

export function evaluateAgentScenario(scenario: AgentEvaluationScenario, policy: AgentPolicy) {
  let decision: AgentDecision = "allow";
  let reason = "La operación queda dentro de los permisos y no produce un efecto externo.";

  if (policy.enforceToolScope && !scenario.scopeMatched) {
    decision = "deny";
    reason = "La herramienta o el recurso quedan fuera del alcance concedido para esta tarea.";
  } else if (policy.blockUntrustedInstructions && scenario.instructionSource === "untrusted_content") {
    decision = "deny";
    reason = "Una instrucción encontrada en contenido no confiable no puede cambiar el objetivo ni ordenar una llamada a herramienta.";
  } else if (policy.blockSensitiveExternal && scenario.externalDestination
    && (scenario.dataClassification === "personal" || scenario.dataClassification === "sensitive")) {
    decision = "deny";
    reason = "La política impide enviar datos personales o sensibles a un destino externo.";
  } else if (policy.blockDestructiveActions && scenario.actionKind === "destructive") {
    decision = "deny";
    reason = "La política bloquea acciones destructivas en este agente.";
  } else if (policy.requireApprovalForSideEffects
    && (scenario.actionKind === "write" || scenario.actionKind === "external" || scenario.actionKind === "destructive")) {
    decision = "require_approval";
    reason = "La acción cambia datos, comunica fuera del sistema o resulta difícil de revertir; debe mostrarse antes de ejecutarla.";
  }

  return { decision, reason, correct: decision === scenario.expectedDecision };
}

export function evaluateAgentPolicy(scenarios: readonly AgentEvaluationScenario[], policy: AgentPolicy) {
  const outcomes = scenarios.map((scenario) => ({ scenario, ...evaluateAgentScenario(scenario, policy) }));
  const correctCount = outcomes.filter((outcome) => outcome.correct).length;
  const unsafeAllows = outcomes.filter((outcome) => outcome.decision === "allow" && outcome.scenario.expectedDecision !== "allow").length;
  const missedApprovals = outcomes.filter((outcome) => outcome.decision === "allow" && outcome.scenario.expectedDecision === "require_approval").length;
  const overBlocked = outcomes.filter((outcome) => outcome.decision === "deny" && outcome.scenario.expectedDecision === "allow").length;

  return {
    methodologyVersion: "1.0.0",
    dataKind: "synthetic-agent-scenarios" as const,
    policy: { ...policy },
    scenarioCount: scenarios.length,
    correctCount,
    unsafeAllows,
    missedApprovals,
    overBlocked,
    outcomes,
  };
}
