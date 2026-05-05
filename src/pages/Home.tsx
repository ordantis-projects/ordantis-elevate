import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import flechaOrdantis from "@/assets/flecha_ordantis.svg";
import flechaOscura from "@/assets/flecha_oscura.svg";
import artecoinLogo from "@/assets/partners/artecoin.png";
import odeonLogo from "@/assets/partners/odeon.png";
import cofrimanLogo from "@/assets/partners/cofriman.png"
import indivaLogo from "@/assets/partners/indiva.svg";
import startupvLogo from "@/assets/backers/startupv.svg";
import sherpaLogo from "@/assets/backers/sherpa.svg";
import catedraHpLogo from "@/assets/backers/catedra-hp.png";
import caixabankRaw from "@/assets/backers/caixabank.svg?raw";
import levanteRaw from "@/assets/backers/levante.svg?raw";
// Adobe-exported SVGs with DOCTYPE/foreignObject quirks → inline as raw markup
import talentoJovenRaw from "@/assets/backers/talento-joven.svg?raw";
import incibeRaw from "@/assets/backers/incibe.svg?raw";

// Strip the XML prolog and DOCTYPE so the markup is safe to inject via innerHTML
const cleanSvgMarkup = (raw: string) => {
  const start = raw.indexOf("<svg");
  return start >= 0 ? raw.slice(start) : raw;
};
const talentoJovenSvg = cleanSvgMarkup(talentoJovenRaw);
const incibeSvg = cleanSvgMarkup(incibeRaw);
const caixabankSvg = cleanSvgMarkup(caixabankRaw);
const levanteSvg = cleanSvgMarkup(levanteRaw);

gsap.registerPlugin(ScrollTrigger);

type Partner = { name: string; logo?: string; invert?: boolean; rawSvg?: string };
const partners: Partner[] = [
  { name: "Artecoin", logo: artecoinLogo },
  { name: "Indiva", logo: indivaLogo },
  { name: "Odeon Multicines", logo: odeonLogo },
  { name: "Cofriman", logo: cofrimanLogo },
];
const partnersLoop = [...partners, ...partners, ...partners];

const backers: Partner[] = [
  { name: "StartupV", logo: startupvLogo },
  { name: "Proyecto Sherpa", logo: sherpaLogo },
  { name: "Premios Talento Joven", rawSvg: talentoJovenSvg },
  { name: "CaixaBank", rawSvg: caixabankSvg },
  { name: "Levante", rawSvg: levanteSvg },
  { name: "Cátedra HP", logo: catedraHpLogo },
  { name: "Incibe", rawSvg: incibeSvg },
];

const impact = [
  { stat: "85%", text: "de las empresas españolas ya consideran la IA una prioridad estratégica para su supervivencia, pero carecen de hoja de ruta clara." },
  { stat: "7/10", text: "empresarios se sienten abrumados por la oferta tecnológica. La jerga técnica paraliza la toma de decisiones." },
  { stat: "0€", text: "en costes fijos de personal técnico interno. Accede a un departamento de IA y Datos completo bajo demanda." },
];

const advantages = [
  { title: "Productividad superior", body: "Las empresas que integran sistemáticamente análisis de datos en su toma de decisiones experimentan un aumento del 5–6% en productividad y producción." },
  { title: "Operaciones resilientes", body: "El mantenimiento predictivo con IA reduce el tiempo de inactividad no planificado un 30% y los costes de mantenimiento un 20%." },
  { title: "Innovación estratégica", body: "Aprovechar la ciencia de datos fomenta la introducción de mejores innovaciones en procesos y productos, asegurando supervivencia y liderazgo." },
];

type MethodPoint = { title: string; body: string };
type MethodPhase = {
  n: string;
  tag: string;
  title: string;
  lead: string;
  points: MethodPoint[];
};

