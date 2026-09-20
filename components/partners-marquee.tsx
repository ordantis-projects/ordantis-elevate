"use client";

import Image from "next/image";
import { useState } from "react";
import { originalPartners } from "@/content/home";

// Dos grupos de la misma anchura: al recorrer el primero, el segundo encaja
// exactamente en su lugar. Los duplicados visuales no se anuncian al lector.
export function PartnersMarquee() {
  const [paused, setPaused] = useState(false);
  return <section className="partners-section" aria-label="Empresas que confían en Ordantis">
    <div className="shell partners-heading">
      <p className="eyebrow">Empresas que confían en nosotros</p>
      <button type="button" className="marquee-control" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
        {paused ? "Reanudar movimiento" : "Pausar movimiento"}
      </button>
    </div>
    <div className="partners-window" data-paused={paused}>
      <div className="partners-track">
        {[0, 1].map((group) => <ul className="partners-group" key={group} aria-hidden={group === 1 ? true : undefined}>
          {[...originalPartners, ...originalPartners].map((item, index) => <li className="partner-logo" key={item.name + index} aria-hidden={index >= originalPartners.length ? true : undefined}>
            <Image src={item.image} alt={group === 0 && index < originalPartners.length ? item.name : ""} width={item.width} height={item.height} sizes="220px" className={index % 4 < 2 ? "partner-logo-tall" : undefined} />
          </li>)}
        </ul>)}
      </div>
    </div>
  </section>;
}
