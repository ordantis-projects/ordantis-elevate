import Link from "next/link";
import { siteConfig } from "@/content/identity";

export function PrivacyFirstLayer({ channel, compact = false }: { channel: "email" | "diagnostic"; compact?: boolean }) {
  const direct = channel === "diagnostic";
  return (
    <aside className={`privacy-first-layer${compact ? " privacy-first-layer-compact" : ""}`} aria-labelledby={`privacy-summary-${channel}`}>
      <h3 id={`privacy-summary-${channel}`}>Información básica de protección de datos</h3>
      <dl>
        <div><dt>Responsable</dt><dd>{siteConfig.legalName}.</dd></div>
        <div><dt>Finalidad</dt><dd>{compact ? "Valorar y responder tu consulta. Sin publicidad." : "Responder y valorar la consulta profesional que solicitas. No se utilizará para enviarte publicidad."}</dd></div>
        <div><dt>Base jurídica</dt><dd>{compact ? "Medidas precontractuales (art. 6.1.b RGPD); interés legítimo para otras consultas profesionales (art. 6.1.f)." : "Medidas precontractuales solicitadas por ti (art. 6.1.b RGPD); para otras consultas profesionales, interés legítimo en responderlas (art. 6.1.f RGPD)."}</dd></div>
        <div><dt>Destinatarios</dt><dd>{direct ? "Cloudflare entrega el mensaje a contacto@ordantis.com; Google aloja los buzones de recepción de Ordantis." : "Cloudflare Email Routing, el proveedor de tu correo y Google como proveedor de los buzones de recepción de Ordantis."}</dd></div>
        <div><dt>Conservación</dt><dd>{compact ? "Durante la gestión y los plazos necesarios por la relación o las responsabilidades derivadas." : direct ? "El mensaje no se guarda en una base de datos de la web. Se conserva en el buzón durante la gestión y, después, solo mientras sea necesario para continuar la relación o atender responsabilidades." : "Durante la gestión y, después, solo mientras sea necesario para continuar la relación o atender responsabilidades."}</dd></div>
        <div><dt>Derechos</dt><dd>Acceso, rectificación, supresión, oposición, limitación y portabilidad cuando procedan, escribiendo a {siteConfig.email}. Puedes reclamar ante la AEPD.</dd></div>
      </dl>
      <p><Link href="/privacidad">Leer la información completa, proveedores y transferencias</Link>.</p>
    </aside>
  );
}