const methodology: MethodPhase[] = [
  {
    n: "01",
    tag: "Fase 01",
    title: "Estrategia",
    lead: "La IA no es una moda, es una herramienta de negocio. Nos aseguramos de que la tecnología se adapte a tu negocio, y no al revés.",
    points: [
      {
        title: "Análisis de la Situación",
        body: "Evaluamos tu infraestructura actual (tu nube, tus datos, tu software) para detectar qué tienes y qué te falta. Sin tecnicismos: te decimos claramente dónde están los huecos que frenan tu crecimiento.",
      },
      {
        title: "Foco en Rentabilidad (ROI)",
        body: "Olvídate de \"hacer algo con IA\" solo por presión del mercado. Identificamos las oportunidades de alto impacto: aquellas que reducen costes o aumentan tus ventas. Si no es rentable para tu negocio, no lo proponemos.",
      },
      {
        title: "Plan de Ejecución Paso a Paso",
        body: "Nada de informes teóricos. Te entregamos un plan de acción claro y por fases: qué tecnología usar, qué inversión necesitas y qué resultados (KPIs) vamos a medir. Una hoja de ruta diseñada para crecer con seguridad.",
      },
    ],
  },
  {
    n: "02",
    tag: "Fase 02",
    title: "Preparación",
    lead: "La IA es un motor potente, pero necesita gasolina de calidad para funcionar. Si tus datos son un caos, los resultados serán un caos. Preparamos y modernizamos tu entorno para que puedas escalar.",
    points: [
      {
        title: "Ingeniería de Datos",
        body: "Transformamos la información dispersa en un ecosistema digital integrado. Diseñamos una arquitectura sólida que conecta todas tus herramientas actuales (CRM, ERP, Nube) para crear una base de datos centralizada, fiable y siempre accesible para todo tu equipo.",
      },
      {
        title: "Optimización y Fiabilidad de los Datos",
        body: "La agilidad de tu negocio depende de la precisión de tu información. Depuramos y estandarizamos tu entorno para asegurar la integridad de cada registro, garantizando que tu equipo y tus sistemas operen con información veraz en tiempo real, acelerando la toma de decisiones y mejorando la respuesta al cliente.",
      },
    ],
  },
  {
    n: "03",
    tag: "Fase 03",
    title: "Implementación",
    lead: "El 75% de los proyectos de IA fracasan porque se quedan en la teoría o usan plantillas genéricas. Nosotros construimos sistemas que se adaptan a tus operaciones, enfocados en dar resultados desde el primer día y generar confianza total.",
    points: [
      {
        title: "Desarrollo e Integración a Medida",
        body: "Tu empresa es única, y tu IA también debe serlo. Construimos sistemas de inteligencia artificial, como la automatización de procesos repetitivos o la asistencia inteligente en la toma de decisiones, diseñados para resolver tus problemas del día a día y obtener una gran ventaja competitiva.",
      },
      {
        title: "Implementación Gradual",
        body: "Las grandes mejoras tecnológicas no tienen por qué ser caóticas. Empezamos con proyectos piloto en áreas muy concretas para demostrar su rentabilidad en un entorno seguro. Solo cuando comprobamos que la herramienta funciona perfectamente y aporta valor, la expandimos al resto de la empresa sin frenar tu operativa diaria.",
      },
      {
        title: "IA Segura y Responsable",
        body: "Para que la IA sea rentable, debe ser confiable. Blindamos tus operaciones implementando sistemas éticos que protegen la privacidad de tus datos y cumplen estrictamente con la normativa. Una tecnología segura que reduce riesgos legales, retiene a tu talento y genera confianza en tus clientes.",
      },
    ],
  },
  {
    n: "04",
    tag: "Fase 04",
    title: "Capacitación",
    lead: "La mejor tecnología del mundo es un gasto inútil si tu equipo sigue trabajando como hace diez años. El 94% de los empleados quiere usar IA para ser más eficientes, pero casi nadie les enseña cómo. Nosotros cerramos esa brecha para que la transición sea un éxito.",
    points: [
      {
        title: "Talleres Prácticos",
        body: "Nada de clases teóricas aburridas ni ejemplos de empresas que no tienen nada que ver con la tuya. Diseñamos sesiones prácticas e interactivas donde tu equipo aprende a usar la IA aplicándola directamente sobre sus tareas diarias y vuestra propia información.",
      },
      {
        title: "Soporte y Acompañamiento Continuo",
        body: "Un cambio de mentalidad requiere un proceso. Nos comprometemos con el éxito de tu equipo a largo plazo ofreciendo seguimiento, guías prácticas y línea directa para consultas. Les acompañamos paso a paso para asegurar que integren las nuevas soluciones en su rutina con total soltura y sin bloqueos técnicos.",
      },
    ],
  },
];

