import { useMemo, useState } from "react";

const DemoFrame = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="bg-surface-2/60 border border-hairline">
    <div className="flex items-center justify-between px-4 py-2 border-b border-hairline">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-foreground/20" />
        <span className="w-2 h-2 rounded-full bg-foreground/20" />
        <span className="w-2 h-2 rounded-full bg-foreground/20" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Slider = ({ value, onChange, label, min = 0, max = 100, suffix = "%" }: any) => (
  <div>
    <div className="flex justify-between text-xs mb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-primary tabular-nums">{value}{suffix}</span>
    </div>
    <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-primary cursor-pointer" />
  </div>
);

/* 01 — PREDICTION */
export const PredictionDemo = () => {
  const [marketing, setMarketing] = useState(50);
  const [season, setSeason] = useState(50);
  const [competition, setCompetition] = useState(50);

  const points = useMemo(() => {
    const base = 60;
    const arr: { x: number; y: number; future: boolean }[] = [];
    for (let i = 0; i < 24; i++) {
      const seasonalEffect = Math.sin((i / 24) * Math.PI * 2) * (season / 5);
      const noise = (Math.sin(i * 1.7) + Math.cos(i * 2.3)) * 4;
      const trend = i * 0.6;
      arr.push({ x: i, y: base + trend + seasonalEffect + noise, future: i >= 12 });
    }
    return arr.map((p) =>
      p.future
        ? { ...p, y: p.y + (marketing - 50) * 0.6 - (competition - 50) * 0.4 }
        : p
    );
  }, [marketing, season, competition]);

  const w = 480, h = 200, max = Math.max(...points.map((p) => p.y)) + 10, min = Math.min(...points.map((p) => p.y)) - 10;
  const path = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p.y - min) / (max - min)) * h;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");

  const splitX = (12 / 23) * w;

  return (
    <DemoFrame label="Simulador de demanda">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x={splitX} y="0" width={w - splitX} height={h} fill="hsl(var(--primary) / 0.05)" />
            <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#g)" />
            <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5"
              strokeDasharray={`${splitX} ${w - splitX}`} />
            <path d={path} fill="none" stroke="hsl(var(--primary-glow))" strokeWidth="1.5"
              strokeDasharray="4 4" pathLength="100"
              style={{ strokeDashoffset: -((splitX / w) * 100) }} />
            <line x1={splitX} y1="0" x2={splitX} y2={h} stroke="hsl(var(--hairline))" strokeDasharray="2 4" />
            <text x={splitX + 6} y="14" fill="hsl(var(--muted-foreground))" fontSize="10">Predicción IA</text>
          </svg>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Histórico</span><span>Hoy</span><span>+12 meses</span>
          </div>
        </div>
        <div className="space-y-5">
          <Slider value={marketing} onChange={setMarketing} label="Inversión marketing" />
          <Slider value={season} onChange={setSeason} label="Estacionalidad" />
          <Slider value={competition} onChange={setCompetition} label="Presión competencia" />
        </div>
      </div>
    </DemoFrame>
  );
};

