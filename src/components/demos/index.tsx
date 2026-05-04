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
type GovRole = "CEO" | "Project Manager" | "Developer";
type GovAccess = "full" | "read" | "masked" | "none";

export const GovernanceDemo = () => {
  const [tab, setTab] = useState<"access" | "flow">("access");
  const [selected, setSelected] = useState<GovRole[]>(["CEO"]);

  const roles: { id: GovRole; desc: string }[] = [
    { id: "CEO", desc: "Visión ejecutiva agregada" },
    { id: "Project Manager", desc: "Operación y métricas de equipo" },
    { id: "Developer", desc: "Acceso técnico a sistemas" },
  ];

  const databases = [
    { id: "Finanzas", icon: "€" },
    { id: "Clientes (PII)", icon: "◐" },
    { id: "Producción", icon: "⚙" },
    { id: "Marketing", icon: "◇" },
    { id: "Logs / Infra", icon: "</>" },
  ];

  const matrix: Record<GovRole, Record<string, GovAccess>> = {
    CEO: { Finanzas: "full", "Clientes (PII)": "masked", Producción: "read", Marketing: "read", "Logs / Infra": "none" },
    "Project Manager": { Finanzas: "read", "Clientes (PII)": "masked", Producción: "full", Marketing: "read", "Logs / Infra": "read" },
    Developer: { Finanzas: "none", "Clientes (PII)": "masked", Producción: "read", Marketing: "none", "Logs / Infra": "full" },
  };

  const accessLabel: Record<GovAccess, { label: string; cls: string }> = {
    full: { label: "Total", cls: "bg-primary/15 text-primary border-primary/40" },
    read: { label: "Lectura", cls: "bg-primary/5 text-foreground/80 border-primary/20" },
    masked: { label: "Anonimizado", cls: "bg-foreground/5 text-muted-foreground border-hairline" },
    none: { label: "Bloqueado", cls: "bg-transparent text-muted-foreground/40 border-hairline/50 line-through" },
  };

  const toggleRole = (r: GovRole) =>
    setSelected((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));

  const flowSteps = [
    { id: "src", title: "Fuentes", items: ["ERP", "CRM", "IoT", "Web"] },
    { id: "ingest", title: "Ingesta", items: ["Batch · Streaming"] },
    { id: "lake", title: "Data Lake", items: ["Bronze · Silver · Gold"] },
    { id: "gov", title: "Gobernanza", items: ["RBAC · Linaje · PII"] },
    { id: "api", title: "API / BI", items: ["Servicios · Modelos"] },
    { id: "app", title: "Aplicación", items: ["Dashboards · Producto"] },
  ];

  return (
    <DemoFrame label="Gobernanza de datos">
      {/* Tabs */}
      <div className="flex gap-1 mb-5 border-b border-hairline">
        {([
          { id: "access", label: "Acceso por rol" },
          { id: "flow", label: "Flujo de datos" },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-[10px] uppercase tracking-[0.18em] border-b-2 -mb-px transition-colors ${
              tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "access" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => {
              const on = selected.includes(r.id);
              return (
                <button
                  key={r.id}
                  onClick={() => toggleRole(r.id)}
                  className={`text-left px-3 py-2.5 border transition-all ${
                    on ? "border-primary bg-primary/10" : "border-hairline hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${on ? "text-primary" : "text-foreground"}`}>{r.id}</span>
                    <span className={`w-3 h-3 rounded-full border ${on ? "bg-primary border-primary" : "border-hairline"}`} />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{r.desc}</p>
                </button>
              );
            })}
          </div>

          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-hairline">
              <tr>
                <th className="text-left py-2 font-normal">Base de datos</th>
                {selected.length === 0 && <th className="text-right font-normal">—</th>}
                {selected.map((r) => (
                  <th key={r} className="text-center font-normal text-primary">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {databases.map((db) => (
                <tr key={db.id} className="border-b border-hairline/50">
                  <td className="py-2.5">
                    <span className="text-muted-foreground mr-2 font-mono">{db.icon}</span>
                    {db.id}
                  </td>
                  {selected.length === 0 && (
                    <td className="text-right text-[10px] text-muted-foreground">Selecciona un rol</td>
                  )}
                  {selected.map((r) => {
                    const a = matrix[r][db.id];
                    const meta = accessLabel[a];
                    return (
                      <td key={r} className="text-center py-2">
                        <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider border ${meta.cls}`}>
                          {meta.label}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-wrap gap-3 pt-2 text-[10px] text-muted-foreground">
            {(["full", "read", "masked", "none"] as GovAccess[]).map((a) => (
              <span key={a} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 border ${accessLabel[a].cls}`} />
                {accessLabel[a].label}
              </span>
            ))}
          </div>
        </div>
      )}

      {tab === "flow" && (
        <div className="animate-in fade-in duration-300">
          <div className="grid grid-cols-6 gap-2 items-stretch">
            {flowSteps.map((s, i) => (
              <div key={s.id} className="relative">
                <div className="border border-hairline bg-surface-3/40 p-2.5 h-full hover:border-primary/40 transition-colors">
                  <p className="text-[9px] uppercase tracking-wider text-primary mb-1.5">{`0${i + 1}`}</p>
                  <p className="text-xs font-medium mb-1.5">{s.title}</p>
                  {s.items.map((it) => (
                    <p key={it} className="text-[10px] text-muted-foreground font-mono leading-tight">{it}</p>
                  ))}
                </div>
                {i < flowSteps.length - 1 && (
                  <span className="hidden md:block absolute top-1/2 -right-1.5 -translate-y-1/2 text-primary/60 text-xs z-10">›</span>
                )}
              </div>
            ))}
          </div>

          {/* Animated pipeline */}
          <div className="relative mt-6 h-1 bg-hairline overflow-hidden">
            <div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{ animation: "flowSlide 2.8s linear infinite" }}
            />
          </div>
          <style>{`@keyframes flowSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>

          <div className="grid grid-cols-3 gap-2 mt-5 text-[10px]">
            {[
              { k: "Latencia", v: "< 200 ms" },
              { k: "Linaje", v: "End-to-end" },
              { k: "PII", v: "Cifrado en origen" },
            ].map((m) => (
              <div key={m.k} className="border border-hairline px-3 py-2">
                <p className="text-muted-foreground uppercase tracking-wider text-[9px]">{m.k}</p>
                <p className="text-primary font-mono mt-0.5">{m.v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
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
type Shape = "circle" | "square" | "triangle" | "star";

const ShapeIcon = ({ shape, className = "" }: { shape: Shape; className?: string }) => {
  const common = { fill: "currentColor", stroke: "none" } as const;
  return (
    <svg viewBox="0 0 24 24" className={className}>
      {shape === "circle" && <circle cx="12" cy="12" r="9" {...common} />}
      {shape === "square" && <rect x="3" y="3" width="18" height="18" {...common} />}
      {shape === "triangle" && <polygon points="12,3 22,21 2,21" {...common} />}
      {shape === "star" && (
        <polygon
          points="12,2 14.6,9 22,9.5 16.2,14 18.2,21 12,17 5.8,21 7.8,14 2,9.5 9.4,9"
          {...common}
        />
      )}
    </svg>
  );
};

// Three fixed "scenes", each with a layout of shapes.
const SCENES: { x: number; y: number; shape: Shape; rot: number; size: number }[][] = [
  [
    { x: 18, y: 28, shape: "circle", rot: 0, size: 22 },
    { x: 62, y: 22, shape: "triangle", rot: 12, size: 24 },
    { x: 38, y: 64, shape: "square", rot: -8, size: 20 },
    { x: 78, y: 70, shape: "star", rot: 18, size: 22 },
    { x: 25, y: 80, shape: "triangle", rot: -20, size: 18 },
  ],
  [
    { x: 22, y: 32, shape: "star", rot: -10, size: 22 },
    { x: 70, y: 30, shape: "circle", rot: 0, size: 26 },
    { x: 30, y: 70, shape: "square", rot: 14, size: 22 },
    { x: 65, y: 72, shape: "triangle", rot: 0, size: 20 },
    { x: 48, y: 45, shape: "circle", rot: 0, size: 16 },
  ],
  [
    { x: 20, y: 30, shape: "square", rot: 6, size: 22 },
    { x: 55, y: 25, shape: "star", rot: 22, size: 24 },
    { x: 80, y: 55, shape: "circle", rot: 0, size: 20 },
    { x: 35, y: 72, shape: "triangle", rot: -14, size: 22 },
    { x: 70, y: 78, shape: "star", rot: -6, size: 18 },
  ],
];

export const VisionDemo = () => {
  const shapes: Shape[] = ["circle", "square", "triangle", "star"];
  const labels: Record<Shape, string> = {
    circle: "Círculo",
    square: "Cuadrado",
    triangle: "Triángulo",
    star: "Estrella",
  };
  const [target, setTarget] = useState<Shape>("star");
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);

  const run = (next: Shape) => {
    setTarget(next);
    setDone(false);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setDone(true);
    }, 1400);
  };

  return (
    <DemoFrame label="Reconocimiento de figuras">
      <div className="space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Selecciona la figura objetivo
          </p>
          <div className="grid grid-cols-4 gap-2">
            {shapes.map((s) => (
              <button
                key={s}
                onClick={() => run(s)}
                className={`flex flex-col items-center gap-1 py-3 border transition-colors ${
                  target === s
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-hairline text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                <ShapeIcon shape={s} className="w-5 h-5" />
                <span className="text-[9px] uppercase tracking-wider">{labels[s]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {SCENES.map((scene, idx) => (
            <div
              key={idx}
              className="relative aspect-square bg-surface-3/60 border border-hairline overflow-hidden"
            >
              {/* Shapes */}
              {scene.map((item, i) => {
                const matches = item.shape === target;
                const reveal = done && matches;
                return (
                  <div
                    key={i}
                    className={`absolute transition-colors duration-300 ${
                      reveal ? "text-primary" : "text-foreground/40"
                    }`}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${item.size}%`,
                      height: `${item.size}%`,
                      transform: `translate(-50%, -50%) rotate(${item.rot}deg)`,
                    }}
                  >
                    <ShapeIcon shape={item.shape} className="w-full h-full" />
                    {reveal && (
                      <div className="absolute -inset-1 border border-primary animate-pulse">
                        <span className="absolute -top-3 left-0 text-[8px] text-primary whitespace-nowrap font-mono">
                          {(95 + Math.floor(Math.random() * 5))}%
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Scan line */}
              {scanning && (
                <div
                  className="absolute inset-x-0 h-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
                    boxShadow: "0 0 12px hsl(var(--primary))",
                    animation: `scanY 1.4s linear`,
                  }}
                />
              )}

              {/* Status badge */}
              <div className="absolute top-1.5 left-1.5 text-[8px] uppercase tracking-wider font-mono text-muted-foreground">
                CAM_{idx + 1}
              </div>
              {done && (
                <div className="absolute bottom-1.5 right-1.5 text-[8px] uppercase tracking-wider font-mono text-primary">
                  {scene.filter((s) => s.shape === target).length} match
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
          {scanning
            ? `Escaneando · buscando ${labels[target].toLowerCase()}…`
            : done
            ? `Detección completada · objetivo: ${labels[target].toLowerCase()}`
            : "Pulsa una figura para iniciar el reconocimiento"}
        </p>
      </div>

      <style>{`
        @keyframes scanY {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </DemoFrame>
  );
};
