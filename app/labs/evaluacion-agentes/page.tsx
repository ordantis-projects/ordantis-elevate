import Link from "next/link";
import { AgentEvaluationLab } from "@/components/agent-evaluation-lab";
import { JsonLd } from "@/components/json-ld";
import { ContactBand, PageHero, SourceNote } from "@/components/page-elements";
import { agentEvaluationLab, agentEvaluationScenarios, defaultAgentPolicy } from "@/content/agent-evaluation";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, evaluationDatasetSchema, webPageSchema } from "@/lib/schema";

export const metadata = createMetadata({ title: agentEvaluationLab.title, description: agentEvaluationLab.description, path: agentEvaluationLab.path });

export default function AgentEvaluationLabPage() {
  return <>
    <JsonLd data={webPageSchema({ path: agentEvaluationLab.path, title: agentEvaluationLab.title, description: agentEvaluationLab.description })} />
    <JsonLd data={breadcrumbSchema([{ name: "Ordantis", path: "/" }, { name: "Labs", path: "/labs" }, { name: "Agent Evaluation Lab", path: agentEvaluationLab.path }])} />
    <JsonLd data={evaluationDatasetSchema({
      path: agentEvaluationLab.path,
      title: agentEvaluationLab.title,
      description: agentEvaluationLab.description,
      updatedAt: agentEvaluationLab.updatedAt,
      measurementTechnique: "Motor determinista de políticas con decisiones allow, require_approval y deny",
      keywords: ["evaluación de agentes de IA", "permisos de herramientas", "aprobación humana", "prompt injection", `${agentEvaluationScenarios.length} escenarios sintéticos`],
    })} />
    <PageHero eyebrow="Lab · evaluación reproducible" title={agentEvaluationLab.title} lead={agentEvaluationLab.lead} />
    <section className="content-section">
      <div className="shell">
        <SourceNote>{agentEvaluationLab.scope}</SourceNote>
        <h2>Cambia la política y observa qué deja pasar</h2>
        <AgentEvaluationLab scenarios={agentEvaluationScenarios} initialPolicy={defaultAgentPolicy} />
      </div>
    </section>
    <section className="content-section">
      <div className="shell narrow prose">
        <h2>Cómo se evalúa</h2>
        <ol>{agentEvaluationLab.method.map((item) => <li key={item}>{item}</li>)}</ol>
        <h2>Qué no demuestra esta prueba</h2>
        <ul>{agentEvaluationLab.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Para diseñar una política real</h2>
        <ul>{agentEvaluationLab.related.map((item) => <li key={item.path}><Link href={item.path}>{item.label}</Link></li>)}</ul>
        <p className="publication-date">Método 1.0.0</p>
      </div>
    </section>
    <ContactBand />
  </>;
}
