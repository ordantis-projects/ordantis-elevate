import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }
    );
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-32 pb-20 bg-gradient-hero">
      <div className="container-luxe max-w-3xl mx-auto text-center" ref={containerRef}>
        <p className="text-eyebrow text-primary mb-8">— Error 404</p>
        <h1 className="text-display text-[clamp(4rem,14vw,11rem)] leading-none mb-8">
          404
        </h1>
        <p className="text-display text-2xl md:text-4xl mb-6">
          Esta ruta no existe.
        </p>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-xl mx-auto">
          La página que buscas se ha movido o nunca formó parte de nuestro ecosistema.
          Volvamos al punto de partida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:shadow-glow transition-all duration-500"
          >
            Volver al inicio
            <span>→</span>
          </Link>
          <Link
            to="/assessment"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            Solicitar diagnóstico
          </Link>
        </div>

        <p className="mt-16 text-xs text-muted-foreground/60 font-mono break-all">
          {location.pathname}
        </p>
      </div>
    </section>
  );
};

export default NotFound;
