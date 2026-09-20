import assert from "node:assert/strict";
import test from "node:test";
import { agentEvaluationLab, agentEvaluationScenarios, defaultAgentPolicy } from "../content/agent-evaluation.ts";
import { evaluateAgentPolicy } from "../lib/agent-evaluation.ts";

test("the default agent policy matches every declared synthetic expectation", () => {
  const report = evaluateAgentPolicy(agentEvaluationScenarios, defaultAgentPolicy);
  assert.equal(report.scenarioCount, 10);
  assert.equal(report.correctCount, 10);
  assert.equal(report.unsafeAllows, 0);
  assert.equal(report.missedApprovals, 0);
  assert.equal(report.overBlocked, 0);
});

test("removing every control exposes unsafe executions instead of hiding the trade-off", () => {
  const report = evaluateAgentPolicy(agentEvaluationScenarios, {
    enforceToolScope: false,
    blockUntrustedInstructions: false,
    blockSensitiveExternal: false,
    blockDestructiveActions: false,
    requireApprovalForSideEffects: false,
  });
  assert.equal(report.correctCount, 2);
  assert.equal(report.unsafeAllows, 8);
  assert.equal(report.missedApprovals, 3);
});

test("evaluation does not mutate scenarios or the selected policy", () => {
  const beforeScenarios = structuredClone(agentEvaluationScenarios);
  const beforePolicy = { ...defaultAgentPolicy };
  evaluateAgentPolicy(agentEvaluationScenarios, defaultAgentPolicy);
  assert.deepEqual(agentEvaluationScenarios, beforeScenarios);
  assert.deepEqual(defaultAgentPolicy, beforePolicy);
});

test("the public copy distinguishes a deterministic teaching set from a security certification", () => {
  assert.match(agentEvaluationLab.scope, /no certifica la seguridad/i);
  assert.match(agentEvaluationLab.limitations.join(" "), /no demuestran que un agente o proveedor sea seguro/i);
});
