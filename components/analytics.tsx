"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { CONSENT_STORAGE_KEY, analyticsConsentRemainingMs, forgetInMemoryConsent, readAnalyticsConsent } from "@/lib/consent";
import { aiReferralSource, contactIntent } from "@/lib/analytics-attribution";
import { isProductionAnalyticsHost, mayTrackAnalytics, prepareAnalytics, safeReferrerOrigin, stopAnalytics } from "@/lib/analytics-runtime";

const rawGaId = process.env.NEXT_PUBLIC_GA_ID;
const rawClarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
const gaId = rawGaId && /^G-[A-Z0-9]+$/.test(rawGaId) ? rawGaId : undefined;
const clarityId = rawClarityId && /^[a-z0-9]+$/i.test(rawClarityId) ? rawClarityId : undefined;

function detectAiSource() {
  const params = new URLSearchParams(window.location.search);
  return aiReferralSource(document.referrer, params.get("utm_source"));
}

export function ConsentAwareAnalytics() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const started = useRef(false);
  const aiRecorded = useRef(false);

  useEffect(() => {
    const productionHost = isProductionAnalyticsHost(window.location.hostname);
    let expiryTimer: number | undefined;
    const applyConsent = () => {
      window.clearTimeout(expiryTimer);
      const permitted = productionHost && readAnalyticsConsent() === true;
      if (permitted && (gaId || clarityId)) {
        if (!started.current) prepareAnalytics(gaId, clarityId);
        started.current = true;
        setEnabled(true);
        // Timer delays are signed 32-bit values. Reschedule long validity periods
        // so an open document also stops when its permission expires.
        expiryTimer = window.setTimeout(applyConsent, Math.min(analyticsConsentRemainingMs() + 1, 2147483647));
      } else {
        if (productionHost) stopAnalytics(gaId);
        setEnabled(false);
        if (started.current) {
          // Unload already-running and in-flight SDKs. Unmounting Script is not enough.
          // The preferences panel warns that this clears unsaved form state.
          started.current = false;
          window.location.reload();
        }
      }
    };
    const timer = window.setTimeout(applyConsent, 0);
    const onConsent = () => applyConsent();
    const onStorage = (event: StorageEvent) => {
      if (event.key !== CONSENT_STORAGE_KEY && event.key !== null) return;
      forgetInMemoryConsent();
      applyConsent();
    };
    const onVisible = () => { if (document.visibilityState === "visible") applyConsent(); };
    window.addEventListener("ordantis:consent", onConsent);
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(expiryTimer);
      window.removeEventListener("ordantis:consent", onConsent);
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    if (!enabled || (!gaId && !clarityId)) return;

    let attempt = 0;
    let timer: number | undefined;
    const sendPageView = () => {
      if (!mayTrackAnalytics()) return;
      if (gaId && !window.gtag && attempt < 20) {
        attempt += 1;
        timer = window.setTimeout(sendPageView, 250);
        return;
      }
      if (gaId && !window.gtag) return;

      const aiSource = detectAiSource();
      window.gtag?.("event", "page_view", {
        page_location: `${window.location.origin}${pathname}`,
        page_path: pathname,
        page_referrer: safeReferrerOrigin(document.referrer),
        page_title: document.title,
        traffic_group: aiSource ? "AI Organic" : "Standard",
        ai_source: aiSource ?? "none",
      });

      let recorded = aiRecorded.current;
      try { recorded ||= window.sessionStorage.getItem("ordantis-ai-organic-recorded") === "1"; } catch { /* Use memory for this document. */ }
      if (aiSource && !recorded) {
        window.gtag?.("event", "ai_organic_visit", {
          ai_source: aiSource,
          traffic_group: "AI Organic",
        });
        window.clarity?.("set", "traffic_group", "AI Organic");
        window.clarity?.("set", "ai_source", aiSource);
        aiRecorded.current = true;
        try { window.sessionStorage.setItem("ordantis-ai-organic-recorded", "1"); } catch { /* Consent still applies without persistent storage. */ }
      }
    };

    sendPageView();
    return () => { if (timer) window.clearTimeout(timer); };
  }, [enabled, pathname]);

  useEffect(() => {
    if (!enabled || (!gaId && !clarityId)) return;

    const trackContact = (event: MouseEvent) => {
      if (!mayTrackAnalytics()) return;
      const target = event.target instanceof Element ? event.target.closest("a, button[data-contact-method]") : null;
      if (!target) return;
      const href = target.getAttribute("href") ?? "";

      const method = contactIntent(href, target.getAttribute("data-contact-method"));
      if (method) {
        // An email-app click is intent, not evidence that a lead was received.
        window.gtag?.("event", "contact_start", { contact_method: method });
        window.clarity?.("event", `contact_start_${method}`);
      }
    };

    document.addEventListener("click", trackContact);
    return () => document.removeEventListener("click", trackContact);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {gaId ? (
        <Script id="ordantis-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" onReady={() => { if (!mayTrackAnalytics()) stopAnalytics(gaId); }} />
      ) : null}
      {clarityId ? (
        <Script id="ordantis-clarity" src={`https://www.clarity.ms/tag/${clarityId}`} strategy="afterInteractive" onReady={() => { if (!mayTrackAnalytics()) stopAnalytics(gaId); }} />
      ) : null}
    </>
  );
}
