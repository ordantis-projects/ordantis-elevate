import Link from "next/link";
import { DiagonalArrow } from "./diagonal-arrow";
import { ContactBand, PageHero, SourceNote } from "./page-elements";
import { JsonLd } from "./json-ld";
import { PrivacyFirstLayer } from "./privacy-first-layer";
import type { StaticPage } from "@/content/pages";
import { webPageSchema } from "@/lib/schema";

export function StaticContentPage({ page, legalNotice = false, showContact = true }: { page: StaticPage; legalNotice?: boolean; showContact?: boolean }) {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: page.path,
          title: page.title,
          description: page.description,
          type: page.path === "/empresa" ? "AboutPage" : page.path === "/contacto" ? "ContactPage" : "WebPage",
        })}
      />
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="content-section">
        <div className="shell narrow prose">
          {legalNotice ? (
            <SourceNote>Esta página identifica datos pendientes de validación. No sustituye una revisión jurídica adaptada a los proveedores y tratamientos que se activen en producción.</SourceNote>
          ) : null}
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items?.length ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              {section.table ? (
                <div className="legal-table-scroll" role="region" aria-label={section.table.caption} tabIndex={0}>
                  <table className="legal-table">
                    <caption>{section.table.caption}</caption>
                    <thead><tr>{section.table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
                    <tbody>{section.table.rows.map((row) => <tr key={row.join("|")}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}><code>{cell}</code></th> : <td key={`${index}-${cell}`}>{cell}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              ) : null}
              {section.links?.map((link) => <p key={link.path}><Link className="arrow-link" href={link.path}>{link.label} <span aria-hidden="true"><DiagonalArrow /></span></Link></p>)}
            </section>
          ))}
          {page.path === "/contacto" ? (
            <>
              <PrivacyFirstLayer channel="email" />
              <div className="inline-actions">
                <Link className="button" href="/diagnostico">Iniciar diagnóstico</Link>
                <a className="button button-ghost" href="mailto:contacto@ordantis.com?subject=Consulta%20desde%20ordantis.com">Escribir desde mi correo</a>
              </div>
            </>
          ) : null}
        </div>
      </section>
      {showContact && !page.path.startsWith("/privacidad") && page.path !== "/cookies" && page.path !== "/contacto" ? <ContactBand /> : null}
    </>
  );
}
