import Image from "next/image";
import { DiagonalArrow } from "./diagonal-arrow";
import { originalBackers } from "@/content/home";
export { PartnersMarquee as Partners } from "./partners-marquee";

export function Backers() {
  return <section className="backers-section" aria-label="Ecosistema de emprendimiento">
    <div className="shell"><p className="eyebrow">— Ecosistema de emprendimiento</p>
      <div className="backers-row">{originalBackers.map((item) => <div className="backer-logo" key={item.name}>
        {item.url ? <a href={item.url} aria-label={item.name}><Image src={item.image} alt={item.name} width={item.width} height={item.height} sizes="180px" unoptimized={item.name === "INCIBE Emprende"} /></a> : <Image src={item.image} alt={item.name} width={item.width} height={item.height} sizes="180px" />}
      </div>)}</div>
    </div>
  </section>;
}

export function TrustPrograms() {
  return <section className="content-section"><div className="shell">
    <header className="section-heading"><p className="eyebrow">— Programas</p><h2>INCIBE Emprende<br />{" "}y DesafIA 2026.</h2></header>
    <div className="trust-grid">
      <article className="trust-card">
        <a className="trust-image-square" href="https://www.incibe.es/node/619170" aria-label="Ver el programa en INCIBE"><Image src="/trust/sello-incibe-emprende.png" alt="Sello Ventures INCIBE Emprende" width={4167} height={4167} unoptimized /></a>
        <h3>Participación en INCIBE Emprende</h3><p>El sello identifica la participación en el programa de aceleración. No es una certificación ni una acreditación de los servicios de Ordantis.</p>
        <a className="arrow-link" href="https://www.incibe.es/node/619170">Ver el programa <span aria-hidden="true"><DiagonalArrow /></span></a>
      </article>
      <article className="trust-card">
        <div className="trust-image-wide"><Image src="/trust/startup-finalista-desafia-2026.jpg" alt="Startup finalista DesafIA 2026" fill sizes="(max-width: 900px) 85vw, 650px" /></div>
        <h3>Startup finalista DesafIA 2026</h3><p>Ordantis es startup finalista de la edición 2026 de DesafIA.</p>
      </article>
    </div>
  </div></section>;
}