const solutionsOverview = [
  { num: "01", title: "Análisis Predictivo y Modelado de Escenarios" },
  { num: "02", title: "Optimización de Recursos y Procesos" },
  { num: "03", title: "Inteligencia de Negocio (BI)" },
  { num: "04", title: "Automatización con Agentes de IA" },
  { num: "05", title: "Automatización Inteligente de Documentos" },
  { num: "06", title: "Búsqueda Semántica y RAG" },
  { num: "07", title: "Gobernanza de Datos" },
  { num: "08", title: "Infraestructura de Datos" },
  { num: "09", title: "Visión por Computador" },
];

const tech = [
  { label: "Infraestructura Cloud", items: ["AWS", "Google Cloud", "Microsoft Azure"] },
  { label: "Modelos de IA", items: ["OpenAI", "Anthropic", "Gemini"] },
  { label: "Integración", items: ["Oracle", "Salesforce", "ERPs líderes"] },
];



type HeroArrow = {
  dark: boolean;
  x: number;        // 0–100 (% horizontal)
  size: number;     // px
  opacity: number;  // 0–1
  dur: number;      // seconds for full upward sweep
  delay: number;    // negative seconds → start mid-cycle
};

// deterministic pseudo-random so SSR/CSR match
const heroArrows: HeroArrow[] = Array.from({ length: 44 }, (_, i) => {
  const r = (n: number) => {
    const s = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453;
    return s - Math.floor(s);
  };
  return {
    dark: r(1) < 0.42,
    x: r(2) * 100,
    size: 10 + r(3) * 26,        // 10–36 px
    opacity: 0.55 + r(4) * 0.4,  // 0.55–0.95
    dur: 18 + r(5) * 22,         // 18–40 s
    delay: -r(6) * 35,           // up to 35s into the loop
  };
});

