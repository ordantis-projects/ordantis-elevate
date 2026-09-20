import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SourceReference } from "@/components/source-reference";
import { ContactBand, PageHero } from "@/components/page-elements";
import { getCapability, getInsight, insights } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return insights.map(({ slug }) => ({ slug })); }

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return createMetadata({ title: insight.title, description: insight.description, path: `/insights/${slug}`, type: "article" });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const path = `/insights/${slug}`;
  const capability = getCapability(insight.relatedCapability)!;
  const related = insights.filter((item) => item.slug !== slug && item.relatedCapability === insight.relatedCapability).slice(0, 3);

  return (
    <>
      <JsonLd data={webPageSchema({ path, title: insight.title, description: insight.description })} />
      <JsonLd data={articleSchema({ path, title: insight.title, description: insight.description, publishedAt: insight.publishedAt, updatedAt: insight.updatedAt, citations: insight.sources?.map((source) => source.url) })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Ordantis", path: "/" },
        { name: "Preguntas", path: "/insights" },
        { name: insight.title, path },
      ])} />
      <PageHero eyebrow="Pregunta de investigación" title={insight.title} lead={insight.description}>
        <div className="answer-block"><p className="eyebrow">Respuesta breve</p><p>{insight.answer}</p></div>
      </PageHero>
      <article className="content-section">
        <div className="shell narrow prose">
          <h2>Contexto</h2>
          {insight.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <section className="worked-example" aria-labelledby="example-title">
            <p className="eyebrow">Ejemplo didáctico · situación inventada</p>
            <h2 id="example-title">{insight.example.title}</h2>
            <p>{insight.example.situation}</p>
            <p><strong>Qué decisión cambia. </strong>{insight.example.decision}</p>
          </section>
          <h2>Qué comprobar antes de empezar</h2>
          <ul>{insight.checks.map((item) => <li key={item}>{item}</li>)}</ul>
          <h2>Método de trabajo</h2>
          {insight.method.map((step) => <section key={step.title}><h3>{step.title}</h3><p>{step.text}</p></section>)}
          <h2>Señales para detener la prueba</h2>
          <ul>{insight.stopSignals.map((item) => <li key={item}>{item}</li>)}</ul>
          {insight.sources?.length ? (
            <>
              <h2>Fuentes</h2>
              <ul>{insight.sources.map((source) => <li key={source.url}><SourceReference source={source} />{source.note ? ` — ${source.note}` : ""}</li>)}</ul>
            </>
          ) : null}
          <h2>Para seguir con esta decisión</h2>
          <ul>{related.map((item) => <li key={item.slug}><Link href={`/insights/${item.slug}`}>{item.title}</Link></li>)}</ul>
          <p><Link href={`/capacidades/${insight.relatedCapability}`}>Servicio de {capability.title}: alcance y entregables</Link></p>
          {insight.relatedCapability === "data-intelligence" ? <p><Link href="/labs/calidad-datos">Probar las reglas en Data Quality Lab</Link></p> : null}
          <p className="publication-date">
            Publicado por Ordantis el <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>.
          </p>
        </div>
      </article>
      <ContactBand />
    </>
  );
}
