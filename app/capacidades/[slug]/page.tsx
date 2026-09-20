import type { Metadata } from "next";
import { DiagonalArrow } from "@/components/diagonal-arrow";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand, PageHero, SectionHeading } from "@/components/page-elements";
import { JsonLd } from "@/components/json-ld";
import { SourceReference } from "@/components/source-reference";
import { capabilities, getCapability, insights } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return capabilities.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return {};
  return createMetadata({ title: capability.title, description: capability.description, path: `/capacidades/${slug}` });
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();
  const path = `/capacidades/${slug}`;
  const relatedInsights = insights.filter((insight) => insight.relatedCapability === slug);

  return (
    <>
      <JsonLd data={webPageSchema({ path, title: capability.title, description: capability.description })} />
      <JsonLd data={serviceSchema({ path, name: capability.title, description: capability.description })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Ordantis", path: "/" },
        { name: "Capacidades", path: "/capacidades" },
        { name: capability.title, path },
      ])} />
      <PageHero eyebrow="Capacidad" title={capability.title} lead={capability.description}>
        <div className="answer-block">
          <p className="eyebrow">{capability.openingQuestion}</p>
          <p>{capability.directAnswer}</p>
        </div>
      </PageHero>

      <section className="content-section">
        <div className="shell split">
          <SectionHeading eyebrow="Encaje" title="Cuándo tiene sentido investigarlo" />
          <ul className="stack-list">
            {capability.suitableWhen.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionHeading eyebrow="Alcance de una primera prueba" title="Qué necesitamos y qué entregamos" intro="Este es el punto de partida para acordar el alcance. Datos, entregables y aceptación se concretan antes de iniciar la prueba." />
          <div className="split">
            <div><h3>Para empezar</h3><ul className="stack-list">{capability.engagement.inputs.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Entregables propuestos</h3><ul className="stack-list">{capability.engagement.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="service-acceptance">
            <h3>Cómo se acepta la prueba</h3><p>{capability.engagement.acceptance}</p>
            <h3>Qué queda fuera</h3><p>{capability.engagement.notIncluded}</p>
          </div>
          {slug === "data-intelligence" ? <p><Link className="arrow-link" href="/labs/calidad-datos">Probar Data Quality Lab con datos sintéticos <span aria-hidden="true"><DiagonalArrow /></span></Link></p> : null}
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionHeading eyebrow="Trabajo" title="De la pregunta al sistema" />
          <div className="cards-grid">
            {capability.work.map((item, index) => (
              <article className={`card ${index === 1 ? "card-blue" : ""}`} key={item.title}>
                <span className="number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell split">
          <div>
            <SectionHeading eyebrow="Decisiones" title="Qué debe quedar acordado" />
            <ul className="stack-list">{capability.decisions.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <SectionHeading eyebrow="Preguntas" title="Qué preguntamos antes de construir" />
            <ul className="stack-list">{capability.questions.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      {capability.references?.length ? (
        <section className="content-section">
          <div className="shell narrow prose">
            <h2>Referencias técnicas</h2>
            <p>Estándares y herramientas que usamos como referencia. Su inclusión no implica que todos sean necesarios en cada proyecto.</p>
            <ul>{capability.references.map((reference) => <li key={reference.url}><SourceReference source={reference} /></li>)}</ul>
          </div>
        </section>
      ) : null}

      {relatedInsights.length ? (
        <section className="content-section">
          <div className="shell">
            <SectionHeading
              eyebrow="Guías relacionadas"
              title={`Decisiones técnicas sobre ${capability.shortTitle.toLowerCase()}`}
              intro="Respuestas breves, controles y criterios de parada para comprobar el encaje antes de construir."
            />
            <div className="cards-grid">
              {relatedInsights.slice(0, 6).map((insight) => (
                <article className="card" key={insight.slug}>
                  <h3>{insight.title}</h3>
                  <p>{insight.description}</p>
                  <Link className="arrow-link" href={`/insights/${insight.slug}`}>Leer guía <span aria-hidden="true"><DiagonalArrow /></span></Link>
                </article>
              ))}
            </div>
            {relatedInsights.length > 6 ? <p><Link href="/insights">Ver todas las preguntas publicadas</Link></p> : null}
          </div>
        </section>
      ) : null}
      <ContactBand />
    </>
  );
}
