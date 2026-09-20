import Image from "next/image";
import type { CSSProperties } from "react";

// Flechas pequeñas y distribución determinista recuperadas de la portada anterior.
export function BrandArrows() {
  return <div className="brand-arrows" aria-hidden="true">{Array.from({ length: 44 }, (_, index) => {
    const random = (n: number) => {
      const value = Math.sin((index + 1) * 12.9898 + n * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };
    return <Image key={index} src={`/brand/${random(1) < 0.42 ? "flecha_oscura" : "flecha_ordantis"}.svg`} alt="" width={64} height={64} className="brand-arrow" style={{
      left: `${2 + random(2) * 94}%`, width: `${10 + random(3) * 26}px`, opacity: 0.55 + random(4) * 0.4,
      "--duration": `${18 + random(5) * 22}s`, "--delay": `${-random(6) * 35}s`, "--rest-y": `${random(7) * 85}%`,
    } as CSSProperties} />;
  })}</div>;
}

// Las cuatro geometrías de la referencia; SVG mantiene su lectura sin WebGL.
export function PhaseShape({ kind }: { kind: "cube" | "cylinder" | "sphere" | "pyramid" }) {
  return <svg className="phase-shape" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    {kind === "cube" ? <><path d="m60 13 42 24v48l-42 24-42-24V37zM18 37l42 24 42-24M60 61v48" /><path opacity=".35" d="M60 13v48M18 85l42-24 42 24" /></> : null}
    {kind === "cylinder" ? <><ellipse cx="60" cy="26" rx="35" ry="13" /><path d="M25 26v67c0 18 70 18 70 0V26" /><ellipse cx="60" cy="93" rx="35" ry="13" opacity=".4" /><path d="M42 37v67M60 39v67M78 37v67" opacity=".35" /></> : null}
    {kind === "sphere" ? <><circle cx="60" cy="60" r="44" /><ellipse cx="60" cy="60" rx="24" ry="44" /><ellipse cx="60" cy="60" rx="8" ry="44" /><ellipse cx="60" cy="60" rx="44" ry="18" /><ellipse cx="60" cy="60" rx="44" ry="34" /><path d="M16 60h88M60 16v88" /></> : null}
    {kind === "pyramid" ? <><path d="m60 12 46 78-46 21-46-21zM60 12v99M14 90l46-19 46 19" /><path opacity=".35" d="M60 12v59" /></> : null}
  </svg>;
}
