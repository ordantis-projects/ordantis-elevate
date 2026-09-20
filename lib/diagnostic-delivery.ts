export type DiagnosticSubmission = {
  email: string;
  summary: string;
  privacyAcknowledged: boolean;
  botcheck: string;
  turnstileToken: string;
};

export type DiagnosticDeliveryResult = {
  status: "accepted" | "invalid" | "unconfirmed" | "rejected" | "rate_limited" | "verification_failed";
  message: string;
};

const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;

export function validDiagnosticSubmission(input: DiagnosticSubmission) {
  return emailPattern.test(input.email.trim())
    && input.email.length <= 160
    && input.privacyAcknowledged
    && !input.botcheck
    && Boolean(input.turnstileToken)
    && input.turnstileToken.length <= 2048
    && Boolean(input.summary.trim())
    && input.summary.length <= 12000;
}

export async function submitDiagnostic(
  input: DiagnosticSubmission,
  send: typeof fetch = fetch,
): Promise<DiagnosticDeliveryResult> {
  if (!validDiagnosticSubmission(input)) {
    return { status: "invalid", message: "Revisa el email, la información de privacidad y la comprobación de seguridad antes de enviar." };
  }

  try {
    const response = await send("/api/diagnostic", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "same-origin",
      cache: "no-store",
      referrerPolicy: "same-origin",
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify(input),
    });
    if (response.status === 202) {
      return { status: "accepted", message: "El servicio de envío ha aceptado tu diagnóstico. Esto no confirma su entrega en el buzón ni su lectura por Ordantis." };
    }
    if (response.status === 400) {
      return { status: "invalid", message: "El servidor no ha aceptado algún campo. Revisa la información antes de volver a intentarlo." };
    }
    if (response.status === 429) {
      return { status: "rate_limited", message: "Se han limitado temporalmente los envíos. Conserva el resumen y prueba más tarde." };
    }
    if (response.status === 403) {
      return { status: "verification_failed", message: "No se ha podido validar la comprobación de seguridad. Complétala de nuevo antes de reintentar." };
    }
    return { status: "rejected", message: "El servicio no ha aceptado el diagnóstico. Puedes conservar el resumen o enviarlo desde tu correo." };
  } catch {
    return { status: "unconfirmed", message: "No se ha podido confirmar el envío. Conserva el resumen y evita reenviarlo de inmediato." };
  }
}