/* 02 — OPTIMIZATION */
export const OptimizationDemo = () => {
  const [opt, setOpt] = useState(0);
  const trucks = [
    { from: [10, 30], to: [80, 20] }, { from: [20, 70], to: [70, 80] },
    { from: [15, 50], to: [85, 60] }, { from: [25, 20], to: [75, 90] },
    { from: [10, 90], to: [90, 40] },
  ];
  const points = Array.from({ length: 12 }).map((_, i) => ({ x: 15 + (i % 4) * 22, y: 20 + Math.floor(i / 4) * 25 }));
  const fuel = Math.round(100 - opt * 0.22);
  const time = Math.round(100 - opt * 0.3);

  return (
    <DemoFrame label="Optimización de rutas">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative aspect-[4/3] bg-surface-3/60 border border-hairline overflow-hidden">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {trucks.map((t, i) => {
              const optimized = opt > 50;
              const path = optimized
                ? `M${t.from[0]},${t.from[1]} L${t.to[0]},${t.to[1]}`
                : `M${t.from[0]},${t.from[1]} Q${50 + (i - 2) * 15},${50 + (i % 2) * 30} ${t.to[0]},${t.to[1]}`;
              return <path key={i} d={path} fill="none"
                stroke={optimized ? "hsl(var(--primary))" : "hsl(var(--destructive) / 0.6)"}
                strokeWidth="0.5" style={{ transition: "all 0.6s ease" }} />;
            })}
            {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="hsl(var(--primary-glow))" />)}
          </svg>
        </div>
        <div className="space-y-6">
          <Slider value={opt} onChange={setOpt} label="Activar IA" />
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs"><span>Combustible</span><span className={fuel < 85 ? "text-primary" : "text-destructive"}>−{100 - fuel}%</span></div>
              <div className="h-1 bg-hairline mt-1"><div className="h-full bg-primary transition-all duration-700" style={{ width: `${fuel}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-xs"><span>Tiempo conductor</span><span className={time < 85 ? "text-primary" : "text-destructive"}>−{100 - time}%</span></div>
              <div className="h-1 bg-hairline mt-1"><div className="h-full bg-primary transition-all duration-700" style={{ width: `${time}%` }} /></div>
            </div>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
};

/* 03 — BI */
export const BIDemo = () => {
  const filters = ["Ventas", "Marketing", "Operaciones", "Finanzas"];
  const [active, setActive] = useState(0);
  const data = [
    [{ k: "Ingresos", v: "€2.4M", d: "+18%" }, { k: "Margen", v: "32%", d: "+4pp" }, { k: "CAC", v: "€124", d: "−12%" }],
    [{ k: "Leads", v: "8.2K", d: "+22%" }, { k: "CTR", v: "4.8%", d: "+0.6" }, { k: "ROAS", v: "3.4x", d: "+0.4" }],
    [{ k: "OEE", v: "87%", d: "+3pp" }, { k: "SLA", v: "99.1%", d: "+0.4" }, { k: "Stock", v: "92%", d: "−5%" }],
    [{ k: "EBITDA", v: "€640K", d: "+15%" }, { k: "DSO", v: "38d", d: "−4d" }, { k: "Liquidez", v: "1.8x", d: "+0.2" }],
  ];
  const bars = [40, 65, 30, 75, 55, 80, 60][active] != null ? [40, 65, 30, 75, 55, 80, 60].map((b) => b + active * 5) : [];

  return (
    <DemoFrame label="Visión 360º">
      <div className="flex gap-1 mb-5 border-b border-hairline">
        {filters.map((f, i) => (
          <button key={f} onClick={() => setActive(i)}
            className={`px-3 py-2 text-xs uppercase tracking-wider transition-colors ${active === i ? "text-primary border-b border-primary -mb-px" : "text-muted-foreground hover:text-foreground"}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {data[active].map((d) => (
          <div key={d.k} className="bg-surface-3/60 p-4 border border-hairline">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.k}</p>
            <p className="text-display text-2xl mt-1">{d.v}</p>
            <p className="text-[10px] text-primary">{d.d}</p>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-2 h-24">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 bg-gradient-to-t from-primary/80 to-primary/20 transition-all duration-700"
            style={{ height: `${b}%` }} />
        ))}
      </div>
    </DemoFrame>
  );
};

