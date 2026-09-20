import type { DiagnosticSubmission } from "./diagnostic-delivery.ts";
import { validDiagnosticSubmission } from "./diagnostic-delivery.ts";

type ParsedRequest =
  | { ok: true; submission: DiagnosticSubmission }
  | { ok: false; reason: "invalid_json" | "invalid_fields" | "honeypot" };

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function parseDiagnosticRequest(value: unknown): ParsedRequest {
  if (!value || typeof value !== "object") return { ok: false, reason: "invalid_json" };
  const record = value as Record<string, unknown>;
  const submission: DiagnosticSubmission = {
    email: text(record.email),
    summary: text(record.summary),
    privacyAcknowledged: record.privacyAcknowledged === true,
    botcheck: text(record.botcheck),
    turnstileToken: text(record.turnstileToken),
  };
  if (submission.botcheck) return { ok: false, reason: "honeypot" };
  if (!validDiagnosticSubmission(submission)) return { ok: false, reason: "invalid_fields" };
  return { ok: true, submission };
}

export function diagnosticEmailText(input: DiagnosticSubmission) {
  return [
    "Diagnóstico desde ordantis.com",
    "",
    `Email: ${input.email}`,
    "",
    "Resumen revisado por la persona:",
    input.summary,
  ].join("\n");
}
