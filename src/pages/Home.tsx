import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { PhaseShape, type PhaseShapeKind } from "@/components/PhaseShape";
import flechaOrdantis from "@/assets/flecha_ordantis.svg";
import flechaOscura from "@/assets/flecha_oscura.svg";
import artecoinLogo from "@/assets/partners/artecoin.png";
import odeonLogo from "@/assets/partners/odeon.png";
import cofrimanLogo from "@/assets/partners/cofriman.png"
import indivaLogo from "@/assets/partners/indiva.svg";
import startupvLogo from "@/assets/backers/startupv.svg";
import startinfLogo from "@/assets/backers/logo_startinf.png";
import sherpaLogo from "@/assets/backers/sherpa.svg";
import catedraHpLogo from "@/assets/backers/catedra-hp.png";
// Adobe-exported SVGs with DOCTYPE/foreignObject quirks → inline as raw markup
import talentoJovenLogo from "@/assets/backers/talentojoven.png";
import incibeRaw from "@/assets/backers/incibe.svg?raw";

// Strip the XML prolog and DOCTYPE so the markup is safe to inject via innerHTML
const cleanSvgMarkup = (raw: string) => {
  const start = raw.indexOf("<svg");
  return start >= 0 ? raw.slice(start) : raw;
};
const incibeSvg = cleanSvgMarkup(incibeRaw);

gsap.registerPlugin(ScrollTrigger);

type Partner = { name: string; logo?: string; invert?: boolean; rawSvg?: string; url?: string };
const partners: Partner[] = [
  { name: "Artecoin", logo: artecoinLogo },
  { name: "Indiva", logo: indivaLogo },
  { name: "Odeon Multicines", logo: odeonLogo },
  { name: "Cofriman", logo: cofrimanLogo },
];
const partnersLoop = [...partners, ...partners, ...partners];

