import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="shell narrow">
        <p className="eyebrow">Error 404</p>
        <h1>Esta página no existe.</h1>
        <p className="lead">Puedes volver al inicio, revisar las capacidades o consultar el índice de preguntas técnicas.</p>
        <div className="hero-actions">
          <Link className="button" href="/">Volver al inicio</Link>
          <Link className="button button-ghost" href="/insights">Ver guías técnicas</Link>
        </div>
      </div>
    </section>
  );
}
