"use client";

import Image from "next/image";
import { DiagonalArrow } from "./diagonal-arrow";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/content/identity";
import { IntentLink } from "./intent-link";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const onDesktop = () => { if (desktop.matches) setOpen(false); };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header ref={header} className={`site-header${scrolled ? " is-scrolled" : ""}`} onBlur={(event) => {
      if (open && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <div className="shell header-inner">
        <Link className="brand" href="/" prefetch={false} aria-label="Ordantis, inicio" onClick={() => setOpen(false)}>
          <Image src="/brand/ordantis-logo.svg" alt="Ordantis" width={846} height={214} sizes="154px" priority />
        </Link>

        <button
          ref={menuButton}
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav${open ? " is-open" : ""}`}
          aria-label="Navegación principal"
        >
          <p className="mobile-nav-caption">Explora Ordantis</p>
          {primaryNavigation.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <IntentLink
                key={item.href}
                ref={index === 0 ? firstLink : undefined}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-nav-index" aria-hidden="true">0{index + 1}</span>{item.label}<span className="mobile-nav-arrow" aria-hidden="true"><DiagonalArrow /></span>
              </IntentLink>
            );
          })}
          <IntentLink className="button button-small" href="/diagnostico" onClick={() => setOpen(false)}>
            Iniciar diagnóstico <span aria-hidden="true">→</span>
          </IntentLink>
          <p className="mobile-nav-contact">O escríbenos a <a href="mailto:contacto@ordantis.com" onClick={() => setOpen(false)}>contacto@ordantis.com</a></p>
        </nav>
      </div>
    </header>
  );
}
