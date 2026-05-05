import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

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

const FAQ = () => {
  useScrollReveal();

  return (
    <div>
      <section className="pt-40 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="container-luxe relative z-10">
          <p className="text-eyebrow mb-8">— Preguntas frecuentes</p>
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl mb-8 max-w-4xl">
            Lo que nos preguntan las <em className="not-italic text-primary">empresas</em>.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Resolvemos las dudas más habituales sobre nuestra metodología, seguridad, integración y resultados. ¿No encuentras tu pregunta? Pídenos un diagnóstico personalizado.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-luxe max-w-4xl">
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
      </section>

      <section className="py-24">
        <div className="container-luxe">
          <div className="reveal relative overflow-hidden border border-hairline bg-gradient-hero p-12 md:p-20 text-center">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <p className="text-eyebrow mb-6 relative">— ¿Sigues con dudas?</p>
            <h2 className="text-display text-4xl md:text-6xl mb-8 relative">
              Hablemos de tu <em className="italic text-primary">caso concreto</em>.
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

export default FAQ;
