"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ServiceDetail } from "@/content/services";

const demos = {
  PredictionDemo: dynamic(() => import("./demos/original-demos").then((module) => module.PredictionDemo)),
  OptimizationDemo: dynamic(() => import("./demos/original-demos").then((module) => module.OptimizationDemo)),
  BIDemo: dynamic(() => import("./demos/original-demos").then((module) => module.BIDemo)),
  AgentDemo: dynamic(() => import("./demos/original-demos").then((module) => module.AgentDemo)),
  DocumentDemo: dynamic(() => import("./demos/original-demos").then((module) => module.DocumentDemo)),
  RAGDemo: dynamic(() => import("./demos/original-demos").then((module) => module.RAGDemo)),
  GovernanceDemo: dynamic(() => import("./demos/original-demos").then((module) => module.GovernanceDemo)),
  InfraDemo: dynamic(() => import("./demos/original-demos").then((module) => module.InfraDemo)),
  VisionDemo: dynamic(() => import("./demos/original-demos").then((module) => module.VisionDemo)),
};

type Props = {
  service: Pick<ServiceDetail, "id" | "number" | "title" | "summary" | "description" | "demo" | "demoNote">;
  children: ReactNode;
};

export function ServiceDisclosure({ service, children }: Props) {
  const details = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  const Demo = service.demo ? demos[service.demo] : null;
  return <details ref={details} className="service-detail" name="services" id={service.id} onToggle={(event) => setOpen(event.currentTarget.open)}>
    <summary><span className="number">{service.number}</span><div><h3>{service.title}</h3><p>{service.summary}</p></div><span className="square-arrow" aria-hidden="true">→</span></summary>
    <div className="service-detail-body">
      <div className="service-description">
        <div><h4>Descripción</h4><p>{service.description}</p></div>
      </div>
      {children}
      {Demo ? <div className="service-demo-surface">
          <h4>Ejemplo didáctico interactivo</h4>
          <p className="service-demo-caption">{service.demoNote}</p>
          {open ? <Demo /> : <p>Abre el servicio para utilizar la demostración interactiva.</p>}
        </div> : null}
      <button className="button button-ghost service-close" type="button" onClick={() => {
        if (details.current) {
          details.current.open = false;
          details.current.querySelector("summary")?.focus();
        }
      }}>Cerrar servicio <span aria-hidden="true">×</span></button>
    </div>
  </details>;
}

export function ServiceHashNavigation() {
  useEffect(() => {
    const openTarget = () => {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!(target instanceof HTMLDetailsElement) || !target.classList.contains("service-detail")) return;
      // Una ancla conservada puede estar ahora en el grupo complementario.
      // Abrir primero sus antecesores mantiene visibles los enlaces antiguos.
      for (let ancestor = target.parentElement; ancestor; ancestor = ancestor.parentElement) {
        if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
      }
      target.open = true;
      target.scrollIntoView({ block: "start", behavior: "instant" });
    };
    const frame = requestAnimationFrame(openTarget);
    window.addEventListener("hashchange", openTarget);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", openTarget); };
  }, []);
  return null;
}
