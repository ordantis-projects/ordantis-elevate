import { Link } from "react-router-dom";
import logo from "@/assets/ordantis-logo.svg";
import { useCookieConsent } from "@/lib/cookie-consent";

export const Footer = () => {
  const { openSettings } = useCookieConsent();
  return (
    <footer className="relative mt-32 border-t border-hairline">
      <div className="container-luxe py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <img src={logo} alt="Ordantis" className="h-8 w-auto mb-6" />
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            Tu departamento externo de Datos e IA. Estrategia, infraestructura
            e implementación con ROI medible desde el primer piloto.
          </p>
        </div>
        <div>
          <p className="text-eyebrow mb-5">Navegación</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Servicios</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Nosotros</Link></li>
            <li><Link to="/assessment" className="hover:text-primary transition-colors">Diagnóstico</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-eyebrow mb-5">Contacto</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>contacto@ordantis.com</li>
            <li>Albacete, España</li>
          </ul>
        </div>
      </div>
      <div className="hairline">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Ordantis. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-primary transition-colors">
                Política de Cookies
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={openSettings}
                className="hover:text-primary transition-colors"
              >
                Gestionar cookies
              </button>
            </li>
            <li className="text-muted-foreground/70">Datos &amp; IA</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
