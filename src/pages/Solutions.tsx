import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PredictionDemo } from "@/components/demos/PredictionDemo";
import { OptimizationDemo } from "@/components/demos/OptimizationDemo";
import { BIDemo } from "@/components/demos/BIDemo";
import { AgentDemo } from "@/components/demos/AgentDemo";
import { DocumentDemo } from "@/components/demos/DocumentDemo";
import { RAGDemo } from "@/components/demos/RAGDemo";
import { GovernanceDemo } from "@/components/demos/GovernanceDemo";
import { InfraDemo } from "@/components/demos/InfraDemo";
import { VisionDemo } from "@/components/demos/VisionDemo";

type Solution = {
  id: string;
  num: string;
  title: string;
  description: string;
  cases: { sector: string; text: string }[];
  Demo: React.ComponentType;
};

const solutions: Solution[] = [
  {
    id: "prediccion",
    num: "01",
    title: "Análisis Predictivo y Modelado de Escenarios",
    description: "Transforma la incertidumbre en tu mayor ventaja competitiva. Anticipa la demanda, mitiga riesgos y toma decisiones estratégicas basadas en proyecciones de datos con una precisión muy elevada.",
    cases: [
      { sector: "Retail y Consumo", text: "Anticipa qué productos exactos se venderán en cada tienda y cuándo. Optimiza stock y maximiza la rotación de capital." },
      { sector: "Logística", text: "Pronostica picos de demanda y cuellos de botella en centros de distribución, dimensionando plantilla con semanas de antelación." },
      { sector: "Turismo", text: "Modela reservas con variables externas (clima, eventos) para predecir cancelaciones y lograr el 100% de ocupación." },
      { sector: "Energético", text: "Analiza datos históricos y meteorológicos para predecir picos energéticos y comprar en mercado mayorista en el momento más rentable." },
      { sector: "Financiero y Seguros", text: "Identifica patrones para predecir abandono y cancelación de pólizas. Anticípate con ofertas personalizadas de retención." },
    ],
    Demo: PredictionDemo,
  },
  {
    id: "optimizacion",
    num: "02",
    title: "Optimización de Recursos y Procesos",
    description: "Haz más con menos. Implementamos algoritmos matemáticos e Inteligencia Artificial para maximizar el rendimiento de tu capital, tu tiempo y tu equipo, resolviendo problemas operativos complejos en segundos.",
    cases: [
      { sector: "Logística", text: "Calcula rutas en tiempo real considerando tráfico, capacidad y combustible. Minimiza kilómetros en vacío." },
      { sector: "Sanidad", text: "Optimiza turnos médicos y asignación de quirófanos garantizando cobertura óptima frente a demanda de pacientes." },
      { sector: "Retail y Consumo", text: "Ajusta precios de miles de referencias en tiempo real según elasticidad, inventario y competencia." },
    ],
    Demo: OptimizationDemo,
  },
  {
    id: "bi",
    num: "03",
    title: "Inteligencia de Negocio (BI)",
    description: "Convierte el caos de datos en una ventaja estratégica. Centralizamos la información dispersa de tu empresa en paneles interactivos en tiempo real, democratizando el acceso para tomar decisiones rápidas y fundamentadas.",
    cases: [
      { sector: "Industrial", text: "Monitoriza el rendimiento de líneas de producción al segundo. Identifica cuellos de botella y aplica mejoras inmediatas." },
      { sector: "Finanzas y Seguros", text: "Integra paneles dinámicos en tu app: tus clientes monitorizan inversiones y pólizas en tiempo real con interfaz transparente." },
      { sector: "Sanidad", text: "Visualiza tiempos de espera, rotación de camas y eficiencia en asignación de recursos médicos." },
      { sector: "Retail y Consumo", text: "Unifica ventas físicas y online. Analiza rentabilidad por producto y rendimiento de campañas en un solo lugar." },
    ],
    Demo: BIDemo,
  },
  {
    id: "agentes",
    num: "04",
    title: "Automatización con Agentes de IA",
    description: "Libera a tu equipo del trabajo mecánico. Desplegamos sistemas capaces de interactuar con tus plataformas empresariales y ejecutar flujos de trabajo repetitivos de principio a fin, operando 24/7 sin supervisión constante.",
    cases: [
      { sector: "Atención al Cliente", text: "Agentes que interactúan con tu ERP para procesar devoluciones, rastrear envíos y aplicar descuentos sin intervención humana." },
      { sector: "Finanzas", text: "Monitoriza la bandeja de entrada, extrae datos de facturas, las cruza con órdenes de compra y programa pagos automáticamente." },
      { sector: "Recursos Humanos", text: "Crea cuentas, da accesos a herramientas, genera contratos y envía agendas automáticamente al contratar." },
      { sector: "Logística", text: "Detecta retrasos de contenedores, evalúa impacto, busca rutas alternativas y notifica al cliente proactivamente." },
    ],
    Demo: AgentDemo,
  },
  {
    id: "documentos",
    num: "05",
    title: "Automatización Inteligente de Documentos",
    description: "Deja de redactar el mismo documento dos veces. Utilizamos IA y PLN para extraer datos de tus sistemas y generar contratos, informes y propuestas complejas en segundos, eliminando el error humano.",
    cases: [
      { sector: "Recursos Humanos", text: "Generación de ofertas hiper-personalizadas, contratos adaptados a convenios y evaluaciones de desempeño automatizadas." },
      { sector: "Salud y Farmacéutica", text: "Notas de alta, historiales resumidos y documentación regulatoria cumpliendo estándares de privacidad." },
      { sector: "Finanzas y Banca", text: "Informes de riesgos, resúmenes de carteras y auditorías. Transformación de tablas en narrativas legibles." },
      { sector: "Legal", text: "Redacción automática de demandas, NDAs y contratos con cláusulas vigentes según jurisdicción." },
      { sector: "Inmobiliario", text: "Contratos de arras, alquiler, tasaciones dinámicas e informes hiperlocales en segundos." },
      { sector: "Seguros", text: "Pólizas personalizadas con coberturas dinámicas e informes de peritaje generados desde fotografías." },
    ],
    Demo: DocumentDemo,
  },
  {
    id: "rag",
    num: "06",
    title: "Búsqueda Semántica y RAG",
    description: "Une la seguridad de tus datos privados con el poder de internet en tiempo real. Crea asistentes híbridos que leen tus documentos internos y navegan por la web para resolver problemas complejos al instante.",
    cases: [
      { sector: "Atención al cliente", text: "Unifica wikis, manuales y tickets pasados. La IA da la solución exacta al instante reduciendo el MTTR drásticamente." },
      { sector: "Ingeniería", text: "Un operario consulta a la IA frente a un código de error y recibe los pasos de reparación exactos en segundos." },
      { sector: "Recursos Humanos", text: "Portal donde los empleados resuelven dudas sobre vacaciones, nóminas y procesos sin saturar a RRHH." },
      { sector: "Legal", text: "Interroga bases legales y repositorios de contratos históricos obteniendo resúmenes precisos y citas exactas." },
    ],
    Demo: RAGDemo,
  },
  {
    id: "gobernanza",
    num: "07",
    title: "Gobernanza de Datos",
    description: "La Inteligencia Artificial es tan buena como los datos que la alimentan. Estructuramos, limpiamos y protegemos tus activos para garantizar calidad, eliminar silos y asegurar el cumplimiento normativo estricto.",
    cases: [
      { sector: "Salud", text: "Acceso a millones de historiales clínicos para investigación con técnicas de enmascaramiento que cumplen RGPD/HIPAA." },
      { sector: "Finanzas y Seguros", text: "Rastrea el ciclo de vida de cada dato. Linaje exacto desde la transacción original hasta el panel final." },
      { sector: "Sector Público", text: "Clasifica automáticamente qué información es apta para portales de transparencia y qué debe permanecer clasificada." },
    ],
    Demo: GovernanceDemo,
  },
  {
    id: "infraestructura",
    num: "08",
    title: "Infraestructura de Datos",
    description: "Moderniza los cimientos tecnológicos de tu empresa con total soberanía sobre tu información. Diseñamos arquitecturas robustas en local, nube o entornos híbridos para eliminar cuellos de botella y preparar tu organización para el futuro de la IA.",
    cases: [
      { sector: "Industria", text: "Pipelines capaces de ingerir millones de eventos por segundo en planta, con latencia ultrabaja sin depender de internet." },
      { sector: "Sector Público y Banca", text: "Lagos de datos en centros 100% privados y desconectados, cumpliendo regulaciones de seguridad nacional." },
      { sector: "Salud", text: "Infraestructura local para procesar historiales e imágenes médicas dentro del hospital, garantizando privacidad total." },
    ],
    Demo: InfraDemo,
  },
  {
    id: "vision",
    num: "09",
    title: "Visión Computacional",
    description: "Automatiza la inspección visual con precisión sobrehumana. Entrenamos modelos de Machine Learning para analizar imágenes y vídeos en tiempo real, detectando defectos milimétricos y monitorizando entornos.",
    cases: [
      { sector: "Industrial", text: "Análisis de superficies en tiempo real para identificar arañazos, abolladuras o soldaduras defectuosas a alta velocidad." },
      { sector: "Sector Público", text: "Cámaras en flota municipal detectando baches, señales dañadas y mobiliario vandalizado, generando órdenes geolocalizadas." },
      { sector: "Agroalimentario", text: "Cámaras hiperespectrales que clasifican y detectan magulladuras invisibles en frutas y verduras a granel." },
    ],
    Demo: VisionDemo,
  },
];

