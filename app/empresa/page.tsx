import { ContactBand } from "@/components/page-elements";
import { DiagonalArrow } from "@/components/diagonal-arrow";
import Image from "next/image";
import Link from "next/link";
import { TrustPrograms } from "@/components/trust-programs";
import { companyAchievements } from "@/content/original-sections";
import { JsonLd } from "@/components/json-ld";
import { companyPrinciples } from "@/content/home";
import { getStaticPage } from "@/content/pages";
import { createMetadata } from "@/lib/metadata";
import { webPageSchema } from "@/lib/schema";

const page = getStaticPage("/empresa")!;
export const metadata = createMetadata({ title: page.title, description: page.description, path: page.path });

export default function CompanyPage() {
  return <>
    <JsonLd data={webPageSchema({ path: page.path, title: page.title, description: page.description, type: "AboutPage" })} />
    <section className="page-hero"><div className="shell"><p className="eyebrow">— Sobre Ordantis</p><h1>Modelos y sistemas de<br />{" "}<em className="brand-text">inteligencia artificial</em><br />{" "}y datos.</h1><p className="lead">{page.lead}</p></div></section>
    {page.sections.map((section, index) => <section className={"content-section" + (index % 2 ? " surface-section" : "")} key={section.title}><div className="shell split">
      <div><p className="eyebrow">— {section.eyebrow ?? "Ordantis"}</p><h2>{section.title}</h2></div><div className="prose">{section.paragraphs.map((text) => <p key={text}>{text}</p>)}{section.items ? <ul className="stack-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}{section.links?.map((link) => <p key={link.path}><Link className="arrow-link" href={link.path}>{link.label} <span aria-hidden="true"><DiagonalArrow /></span></Link></p>)}</div>
    </div></section>)}
    <section className="content-section"><div className="shell"><p className="eyebrow">— Valores</p><h2>Cómo se ven en el trabajo.</h2><div className="principles-grid">{companyPrinciples.map((principle, index) => <article key={principle.title}><span className="number">0{index + 1}</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div></div></section>
    <section className="content-section surface-section"><div className="shell">
      <p className="eyebrow">— Ecosistema de innovación</p><h2>Programas y reconocimientos.</h2>
      <div className="achievements-grid">{companyAchievements.map((item) => <article key={item.title}>
        <div className="achievement-logo"><Image src={item.image} alt="" width={220} height={90} sizes="180px" /></div>
        <h3>{item.title}</h3><p>{item.text}</p>
        {"url" in item ? <a className="arrow-link" href={item.url}>Ver referencia <span aria-hidden="true"><DiagonalArrow /></span></a> : null}
      </article>)}</div>
    </div></section>
    <TrustPrograms /><ContactBand />
  </>;
}
