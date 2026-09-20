import Link from "next/link";
import { DataQualityLab } from "@/components/data-quality-lab";
import { JsonLd } from "@/components/json-ld";
import { ContactBand, PageHero, SourceNote } from "@/components/page-elements";
import { dataQualityLab } from "@/content/labs";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export const metadata = createMetadata({ title: dataQualityLab.title, description: dataQualityLab.description, path: dataQualityLab.path });

export default function DataQualityLabPage() {
  return <>
    <JsonLd data={webPageSchema({ path: dataQualityLab.path, title: dataQualityLab.title, description: dataQualityLab.description })} />
    <JsonLd data={breadcrumbSchema([{ name: "Ordantis", path: "/" }, { name: "Labs", path: "/labs" }, { name: "Data Quality Lab", path: dataQualityLab.path }])} />
    <PageHero eyebrow="Lab · demo reproducible" title={dataQualityLab.title} lead={dataQualityLab.lead} />
    <section className="content-section">
      <div className="shell">
        <SourceNote>{dataQualityLab.scope}</SourceNote>
        <h2>Prueba el contrato</h2>
        <DataQualityLab />
      </div>
    </section>
    <section className="content-section">
      <div className="shell narrow prose">
        <h2>Cómo se calcula</h2>
        <ol>{dataQualityLab.method.map((item) => <li key={item}>{item}</li>)}</ol>
        <h2>Qué no demuestra esta prueba</h2>
        <ul>{dataQualityLab.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Del ejemplo al problema real</h2>
        <ul>{dataQualityLab.related.map((item) => <li key={item.path}><Link href={item.path}>{item.label}</Link></li>)}</ul>
        <p className="publication-date">Método 1.0.0</p>
      </div>
    </section>
    <ContactBand />
  </>;
}
