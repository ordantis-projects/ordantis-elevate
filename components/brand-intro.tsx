"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./brand-intro.module.css";
import { brandIntroDuration as duration } from "@/lib/brand-intro";

// Memoria de esta carga de la web: no añade cookies ni almacenamiento persistente.
let hasPlayed = false;

export function BrandIntro() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = dialog.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const release = () => window.dispatchEvent(new Event("ordantis:intro-finished"));
    if (!document.documentElement.hasAttribute("data-brand-intro-pending")) return;
    if (!node || typeof node.showModal !== "function" || hasPlayed || motion.matches
      || window.location.hash || window.scrollY > 0 || document.visibilityState === "hidden"
      || navigation?.type === "back_forward"
      || (navigation && new URL(navigation.name).pathname !== "/")) { release(); return; }

    let timer: number | undefined;
    const clearTimer = () => window.clearTimeout(timer);
    const restorePosition = () => {
      // El foco nativo del diálogo no debe desplazar la portada al cerrarse.
      if (window.location.pathname === "/" && !window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    };
    const finish = () => {
      clearTimer();
      release();
      if (node.open) {
        node.close();
        restorePosition();
      }
    };
    const onClose = () => { clearTimer(); release(); restorePosition(); };
    const onCancel = (event: Event) => { event.preventDefault(); finish(); };
    const onMotionChange = () => { if (motion.matches) finish(); };
    const onVisibilityChange = () => { if (document.visibilityState === "hidden") finish(); };
    const onAnimationEnd = (event: AnimationEvent) => { if (event.target === node) finish(); };

    // Adopt the already-running server-rendered animation; never restart it.
    const frame = window.requestAnimationFrame(() => {
      if (!node.isConnected || document.activeElement !== document.body || window.scrollY > 0) { release(); return; }
      const elapsed = Number(node.getAnimations()[0]?.currentTime ?? 0);
      if (!document.documentElement.hasAttribute("data-brand-intro-pending") || elapsed >= duration) { release(); return; }
      node.showModal();
      hasPlayed = true;
      // Salida garantizada aunque el navegador no emita animationend.
      timer = window.setTimeout(finish, Math.max(0, duration - elapsed) + 100);
    });
    node.addEventListener("close", onClose);
    node.addEventListener("cancel", onCancel);
    node.addEventListener("animationend", onAnimationEnd);
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", finish);
    window.addEventListener("ordantis:intro-release", onRelease);
    function onRelease() { if (node?.open) { node.close(); restorePosition(); } }
    return () => {
      window.cancelAnimationFrame(frame);
      finish();
      node.removeEventListener("close", onClose);
      node.removeEventListener("cancel", onCancel);
      node.removeEventListener("animationend", onAnimationEnd);
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", finish);
      window.removeEventListener("ordantis:intro-release", onRelease);
    };
  }, []);

  return (
    <dialog ref={dialog} className={styles.intro} data-brand-intro aria-label="Bienvenida a Ordantis"
      style={{ "--intro-duration": `${duration}ms` } as CSSProperties}>
      <div className={styles.identity}>
        <div className={styles.stage}>
          <div className={styles.wordmark} data-intro-wordmark>
            <Image src="/brand/ordantis-logo.svg" alt="Ordantis" width={846} height={214} loading="eager" />
          </div>
          <div className={styles.sweep} data-intro-arrow aria-hidden="true">
            <Image src="/brand/flecha_ordantis.svg" alt="" width={275} height={439} loading="eager" />
          </div>
        </div>
        <p className={styles.caption}>Ciencia de Datos &amp; Inteligencia Artificial</p>
      </div>
      <form method="dialog" className={styles.skip}>
        <button type="submit" data-intro-skip>Saltar intro <span aria-hidden="true">→</span></button>
      </form>
    </dialog>
  );
}
