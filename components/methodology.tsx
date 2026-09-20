import Link from "next/link";
import { DiagonalArrow } from "./diagonal-arrow";
import { methodology } from "@/content/home";
import { PhaseShape } from "./phase-shape";
import { DisclosureClose } from "./disclosure-close";
import { projectServicePhases as servicePhases } from "@/content/services";
import { methodPoints } from "@/content/original-sections";

export function Methodology() {
  return <section className="content-section method-section" id="metodologia">
    <div className="shell">
      <header className="section-heading method-intro">
        <div>
        <p className="eyebrow">— Metodología</p>
        <h2>Cuatro fases.<br />{" "}Un proyecto <em>de principio a fin.</em></h2>
        </div>
        <p>Podemos empezar por la fase que necesita tu proyecto. Cada una deja una entrega y una pregunta que hay que resolver antes de continuar.</p>
      </header>
      <div className="method-list">{methodology.map((phase, index) => <details className="method-phase" name="methodology" key={phase.phase}>
        <summary>
          <PhaseShape kind={phase.shape} />
          <span className="method-index" aria-hidden="true">0{index + 1}</span>
          <div className="phase-heading"><p className="eyebrow">Fase {index + 1}</p><h3>{phase.title}</h3><p>{phase.lead}</p></div>
          <span className="square-arrow" aria-hidden="true">→</span>
        </summary>
        <div className="phase-detail">
          <div className="phase-detail-top"><p className="eyebrow">— Fase {index + 1}</p><DisclosureClose label="Cerrar fase" /></div>
          <div className="phase-detail-heading"><span className="phase-large-number">0{index + 1}</span><h3>{phase.title}</h3></div>
          <p>{phase.detail}</p>
          <div className="phase-points">{methodPoints[phase.phase].map((point) => <div key={point.title}><h4>{point.title}</h4><p>{point.text}</p></div>)}</div>
          <h4>Qué queda al terminar</h4><p>{phase.output}</p>
          <h4>La pregunta de control</h4><p>{phase.question}</p>
          <Link className="arrow-link" href={`/capacidades#${phase.phase}`}>Ver servicios de esta fase <span aria-hidden="true"><DiagonalArrow /></span></Link>
          <div className="phase-services">{servicePhases.find((item) => item.id === phase.phase)!.services.map((service) => <Link href={`/capacidades#${service.id}`} key={service.id}><span className="eyebrow">{service.number}</span><h4>{service.title}</h4><span>Ver servicio →</span></Link>)}</div>
        </div>
      </details>)}</div>
    </div>
  </section>;
}
