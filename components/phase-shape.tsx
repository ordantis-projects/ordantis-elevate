"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { PhaseShape as StaticShape } from "./brand-art";
import type { PhaseShapeKind } from "./phase-shape-scene";

const Scene = dynamic(() => import("./phase-shape-scene").then((module) => module.PhaseShapeScene), { ssr: false });

class ShapeFallback extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function PhaseShape({ kind }: { kind: PhaseShapeKind }) {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1536px)");
    let visible = false;
    const update = () => {
      const play = visible && desktop.matches && !motion.matches && document.visibilityState === "visible";
      setActive(play);
      if (play) setLoaded(true);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(node);
    motion.addEventListener("change", update);
    desktop.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return <div ref={host} className="phase-ornament" aria-hidden="true" data-motion={active ? "running" : "rest"}>
    <div className="phase-fallback"><StaticShape kind={kind} /></div>
    {loaded ? <ShapeFallback fallback={null}><div className="phase-canvas"><Scene kind={kind} active={active} /></div></ShapeFallback> : null}
  </div>;
}
