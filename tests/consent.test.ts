import assert from "node:assert/strict";
import test from "node:test";
import { CONSENT_MAX_AGE_MS, consentRemainingMs, parseAnalyticsConsent } from "../lib/consent.ts";
import { analyticsCookieNames, isProductionAnalyticsHost, safeReferrerOrigin } from "../lib/analytics-runtime.ts";

test("consentimiento válido, rechazo y caducidad a los 180 días", () => {
  const now = Date.parse("2026-08-28T12:00:00Z");
  const value = { version: 1, analytics: true, updatedAt: new Date(now - 1000).toISOString() };
  assert.equal(parseAnalyticsConsent(value, now), true);
  assert.equal(consentRemainingMs(value, now), CONSENT_MAX_AGE_MS - 1000);
  assert.equal(consentRemainingMs({ ...value, analytics: false }, now), 0);
  assert.equal(consentRemainingMs({ ...value, updatedAt: new Date(now - CONSENT_MAX_AGE_MS - 1).toISOString() }, now), 0);
  assert.equal(parseAnalyticsConsent({ ...value, analytics: false }, now), false);
  for (const updatedAt of ["invalid", new Date(now + 1).toISOString(), new Date(now - CONSENT_MAX_AGE_MS - 1).toISOString()]) {
    assert.equal(parseAnalyticsConsent({ ...value, updatedAt }, now), null);
  }
  for (const invalid of [null, "true", {}, { ...value, analytics: "true" }, { ...value, version: 2 }]) {
    assert.equal(parseAnalyticsConsent(invalid, now), null);
  }
});

test("solo se eliminan las cookies propias de analítica conocidas", () => {
  assert.deepEqual(analyticsCookieNames("_ga=1; _ga_ABC123=2; _clck=x; _clsk=y; session=keep; _garden=keep; consent=keep"), ["_ga", "_ga_ABC123", "_clck", "_clsk"]);
  assert.equal(isProductionAnalyticsHost("www.ordantis.com"), true);
  for (const host of ["127.0.0.1", "localhost", "www.ordantis.com.example.org", "preview.ordantis.com"]) {
    assert.equal(isProductionAnalyticsHost(host), false);
  }
  assert.equal(safeReferrerOrigin("https://example.org/private?email=example#secret"), "https://example.org");
  assert.equal(safeReferrerOrigin("invalid"), "");
});
