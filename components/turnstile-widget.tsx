"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type TurnstileApi = {
  render(container: HTMLElement, options: {
    sitekey: string;
    action: string;
    theme: "auto";
    size: "compact" | "flexible";
    callback(token: string): void;
    "expired-callback"(): void;
    "error-callback"(): void;
  }): string;
  remove(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileWidget({ sitekey, action, onToken }: {
  sitekey: string;
  action: string;
  onToken(token: string): void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const widgetSize = useRef<"compact" | "flexible" | null>(null);

  const renderWidget = useCallback(() => {
    if (!sitekey || !container.current || !window.turnstile) return;
    const size = container.current.getBoundingClientRect().width < 300 ? "compact" : "flexible";
    if (widgetId.current && widgetSize.current === size) return;
    if (widgetId.current) {
      window.turnstile.remove(widgetId.current);
      onToken("");
    }
    widgetSize.current = size;
    widgetId.current = window.turnstile.render(container.current, {
      sitekey,
      action,
      theme: "auto",
      size,
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
  }, [action, onToken, sitekey]);

  useEffect(() => {
    renderWidget();
    const observer = new ResizeObserver(renderWidget);
    if (container.current) observer.observe(container.current);
    return () => {
      observer.disconnect();
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
      widgetSize.current = null;
    };
  }, [onToken, renderWidget]);

  if (!sitekey) {
    return <p role="status" className="diagnostic-note">La comprobación de seguridad no está disponible. Conserva el resumen y prueba más tarde.</p>;
  }

  return <div className="turnstile-field">
    <Script
      id="cloudflare-turnstile"
      src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      strategy="afterInteractive"
      onReady={renderWidget}
    />
    <div ref={container} aria-label="Comprobación de seguridad de Cloudflare Turnstile" />
    <p>Comprobación antispam estrictamente necesaria para enviar el diagnóstico.</p>
  </div>;
}
