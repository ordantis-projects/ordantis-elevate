import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "./cookie-consent";
import { DiagonalArrow } from "./diagonal-arrow";
import { siteConfig } from "@/content/identity";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-brand-row">
        <div className="footer-brand">
          <Link className="footer-home" href="/" aria-label="Ordantis, inicio">
            <Image className="footer-logo" src="/brand/ordantis-logo.svg" alt="Ordantis" width={846} height={214} sizes="(max-width: 640px) 200px, 240px" />
          </Link>
          <p className="footer-summary">Machine learning, ciencia de datos y sistemas de IA.</p>
          <p className="footer-audience">Para empresas y administraciones públicas.</p>
        </div>
        <div className="footer-contact">
          <p className="footer-heading">Contacto</p>
          <a className="footer-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <Link className="footer-contact-link" href="/contacto">Información de contacto <DiagonalArrow /></Link>
        </div>
      </div>
      <div className="shell footer-grid">
        <nav className="footer-nav" aria-labelledby="footer-ordantis">
          <h2 className="footer-heading" id="footer-ordantis"><span aria-hidden="true">01</span> Ordantis</h2>
          <Link href="/capacidades">Servicios</Link>
          <Link href="/govtech">GovTech</Link>
          <Link href="/empresa">Empresa</Link>
          <Link className="footer-diagnostic" href="/diagnostico">Iniciar diagnóstico <DiagonalArrow /></Link>
        </nav>
        <nav className="footer-nav" aria-labelledby="footer-knowledge">
          <h2 className="footer-heading" id="footer-knowledge"><span aria-hidden="true">02</span> Conocimiento</h2>
          <Link href="/research">Research</Link>
          <Link href="/labs">Labs</Link>
          <Link href="/insights">Guías técnicas</Link>
          <Link href="/faq">Preguntas frecuentes</Link>
        </nav>
        <nav className="footer-nav footer-legal" aria-labelledby="footer-legal">
          <h2 className="footer-heading" id="footer-legal"><span aria-hidden="true">03</span> Información legal</h2>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/cookies">Cookies</Link>
          <CookieSettingsButton />
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>España</span>
      </div>
    </footer>
  );
}
