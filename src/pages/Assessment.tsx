import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "sonner";

type Field =
  | { name: string; label: string; type: "single" | "multi"; options: string[] }
  | { name: string; label: string; type: "text"; placeholder?: string }
  | { name: string; label: string; type: "input"; placeholder?: string; required?: boolean; inputType?: string };

type Step = { eyebrow: string; title: string; subtitle: string; fields: Field[] };

const steps: Step[] = [
  {
    eyebrow: "01 · Perfil corporativo",
    title: "Establecemos el contexto.",
    subtitle: "Tu industria y escala operativa.",
    fields: [
      { name: "sector", label: "Sector de actividad", type: "single", options: ["Industrial / Manufactura", "Logística y Transporte", "Retail y Consumo", "Salud y Farmacéutico", "Finanzas y Seguros", "Energía", "Otros"] },
      { name: "size", label: "Tamaño de la plantilla", type: "single", options: ["1–10 empleados", "11–50 empleados", "51–250 empleados", "+250 empleados"] },
      { name: "revenue", label: "Rango de facturación anual", type: "single", options: ["Menos de 1M€", "1M€ – 5M€", "5M€ – 20M€", "Más de 20M€"] },
    ],
  },
  {
    eyebrow: "02 · Ecosistema digital",
    title: "Tu punto de partida.",
    subtitle: "Para garantizar una integración sin fricciones.",
    fields: [
      { name: "maturity", label: "Madurez digital autopercibida", type: "single", options: ["Inicial — procesos manuales", "Básico — Excel / Office", "Intermedio — ERP / CRM", "Avanzado — cultura de datos"] },
      { name: "infra", label: "Infraestructura de datos disponible", type: "multi", options: ["Servidores locales", "Cloud (AWS / Azure / GCP)", "Bases de datos SQL / NoSQL", "Datos en silos (Excel dispersos)", "Sin infraestructura centralizada"] },
    ],
  },
  {
    eyebrow: "03 · Visión estratégica",
    title: "Dónde la IA genera ROI.",
    subtitle: "Identificamos las oportunidades de mayor impacto.",
    fields: [
      { name: "goals", label: "Objetivos estratégicos prioritarios", type: "multi", options: ["Reducción de costes operativos", "Aumento de capacidad de producción", "Mejora de la experiencia del cliente", "Anticipación a la demanda", "Optimización de recursos"] },
      { name: "areas", label: "Áreas críticas de mejora", type: "multi", options: ["Mantenimiento predictivo", "Control de calidad (visión)", "Gestión de inventarios y logística", "Automatización administrativa", "Análisis de datos para decisiones", "Otro"] },
    ],
  },
  {
    eyebrow: "04 · Contexto y contacto",
    title: "Personalizamos tu informe.",
    subtitle: "Recibirás un diagnóstico adaptado a tu situación.",
    fields: [
      { name: "context", label: "Información adicional relevante", type: "text", placeholder: "Retos específicos, proyectos previos, contexto..." },
      { name: "fullName", label: "Nombre completo", type: "input", required: true },
      { name: "role", label: "Cargo", type: "input", required: true },
      { name: "email", label: "Email corporativo", type: "input", required: true, inputType: "email" },
      { name: "company", label: "Nombre de la compañía", type: "input", required: true },
      { name: "website", label: "Sitio web", type: "input", placeholder: "https://" },
    ],
  },
];

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stepRef.current) return;
    gsap.fromTo(stepRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  }, [step, submitted]);

  const set = (k: string, v: any) => setData((d) => ({ ...d, [k]: v }));
  const toggleMulti = (k: string, v: string) => {
    const arr: string[] = data[k] || [];
    set(k, arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      const required = ["fullName", "role", "email", "company"];
      if (required.some((r) => !data[r])) {
        toast.error("Por favor, completa los campos obligatorios.");
        return;
      }
      setSubmitted(true);
    }
  };
  const prev = () => step > 0 && setStep(step - 1);

  const progress = ((step + 1) / steps.length) * 100;

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center pt-32 pb-20 bg-gradient-hero">
        <div className="container-luxe text-center max-w-3xl mx-auto" ref={stepRef}>
          <p className="text-eyebrow mb-8">— Diagnóstico recibido</p>
          <h1 className="text-display text-5xl md:text-7xl mb-8">
            Gracias, <span className="text-primary">{data.fullName?.split(" ")[0] || "tú"}</span>.
          </h1>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Hemos recibido tu diagnóstico. Nuestro equipo analizará tus respuestas y te enviará un informe personalizado a <span className="text-foreground">{data.email}</span> en menos de 48 horas hábiles.
          </p>
          <button onClick={() => { setSubmitted(false); setStep(0); setData({}); }}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">
            ← Volver al inicio
          </button>
        </div>
      </section>
    );
  }

  const current = steps[step];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-hero">
      <div className="container-luxe max-w-4xl">
        {/* Progress */}
        <div className="mb-16">
          <div className="flex justify-between text-eyebrow mb-3">
            <span>Diagnóstico de madurez IA</span>
            <span className="text-primary tabular-nums">{step + 1} / {steps.length}</span>
          </div>
          <div className="h-px bg-hairline">
            <div className="h-full bg-primary transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div ref={stepRef}>
          <p className="text-eyebrow text-primary mb-6">{current.eyebrow}</p>
          <h1 className="text-display text-4xl md:text-6xl mb-4">{current.title}</h1>
          <p className="text-lg text-muted-foreground mb-12">{current.subtitle}</p>

          <div className="space-y-10">
            {current.fields.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-4">
                  {f.label}
                  {("required" in f && f.required) && <span className="text-primary ml-1">*</span>}
                </label>

                {f.type === "single" && (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {f.options.map((o) => (
                      <button key={o} type="button" onClick={() => set(f.name, o)}
                        className={`text-left px-5 py-4 border transition-all duration-300 ${
                          data[f.name] === o
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-hairline text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                        }`}>
                        <span className="text-sm">{o}</span>
                      </button>
                    ))}
                  </div>
                )}

                {f.type === "multi" && (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {f.options.map((o) => {
                      const active = (data[f.name] || []).includes(o);
                      return (
                        <button key={o} type="button" onClick={() => toggleMulti(f.name, o)}
                          className={`text-left px-5 py-4 border transition-all duration-300 flex items-center gap-3 ${
                            active
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-hairline text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                          }`}>
                          <span className={`w-3 h-3 border ${active ? "bg-primary border-primary" : "border-muted-foreground"}`} />
                          <span className="text-sm">{o}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {f.type === "input" && (
                  <input
                    type={f.inputType || "text"}
                    value={data[f.name] || ""}
                    placeholder={f.placeholder}
                    onChange={(e) => set(f.name, e.target.value)}
                    className="w-full bg-transparent border-b border-hairline px-0 py-3 text-lg focus:border-primary focus:outline-none transition-colors"
                  />
                )}

                {f.type === "text" && (
                  <textarea
                    value={data[f.name] || ""}
                    placeholder={f.placeholder}
                    onChange={(e) => set(f.name, e.target.value)}
                    rows={4}
                    className="w-full bg-transparent border border-hairline p-4 text-base focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-16 pt-8 border-t border-hairline">
            <button onClick={prev} disabled={step === 0}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed">
              ← Anterior
            </button>
            <button onClick={next}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:shadow-glow transition-all duration-500">
              {step === steps.length - 1 ? "Enviar diagnóstico" : "Continuar"}
              <span>→</span>
            </button>
          </div>
        </div>

        <p className="mt-16 text-xs text-muted-foreground/70 max-w-xl">
          Tus datos se tratarán bajo estrictos criterios de gobernanza y seguridad, asegurando el cumplimiento normativo.
        </p>
      </div>
    </div>
  );
};

export default Assessment;
