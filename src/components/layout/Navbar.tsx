import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/ordantis-logo.svg";
import { gsap } from "gsap";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/solutions", label: "Soluciones" },
  { to: "/about", label: "Nosotros" },
  { to: "/assessment", label: "Diagnóstico" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0.5 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [location.pathname]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-hairline"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex items-center justify-between h-20">
        <Link to="/" aria-label="Ordantis — Inicio" className="flex items-center gap-2">
          <img src={logo} alt="Ordantis" className="h-7 w-auto brightness-0 invert" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-5 py-2 text-sm font-medium transition-colors duration-300 relative ${
                  isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-6 bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/assessment"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-primary-foreground bg-primary hover:shadow-glow transition-all duration-500"
        >
          Empezar
          <span aria-hidden>→</span>
        </Link>

        <button
          aria-label="Abrir menú"
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="w-6 h-px bg-foreground mb-1.5" />
          <div className="w-6 h-px bg-foreground mb-1.5" />
          <div className="w-4 h-px bg-foreground ml-auto" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline bg-background/95 backdrop-blur-xl">
          <div className="container-luxe py-6 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-lg font-display ${isActive ? "text-primary" : "text-foreground/80"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
