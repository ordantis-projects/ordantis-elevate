import assert from "node:assert/strict";
import test from "node:test";
import { submitDiagnostic, validDiagnosticSubmission } from "../lib/diagnostic-delivery.ts";
import { diagnosticEmailText, parseDiagnosticRequest } from "../lib/diagnostic-request.ts";
import { verifyTurnstile } from "../lib/turnstile.ts";

const diagnostic = { email: "visitor@example.test", summary: "Pregunta sintética sin datos reales", privacyAcknowledged: true, botcheck: "", turnstileToken: "test-turnstile-token" };

test("diagnostic validates before contacting the same-origin endpoint", async () => {
  let requests = 0;
  const send: typeof fetch = async () => { requests++; return new Response(null, { status: 202 }); };
  for (const invalid of [
    { ...diagnostic, email: "invalid" },
    { ...diagnostic, email: "a@example.test\r\nBcc:wrong@example.test" },
    { ...diagnostic, privacyAcknowledged: false },
    { ...diagnostic, summary: "" },
    { ...diagnostic, summary: "x".repeat(12001) },
    { ...diagnostic, botcheck: "bot" },
    { ...diagnostic, turnstileToken: "" },
    { ...diagnostic, turnstileToken: "x".repeat(2049) },
  ]) {
    assert.equal(validDiagnosticSubmission(invalid), false);
    assert.equal((await submitDiagnostic(invalid, send)).status, "invalid");
  }
  assert.equal(requests, 0);
});

test("delivery sends only the reviewed diagnostic on one same-origin POST", async () => {
  let requests = 0;
  const send: typeof fetch = async (url, options) => {
    requests++;
    assert.equal(url, "/api/diagnostic");
    assert.equal(options?.method, "POST");
    assert.equal(options?.credentials, "same-origin");
    assert.equal(options?.referrerPolicy, "same-origin");
    assert.deepEqual(JSON.parse(String(options?.body)), diagnostic);
    return new Response(null, { status: 202 });
  };
  const result = await submitDiagnostic(diagnostic, send);
  assert.equal(result.status, "accepted");
  assert.match(result.message, /no confirma su entrega/);
  assert.equal(requests, 1);
});

test("delivery distinguishes validation, rejection, rate limiting and an ambiguous network failure", async () => {
  const cases = [
    { response: () => new Response(null, { status: 400 }), status: "invalid" },
    { response: () => new Response(null, { status: 500 }), status: "rejected" },
    { response: () => new Response(null, { status: 429 }), status: "rate_limited" },
    { response: () => new Response(null, { status: 403 }), status: "verification_failed" },
    { response: () => { throw new Error("Network timeout with private provider data"); }, status: "unconfirmed" },
  ];
  for (const item of cases) {
    let requests = 0;
    const result = await submitDiagnostic(diagnostic, async () => { requests++; return item.response(); });
    assert.equal(result.status, item.status);
    assert.equal(requests, 1);
    assert.doesNotMatch(result.message, /private provider data/);
  }
});

test("server parser allowlists diagnostic fields and produces plain-text email", () => {
  const parsed = parseDiagnosticRequest({ ...diagnostic, ignoredSecret: "do-not-forward" });
  assert.equal(parsed.ok, true);
  if (!parsed.ok) return;
  assert.equal("ignoredSecret" in parsed.submission, false);
  const body = diagnosticEmailText(parsed.submission);
  assert.match(body, /visitor@example.test/);
  assert.match(body, /Pregunta sintética/);
  assert.doesNotMatch(body, /do-not-forward/);
  assert.doesNotMatch(body, /test-turnstile-token/);
  assert.deepEqual(parseDiagnosticRequest({ ...diagnostic, botcheck: "spam" }), { ok: false, reason: "honeypot" });
});

test("Turnstile requires the expected action and an approved hostname", async () => {
  let requestBody = "";
  const send: typeof fetch = async (_url, options) => {
    requestBody = String(options?.body);
    return Response.json({ success: true, action: "diagnostic", hostname: "www.ordantis.com" });
  };
  assert.equal(await verifyTurnstile({
    token: "single-use-token",
    secret: "server-secret",
    expectedAction: "diagnostic",
    expectedHostnames: "ordantis.com,www.ordantis.com",
    remoteIp: "203.0.113.10",
    send,
  }), true);
  const encoded = new URLSearchParams(requestBody);
  assert.equal(encoded.get("response"), "single-use-token");
  assert.equal(encoded.get("remoteip"), "203.0.113.10");

  for (const result of [
    { success: false, action: "diagnostic", hostname: "www.ordantis.com" },
    { success: true, action: "contact", hostname: "www.ordantis.com" },
    { success: true, action: "diagnostic", hostname: "example.com" },
  ]) {
    assert.equal(await verifyTurnstile({
      token: "single-use-token",
      secret: "server-secret",
      expectedAction: "diagnostic",
      expectedHostnames: "ordantis.com,www.ordantis.com",
      send: async () => Response.json(result),
    }), false);
  }
});