/* 04 — AGENT */
export const AgentDemo = () => {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const tasks = ["Cuenta de email creada", "Invitación a Slack enviada", "Licencia de Jira asignada", "Contrato generado y firmado", "Agenda semana 1 enviada"];

  const run = () => {
    setRunning(true); setStep(0);
    tasks.forEach((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * 600));
    setTimeout(() => setRunning(false), tasks.length * 600 + 800);
  };

  return (
    <DemoFrame label="Onboarding integral">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-hairline p-4 bg-surface-3/40">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Manual · ~75 min</p>
          <ul className="space-y-2 text-xs text-muted-foreground/70">
            {tasks.map((t) => <li key={t} className="flex gap-2"><span>○</span>{t}</li>)}
          </ul>
        </div>
        <div className="border border-primary/40 p-4 bg-primary/5">
          <p className="text-[10px] uppercase tracking-wider text-primary mb-3">Agente IA · {"<"} 10s</p>
          <ul className="space-y-2 text-xs">
            {tasks.map((t, i) => (
              <li key={t} className={`flex gap-2 transition-all ${i < step ? "text-foreground" : "text-muted-foreground/40"}`}>
                <span className={i < step ? "text-primary" : ""}>{i < step ? "●" : "○"}</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={run} disabled={running}
        className="mt-5 w-full py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:shadow-glow transition-all disabled:opacity-50">
        {running ? "Ejecutando..." : "Iniciar onboarding de Marta"}
      </button>
    </DemoFrame>
  );
};

/* 05 — DOCUMENT */
export const DocumentDemo = () => {
  const [risk, setRisk] = useState<"Bajo" | "Alto">("Bajo");
  const [extra, setExtra] = useState(false);
  const [generated, setGenerated] = useState(false);
  return (
    <DemoFrame label="Ensamblador de contratos">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-hairline p-4 space-y-3 text-xs">
          <p className="text-eyebrow text-primary mb-3">— CRM</p>
          <div><span className="text-muted-foreground">Cliente:</span> Acme S.L.</div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Riesgo:</span>
            {(["Bajo", "Alto"] as const).map((r) => (
              <button key={r} onClick={() => { setRisk(r); setGenerated(false); }}
                className={`px-2 py-1 border ${risk === r ? "border-primary text-primary" : "border-hairline text-muted-foreground"}`}>{r}</button>
            ))}
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={extra} onChange={(e) => { setExtra(e.target.checked); setGenerated(false); }} />
            Producto adicional
          </label>
          <button onClick={() => setGenerated(true)}
            className="w-full mt-3 py-2 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em]">
            Generar documento
          </button>
        </div>
        <div className="border border-hairline p-4 bg-surface-3/40 min-h-[180px] text-[10px] leading-relaxed font-mono">
          {generated ? (
            <div className="space-y-1.5 animate-fade-in">
              <p className="text-foreground">CONTRATO DE SERVICIOS — <mark className="bg-primary/30 text-foreground">Acme S.L.</mark></p>
              <p className="text-muted-foreground">Cláusula 1. Objeto del contrato...</p>
              <p className="text-muted-foreground">Cláusula 2. Precios — <mark className="bg-primary/30 text-foreground">€{extra ? "48.000" : "32.000"}/año</mark></p>
              <p className="text-muted-foreground">Cláusula 3. SLA y soporte...</p>
              {risk === "Alto" && <p><mark className="bg-primary/30 text-foreground">Cláusula 7-bis. Seguridad reforzada (riesgo alto)</mark></p>}
              <p className="text-muted-foreground">— 15 páginas generadas en 0.8s</p>
            </div>
          ) : <p className="text-muted-foreground/60">Documento vacío. Pulsa "Generar".</p>}
        </div>
      </div>
    </DemoFrame>
  );
};

/* 06 — RAG */
export const RAGDemo = () => {
  const [step, setStep] = useState(0);
  const ask = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1000);
    setTimeout(() => setStep(3), 2000);
  };
  return (
    <DemoFrame label="Analista corporativo híbrido">
      <div className="space-y-3 text-xs">
        <div className="flex gap-2 text-[10px] mb-2">
          <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/30">● Servidor privado</span>
          <span className="px-2 py-1 bg-secondary/30 text-foreground border border-hairline">● Búsqueda web</span>
        </div>
        <div className="bg-surface-3/40 p-3 border border-hairline">
          <p className="text-muted-foreground">→ "Según nuestra política, ¿cuál es mi presupuesto diario máximo de viaje? Búscame 3 hoteles en Madrid que cumplan."</p>
        </div>
        {step >= 1 && <div className="bg-primary/5 p-3 border border-primary/20 animate-fade-in">
          <p className="text-primary text-[10px] mb-1">RAG PRIVADO</p>
          <p>Buscando en Política_Viajes_2026.pdf... <span className="text-primary">Presupuesto: 150€/noche</span></p>
        </div>}
        {step >= 2 && <div className="bg-secondary/20 p-3 border border-hairline animate-fade-in">
          <p className="text-muted-foreground text-[10px] mb-1">WEB</p>
          <p>Navegando: hoteles Madrid &lt;150€, valoración &gt;4★...</p>
        </div>}
        {step >= 3 && <div className="bg-surface-2/60 p-3 border border-hairline animate-fade-in">
          <p className="text-foreground/90">Tu límite es 150€ (pág. 4). 3 opciones: Hotel A (120€) · Hotel B (145€) · Hotel C (138€).</p>
        </div>}
        <button onClick={ask} disabled={step > 0 && step < 3}
          className="w-full py-2 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em]">
          {step === 0 ? "Enviar consulta" : step < 3 ? "Procesando..." : "Reiniciar"}
        </button>
        {step === 3 && <button onClick={() => setStep(0)} className="w-full text-[10px] text-muted-foreground">Reiniciar demo</button>}
      </div>
    </DemoFrame>
  );
};

/* 07 — GOVERNANCE */
export const GovernanceDemo = () => {
  const roles = ["Auditor", "Analista MKT", "Científico de datos"] as const;
  const [role, setRole] = useState<typeof roles[number]>("Auditor");
  const rows = [
    { name: "Ana García", email: "ana.garcia@email.com", phone: "+34 612 345 678", spend: "€2.340" },
    { name: "Luis Pérez", email: "luis.perez@email.com", phone: "+34 698 112 003", spend: "€1.180" },
    { name: "Marta Soto", email: "m.soto@email.com", phone: "+34 654 778 221", spend: "€3.910" },
  ];
  const mask = (v: string, type: "name" | "email" | "phone") => {
    if (role === "Auditor") return v;
    if (role === "Analista MKT") {
      if (type === "phone") return "***";
      if (type === "email") return v.replace(/^(.).+@/, "$1***@");
      return v;
    }
    if (type === "name" || type === "email") return "0x" + Math.abs(v.split("").reduce((a, c) => a + c.charCodeAt(0), 0)).toString(16);
    return "***";
  };

  return (
    <DemoFrame label="Catálogo de datos vivo">
      <div className="flex gap-1 mb-4">
        {roles.map((r) => (
          <button key={r} onClick={() => setRole(r)}
            className={`flex-1 px-2 py-2 text-[10px] uppercase tracking-wider border ${role === r ? "border-primary text-primary" : "border-hairline text-muted-foreground"}`}>{r}</button>
        ))}
      </div>
      <table className="w-full text-xs">
        <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-hairline">
          <tr><th className="text-left py-2">Nombre</th><th className="text-left">Email</th><th className="text-left">Teléfono</th><th className="text-right">Gasto</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-hairline/50">
              <td className="py-2">{mask(r.name, "name")}</td>
              <td className="font-mono">{mask(r.email, "email")}</td>
              <td className="font-mono">{mask(r.phone, "phone")}</td>
              <td className="text-right text-primary">{r.spend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DemoFrame>
  );
};

/* 08 — INFRA */
export const InfraDemo = () => (
  <DemoFrame label="Arquitectura de datos">
    <div className="grid grid-cols-3 gap-3 text-[10px]">
      <div className="space-y-2">
        <p className="text-eyebrow text-muted-foreground">Caos</p>
        {["Excel", "SQL legado", "JSON", "CRM", "ERP", "IoT"].map((s) => (
          <div key={s} className="border border-hairline/60 px-2 py-1.5 text-muted-foreground bg-surface-3/30">{s}</div>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-eyebrow text-primary">Orquestación</p>
        <div className="border border-primary/40 bg-primary/5 p-3 text-center">
          <p className="text-primary text-[10px]">CLOUD</p>
          <p className="font-mono">AWS · GCP · Azure</p>
        </div>
        <div className="border border-primary/40 bg-primary/5 p-3 text-center">
          <p className="text-primary text-[10px]">ON-PREM</p>
          <p className="font-mono">Servidores privados</p>
        </div>
        <div className="border border-primary bg-primary/10 p-3 text-center">
          <p className="font-mono text-foreground">Data Lakehouse</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-eyebrow text-muted-foreground">Salida</p>
        {["IA / ML", "Dashboards", "Apps de negocio", "API tiempo real"].map((s) => (
          <div key={s} className="border border-primary/30 px-2 py-1.5 bg-primary/5">{s}</div>
        ))}
      </div>
    </div>
    <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest">Mínima latencia · máxima trazabilidad · cero errores</p>
  </DemoFrame>
);

/* 09 — VISION */
export const VisionDemo = () => {
  const [ai, setAi] = useState(false);
  const [defect, setDefect] = useState(false);
  return (
    <DemoFrame label="Inspector de calidad">
      <div className="aspect-video bg-surface-3/60 border border-hairline relative overflow-hidden">
        <div className="absolute inset-0 flex items-center gap-6 px-8" style={{ animation: "marquee 4s linear infinite" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="relative w-12 h-12 bg-secondary/40 border border-hairline flex-shrink-0">
              {defect && i === 3 && <div className="absolute inset-2 border border-destructive" />}
              {ai && defect && i === 3 && (
                <div className="absolute -inset-1 border-2 border-destructive animate-pulse">
                  <span className="absolute -top-5 left-0 text-[9px] text-destructive whitespace-nowrap">Anomalía 99.7%</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {ai && <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(180deg, transparent 49%, hsl(var(--primary)) 50%, transparent 51%)",
          animation: "marquee 1.5s linear infinite reverse"
        }} />}
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={() => setAi((a) => !a)}
          className={`flex-1 py-2 text-[10px] uppercase tracking-[0.2em] border ${ai ? "bg-primary text-primary-foreground border-primary" : "border-hairline"}`}>
          IA: {ai ? "ON" : "OFF"}
        </button>
        <button onClick={() => setDefect((d) => !d)}
          className="flex-1 py-2 text-[10px] uppercase tracking-[0.2em] border border-hairline">
          {defect ? "Pieza ok" : "Forzar defecto"}
        </button>
      </div>
    </DemoFrame>
  );
};