const backers: Partner[] = [
  { name: "StartupV", logo: startupvLogo },
  { name: "Start.inf - ETSINF (UPV)", logo: startinfLogo },
  { name: "Proyecto Sherpa", logo: sherpaLogo, url: "https://www.feda.es/actualidad/noticias/item/13650-el-programa-sherpa-de-feda-ya-tiene-los-ocho-finalistas-para-un-total-de-15-000-euros-en-premios" },
  { name: "Premios Talento Joven", logo: talentoJovenLogo, url: "https://www.levante-emv.com/comunitat-valenciana/2026/02/10/finalistas-premios-talento-joven-2026-126518511.html" },
  { name: "Cátedra HP", logo: catedraHpLogo },
  { name: "Incibe", rawSvg: incibeSvg, url: "https://www.incibe.es/node/619170" },
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

type DetailPoint = { title: string; body: string };
type ServiceLink = { num: string; title: string; id: string };
type MethodPhase = {
  n: string;
  tag: string;
  title: string;
  lead: string;
  intro: string[];
  pointsHeader: string;
  points: DetailPoint[];
  outro: string;
  services: ServiceLink[];
  shape: PhaseShapeKind;
};

const methodology: MethodPhase[] = [
  {
    n: "1",
    tag: "Fase 1",
    title: "Estrategia",
    lead: "Antes de invertir un solo euro en tecnología, hay que saber exactamente dónde está su empresa, dónde quiere llegar y qué camino le va a generar más rentabilidad. La estrategia es la fase donde transformamos las ganas de implementar IA en un plan concreto, medible y rentable.",
    intro: [
      "La mayoría de proyectos de IA fracasan no por problemas técnicos, sino porque se lanzaron sin una estrategia sólida detrás. Las empresas se dejan llevar por la presión del mercado, copian lo que hace la competencia o caen en manos de proveedores que les venden tecnología que no necesitan. El resultado siempre es el mismo: inversiones sin retorno y equipos frustrados.",
      "La fase de Estrategia existe para evitar exactamente eso. Es donde nos sentamos con la dirección, entendemos su modelo de negocio, sus restricciones financieras y sus objetivos reales, y construimos un mapa que conecta cada decisión tecnológica con un resultado concreto en el negocio.",
    ],
    pointsHeader: "Esta fase responde a tres preguntas fundamentales que ninguna empresa debería evitar:",
    points: [
      {
        title: "¿Dónde estamos realmente?",
        body: "No basta con intuiciones. Es imprescindible una evaluación objetiva del estado actual: qué infraestructura tecnológica existe, qué calidad tienen los datos, qué procesos están maduros y cuáles funcionan a base de Excel y voluntarismo. Sin este diagnóstico honesto, cualquier estrategia se construye sobre arena.",
      },
      {
        title: "¿Hacia dónde queremos ir y por qué?",
        body: "Implementar IA \"porque toca\" es una manera segura de perder dinero. La estrategia debe partir de objetivos de negocio concretos: aumentar la facturación, reducir costes operativos, mejorar la retención de clientes, acelerar el time-to-market. Cada inversión en tecnología debe estar atada a una métrica financiera o estratégica que la justifique.",
      },
      {
        title: "¿Cuál es el camino más rentable para llegar?",
        body: "Existen mil formas de transformar una empresa, pero solo unas pocas tienen sentido para cada caso concreto. La estrategia prioriza las iniciativas con mayor impacto y menor riesgo, define el orden lógico de ejecución y establece los hitos que permitirán a la dirección saber en cada momento si el proyecto está funcionando.",
      },
    ],
    outro: "Una buena fase de Estrategia ahorra meses de trabajo y cientos de miles de euros en pasos en falso. Es la inversión más rentable de toda la transformación, porque evita las decisiones equivocadas antes de tomarlas.",
    services: [
      { num: "1.1", title: "Auditoría de Madurez Digital y Datos", id: "auditoria" },
    ],
    shape: "cube",
  },
  {
    n: "2",
    tag: "Fase 2",
    title: "Preparación",
    lead: "La IA es un motor potente, pero necesita gasolina de calidad para funcionar. Si los datos de su empresa son un caos disperso, los resultados serán un caos amplificado. La fase de Preparación construye los cimientos sobre los que se sostendrá toda la transformación.",
    intro: [
      "Hay un problema universal en las empresas: los datos están dispersos, contradictorios y, con frecuencia, son inutilizables. Información de clientes en un sistema, ventas en otro, finanzas en un tercero, operaciones en hojas de cálculo que solo entienden tres personas. Cada departamento llama a un mismo concepto de manera distinta. Lo que en marketing se llama \"cliente\", en finanzas se llama \"cuenta\", y en logística \"destinatario\". Esta fragmentación no solo ralentiza el día a día: hace literalmente imposible aplicar IA con resultados fiables.",
      "La fase de Preparación existe para resolver este problema de raíz. No es la fase más visible ni la más vendible, pero es probablemente la más decisiva. Sin datos limpios, integrados y gobernados, cualquier modelo de inteligencia artificial generará predicciones incorrectas, los dashboards mostrarán números contradictorios y los agentes automatizados ejecutarán acciones equivocadas. Saltarse la Preparación es la causa principal por la que los proyectos de IA fracasan en su primer año.",
    ],
    pointsHeader: "Esta fase aborda tres dimensiones críticas:",
    points: [
      {
        title: "Construir una infraestructura sólida y escalable",
        body: "Su empresa necesita una arquitectura técnica que conecte todos los sistemas existentes (CRM, ERP, herramientas SaaS, bases de datos legacy) y los unifique en un ecosistema coherente. Ya sea en la nube, en local o en un modelo híbrido, los datos deben fluir de manera automática, segura y en tiempo real. Esta infraestructura es lo que permitirá, más adelante, desplegar cualquier solución de IA sin tener que reconstruir nada cada vez.",
      },
      {
        title: "Asegurar la calidad y fiabilidad de la información",
        body: "No basta con tener datos: tienen que ser correctos, consistentes, completos y actualizados. La depuración, deduplicación y estandarización de la información es un trabajo silencioso pero transformador. Cuando los equipos pueden confiar plenamente en los datos que ven en sus pantallas, la velocidad de toma de decisiones se multiplica y los errores operativos desaparecen.",
      },
      {
        title: "Establecer una gobernanza sólida",
        body: "Los datos son uno de los activos más valiosos de cualquier empresa, y también uno de los más sensibles. Definir quién accede a qué información, cómo se protege, cómo se cumplen las normativas (RGPD, sectoriales) y cómo se garantiza la trazabilidad es imprescindible. Una buena gobernanza no es burocracia: es el seguro que permite escalar la IA sin asumir riesgos legales ni reputacionales.",
      },
    ],
    outro: "Cuando esta fase se hace bien, todo lo que viene después fluye con facilidad. Cuando se hace mal o se omite, cada proyecto posterior arrastra problemas que se vuelven más caros de resolver con el tiempo.",
    services: [
      { num: "2.1", title: "Preparación de la Infraestructura de Datos", id: "infraestructura" },
      { num: "2.2", title: "Ingeniería de Datos y Limpieza de Información", id: "ingenieria" },
      { num: "2.3", title: "Gobernanza de Datos y Cumplimiento Normativo", id: "gobernanza" },
    ],
    shape: "cylinder",
  },
  {
    n: "3",
    tag: "Fase 3",
    title: "Implementación",
    lead: "Aquí es donde la inversión empieza a generar resultados visibles. La fase de Implementación es donde desplegamos las soluciones de IA que transforman los procesos de su empresa, siempre con un enfoque controlado y medible que asegura el éxito desde el primer día.",
    intro: [
      "Llega el momento de pasar del plan a la realidad. Tras una estrategia clara y unos cimientos sólidos, la fase de Implementación es donde se materializan los resultados que justifican toda la transformación. Pero implementar IA no es comprar software y darle al botón de \"instalar\". Es un proceso quirúrgico que requiere disciplina, control y una orientación obsesiva al ROI.",
      "Existe un mito peligroso en el mundo de la IA: el del \"big bang\", la idea de que una empresa puede transformarse de la noche a la mañana desplegando una gran solución que lo cambia todo. Es un mito que se cobra víctimas constantemente. Las transformaciones exitosas no son revolucionarias: son evolutivas. Empiezan con proyectos piloto pequeños, controlados, en áreas concretas donde el éxito es medible y el riesgo está acotado. Solo cuando esos pilotos demuestran resultados reales se escala al resto de la organización.",
    ],
    pointsHeader: "Esta fase se asienta en tres principios que evitan los errores más comunes:",
    points: [
      {
        title: "Implementación gradual y controlada",
        body: "No tiene sentido revolucionar toda la operativa de una empresa antes de saber si la solución funciona en un solo departamento. Empezamos por casos de uso específicos, los validamos con datos reales, ajustamos lo que haga falta y solo entonces expandimos. Este enfoque protege la operación diaria, construye confianza interna en cada paso y garantiza que cada euro invertido genera retorno.",
      },
      {
        title: "Soluciones a medida, no plantillas genéricas",
        body: "Cada empresa es única, y por tanto cada implementación debe diseñarse específicamente para resolver los problemas concretos de ese negocio, integrarse con sus sistemas existentes y respetar sus particularidades operativas. Las soluciones genéricas suelen ser baratas en el corto plazo y carísimas en el medio plazo, porque obligan a adaptar el negocio a la herramienta en lugar de adaptar la herramienta al negocio.",
      },
      {
        title: "Seguridad, ética y trazabilidad desde el primer día",
        body: "Cualquier sistema que se despliegue debe cumplir estrictamente la normativa, proteger la información sensible y mantener registros auditables de cada decisión que tome la IA. Para que la tecnología sea verdaderamente rentable, debe ser confiable. Una solución que genera dudas legales o expone datos confidenciales no es una ventaja: es un riesgo financiero.",
      },
    ],
    outro: "La fase de Implementación es donde se ven los resultados, pero solo si se ejecuta con la disciplina adecuada. Bien hecha, transforma procesos, libera tiempo, reduce costes y mejora decisiones. Mal hecha, genera frustración, pérdidas económicas y un rechazo interno que paraliza cualquier futuro intento de innovar.",
    services: [
      { num: "3.1", title: "Inteligencia de Negocio", id: "bi" },
      { num: "3.2", title: "Análisis Predictivo y Modelado de Escenarios", id: "prediccion" },
      { num: "3.3", title: "Optimización de Recursos y Procesos", id: "optimizacion" },
      { num: "3.4", title: "Automatización con Agentes de IA", id: "agentes" },
      { num: "3.5", title: "Automatización Inteligente de Documentos", id: "documentos" },
      { num: "3.6", title: "Sistemas de Búsqueda Semántica y RAG", id: "rag" },
      { num: "3.7", title: "Reconocimiento de Imágenes", id: "vision" },
    ],
    shape: "sphere",
  },
  {
    n: "4",
    tag: "Fase 4",
    title: "Capacitación",
    lead: "La mejor tecnología del mundo es un gasto inútil si los equipos siguen trabajando como hace diez años. La fase de Capacitación garantiza que su gente integre las nuevas herramientas en su rutina diaria con soltura, convicción y resultados.",
    intro: [
      "Hay una verdad incómoda que pocos consultores se atreven a decir en voz alta: la mayoría de las transformaciones digitales fracasan no por la tecnología, sino por las personas. No porque los equipos sean incapaces, sino porque nadie les ha acompañado realmente en el proceso de cambio. Se les entrega una herramienta, se les hace una formación de tres horas y se espera que la usen con naturalidad al día siguiente. No funciona así.",
      "Los empleados quieren usar IA para ser más eficientes. La barrera no es la voluntad, es la falta de un acompañamiento serio que les permita integrar las nuevas formas de trabajar en su día a día. La fase de Capacitación existe precisamente para cerrar esa brecha. No se trata de impartir clases teóricas, sino de transformar la mentalidad colectiva y construir competencias reales que se traduzcan en resultados medibles.",
    ],
    pointsHeader: "Esta fase aborda tres dimensiones imprescindibles para que la transformación sea sostenible:",
    points: [
      {
        title: "Capacitación práctica adaptada a cada rol",
        body: "Un director financiero no necesita aprender lo mismo que un operario de planta o que un comercial de campo. Los talleres deben construirse alrededor de los flujos de trabajo reales de cada departamento, usando los datos reales de la empresa y abordando los problemas concretos a los que cada equipo se enfrenta cada mañana. Cuando la formación es relevante, el aprendizaje es inmediato y la adopción es natural.",
      },
      {
        title: "Acompañamiento sostenido más allá de la formación inicial",
        body: "El verdadero reto no está en el primer taller, sino en lo que ocurre después. Cuando los empleados se enfrentan a sus tareas reales sin un formador a su lado, surgen dudas, fricciones y momentos de tentación de volver a los métodos antiguos. Si en ese punto crítico no hay soporte, todo el esfuerzo previo se evapora. Por eso, el acompañamiento continuo es lo que diferencia las transformaciones exitosas de las inversiones desperdiciadas.",
      },
      {
        title: "Gestión del cambio cultural",
        body: "Más allá de las herramientas concretas, una transformación profunda requiere un cambio de mentalidad colectiva. Los miedos sobre el futuro laboral, las resistencias políticas internas, las inercias departamentales: todo eso es real y debe abordarse con honestidad y método. Cuando se gestiona bien, la cultura se convierte en aceleradora del cambio. Cuando se ignora, se convierte en su principal enemigo.",
      },
    ],
    outro: "La Capacitación es la fase donde el retorno de inversión se consolida o se evapora. Es donde se decide si la tecnología desplegada se convierte en una ventaja competitiva real o en un proyecto bonito en una presentación. Y es la fase a la que más empresas dedican recursos insuficientes, con consecuencias previsibles.",
    services: [
      { num: "4.1", title: "Talleres Prácticos de IA y Capacitación Técnica", id: "talleres" },
    ],
    shape: "pyramid",
  },
];

const servicesOverview = [
  { num: "1", title: "Análisis Predictivo y Modelado de Escenarios" },
  { num: "2", title: "Optimización de Recursos y Procesos" },
  { num: "3", title: "Inteligencia de Negocio (BI)" },
  { num: "4", title: "Automatización con Agentes de IA" },
  { num: "5", title: "Automatización Inteligente de Documentos" },
  { num: "6", title: "Búsqueda Semántica y RAG" },
  { num: "7", title: "Gobernanza de Datos" },
  { num: "8", title: "Infraestructura de Datos" },
  { num: "9", title: "Visión por Computador" },
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
  const detailRef = useRef<HTMLDivElement>(null);
  const [openPhase, setOpenPhase] = useState<number | null>(null);
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

  useEffect(() => {
    if (openPhase === null) return;
    const id = window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [openPhase]);

  const togglePhase = (idx: number) =>
    setOpenPhase((prev) => (prev === idx ? null : idx));

  const phaseDetail = openPhase !== null ? methodology[openPhase] : null;

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
            <Link to="/services" className="hero-cta inline-flex items-center gap-3 px-7 py-4 border border-hairline text-sm font-medium uppercase tracking-[0.18em] hover:border-primary hover:text-primary transition-all duration-500">
              Ver servicios
            </Link>
          </div>

        </div>
      </section>

      {/* BACKED BY */}
      <section className="py-24 border-y border-hairline">
        <div className="container-luxe">
          <p className="reveal text-eyebrow text-center mb-10">— Respaldados por</p>
          <div className="reveal flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
            {backers.map((b) => {
              const content = b.rawSvg ? (
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
              );

              return (
                <div key={b.name} className="flex items-center justify-center h-20 opacity-90 hover:opacity-100 transition-opacity duration-500">
                  {b.url ? (
                    <a href={b.url} target="_blank" rel="noreferrer" aria-label={b.name} className="inline-flex items-center">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DATA-DRIVEN ADVANTAGE */}
      <section className="py-32">
        <div className="container-luxe">
          <div className="reveal max-w-3xl mb-20">
            <p className="text-eyebrow mb-6">— Súmate a la revolución tecnológica</p>
            <h2 className="text-display text-5xl md:text-7xl mb-8">
              La ventaja competitiva de ser <em className="italic text-primary">data-driven</em>.
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
              Cuatro fases. Una <em className="italic text-primary">transformación garantizada</em>.
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Hemos estructurado nuestra metodología en <span className="text-white font-medium">4 grandes bloques</span> para garantizar el éxito de tu transformación. Evaluamos tu caso para empezar por la fase que te corresponda.
            </p>
          </div>

          <div className="reveal space-y-6">
            {methodology.map((m, idx) => {
              const isActive = openPhase === idx;
              return (
                <Fragment key={m.n}>
                  <button
                    type="button"
                    onClick={() => togglePhase(idx)}
                    aria-expanded={isActive}
                    aria-controls={`phase-detail-${idx}`}
                    aria-label={`${isActive ? "Ocultar" : "Ver"} detalles de ${m.title}`}
                    className={`group relative w-full text-left transition-all duration-500 overflow-hidden cursor-pointer border ${
                      isActive
                        ? "bg-primary/10 border-primary"
                        : "bg-[hsl(215_60%_11%)] border-white/10 hover:border-primary/40"
                    }`}
                  >
                    <img
                      src={flechaOrdantis}
                      alt=""
                      aria-hidden="true"
                      className="absolute -top-6 -right-6 w-40 h-40 opacity-[0.08] group-hover:opacity-20 transition-opacity duration-500 rotate-[-25deg] pointer-events-none"
                    />

                    <div className="relative p-8 md:p-10 flex items-start gap-8 pointer-events-none">
                      <div className="flex-1 min-w-0">
                        <p className="text-eyebrow text-primary-glow mb-4">{m.tag}</p>
                        <h3 className="text-display text-3xl md:text-4xl text-white mb-4">
                          {m.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed max-w-3xl">
                          {m.lead}
                        </p>
                      </div>

                      <PhaseShape kind={m.shape} />

                      <span
                        className={`shrink-0 self-center inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground transition-all duration-500 ${
                          isActive ? "rotate-90" : "group-hover:translate-x-1 group-hover:bg-primary/90"
                        }`}
                      >
                        →
                      </span>
                    </div>
                  </button>

                  {isActive && phaseDetail && (
                    <div
                      ref={detailRef}
                      id={`phase-detail-${idx}`}
                      role="region"
                      aria-labelledby="phase-detail-title"
                      className="phase-detail border-2 border-primary/60 bg-[hsl(215_55%_13%)] relative overflow-hidden shadow-2xl shadow-primary/10"
                    >
                      <style>{`
                        @keyframes phase-detail-in {
                          from { opacity: 0; transform: translateY(-8px); max-height: 0; }
                          to   { opacity: 1; transform: translateY(0); max-height: 4000px; }
                        }
                        .phase-detail { animation: phase-detail-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
                      `}</style>

                      <div className="relative p-8 md:p-12 lg:p-16">
                        <div className="flex items-start justify-between gap-6 mb-12">
                          <p className="text-eyebrow text-primary-glow">— {phaseDetail.tag}</p>
                          <button
                            type="button"
                            onClick={() => setOpenPhase(null)}
                            className="group inline-flex items-center gap-3 px-5 py-3 border border-white/15 text-xs uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-colors"
                          >
                            Cerrar
                            <span className="inline-flex items-center justify-center w-7 h-7 bg-white/5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              ×
                            </span>
                          </button>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-10 mb-16">
                          <div className="lg:col-span-5">
                            <p className="text-display text-7xl text-primary/30 mb-4 tabular-nums">
                              {`0${phaseDetail.n}`}
                            </p>
                            <h3 id="phase-detail-title" className="text-display text-4xl md:text-6xl">
                              {phaseDetail.title}
                            </h3>
                          </div>
                          <div className="lg:col-span-7 lg:pt-6">
                            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                              {phaseDetail.lead}
                            </p>
                          </div>
                        </div>

                        <div className="max-w-3xl space-y-7 mb-16">
                          {phaseDetail.intro.map((p, i) => (
                            <p key={i} className="text-base md:text-lg text-white/75 leading-relaxed">
                              {p}
                            </p>
                          ))}
                          <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium">
                            {phaseDetail.pointsHeader}
                          </p>
                          <div className="space-y-7 pl-6 border-l border-primary/40">
                            {phaseDetail.points.map((p) => (
                              <div key={p.title}>
                                <h4 className="text-display text-xl md:text-2xl mb-3 text-white flex gap-3">
                                  <span className="text-primary-glow">—</span>
                                  {p.title}
                                </h4>
                                <p className="text-white/75 leading-relaxed">{p.body}</p>
                              </div>
                            ))}
                          </div>
                          <p className="text-base md:text-lg text-white/75 leading-relaxed">
                            {phaseDetail.outro}
                          </p>
                        </div>

                        <div>
                          <p className="text-eyebrow text-primary-glow mb-8">— Servicios asociados</p>
                          <div
                            className={`grid gap-px bg-white/5 border border-white/10 ${
                              phaseDetail.services.length === 1
                                ? "md:grid-cols-1"
                                : phaseDetail.services.length <= 3
                                ? "md:grid-cols-2 lg:grid-cols-3"
                                : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            }`}
                          >
                            {phaseDetail.services.map((s) => (
                              <Link
                                key={s.id}
                                to={`/services#${s.id}`}
                                className="group bg-[hsl(215_60%_11%)] hover:bg-[hsl(215_60%_14%)] p-8 transition-all duration-500 flex flex-col"
                              >
                                <p className="text-eyebrow text-primary tabular-nums mb-5">{s.num}</p>
                                <h4 className="text-display text-lg md:text-xl text-white group-hover:text-primary transition-colors mb-8 flex-1">
                                  {s.title}
                                </h4>
                                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 group-hover:text-primary group-hover:gap-4 transition-all">
                                  Ver servicio <span>→</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}
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
                    className={`w-auto object-contain ${
                      p.name === "Artecoin" || p.name === "Indiva"
                        ? "max-h-20"
                        : "max-h-16"
                    }`}
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
