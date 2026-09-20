"use client";

import { useEffect, useRef, useState } from "react";
import { readAnalyticsConsent, writeAnalyticsConsent } from "@/lib/consent";
import { IntentLink } from "./intent-link";

type Consent = "accepted" | "rejected";

export function CookieConsent() {
  const [visible, setVisible] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [previouslyAccepted, setPreviouslyAccepted] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(false);
  const preferencesTitle = useRef<HTMLHeadingElement>(null);
  const customizeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setVisible(readAnalyticsConsent() === null);
      setInitializing(false);
    });
    const reopen = () => {
      const accepted = readAnalyticsConsent() === true;
      setPreviouslyAccepted(accepted);
      setAnalyticsChoice(accepted);
      setCustomizing(false);
      setVisible(true);
    };
    window.addEventListener("ordantis:open-cookie-settings", reopen);
    return () => {
      active = false;
      window.removeEventListener("ordantis:open-cookie-settings", reopen);
    };
  }, []);

  useEffect(() => {
    if (customizing) preferencesTitle.current?.focus();
  }, [customizing]);

  function back() {
    setCustomizing(false);
    window.requestAnimationFrame(() => customizeButton.current?.focus());
  }

  function save(value: Consent) {
    const analytics = value === "accepted";
    writeAnalyticsConsent(analytics);
    window.dispatchEvent(new CustomEvent("ordantis:consent", { detail: analytics }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-panel" data-consent-initial={initializing ? "" : undefined}
      aria-labelledby="cookie-title" aria-describedby="cookie-description" role="dialog" aria-modal="false"
      onKeyDown={(event) => {
        if (customizing && event.key === "Escape") { event.stopPropagation(); back(); }
      }}>
      <div>
        <p className="eyebrow" id="cookie-title">Cookies y privacidad</p>
        <p id="cookie-description">
          {customizing ? "Elige si permites la analítica. Puedes cambiar tu elección desde «Gestionar cookies»." : <>
          En Ordantis usamos tecnologías necesarias para guardar tu elección y proteger el formulario.
          Si aceptas, utilizaremos cookies de terceros de Google Analytics y Microsoft Clarity para medir
          visitas y analizar la navegación, con mapas de interacción y reconstrucciones de sesión.
          Puedes aceptar, rechazar o personalizar la analítica y cambiar tu elección desde «Gestionar cookies».
          </>}
          {" "}<IntentLink href="/cookies">Política de cookies</IntentLink>.
        </p>
        {previouslyAccepted ? <p>Si la analítica ya está activa, retirar el permiso recarga la página para detenerla. Guarda antes cualquier formulario que estés rellenando.</p> : null}
      </div>
      {customizing ? (
        <section className="cookie-preferences" aria-labelledby="cookie-preferences-title">
          <h2 id="cookie-preferences-title" ref={preferencesTitle} tabIndex={-1}>Personalizar cookies</h2>
          <div className="cookie-category">
            <div className="cookie-category-heading"><h3>Necesarias</h3><span className="cookie-required">Siempre activas</span></div>
            <p>Guardan tu elección y protegen el formulario frente al abuso. No se utilizan para medir visitas.</p>
          </div>
          <div className="cookie-category">
            <label className="cookie-toggle" htmlFor="cookie-analytics">
              <span>Analítica <span className="cookie-optional">Opcional</span></span>
              <input id="cookie-analytics" type="checkbox" checked={analyticsChoice}
                aria-describedby="cookie-analytics-description" onChange={(event) => setAnalyticsChoice(event.target.checked)} />
            </label>
            <p id="cookie-analytics-description">Google Analytics y Microsoft Clarity: medición de visitas, mapas de interacción y reconstrucciones de sesión. Solo se activan si das permiso.</p>
          </div>
          <div className="cookie-actions">
            <button className="button button-ghost cookie-back" type="button" onClick={back}>Volver</button>
            <button className="button button-ghost cookie-save" type="button" onClick={() => save(analyticsChoice ? "accepted" : "rejected")}>Guardar preferencias</button>
          </div>
        </section>
      ) : null}
      <div className="cookie-actions">
        <button className="button button-ghost" type="button" onClick={() => save("rejected")}>Rechazar cookies</button>
        <button className="button button-ghost" type="button" onClick={() => save("accepted")}>Aceptar cookies</button>
        {!customizing ? <button ref={customizeButton} className="button button-ghost cookie-customize" type="button" onClick={() => setCustomizing(true)}>Personalizar</button> : null}
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      className="footer-link-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event("ordantis:open-cookie-settings"))}
    >
      Gestionar cookies
    </button>
  );
}
