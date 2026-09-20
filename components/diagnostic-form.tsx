"use client";

import Link from "next/link";
import { DiagonalArrow } from "./diagonal-arrow";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { diagnosticSteps, diagnosticProfileFields } from "@/content/diagnostic";
import { diagnosticEmailDraft } from "@/lib/diagnostic";
import { submitDiagnostic, type DiagnosticDeliveryResult } from "@/lib/diagnostic-delivery";
import { buildDiagnosticSummary, diagnosticProfileRows } from "@/lib/diagnostic-summary";
import { getDiagnosticRecommendation } from "@/lib/diagnostic-recommendation";
import { PrivacyFirstLayer } from "./privacy-first-layer";
import { TurnstileWidget } from "./turnstile-widget";

const turnstileSitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY ?? "";

export function DiagnosticForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [context, setContext] = useState("");
  const [profile, setProfile] = useState<Record<string, string | string[]>>({});
  const [exportStatus, setExportStatus] = useState("");
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [botcheck, setBotcheck] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [sending, setSending] = useState(false);
  const [deliveryResult, setDeliveryResult] = useState<DiagnosticDeliveryResult | null>(null);
  const sendingLock = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const lastStep = useRef(0);
  const complete = step === diagnosticSteps.length;
  const accepted = deliveryResult?.status === "accepted";
  const current = diagnosticSteps[step];
  const handleTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);

  useEffect(() => {
    if (lastStep.current !== step) {
      heading.current?.focus({ preventScroll: true });
      heading.current?.closest(".diagnostic-panel")?.scrollIntoView({ block: "start", behavior: "instant" });
    }
    lastStep.current = step;
  }, [step]);

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (current && current.options.some((option) => option === answers[current.id])) changeStep(step + 1);
  }

  function changeStep(next: number) {
    setTurnstileToken("");
    setDeliveryResult(null);
    setStep(next);
  }

  const profileRows = diagnosticProfileRows(profile).filter((row) => row.value !== "Sin indicar");
  const recommendation = getDiagnosticRecommendation(answers);
  const summary = buildDiagnosticSummary({ answers, profile, context });
  function openDraft() {
    // No incluir respuestas en href/data-* que pueda capturar la analítica.
    window.location.assign(diagnosticEmailDraft(summary));
  }
  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setExportStatus(accepted ? "Resumen copiado." : "Resumen copiado. No se ha enviado a Ordantis.");
    } catch {
      setExportStatus("El navegador no permite copiar. Puedes descargar el resumen o seleccionar su texto.");
    }
  }
  function downloadSummary() {
    const url = URL.createObjectURL(new Blob([summary], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "diagnostico-ordantis.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExportStatus(accepted ? "Copia descargada en tu dispositivo." : "Descarga preparada en tu dispositivo. No se ha enviado a Ordantis.");
  }

  async function sendSummary(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingLock.current || deliveryResult?.status === "accepted") return;
    sendingLock.current = true;
    setSending(true);
    const result = await submitDiagnostic({ email: String(profile.email ?? ""), summary, privacyAcknowledged, botcheck, turnstileToken });
    setDeliveryResult(result);
    setTurnstileToken("");
    setTurnstileReset((value) => value + 1);
    setSending(false);
    sendingLock.current = false;
  }

  return <div className="diagnostic-panel" data-clarity-mask="true">
    <p className="diagnostic-step-label">{accepted ? "Solicitud preparada y enviada al servicio" : `Paso ${step + 1} de 4`}</p>
    <ol className="diagnostic-progress" aria-label="Pasos del diagnóstico">{["Problema", "Datos", "Límites", "Enviar"].map((label, index) => <li key={label} className={index < step ? "is-complete" : undefined} aria-current={index === step ? "step" : undefined}><span>{index < step ? "✓" : index + 1}</span>{label}</li>)}</ol>
    <h2 ref={heading} tabIndex={-1}>{complete ? "Tu consulta, lista para enviar." : current.title}</h2>
    {complete ? <div>
      <p className="diagnostic-final-intro">{accepted ? "Conservamos aquí tus respuestas para que puedas revisarlas o guardar una copia." : "Deja tu email para que podamos responder. Enviaremos también todas las respuestas y los datos opcionales que hayas completado a contacto@ordantis.com."}</p>
      <details className="diagnostic-disclosure diagnostic-review">
        <summary>Revisar mis respuestas <span aria-hidden="true">+</span></summary>
        <dl className="diagnostic-summary">{diagnosticSteps.map((item) => <div key={item.id}><dt>{item.title}</dt><dd>{answers[item.id]}</dd></div>)}{profileRows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}{context.trim() ? <div><dt>Contexto adicional</dt><dd>{context.trim()}</dd></div> : null}</dl>
        {!accepted ? <button className="text-button" type="button" disabled={sending} onClick={() => changeStep(0)}>Modificar respuestas</button> : null}
      </details>
      <form className="diagnostic-send" onSubmit={sendSummary} aria-label="Enviar diagnóstico" aria-busy={sending}>
        {accepted ? <div className="diagnostic-success"><span aria-hidden="true">✓</span><h3>Gracias. El servicio ha aceptado tu diagnóstico.</h3><p>Has indicado <strong>{String(profile.email ?? "")}</strong> para recibir nuestra respuesta.</p></div> : <>
        <div className="lab-field"><label htmlFor="diagnostic-reply-email">Email para responder a tu consulta</label><input id="diagnostic-reply-email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required maxLength={160} value={String(profile.email ?? "")} disabled={sending} onChange={(event) => setProfile((previous) => ({ ...previous, email: event.target.value }))} /></div>
        <PrivacyFirstLayer channel="diagnostic" compact />
        <div hidden aria-hidden="true"><label htmlFor="diagnostic-botcheck">Deja este campo vacío</label><input id="diagnostic-botcheck" tabIndex={-1} autoComplete="off" value={botcheck} onChange={(event) => setBotcheck(event.target.value)} /></div>
        <label className="diagnostic-privacy-check"><input type="checkbox" required checked={privacyAcknowledged} disabled={sending} onChange={(event) => setPrivacyAcknowledged(event.target.checked)} /><span>He leído la <Link href="/privacidad" target="_blank" rel="noopener">información de privacidad</Link>. Esta confirmación no autoriza publicidad.</span></label>
        <TurnstileWidget key={turnstileReset} sitekey={turnstileSitekey} action="diagnostic" onToken={handleTurnstileToken} />
        <div className="diagnostic-submit-actions"><button className="button" type="submit" disabled={sending || !turnstileToken}>{sending ? "Enviando…" : "Enviar diagnóstico"} <span aria-hidden="true">→</span></button><button className="text-button" type="button" disabled={sending} onClick={() => changeStep(2)}>Volver al paso anterior</button></div>
        </>}
        <p role="status" className="diagnostic-delivery-status">{deliveryResult?.message ?? "No se ha enviado ninguna solicitud."}</p>
      </form>
      <details className="diagnostic-disclosure diagnostic-exports"><summary>{accepted ? "Guardar una copia" : "Otras opciones: guardar o usar mi correo"} <span aria-hidden="true">+</span></summary>
        <p>Puedes conservar el resumen completo sin enviarlo desde esta web. Incluye los datos de contacto que hayas indicado.</p>
        <div className="diagnostic-secondary-actions">{!accepted ? <button className="text-button" type="button" data-contact-method="email_draft" onClick={openDraft} disabled={sending}>Abrir borrador en mi correo</button> : null}<button className="text-button" type="button" onClick={copySummary}>Copiar resumen</button><button className="text-button" type="button" onClick={downloadSummary}>Descargar resumen</button></div>
        <p role="status" className="diagnostic-note">{exportStatus}</p>
      </details>
      <details className="diagnostic-disclosure"><summary>Ver orientación inicial <span aria-hidden="true">+</span></summary>
        <section className="diagnostic-recommendation" aria-labelledby="diagnostic-recommendation-title">
          <h3 id="diagnostic-recommendation-title">Ruta sugerida: {recommendation.title}</h3><p>{recommendation.reason}</p>
          <dl><div><dt>Primer entregable</dt><dd>{recommendation.firstDeliverable}</dd></div><div><dt>Antes de probar</dt><dd>{recommendation.dataCondition}</dd></div><div><dt>Control obligatorio</dt><dd>{recommendation.requiredControl}</dd></div></dl>
          <p className="diagnostic-note">Es una orientación basada únicamente en tus respuestas. No acredita viabilidad ni sustituye una revisión de los datos.</p>
          <Link className="arrow-link" href={recommendation.path ?? "/capacidades/" + recommendation.capability}>Consultar alcance, preguntas y límites <span aria-hidden="true"><DiagonalArrow /></span></Link>
        </section>
      </details>
    </div> : <form onSubmit={advance} onInvalidCapture={(event) => {
      // Reveal optional invalid fields before the browser tries to focus them.
      const disclosure = (event.target as HTMLElement).closest("details");
      if (disclosure) disclosure.open = true;
    }}>
      <p>{current.explanation}</p>
      <fieldset className="diagnostic-options"><legend className="visually-hidden">{current.title}</legend>{current.options.map((option) => <label key={option}>
        <input type="radio" name={current.id} value={option} checked={answers[current.id] === option} onChange={() => setAnswers((previous) => ({ ...previous, [current.id]: option }))} required />
        <span>{option}</span>
      </label>)}</fieldset>
      <details key={step} className="diagnostic-disclosure diagnostic-optional"><summary>{["Añadir datos de empresa (opcional)", "Añadir contexto técnico (opcional)", "Añadir nombre y empresa (opcional)"][step]} <span aria-hidden="true">+</span></summary>
      <fieldset className="diagnostic-profile"><legend className="visually-hidden">Datos opcionales</legend>
        <p>Estos campos completan el resumen. No se envían mientras rellenas el cuestionario.</p>
        {diagnosticProfileFields.filter((field) => field.step === step && field.id !== "email").map((field) => {
          const id = "diagnostic-" + field.id;
          const value = profile[field.id] ?? "";
          return field.type === "multi" ? <fieldset className="diagnostic-options" key={field.id}><legend>{field.label}</legend>{field.options!.map((option) => <label key={option}><input type="checkbox" checked={Array.isArray(value) && value.includes(option)} onChange={(event) => setProfile((previous) => {
            const selected = Array.isArray(previous[field.id]) ? previous[field.id] as string[] : [];
            return { ...previous, [field.id]: event.target.checked ? [...selected, option] : selected.filter((item) => item !== option) };
          })} /><span>{option}</span></label>)}</fieldset> : <div className="lab-field" key={field.id}><label htmlFor={id}>{field.label}</label>
            {field.type === "select" ? <select id={id} value={value as string} onChange={(event) => setProfile((previous) => ({ ...previous, [field.id]: event.target.value }))}><option value="">Sin indicar</option>{field.options!.map((option) => <option key={option}>{option}</option>)}</select> : <input id={id} type={field.type} maxLength={160} value={value as string} onChange={(event) => setProfile((previous) => ({ ...previous, [field.id]: event.target.value }))} autoComplete={field.id === "fullName" ? "name" : field.id === "email" ? "email" : field.id === "company" ? "organization" : field.id === "role" ? "organization-title" : "url"} />}
          </div>;
        })}
      </fieldset></details>
      {step === 2 ? <div className="lab-field"><label htmlFor="diagnostic-context">Contexto adicional (opcional)</label><textarea id="diagnostic-context" rows={4} maxLength={800} value={context} onChange={(event) => setContext(event.target.value)} aria-describedby="diagnostic-context-note" /><p id="diagnostic-context-note">Describe el proceso sin incluir información confidencial. Máximo 800 caracteres.</p></div> : null}
      <div className="diagnostic-step-actions">{step > 0 ? <button className="button button-ghost" type="button" onClick={() => changeStep(step - 1)}>Anterior</button> : null}<button className="button" type="submit">{step === 2 ? "Continuar al envío" : "Siguiente"} <span aria-hidden="true">→</span></button></div>
      <p className="diagnostic-local-note">Tus respuestas no se envían hasta que lo confirmas al final. No incluyas información confidencial.</p>
    </form>}
  </div>;
}
