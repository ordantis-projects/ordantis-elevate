import Link from "next/link";
import { DiagonalArrow } from "@/components/diagonal-arrow";
import { ContactBand } from "@/components/page-elements";
import { JsonLd } from "@/components/json-ld";
import { companyFaqs, faqIntro } from "@/content/faq";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const { title, description } = faqIntro;
export const metadata = createMetadata({ title, description, path: "/faq" });

export default function FaqPage() {
  return <>
    <JsonLd data={{ ...webPageSchema({ path: "/faq", title, description, type: "FAQPage" }), mainEntity: companyFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
    <section className="page-hero"><div className="shell"><p className="eyebrow">— Preguntas frecuentes</p><h1>Antes de iniciar<br />{" "}un <em className="brand-text">proyecto de I+D.</em></h1><p className="lead">Viabilidad, modelos, datos y transferencia para administraciones públicas y empresas. Para decisiones de arquitectura y evaluación, puedes consultar las <Link href="/insights">guías técnicas</Link>.</p></div></section>
    <section className="content-section"><div className="shell faq-page-list"><div className="faq-list">{companyFaqs.map((faq, index) => <details name="company-faq" key={faq.question}>
      <summary><span className="number">{String(index + 1).padStart(2, "0")}</span><h2>{faq.question}</h2><span aria-hidden="true">+</span></summary>
      <div className="faq-answer"><p>{faq.answer}</p><Link className="arrow-link" href={faq.href}>Ver el detalle <span aria-hidden="true"><DiagonalArrow /></span></Link></div>
    </details>)}</div></div></section><ContactBand />
  </>;
}
