import Link from "next/link";
import { DocumentIntelligenceLab } from "@/components/document-intelligence-lab";
import { JsonLd } from "@/components/json-ld";
import { ContactBand, PageHero, SourceNote } from "@/components/page-elements";
import {
  defaultDocumentExtractionPolicy,
  documentIntelligenceLab,
  extractionCandidates,
  syntheticContractPages,
} from "@/content/document-intelligence";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, evaluationDatasetSchema, webPageSchema } from "@/lib/schema";

export const metadata = createMetadata({
  title: documentIntelligenceLab.title,
  description: documentIntelligenceLab.description,
  path: documentIntelligenceLab.path,
});

export default function DocumentIntelligenceLabPage() {
  return <>
    <JsonLd data={webPageSchema({ path: documentIntelligenceLab.path, title: documentIntelligenceLab.title, description: documentIntelligenceLab.description })} />
    <JsonLd data={breadcrumbSchema([{ name: "Ordantis", path: "/" }, { name: "Labs", path: "/labs" }, { name: "Document Intelligence Lab", path: documentIntelligenceLab.path }])} />
    <JsonLd data={evaluationDatasetSchema({
      path: documentIntelligenceLab.path,
      title: documentIntelligenceLab.title,
      description: documentIntelligenceLab.description,
      updatedAt: documentIntelligenceLab.updatedAt,
      measurementTechnique: "Comprobación determinista de página y fragmento, contradicción, umbral de confianza y revisión según riesgo",
      keywords: ["inteligencia documental", "extracción documental", "evidencia exacta", "revisión humana", `${extractionCandidates.length} candidatos sintéticos`],
    })} />
    <PageHero eyebrow="Lab · inteligencia documental" title={documentIntelligenceLab.title} lead={documentIntelligenceLab.lead} />
    <section className="content-section">
      <div className="shell">
        <SourceNote>{documentIntelligenceLab.scope}</SourceNote>
        <h2>Cambia la política y comprueba cada extracción</h2>
        <DocumentIntelligenceLab pages={syntheticContractPages} candidates={extractionCandidates} initialPolicy={defaultDocumentExtractionPolicy} />
      </div>
    </section>
    <section className="content-section">
      <div className="shell narrow prose">
        <h2>Cómo se evalúa</h2>
        <ol>{documentIntelligenceLab.method.map((item) => <li key={item}>{item}</li>)}</ol>
        <h2>Qué no demuestra esta prueba</h2>
        <ul>{documentIntelligenceLab.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Guías para llevarlo a un proceso real</h2>
        <ul>{documentIntelligenceLab.related.map((item) => <li key={item.path}><Link href={item.path}>{item.label}</Link></li>)}</ul>
        <p className="publication-date">Método 1.0.0</p>
      </div>
    </section>
    <ContactBand />
  </>;
}
