export function diagnosticEmailDraft(summary: string) {
  return `mailto:contacto@ordantis.com?subject=${encodeURIComponent("Consulta de diagnóstico — Ordantis")}&body=${encodeURIComponent(summary)}`;
}
