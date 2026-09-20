import Link from "next/link";
import { DiagonalArrow } from "@/components/diagonal-arrow";
import { ArrowLink, ContactBand, SectionHeading } from "@/components/page-elements";
import { BrandArrows } from "@/components/brand-art";
import { BrandIntro } from "@/components/brand-intro";
import { IntentLink } from "@/components/intent-link";
import { Methodology } from "@/components/methodology";
import { Backers, Partners, TrustPrograms } from "@/components/trust-programs";
import { JsonLd } from "@/components/json-ld";
import { ProjectApplications, ProjectAreas } from "@/components/project-sections";
import projectStyles from "@/components/project-design.module.css";
import { capabilities, insights, researchEvidence, siteConfig } from "@/content/site";
import { homeDelivery, homeEngagement, homeEvidence, homeFaqs, homeIntro, homeProblems, methodology } from "@/content/home";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const featuredInsightSlugs = new Set(["mantenimiento-predictivo-pocas-averias", "ciencia-datos-cambios-operacion", "modelos-predictivos-picos-demanda", "evaluar-piloto-ia-administracion-publica", "prediccion-optimizacion-asignacion-recursos", "exist-modalidades-aportan-valor"]);
export const metadata = createMetadata({ title: "Machine learning, ciencia de datos e I+D en IA", description: siteConfig.description, path: "/" });

export default function HomePage() {
  return <>
    <JsonLd data={webPageSchema({ path: "/", title: "Ordantis", description: siteConfig.description })} />
    <BrandIntro />
    <section className="home-hero">
      <BrandArrows />
      <div className="shell hero-copy">
        <p className="eyebrow">— {homeIntro.eyebrow}</p>
        <h1><span>{homeIntro.titleStart}</span>{" "}<span><em>{homeIntro.titleEmphasis}</em> {homeIntro.titleEnd}</span></h1>
        <p className="lead">{homeIntro.lead}</p>
        <div className="hero-actions">
          <IntentLink className="button" href="/diagnostico">Iniciar diagnóstico <span aria-hidden="true">→</span></IntentLink>
          <IntentLink className="button button-ghost" href="/capacidades">Ver servicios</IntentLink>
        </div>
        <p className="hero-detail">{homeIntro.detail}</p>
      </div>
    </section>
    <nav className="shell hero-phase-nav" aria-label="Etapas de un proyecto">{methodology.map((phase, index) => <IntentLink href={`/capacidades#${phase.phase}`} key={phase.phase}><span className="number">0{index + 1}</span><span>{phase.title}</span><span aria-hidden="true"><DiagonalArrow /></span></IntentLink>)}</nav>
    <section className="content-section home-advantages"><div className="shell">
      <SectionHeading eyebrow={`— ${homeProblems.eyebrow}`} title={homeProblems.title} intro={homeProblems.lead} />
      <ProjectApplications />
      <p className="application-scope">{homeProblems.scope}</p>
      <div className="inline-actions"><ArrowLink href="/capacidades/modelos-predictivos">Modelos para empresas</ArrowLink><ArrowLink href="/govtech">IA y datos para administraciones públicas</ArrowLink></div>
    </div></section>
    <section className="content-section home-capabilities"><div className="shell">
      <SectionHeading eyebrow="— Ámbitos de proyecto" title="Modelos, datos y sistemas de IA." intro="Desarrollo de modelos y sistemas para empresas, líneas de I+D y retos públicos. Podemos trabajar desde el problema o sobre una parte de vuestro sistema." />
      <ProjectAreas />
      <div className="inline-actions"><Link className="button button-ghost" href="/capacidades">Explorar todos los servicios</Link><ArrowLink href="/capacidades/investigacion-desarrollo">Investigación aplicada</ArrowLink></div>
    </div></section>
    <section className="content-section surface-section home-engagement"><div className="shell split">
      <SectionHeading eyebrow="— El punto de partida" title={homeEngagement.title} intro={homeEngagement.lead} />
      <ul className="stack-list">{homeEngagement.items.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul>
    </div></section>
    <section className={`content-section evidence-section ${projectStyles.evidence}`}><div className="shell evidence-layout">
      <div><SectionHeading eyebrow="— Evidencia" title={homeEvidence.title} intro={homeEvidence.lead} /><p className="application-scope">{homeEvidence.boundary}</p></div>
      <div className={`evidence-results ${projectStyles.evidencePanel}`}><p className="evidence-label">EXIST 2026 <span>Evaluación oficial</span></p><div className="impact-grid">{researchEvidence.results.slice(0, 3).map((result) => <div key={result}><div className="result-ranking"><strong>{result.split(" ")[0]}</strong><span>{result.match(/de \d+/)?.[0]}</span></div><p>{result.replace(/^\d\.º de \d+ en /, "")}</p></div>)}</div>
        <p>{researchEvidence.results[3]}</p>
        <div className="inline-actions"><Link className="button" href="/research/exist-2026">Revisar EXIST 2026</Link></div>
      </div>
    </div></section>
    <Methodology />
    <section className="content-section home-delivery"><div className="shell split">
      <div><SectionHeading eyebrow="— Entrega técnica" title={homeDelivery.title} intro={homeDelivery.lead} /><ArrowLink href="/faq">Preguntas sobre el alcance</ArrowLink></div>
      <ul className="stack-list">{homeDelivery.items.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul>
    </div></section>
    <Partners />
    <section className="content-section home-faq"><div className="shell split">
      <div><SectionHeading eyebrow="— Antes de iniciar un proyecto" title="Preguntas sobre modelos, datos e integración." intro="Alcance, evaluación y entrega técnica para empresas y administraciones." /><ArrowLink href="/faq">Preguntas sobre el proyecto</ArrowLink><br /><ArrowLink href="/diagnostico">Iniciar diagnóstico</ArrowLink></div>
      <div className="faq-list">{homeFaqs.map((faq, index) => <details key={faq.question}>
        <summary><span className="number">{String(index + 1).padStart(2, "0")}</span><h3>{faq.question}</h3><span aria-hidden="true">+</span></summary>
        <div className="faq-answer"><p>{faq.answer}</p><ArrowLink href={faq.href}>Ver el detalle</ArrowLink></div>
      </details>)}</div>
    </div></section>
    <section className={`content-section home-insights ${projectStyles.insights}`}><div className="shell">
      <SectionHeading eyebrow="— Guías técnicas" title="Decisiones de modelado, datos e integración." intro="Guías sobre problemas técnicos, con ejemplos y fuentes. Las propuestas se distinguen de los experimentos ejecutados y de los resultados de clientes." />
      <div className="cards-grid">{insights.filter((insight) => featuredInsightSlugs.has(insight.slug)).map((insight) => <article className="card" key={insight.slug}>
        <p className="insight-category">{capabilities.find((capability) => capability.slug === insight.relatedCapability)?.shortTitle ?? "Investigación aplicada"}</p>
        <h3>{insight.title}</h3><p>{insight.description}</p><ArrowLink href={"/insights/" + insight.slug}>Leer la guía</ArrowLink>
      </article>)}</div>
      <div className="inline-actions"><Link className="button button-ghost" href="/insights">Ver todas las preguntas</Link></div>
    </div></section>
    <Backers />
    <TrustPrograms />
    <ContactBand />
  </>;
}
