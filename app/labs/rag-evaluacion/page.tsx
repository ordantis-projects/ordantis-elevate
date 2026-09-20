import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ContactBand, PageHero, SourceNote } from "@/components/page-elements";
import { RagBenchmarkLab } from "@/components/rag-benchmark-lab";
import { defaultRagBenchmarkParameters, ragBenchmarkDocuments, ragBenchmarkLab, ragBenchmarkQuestions } from "@/content/rag-benchmark";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, datasetSchema, webPageSchema } from "@/lib/schema";

export const metadata = createMetadata({ title: ragBenchmarkLab.title, description: ragBenchmarkLab.description, path: ragBenchmarkLab.path });

export default function RagBenchmarkPage() {
  return <>
    <JsonLd data={webPageSchema({ path: ragBenchmarkLab.path, title: ragBenchmarkLab.title, description: ragBenchmarkLab.description })} />
    <JsonLd data={breadcrumbSchema([{ name: "Ordantis", path: "/" }, { name: "Labs", path: "/labs" }, { name: "RAG Benchmark", path: ragBenchmarkLab.path }])} />
    <JsonLd data={datasetSchema({ path: ragBenchmarkLab.path, title: ragBenchmarkLab.title, description: ragBenchmarkLab.description, updatedAt: ragBenchmarkLab.updatedAt, documentCount: ragBenchmarkDocuments.length, questionCount: ragBenchmarkQuestions.length })} />
    <PageHero eyebrow="Lab · benchmark reproducible" title={ragBenchmarkLab.title} lead={ragBenchmarkLab.lead} />
    <section className="content-section">
      <div className="shell">
        <SourceNote>{ragBenchmarkLab.scope}</SourceNote>
        <h2>Prueba la regla de recuperación</h2>
        <RagBenchmarkLab documents={ragBenchmarkDocuments} questions={ragBenchmarkQuestions} initialParameters={defaultRagBenchmarkParameters} />
      </div>
    </section>
    <section className="content-section">
      <div className="shell narrow prose">
        <h2>Cómo se calcula</h2>
        <ol>{ragBenchmarkLab.method.map((item) => <li key={item}>{item}</li>)}</ol>
        <h2>Corpus controlado</h2>
        <p>La prueba utiliza el texto público de estas seis guías. No consulta Internet, documentación privada ni una base vectorial externa.</p>
        <ul>{ragBenchmarkDocuments.map((document) => <li key={document.id}><Link href={document.path}>{document.title}</Link></li>)}</ul>
        <h2>Qué no demuestra esta prueba</h2>
        <ul>{ragBenchmarkLab.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Para seguir con esta decisión</h2>
        <ul>{ragBenchmarkLab.related.map((item) => <li key={item.path}><Link href={item.path}>{item.label}</Link></li>)}</ul>
        <p className="publication-date">Método 1.0.0</p>
      </div>
    </section>
    <ContactBand />
  </>;
}
