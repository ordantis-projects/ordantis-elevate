import Link from "next/link";
import { DiagonalArrow } from "./diagonal-arrow";
import { integrationIntro, integrationServices, projectServicePhases, type ServiceDetail } from "@/content/services";
import { ServiceDisclosure, ServiceHashNavigation } from "./service-disclosure";
import styles from "./project-design.module.css";

function ServiceEntries({ services }: { services: ServiceDetail[] }) {
  return <div className="service-list">{services.map((service) => <ServiceDisclosure key={service.id} service={{ id: service.id, number: service.number, title: service.title, summary: service.summary, description: service.description, demo: service.demo, demoNote: service.demoNote }}>
          <div className="service-deliverables-grid">
            <div><h4>Componentes clave</h4><ul className="stack-list">{service.components.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h4>Entregables que acordamos</h4><ul className="stack-list">{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="service-use-cases"><h4>Ejemplos de aplicación</h4><p>Situaciones orientativas para definir una prueba; no describen proyectos ejecutados ni resultados de clientes.</p>
            <div className="use-case-grid">{service.useCases.map((item) => <article key={item.sector}><h5>{item.sector}</h5><p>{item.text}</p></article>)}</div>
          </div>
          <div className="service-boundary"><h4>Qué condiciona el alcance</h4><p>{service.boundary}</p><Link className="arrow-link" href={`/capacidades/${service.capability}`}>Método, aceptación y preguntas <span aria-hidden="true"><DiagonalArrow /></span></Link></div>
          {service.id === "ingenieria" ? <p className="service-demo-link"><Link className="arrow-link" href="/labs/calidad-datos">Probar las reglas con datos sintéticos <span aria-hidden="true"><DiagonalArrow /></span></Link></p> : null}
      </ServiceDisclosure>)}</div>;
}

export function ServiceCatalog() {
  return <div className="service-catalog"><ServiceHashNavigation />{projectServicePhases.map((phase, index) => <section className={`content-section ${styles.catalogPhase}`} id={phase.id} key={phase.id}>
    <div className={`shell ${styles.catalogLayout}`}>
      <header className={`service-phase-heading ${styles.catalogHeading}`}><p className={styles.phaseMarker}>FASE 0{index + 1}</p><h2>{phase.title}</h2><p className="lead">{phase.intro}</p></header>
      <ServiceEntries services={phase.services} />
    </div>
  </section>)}
    <section className="content-section"><div className="shell">
      <details className="integration-services">
        <summary><h2>{integrationIntro.title}</h2><span className="square-arrow" aria-hidden="true">→</span></summary>
        <div className="integration-services-body"><p>{integrationIntro.description}</p><ServiceEntries services={integrationServices} /></div>
      </details>
    </div></section>
  </div>;
}
