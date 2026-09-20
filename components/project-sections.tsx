import Link from "next/link";
import { dataAdvantages } from "@/content/original-sections";
import { homeProjectAreas, systemJourney } from "@/content/home";
import { DiagonalArrow } from "./diagonal-arrow";
import { ArrowLink } from "./page-elements";
import { ProjectVisual } from "./project-visuals";
import styles from "./project-design.module.css";

export function ProjectApplications() {
  return <div className={styles.applications}>{dataAdvantages.map((item, index) => <article className={styles.application} key={item.title}>
    <div className={styles.applicationCopy}>
      <p className={styles.kicker}><span className="number">0{index + 1}</span>{item.title}</p>
      <h3>{item.question}</h3>
      <p>{item.text}</p>
      <details className={styles.applicationDetail}>
        <summary>Datos de partida y evaluación <span aria-hidden="true">+</span></summary>
        <dl className={styles.applicationFacts}>
        <div><dt>Datos de partida</dt><dd>{item.inputs}</dd></div>
        <div><dt>Qué evaluamos</dt><dd>{item.evaluation}</dd></div>
        </dl>
      </details>
      <ArrowLink href={item.href}>{item.linkLabel}</ArrowLink>
    </div>
    <ProjectVisual kind={item.visual} description={item.diagram} />
  </article>)}</div>;
}

export function ProjectAreas() {
  return <div className={`${styles.areas} capability-overview`}>{homeProjectAreas.map((area, index) => <article key={area.path}>
    <Link className={`${styles.area} capability-row`} href={area.path}>
      <span className={`${styles.areaNumber} number`}>0{index + 1}</span>
      <div className={styles.areaCopy}><h3>{area.title}</h3><p>{area.description}</p></div>
      <span className={`${styles.areaArrow} overview-arrow`} aria-hidden="true"><DiagonalArrow /></span>
    </Link>
  </article>)}</div>;
}

export function SystemJourney() {
  return <section className={`${styles.systemJourney} content-section`}>
    <div className="shell">
      <header className={styles.journeyHeading}><h2>{systemJourney.title}</h2><p>{systemJourney.lead}</p></header>
      <ol className={styles.journeySteps}>{systemJourney.steps.map((step, index) => <li key={step.title}>
        <div className={styles.journeyNode}><span>0{index + 1}</span><span aria-hidden="true">→</span></div>
        <h3>{step.title}</h3><p>{step.text}</p>
      </li>)}</ol>
    </div>
  </section>;
}
