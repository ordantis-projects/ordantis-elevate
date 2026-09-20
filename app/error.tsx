"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-hero">
      <div className="shell narrow">
        <p className="eyebrow">Error</p>
        <h1>No hemos podido cargar esta página.</h1>
        <p className="lead">La incidencia no cambia datos. Puedes repetir la carga o volver al inicio.</p>
        <div className="hero-actions"><button className="button" type="button" onClick={reset}>Reintentar</button><Link className="button button-ghost" href="/">Ir al inicio</Link></div>
      </div>
    </section>
  );
}
