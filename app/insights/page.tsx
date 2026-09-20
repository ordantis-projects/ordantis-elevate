import Link from "next/link";
import { DiagonalArrow } from "@/components/diagonal-arrow";
import { PageHero } from "@/components/page-elements";
import { JsonLd } from "@/components/json-ld";
import { capabilities, insights } from "@/content/site";
import { getStaticPage } from "@/content/pages";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const { title, description, lead } = getStaticPage("/insights")!;
export const metadata = createMetadata({ title, description, path: "/insights" });

export default function InsightsPage() {
  return <>
    <JsonLd data={webPageSchema({ path: "/insights", title, description })} />
    <PageHero eyebrow="— Preguntas" title="Qué conviene resolver antes de construir." lead={lead}>
      <nav className="section-nav" aria-label="Temas de las guías">{capabilities.map((capability) => <a key={capability.slug} href={"#tema-" + capability.slug}>{capability.shortTitle}</a>)}</nav>
    </PageHero>
    {capabilities.map((capability) => <section className="content-section" id={"tema-" + capability.slug} key={capability.slug}><div className="shell split">
      <header><p className="eyebrow">— Preguntas sobre</p><h2>{capability.title}</h2><Link className="arrow-link" href={"/capacidades/" + capability.slug}>Método y entregables <span aria-hidden="true"><DiagonalArrow /></span></Link></header>
      <div className="question-index">{insights.filter((insight) => insight.relatedCapability === capability.slug).map((insight, index) => <article key={insight.slug}><span className="number">{String(index + 1).padStart(2, "0")}</span><div><h3><Link href={"/insights/" + insight.slug}>{insight.title}</Link></h3><p>{insight.description}</p></div></article>)}</div>
    </div></section>)}
  </>;
}
