import { Link } from "react-router-dom";
import logo from "@/assets/ordantis-logo.svg";

export const Footer = () => (
  <footer className="relative mt-32 border-t border-hairline">
    <div className="container-luxe py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <img src={logo} alt="Ordantis" className="h-8 w-auto brightness-0 invert mb-6" />
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
          Tu departamento externo de Datos e IA. Estrategia, infraestructura
          e implementación con ROI medible desde el primer piloto.
        </p>
      </div>
      <div>
        <p className="text-eyebrow mb-5">Navegación</p>
        <ul className="space-y-3 text-sm">
          <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
          <li><Link to="/solutions" className="hover:text-primary transition-colors">Soluciones</Link></li>
          <li><Link to="/about" className="hover:text-primary transition-colors">Nosotros</Link></li>
          <li><Link to="/assessment" className="hover:text-primary transition-colors">Diagnóstico</Link></li>
        </ul>
      </div>
      <div>
        <p className="text-eyebrow mb-5">Contacto</p>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li>hola@ordantis.com</li>
          <li>Valencia, España</li>
        </ul>
      </div>
    </div>
    <div className="hairline">
      <div className="container-luxe py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Ordantis. Todos los derechos reservados.</p>
        <p>Datos & IA · Hecho con precisión.</p>
      </div>
    </div>
  </footer>
);
