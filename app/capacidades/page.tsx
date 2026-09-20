import Link from "next/link";
import { DiagonalArrow } from "@/components/diagonal-arrow";
import { ContactBand } from "@/components/page-elements";
import { ServiceCatalog } from "@/components/service-catalog";
import { ProjectAreas, SystemJourney } from "@/components/project-sections";
import { JsonLd } from "@/components/json-ld";
import { projectCapabilities } from "@/content/site";
import { projectServicePhases as servicePhases, servicesIntro } from "@/content/services";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const { title, description } = servicesIntro;
export const metadata = createMetadata({ title, description, path: "/capacidades" });

export default function CapabilitiesPage() {
  return <>
    <JsonLd data={webPageSchema({ path: "/capacidades", title, description })} />
    <section className="page-hero services-hero"><div className="shell">
      <p className="eyebrow">— Modelos · Datos · I+D</p><h1>Machine learning, datos<br />{" "}y <em className="brand-text">sistemas de IA.</em></h1>
      <p className="lead">{servicesIntro.lead}</p>
      <nav className="section-nav" aria-label="Fases de los servicios">{servicePhases.map((phase, index) => <a href={"#" + phase.id} key={phase.id}><span>0{index + 1}</span> {phase.title}<span className="phase-nav-arrow" aria-hidden="true">↓</span></a>)}</nav>
    </div></section>
    <section className="content-section"><div className="shell"><h2>Ámbitos de proyecto</h2><ProjectAreas /></div></section>
    <SystemJourney />
    <ServiceCatalog />
    <section className="content-section"><div className="shell split"><div><p className="eyebrow">— Profundizar</p><h2>Método, evaluación y entregables.</h2></div><ul className="stack-list">{projectCapabilities.map((capability) => <li key={capability.slug}><Link className="arrow-link" href={"/capacidades/" + capability.slug}>{capability.title} <span aria-hidden="true"><DiagonalArrow /></span></Link><p>{capability.description}</p></li>)}</ul></div></section>
    <ContactBand />
  </>;
}
