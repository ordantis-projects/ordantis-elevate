"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const pending = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) { pending.add(entry.target); continue; }
        if (pending.has(entry.target) && !motion.matches) {
          // Original: y=40, duración 1s, entrada al 85% de la pantalla.
          // La animación no deja el HTML oculto si JavaScript no llega a cargar.
          animations.push(entry.target.animate([{ opacity: 0, transform: "translateY(40px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 1000, easing: "cubic-bezier(.22,1,.36,1)" }));
        }
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -15% 0px" });
    document.querySelectorAll(".section-heading, .advantages-grid article, .impact-grid > div, .method-phase, .achievements-grid article, .service-phase-heading").forEach((node) => observer.observe(node));
    const stop = () => { if (motion.matches) animations.forEach((animation) => animation.cancel()); };
    motion.addEventListener("change", stop);
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); motion.removeEventListener("change", stop); };
  }, [pathname]);
  return null;
}