const faqs = [
  { q: "¿Cuál es el ROI de implementar IA y cuándo veré resultados?", a: "Nuestra metodología exige que toda implementación tenga impacto directo en rentabilidad. Priorizamos casos de uso que reducen costes o aumentan ventas de manera medible. Para acelerar resultados, comenzamos con proyectos piloto en áreas concretas que demuestran valor rápidamente antes de escalar." },
  { q: "Nuestros datos están desorganizados o en silos. ¿Podemos empezar?", a: "Absolutamente. El primer paso de nuestra metodología es la Preparación. Transformamos tu información dispersa en un ecosistema digital integrado: depuramos, estandarizamos y conectamos tus herramientas actuales para crear una base de datos centralizada y fiable." },
  { q: "Mi equipo no tiene conocimientos técnicos avanzados. ¿Será un obstáculo?", a: "No. Incluimos un fuerte bloque de capacitación con talleres prácticos donde tu equipo aprende a usar la IA aplicándola directamente sobre sus tareas diarias. Además, ofrecemos acompañamiento continuo." },
  { q: "¿Están seguros nuestros datos confidenciales?", a: "La seguridad es el pilar de todas nuestras integraciones. Cumplimos RGPD estrictamente y, si lo requiere, desplegamos arquitecturas locales o en nube privada para que tu información sensible jamás quede expuesta a terceros ni entrene modelos públicos." },
  { q: "Somos una pyme, ¿no es la IA solo para grandes corporaciones?", a: "En absoluto. Las barreras de entrada han caído. Las pymes que adoptan tecnologías de datos compiten al nivel de grandes corporaciones. Al actuar como tu departamento externo de datos, accedes a esta tecnología sin asumir grandes costes fijos." },
  { q: "¿Se integrarán con el software que ya utilizamos?", a: "Sí. Nuestras soluciones se desarrollan a medida para integrarse de forma fluida con tu CRM, ERP o servicios cloud existentes. Potenciamos los sistemas que ya dominas, no te forzamos a cambiar todo." },
  { q: "¿Qué ocurre si la IA comete un error en un proceso automatizado?", a: "Implementamos de forma gradual bajo estrictos controles de calidad. Empezamos en pilotos para verificar que funciona antes de conectar a procesos críticos. Diseñamos las soluciones con trazabilidad total y supervisión humana donde sea estratégicamente necesario." },
  { q: "¿Qué ocurre tras la implementación técnica? ¿Nos dejan solos?", a: "No. Buscamos ser socios tecnológicos a largo plazo. Tras la implementación ofrecemos soporte continuado, guías prácticas y línea directa para consultas, asegurando que tu equipo integra las soluciones con total soltura." },
];

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  useScrollReveal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.6 })
        .from(".hero-line", { opacity: 0, y: 60, duration: 1, stagger: 0.1 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.5")
        .from(".hero-meta > *", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.4");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 bg-gradient-hero overflow-hidden">
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        {/* primary glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-3xl pointer-events-none" />

        {/* animated arrow field — drifts straight up */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {heroArrows.map((a, i) => (
            <img
              key={i}
              src={a.dark ? flechaOscura : flechaOrdantis}
              alt=""
              aria-hidden="true"
              className="absolute will-change-transform"
              style={{
                left: `${a.x}%`,
                bottom: 0,
                width: `${a.size}px`,
                height: "auto",
                opacity: a.opacity,
                animation: `hero-rise ${a.dur}s linear ${a.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes hero-rise {
            0%   { transform: translate(-50%, 25vh) rotate(-90deg); }
            100% { transform: translate(-50%, -130vh) rotate(-90deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="hero-rise"] { animation: none !important; }
          }
        `}</style>

        <div className="container-luxe relative z-10">
          <p className="hero-eyebrow text-eyebrow mb-8">— Ciencia de Datos & Inteligencia Artificial</p>

          <h1 className="text-display text-[clamp(3rem,9vw,9rem)] mb-10">
            <span className="block hero-line">Rompe la</span>
            <span className="block hero-line">
              <span className="bg-gradient-accent bg-clip-text text-transparent">barrera</span> de entrada.
            </span>
          </h1>

          <p className="hero-sub max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            Conviértete en una empresa <em className="text-foreground italic">data-driven</em> y empieza a mejorar la eficiencia y disminuir costes, sin contratar un departamento técnico interno.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-24">
            <Link to="/assessment" className="hero-cta group inline-flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground text-sm font-medium uppercase tracking-[0.18em] hover:shadow-glow transition-all duration-500">
              Diagnóstico gratuito
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link to="/solutions" className="hero-cta inline-flex items-center gap-3 px-7 py-4 border border-hairline text-sm font-medium uppercase tracking-[0.18em] hover:border-primary hover:text-primary transition-all duration-500">
              Ver soluciones
            </Link>
          </div>

        </div>
      </section>

      {/* BACKED BY */}
      <section className="py-24 border-y border-hairline">
        <div className="container-luxe">
          <p className="reveal text-eyebrow text-center mb-10">— Respaldados por</p>
          <div className="reveal flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
            {backers.map((b) => (
              <div key={b.name} className="flex items-center justify-center h-20 opacity-90 hover:opacity-100 transition-opacity duration-500">
                {b.rawSvg ? (
                  <div
                    role="img"
                    aria-label={b.name}
                    className="h-16 inline-flex items-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-[280px]"
                    dangerouslySetInnerHTML={{ __html: b.rawSvg }}
                  />
                ) : b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.name}
                    className={`max-h-16 w-auto object-contain ${b.invert ? "brightness-0 invert" : ""}`}
                  />
                ) : (
                  <span className="text-display text-xl text-muted-foreground/80">{b.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA-DRIVEN ADVANTAGE */}
      <section className="py-32">
        <div className="container-luxe">
          <div className="reveal max-w-3xl mb-20">
            <p className="text-eyebrow mb-6">— Súmate a la revolución tecnológica</p>
            <h2 className="text-display text-5xl md:text-7xl mb-8">
              La ventaja competitiva de ser <em className="not-italic text-primary">data-driven</em>.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Basar las decisiones corporativas en la intuición ha dejado de ser viable. Las empresas que adoptan una cultura data-driven logran productividad, rentabilidad y resiliencia significativamente superiores. Democratizar la IA y construir una infraestructura digital sólida ya no es un lujo: es el factor que determina el crecimiento y la supervivencia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-hairline border border-hairline">
            {advantages.map((a, i) => (
              <div key={a.title} className="reveal bg-background p-10 group hover:bg-surface-1 transition-colors duration-500">
                <span className="text-eyebrow text-primary">0{i + 1}</span>
                <h3 className="text-display text-2xl mt-6 mb-4">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-32 bg-surface-1/30">
        <div className="container-luxe">
          <div className="reveal grid md:grid-cols-3 gap-16">
            {impact.map((it) => (
              <div key={it.stat} className="reveal">
                <p className="text-display text-7xl md:text-8xl bg-gradient-accent bg-clip-text text-transparent mb-6">
                  {it.stat}
                </p>
                <p className="text-muted-foreground leading-relaxed">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="py-32 bg-[hsl(215_70%_8%)] text-white relative overflow-hidden">
        {/* decorative figures */}
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="container-luxe relative z-10">
          <div className="reveal max-w-3xl mb-16">
            <p className="text-eyebrow text-primary-glow mb-6">— Metodología</p>
            <h2 className="text-display text-5xl md:text-7xl mb-8">
              Cuatro fases. Una transformación garantizada.
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Hemos estructurado nuestra metodología en <span className="text-white font-medium">4 grandes bloques</span> para garantizar el éxito de tu transformación. Evaluamos tu caso para empezar por la fase que te corresponda.
            </p>
          </div>

          <div className="reveal grid md:grid-cols-2 gap-6">
            {methodology.map((m, idx) => {
              const isActive = activePhase === idx;
              return (
                <button
                  key={m.n}
                  type="button"
                  onClick={() => setActivePhase(isActive ? null : idx)}
                  aria-expanded={isActive}
                  className={`group relative text-left bg-[hsl(215_60%_11%)] border transition-all duration-500 overflow-hidden ${
                    isActive
                      ? "border-primary/60 shadow-[0_30px_80px_-30px_hsl(192_81%_43%/0.45)]"
                      : "border-white/8 hover:border-primary/40"
                  }`}
                >
                  {/* corner arrow figure */}
                  <img
                    src={flechaOrdantis}
                    alt=""
                    aria-hidden="true"
                    className="absolute -top-6 -right-6 w-40 h-40 opacity-[0.08] group-hover:opacity-20 transition-opacity duration-500 rotate-[-25deg]"
                  />

                  <div className="relative p-8 md:p-10 min-h-[260px] flex flex-col">
                    <p className="text-eyebrow text-primary-glow mb-12">{m.tag}</p>

                    <h3 className="text-display text-3xl md:text-4xl text-white mb-6 max-w-md">
                      {m.title}
                    </h3>

                    <p className="text-white/70 leading-relaxed mb-8 max-w-md">
                      {m.lead}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm uppercase tracking-[0.18em] text-white/80 group-hover:text-white transition-colors">
                        {isActive ? "Cerrar" : "Más información"}
                      </span>
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground transition-transform duration-500 ${
                          isActive ? "rotate-45" : "group-hover:translate-x-1"
                        }`}
                      >
                        {isActive ? "×" : "→"}
                      </span>
                    </div>

                    {/* expanded panel */}
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isActive ? "grid-rows-[1fr] opacity-100 mt-10" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-white/10 pt-8 space-y-6">
                          {m.points.map((p) => (
                            <div key={p.title}>
                              <h4 className="text-display text-lg text-white mb-2 flex gap-3">
                                <span className="text-primary-glow">—</span>
                                {p.title}
                              </h4>
                              <p className="text-white/70 leading-relaxed pl-6">{p.body}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLUTIONS OVERVIEW */}
      <section className="py-32">
        <div className="container-luxe">
          <div className="reveal grid lg:grid-cols-12 gap-16 mb-16">
            <div className="lg:col-span-5">
              <p className="text-eyebrow mb-6">— Soluciones</p>
              <h2 className="text-display text-5xl md:text-7xl mb-8">
                Un departamento de IA y datos, <em className="not-italic text-primary">a medida</em>.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-6">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Cubrimos toda la cadena de valor del dato: desde la infraestructura y la gobernanza, hasta la analítica avanzada, la automatización con agentes de IA y la visión por computador. Cada solución se diseña para integrarse con tu operativa y generar retorno medible desde el primer piloto.
              </p>
              <Link to="/solutions" className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-primary hover:gap-5 transition-all">
                Ver más información <span>→</span>
              </Link>
            </div>
          </div>

          <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
            {solutionsOverview.map((s) => (
              <Link
                key={s.num}
                to="/solutions"
                className="bg-background p-8 group hover:bg-surface-1 transition-colors duration-500 flex items-start gap-5"
              >
                <span className="text-eyebrow text-primary tabular-nums">{s.num}</span>
                <div className="flex-1">
                  <h3 className="text-display text-lg leading-snug group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                </div>
                <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="border-y border-hairline py-10 overflow-hidden">
        <div className="container-luxe mb-6">
          <p className="text-eyebrow text-center">Empresas que confían en nosotros</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-24 marquee-track w-max">
            {partnersLoop.map((p, i) => (
              <div key={i} className="flex items-center justify-center h-20 min-w-[220px] opacity-90 hover:opacity-100 transition-opacity duration-500">
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-16 w-auto object-contain"
                  />
                ) : (
                  <span className="text-display text-2xl md:text-3xl text-muted-foreground whitespace-nowrap">
                    {p.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32">
        <div className="container-luxe grid lg:grid-cols-12 gap-16">
          <div className="reveal lg:col-span-4">
            <p className="text-eyebrow mb-6">— Preguntas frecuentes</p>
            <h2 className="text-display text-4xl md:text-6xl mb-6">
              Lo que nos preguntan las empresas.
            </h2>
            <p className="text-muted-foreground">
              ¿Tienes una pregunta que no aparece aquí? Pídenos un diagnóstico personalizado.
            </p>
            <Link to="/assessment" className="inline-flex items-center gap-2 mt-8 text-primary hover:gap-4 transition-all">
              Hablar con nosotros <span>→</span>
            </Link>
          </div>
          <div className="reveal lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-hairline">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`f-${i}`} className="border-b border-hairline">
                  <AccordionTrigger className="py-6 text-left text-lg md:text-xl font-display hover:text-primary [&[data-state=open]]:text-primary">
                    <span className="flex gap-6 items-baseline">
                      <span className="text-xs text-muted-foreground tabular-nums">0{i + 1}</span>
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-12 pr-6 text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="container-luxe">
          <div className="reveal relative overflow-hidden border border-hairline bg-gradient-hero p-12 md:p-20 text-center">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <p className="text-eyebrow mb-6 relative">— Empieza hoy</p>
            <h2 className="text-display text-5xl md:text-7xl mb-8 relative">
              Convierte tus datos en tu <em className="italic text-primary">mayor ventaja</em>.
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-10 relative">
              Solicita un diagnóstico de madurez gratuito y recibe una hoja de ruta personalizada para tu empresa.
            </p>
            <Link to="/assessment" className="relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] hover:shadow-glow transition-all duration-500">
              Iniciar diagnóstico <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