const Solutions = () => {
  const [active, setActive] = useState(solutions[0].id);
  useScrollReveal();

  return (
    <div>
      {/* HERO */}
      <section className="pt-40 pb-24 bg-gradient-hero">
        <div className="container-luxe">
          <p className="text-eyebrow mb-8 reveal">— Soluciones</p>
          <h1 className="text-display text-[clamp(3rem,7vw,7rem)] max-w-5xl reveal">
            Nueve servicios. <span className="text-primary">Un objetivo:</span> resultados medibles.
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground reveal">
            Cada solución se diseña a medida para resolver problemas concretos de tu negocio. Explora la demo interactiva de cada servicio.
          </p>
        </div>
      </section>

      {/* INDEX BAR */}
      <section className="sticky top-20 z-30 border-y border-hairline bg-background/85 backdrop-blur-xl">
        <div className="container-luxe overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {solutions.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActive(s.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors whitespace-nowrap ${
                  active === s.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.num} · {s.title.split(":")[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <div className="divide-y divide-hairline">
        {solutions.map((s, i) => {
          const Demo = s.Demo;
          return (
            <section key={s.id} id={s.id} className="py-32 scroll-mt-32">
              <div className="container-luxe">
                <div className="grid lg:grid-cols-12 gap-12 mb-16">
                  <div className="lg:col-span-5 reveal">
                    <p className="text-display text-7xl text-primary/40">{s.num}</p>
                    <h2 className="text-display text-4xl md:text-5xl mt-6 mb-8">{s.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>

                  <div className="lg:col-span-7 reveal">
                    <div className="glass-card p-2 shadow-card">
                      <Demo />
                    </div>
                  </div>
                </div>

                <div className="reveal">
                  <p className="text-eyebrow mb-8">— Casos de uso</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
                    {s.cases.map((c) => (
                      <div key={c.sector} className="bg-background p-6 hover:bg-surface-1 transition-colors">
                        <p className="text-eyebrow text-primary mb-3">{c.sector}</p>
                        <p className="text-foreground/80 text-sm leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="py-24 text-center">
        <div className="container-luxe">
          <h3 className="text-display text-4xl md:text-5xl mb-8 reveal">
            ¿Cuál de estas soluciones encaja con tu negocio?
          </h3>
          <Link to="/assessment" className="reveal inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.2em] hover:shadow-glow transition-all duration-500">
            Iniciar diagnóstico <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
