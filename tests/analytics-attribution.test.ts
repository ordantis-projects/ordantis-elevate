import assert from "node:assert/strict";
import test from "node:test";
import { aiReferralSource, contactIntent } from "../lib/analytics-attribution.ts";

test("AI Organic se atribuye a dominios reales, no a fragmentos del nombre", () => {
  assert.equal(aiReferralSource("https://chatgpt.com/c/example", null), "ChatGPT");
  assert.equal(aiReferralSource("https://www.perplexity.ai/search/example", null), "Perplexity");
  assert.equal(aiReferralSource("https://example.com/claude", null), undefined);
  assert.equal(aiReferralSource("https://chatgpt.com.example.org", null), undefined);
  assert.equal(aiReferralSource("", "  CHATGPT  "), "ChatGPT");
  assert.equal(aiReferralSource("invalid", "not-chatgpt"), undefined);
});

test("un borrador o clic de correo es intención de contacto, no un lead confirmado", () => {
  assert.equal(contactIntent("mailto:contacto@ordantis.com", null), "email");
  assert.equal(contactIntent("", "email_draft"), "email_draft");
  assert.equal(contactIntent("/contacto", null), "contact_page");
  assert.equal(contactIntent("/research", null), undefined);
});
