import Link from "next/link";
import { ContactBand, PageHero, SourceNote } from "@/components/page-elements";
import { JsonLd } from "@/components/json-ld";
import { SourceReference } from "@/components/source-reference";
import { researchEvidence } from "@/content/site";
import { createMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema";

const path = "/research/exist-2026";
export const metadata = createMetadata({ title: researchEvidence.title, description: researchEvidence.description, path, type: "article" });

export default function ExistResearchPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path, title: researchEvidence.title, description: researchEvidence.description })} />
      <JsonLd data={articleSchema({
        path,
        title: researchEvidence.title,
        description: researchEvidence.description,
        publishedAt: "2026-07-01",
        updatedAt: "2026-08-26",
        citations: researchEvidence.links.map((link) => link.url),
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Ordantis", path: "/" },
        { name: "Research", path: "/research" },
        { name: researchEvidence.title, path },
      ])} />
      <PageHero eyebrow="Research · CLEF 2026" title="GEMF: modelado multimodal para EXIST 2026" lead={researchEvidence.description} />

      <article className="content-section">
        <div className="shell narrow prose">
          <SourceNote>Las posiciones se toman del repositorio de la submission y del overview oficial de EXIST 2026. Mostramos también los resultados débiles y las limitaciones publicadas.</SourceNote>
          <h2>Qué se investigó</h2>
          {researchEvidence.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          <h2>Resultados oficiales</h2>
          <div>
            {researchEvidence.results.map((result) => <div className="research-result" key={result}><strong>{result.slice(0, 3)}</strong><span>{result.slice(4)}</span></div>)}
          </div>

          <h2>Qué aportó el experimento</h2>
          <ul>{researchEvidence.contributions.map((item) => <li key={item}>{item}</li>)}</ul>

          <h2>Limitaciones publicadas</h2>
          <ul>{researchEvidence.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>{researchEvidence.weakResult}</p>

          <h2>Fuentes y reproducción</h2>
          <ul>{researchEvidence.links.map((link) => <li key={link.url}><SourceReference source={link} /></li>)}</ul>
          <p>{researchEvidence.reproduction}</p>
          <p><Link href="/research">Volver a Research</Link></p>
        </div>
      </article>
      <ContactBand />
    </>
  );
}
