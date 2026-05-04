import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import artecoinLogo from "@/assets/partners/artecoin.svg";
import odeonLogo from "@/assets/partners/odeon.png";
import startupvLogo from "@/assets/backers/startupv.svg";
import sherpaLogo from "@/assets/backers/sherpa.svg";
import talentoJovenLogo from "@/assets/backers/talento-joven.svg";
import catedraHpLogo from "@/assets/backers/catedra-hp.png";
import incibeLogo from "@/assets/backers/incibe.svg";

gsap.registerPlugin(ScrollTrigger);

type Partner = { name: string; logo?: string; invert?: boolean };
const partners: Partner[] = [
  { name: "Artecoin", logo: artecoinLogo },
  { name: "Indiva" },
  { name: "Odeon Multicines", logo: odeonLogo },
  { name: "Cofriman" },
];
const partnersLoop = [...partners, ...partners, ...partners];

const backers: Partner[] = [
  { name: "StartupV", logo: startupvLogo, invert: true },
  { name: "Proyecto Sherpa", logo: sherpaLogo, invert: true },
  { name: "Premios Talento Joven", logo: talentoJovenLogo },
  { name: "Cátedra HP", logo: catedraHpLogo, invert: true },
  { name: "Incibe", logo: incibeLogo, invert: true },
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

const methodology = [
  { n: "01", title: "Estrategia", lead: "La IA no es una moda, es una herramienta de negocio.", points: ["Análisis de la situación e infraestructura actual", "Foco absoluto en rentabilidad y ROI", "Plan de ejecución por fases con KPIs claros"] },
  { n: "02", title: "Preparación", lead: "Datos de calidad para que la IA funcione.", points: ["Ingeniería de datos: arquitectura sólida y unificada", "Optimización y fiabilidad de información en tiempo real"] },
  { n: "03", title: "Implementación", lead: "Sistemas a medida, no plantillas genéricas.", points: ["Desarrollo e integración personalizada", "Implementación gradual desde piloto seguro", "IA segura y cumplimiento normativo"] },
  { n: "04", title: "Capacitación", lead: "Tu equipo, autónomo con la nueva tecnología.", points: ["Talleres prácticos sobre vuestra propia información", "Soporte y acompañamiento continuo"] },
];

const tech = [
  { label: "Infraestructura Cloud", items: ["AWS", "Google Cloud", "Microsoft Azure"] },
  { label: "Modelos de IA", items: ["OpenAI", "Anthropic", "Gemini"] },
  { label: "Integración", items: ["Oracle", "Salesforce", "ERPs líderes"] },
];

const backers = ["StartupV", "Proyecto Sherpa", "Premios Talento Joven", "Cátedra HP", "Incibe"];

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
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />

        <div className="container-luxe relative">
          <p className="hero-eyebrow text-eyebrow mb-8">— Datos · Inteligencia Artificial · Resultados</p>

          <h1 className="text-display text-[clamp(3rem,9vw,9rem)] mb-10">
            <span className="block hero-line">Rompe la</span>
            <span className="block hero-line">
              <span className="bg-gradient-accent bg-clip-text text-transparent">barrera</span> de entrada.
            </span>
          </h1>

          <p className="hero-sub max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            Conviértete en una empresa <em className="text-foreground not-italic">data-driven</em> y empieza a mejorar la eficiencia y disminuir costes — sin contratar un departamento técnico interno.
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

          <div className="hero-meta grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline">
            {[
              ["+5%", "Productividad"],
              ["−30%", "Inactividad"],
              ["−20%", "Costes mant."],
              ["24/7", "Operación IA"],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-6">
                <p className="text-display text-3xl text-primary mb-1">{k}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{v}</p>
              </div>
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
          <div className="flex gap-20 marquee-track w-max">
            {partnersLoop.map((name, i) => (
              <div key={i} className="text-display text-2xl md:text-3xl text-muted-foreground/60 hover:text-primary transition-colors whitespace-nowrap">
                {name}
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
              Basar las decisiones corporativas en la intuición ha dejado de ser viable. Las empresas que adoptan una cultura data-driven logran productividad, rentabilidad y resiliencia significativamente superiores. Democratizar la IA y construir una infraestructura sólida ya no es un lujo: es el factor que determina el crecimiento y la supervivencia.
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
      <section className="py-32">
        <div className="container-luxe">
          <div className="reveal max-w-3xl mb-20">
            <p className="text-eyebrow mb-6">— Metodología</p>
            <h2 className="text-display text-5xl md:text-7xl">
              Cuatro bloques. Una transformación garantizada.
            </h2>
          </div>

          <div className="space-y-px bg-hairline border-y border-hairline">
            {methodology.map((m) => (
              <div key={m.n} className="reveal bg-background py-12 group hover:bg-surface-1 transition-colors duration-500">
                <div className="container-luxe grid md:grid-cols-12 gap-8 items-start">
                  <p className="md:col-span-2 text-display text-5xl text-primary/70 group-hover:text-primary transition-colors">{m.n}</p>
                  <div className="md:col-span-4">
                    <h3 className="text-display text-3xl mb-3">{m.title}</h3>
                    <p className="text-muted-foreground italic">{m.lead}</p>
                  </div>
                  <ul className="md:col-span-6 space-y-3">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-3 text-foreground/80">
                        <span className="text-primary mt-2">—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-32 bg-surface-1/30">
        <div className="container-luxe">
          <div className="reveal max-w-3xl mb-16">
            <p className="text-eyebrow mb-6">— Tecnologías que dominamos</p>
            <h2 className="text-display text-4xl md:text-6xl">
              Las mejores herramientas. Implementadas con criterio.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {tech.map((t) => (
              <div key={t.label} className="reveal glass-card p-8">
                <p className="text-eyebrow text-primary mb-6">{t.label}</p>
                <ul className="space-y-3">
                  {t.items.map((i) => (
                    <li key={i} className="text-display text-2xl">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BACKED BY */}
      <section className="py-24 border-y border-hairline">
        <div className="container-luxe">
          <p className="reveal text-eyebrow text-center mb-10">— Respaldados por</p>
          <div className="reveal flex flex-wrap justify-center items-center gap-x-16 gap-y-6">
            {backers.map((b) => (
              <span key={b} className="text-display text-xl text-muted-foreground/80">{b}</span>
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
              Lo que los directivos nos preguntan.
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
              Convierte tus datos en tu <em className="not-italic text-primary">mayor ventaja</em>.
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
