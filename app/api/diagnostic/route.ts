import { diagnosticEmailText, parseDiagnosticRequest } from "@/lib/diagnostic-request";
import { verifyTurnstile } from "@/lib/turnstile";

const maxBodyBytes = 16 * 1024;
const responseHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

function json(status: number, code: string) {
  return new Response(JSON.stringify({ status: code }), { status, headers: responseHeaders });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  return Boolean(origin && origin === new URL(request.url).origin && (!fetchSite || fetchSite === "same-origin"));
}

async function runtimeBindings() {
  try {
    const { env } = await import("cloudflare:workers");
    const bindings = env as CloudflareEnv & {
      DIAGNOSTIC_RECIPIENT?: string;
      TURNSTILE_SECRET?: string;
      TURNSTILE_HOSTNAMES?: string;
    };
    return {
      mailer: bindings.DIAGNOSTIC_EMAIL,
      recipient: bindings.DIAGNOSTIC_RECIPIENT?.trim() ?? "",
      turnstileSecret: bindings.TURNSTILE_SECRET?.trim() ?? "",
      turnstileHostnames: bindings.TURNSTILE_HOSTNAMES?.trim() ?? "",
    };
  } catch {
    return {
      mailer: undefined,
      recipient: process.env.DIAGNOSTIC_RECIPIENT?.trim() ?? "",
      turnstileSecret: process.env.TURNSTILE_SECRET?.trim() ?? "",
      turnstileHostnames: process.env.TURNSTILE_HOSTNAMES?.trim() ?? "",
    };
  }
}

function clientIp(request: Request) {
  const value = request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]
    ?? "";
  const normalized = value.trim();
  return normalized.length <= 64 ? normalized : "";
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json(403, "forbidden");
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json(415, "unsupported_media_type");
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > maxBodyBytes) return json(413, "payload_too_large");

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json(400, "invalid_body");
  }
  if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) return json(413, "payload_too_large");

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return json(400, "invalid_json");
  }
  const parsed = parseDiagnosticRequest(value);
  if (!parsed.ok && parsed.reason === "honeypot") return json(202, "accepted");
  if (!parsed.ok) return json(400, "invalid_fields");

  const delivery = await runtimeBindings();
  const verified = await verifyTurnstile({
    token: parsed.submission.turnstileToken,
    secret: delivery.turnstileSecret,
    expectedAction: "diagnostic",
    expectedHostnames: delivery.turnstileHostnames,
    remoteIp: clientIp(request),
  });
  if (!verified) return json(403, "forbidden");

  if (!delivery?.recipient || !delivery.mailer) return json(503, "service_unavailable");

  const requestId = crypto.randomUUID();
  try {
    await delivery.mailer.send({
      from: { name: "Diagnóstico Ordantis", email: "web@ordantis.com" },
      to: delivery.recipient,
      replyTo: parsed.submission.email,
      subject: "Diagnóstico desde ordantis.com",
      text: diagnosticEmailText(parsed.submission),
      headers: { "X-Ordantis-Request-Id": requestId },
    });
    console.info(JSON.stringify({ event: "diagnostic_delivery", requestId, status: "accepted" }));
    return json(202, "accepted");
  } catch (error) {
    const rateLimited = error instanceof Error && /rate|limit|quota/i.test(error.message);
    console.error(JSON.stringify({ event: "diagnostic_delivery", requestId, status: rateLimited ? "rate_limited" : "failed" }));
    return json(rateLimited ? 429 : 503, rateLimited ? "rate_limited" : "service_unavailable");
  }
}
