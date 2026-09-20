import Link from "next/link";
import { DiagnosticForm } from "@/components/diagnostic-form";
import { JsonLd } from "@/components/json-ld";
import { diagnostic } from "@/content/diagnostic";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

export const metadata = createMetadata(diagnostic);

export default function DiagnosticPage() {
  return <>
    <JsonLd data={webPageSchema(diagnostic)} />
    <section className="page-hero diagnostic-hero"><div className="shell narrow"><p className="eyebrow">— Diagnóstico</p><h1>Empezamos por tu problema.</h1><p className="lead">{diagnostic.lead}</p></div></section>
    <section className="content-section diagnostic-section"><div className="shell narrow">
      <DiagnosticForm />
      <p className="diagnostic-note">¿Prefieres escribir directamente? <a href="mailto:contacto@ordantis.com">contacto@ordantis.com</a>.</p>
      <details className="diagnostic-disclosure diagnostic-data-note"><summary>Cómo se tratan tus respuestas <span aria-hidden="true">+</span></summary><p>{diagnostic.privacy}</p><Link href="/privacidad">Información de privacidad</Link></details>
    </div></section>
  </>;
}
