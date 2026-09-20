import Link from "next/link";
import { DiagonalArrow } from "./diagonal-arrow";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="shell narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <header className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="arrow-link" href={href}>{children}<span aria-hidden="true"><DiagonalArrow /></span></Link>;
}

export function SourceNote({ children }: { children: ReactNode }) {
  return <aside className="source-note"><strong>Nota de evidencia</strong><p>{children}</p></aside>;
}

export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="shell contact-band-inner">
        <div>
          <p className="eyebrow">Primera conversación</p>
          <h2>Trae el problema, los datos disponibles y la condición que no puede fallar.</h2>
        </div>
        <Link className="button" href="/diagnostico">Iniciar diagnóstico <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
