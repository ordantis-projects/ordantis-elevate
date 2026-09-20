"use client";

// Recuperado de 2b9eaa6:src/components/demos/index.tsx.
// Se conservan las nueve interfaces; los datos y ejecuciones son didácticos.
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import "./demos.generated.css";

function useDemoTimers() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  useEffect(() => clear, [clear]);
  const schedule = (callback: () => void, delay: number) => {
    timers.current.push(setTimeout(callback, delay));
  };
  return { schedule, clear };
}

const DemoFrame = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="service-demo"><div className="bg-[hsl(215_60%_8%)] border border-white/10 text-white">
    <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{label}</p>
    </div>
    <p className="demo-notice">Demostración con datos sintéticos. No conecta con servicios externos ni acredita resultados de clientes.</p>
    <div className="p-6 demo-body">{children}</div>
  </div></div>
);

type SliderProps = { value: number; onChange: (value: number) => void; label: string; min?: number; max?: number; suffix?: string };
const Slider = ({ value, onChange, label, min = 0, max = 100, suffix = "%" }: SliderProps) => {
  const id = useId();
  return <div>
    <div className="flex justify-between text-xs mb-2">
      <label htmlFor={id} className="text-white/60">{label}</label>
      <output htmlFor={id} className="text-primary tabular-nums">{value}{suffix}</output>
    </div>
    <input id={id} type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full accent-primary cursor-pointer" />
  </div>;
};

/* 01 — PREDICTION */
export const PredictionDemo = () => {
  const [demandChange, setDemandChange] = useState(50);
  const [season, setSeason] = useState(50);
  const [interruption, setInterruption] = useState(50);

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
        ? { ...p, y: p.y + (demandChange - 50) * 0.6 - (interruption - 50) * 0.4 }
        : p
    );
  }, [demandChange, season, interruption]);

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
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48" role="img" aria-label="Serie sintética de demanda y escenario ilustrativo después del corte">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x={splitX} y="0" width={w - splitX} height={h} fill="hsl(var(--primary) / 0.08)" />
            <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#g)" />
            <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5"
              strokeDasharray={`${splitX} ${w - splitX}`} />
            <path d={path} fill="none" stroke="hsl(var(--primary-glow))" strokeWidth="1.5"
              strokeDasharray="4 4" pathLength="100"
              style={{ strokeDashoffset: -((splitX / w) * 100) }} />
            <line x1={splitX} y1="0" x2={splitX} y2={h} stroke="rgba(255,255,255,0.18)" strokeDasharray="2 4" />
            <text x={splitX + 6} y="14" fill="rgba(255,255,255,0.55)" fontSize="10">Escenario sintético</text>
          </svg>
          <div className="flex justify-between text-xs text-white/55 mt-2">
            <span>Serie sintética</span><span>Corte</span><span>Escenario</span>
          </div>
        </div>
        <div className="space-y-5">
          <Slider value={demandChange} onChange={setDemandChange} label="Cambio de demanda" suffix=" / 100" />
          <Slider value={season} onChange={setSeason} label="Amplitud estacional" suffix=" / 100" />
          <Slider value={interruption} onChange={setInterruption} label="Interrupción de actividad" suffix=" / 100" />
        </div>
      </div>
      <p className="demo-help">Serie inventada de 24 puntos, sin unidades reales. Los controles de demanda e interrupción desplazan los últimos 12 puntos con pesos fijados de 0,6 y −0,4 respecto al valor 50; la estacionalidad cambia toda la serie. Sirve para explorar supuestos: no entrena un modelo, mide su error ni estima incertidumbre.</p>
    </DemoFrame>
  );
};

/* 02 — OPTIMIZATION (comparación didáctica de recursos) */
type OptChannel = {
  name: string;
  hint: string;
  manual: number;
  manualReturn: number;
  optimal: number;
  optimalReturn: number;
};

export const OptimizationDemo = () => {
  const [optimized, setOptimized] = useState(false);

  const channels: OptChannel[] = [
    { name: "Zona A · inventada", hint: "Horas e inspecciones prefijadas para cada escenario", manual: 30, manualReturn: 18, optimal: 15, optimalReturn: 14 },
    { name: "Zona B · inventada", hint: "Horas e inspecciones prefijadas para cada escenario", manual: 30, manualReturn: 16, optimal: 25, optimalReturn: 18 },
    { name: "Zona C · inventada", hint: "Horas e inspecciones prefijadas para cada escenario", manual: 30, manualReturn: 22, optimal: 70, optimalReturn: 48 },
    { name: "Zona D · inventada", hint: "Horas e inspecciones prefijadas para cada escenario", manual: 30, manualReturn: 12, optimal: 10, optimalReturn: 8 },
  ];

  const total = 120;
  const baseReturn = channels.reduce((a, c) => a + c.manualReturn, 0);
  const totalReturn = optimized
    ? channels.reduce((a, c) => a + c.optimalReturn, 0)
    : channels.reduce((a, c) => a + c.manualReturn, 0);
  const totalInvest = optimized
    ? channels.reduce((a, c) => a + c.optimal, 0)
    : channels.reduce((a, c) => a + c.manual, 0);
  const returnRatio = (totalReturn / totalInvest).toFixed(2);
  const gain = totalReturn - baseReturn;
  const gainPct = ((gain / baseReturn) * 100).toFixed(1);

  const investMax = Math.max(...channels.map((c) => Math.max(c.manual, c.optimal)));
  const returnMax = Math.max(...channels.map((c) => Math.max(c.manualReturn, c.optimalReturn)));

  return (
    <DemoFrame label="Comparador de asignaciones">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Capacidad disponible</p>
          <p className="text-display text-2xl text-white mt-1 tabular-nums">{total} horas</p>
        </div>
        <div className="inline-flex border border-white/10">
          <button
            aria-pressed={!optimized}
            onClick={() => setOptimized(false)}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors ${
              !optimized ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            Escenario A
          </button>
          <button
            aria-pressed={optimized}
            onClick={() => setOptimized(true)}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors border-l border-white/10 ${
              optimized ? "bg-primary text-primary-foreground" : "text-white/50 hover:text-white/80"
            }`}
          >
            Escenario B
          </button>
        </div>
      </div>

      {/* Channel rows */}
      <div className="space-y-2 mb-5">
        {channels.map((c) => {
          const invest = optimized ? c.optimal : c.manual;
          const ret = optimized ? c.optimalReturn : c.manualReturn;
          return (
            <div key={c.name} className="bg-white/[0.03] border border-white/10 p-3">
              <div className="flex items-baseline justify-between mb-2 gap-3 demo-channel-heading">
                <div className="min-w-0">
                  <p className="text-xs text-white/90 truncate">{c.name}</p>
                  <p className="text-[10px] text-white/45 truncate">{c.hint}</p>
                </div>
                <p className="text-[10px] font-mono text-white/70 shrink-0 tabular-nums">
                  {invest} h <span className="text-primary">→</span> {ret} insp.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/45">Horas asignadas</span>
                    <span className="text-[9px] font-mono text-white/55 tabular-nums">{invest} h</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06]">
                    <div
                      className="h-full bg-white/40 transition-all duration-700 ease-out"
                      style={{ width: `${(invest / investMax) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[9px] uppercase tracking-wider text-white/45">Inspecciones</span>
                    <span className="text-[9px] font-mono text-primary tabular-nums">{ret}</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06]">
                    <div
                      className="h-full bg-primary transition-all duration-700 ease-out"
                      style={{ width: `${(ret / returnMax) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/[0.03] border border-white/10 p-3">
          <p className="text-[9px] uppercase tracking-wider text-white/45">Inspecciones totales</p>
          <p className="text-display text-xl text-primary mt-1 tabular-nums">{totalReturn}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 p-3">
          <p className="text-[9px] uppercase tracking-wider text-white/45">Inspecciones / hora</p>
          <p className="text-display text-xl text-primary mt-1 tabular-nums">{returnRatio}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 p-3">
          <p className="text-[9px] uppercase tracking-wider text-white/45">Diferencia con A</p>
          <p className={`text-display text-xl mt-1 tabular-nums ${gain > 0 ? "text-primary" : "text-white/70"}`}>
            {gain > 0 ? "+" : ""}{gain}
            {gain > 0 && <span className="text-[10px] font-mono text-white/55 ml-1">({gainPct}%)</span>}
          </p>
        </div>
      </div>

      <p className="text-[10px] text-center text-white/45 uppercase tracking-widest mt-4">
        {optimized
          ? "Escenario prefijado B · no se ejecuta un optimizador"
          : "Escenario prefijado A · igual número de horas por zona"}
      </p>
      <p className="demo-help">Ambos repartos utilizan 120 horas. Las inspecciones también están prefijadas: no se calculan a partir de las horas. La comparación no demuestra que B sea mejor en una operación real. Faltan demanda, desplazamientos y restricciones de cobertura para formular un problema de optimización.</p>
    </DemoFrame>
  );
};

/* 03 — BI */
const sparkPath = (seed: number, w: number, h: number, n = 14) => {
  const pts: number[] = [];
  for (let i = 0; i < n; i++) {
    pts.push(50 + Math.sin((i + seed) * 0.7) * 14 + Math.cos(i * 1.3 + seed * 0.4) * 6 + i * 0.6);
  }
  const max = Math.max(...pts), min = Math.min(...pts);
  return pts
    .map((v, i) => {
      const x = (i / (n - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * (h - 2) - 1;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
};

type BIKpi = { k: string; v: string; d: string; neg?: boolean };
type BIBreak = { l: string; v: number };
type BITop = { n: string; v: string; d: string };
type BIData = { kpis: BIKpi[]; breakdown: BIBreak[]; top: BITop[] };
const periods = [{ id: "1M", n: 6 }, { id: "3M", n: 12 }, { id: "12M", n: 14 }];

export const BIDemo = () => {
  const filters = ["Ventas", "Marketing", "Operaciones", "Finanzas"];
  const [active, setActive] = useState(0);
  const [period, setPeriod] = useState(2);

  const datasets: BIData[] = [
    {
      kpis: [
        { k: "Ingresos", v: "€2.4M", d: "+18%" },
        { k: "Margen", v: "32%", d: "+4pp" },
        { k: "CAC", v: "€124", d: "−12%" },
        { k: "Pipeline", v: "€8.1M", d: "+24%" },
      ],
      breakdown: [
        { l: "Suscripciones", v: 58 },
        { l: "Servicios", v: 27 },
        { l: "Hardware", v: 15 },
      ],
      top: [
        { n: "Acme Corp", v: "€340K", d: "+22%" },
        { n: "Globex Ltd", v: "€212K", d: "+8%" },
        { n: "Initech S.A.", v: "€198K", d: "+34%" },
        { n: "Umbrella Inc", v: "€176K", d: "−4%" },
      ],
    },
    {
      kpis: [
        { k: "Leads", v: "8.2K", d: "+22%" },
        { k: "CTR", v: "4.8%", d: "+0.6pp" },
        { k: "ROAS", v: "3.4x", d: "+0.4" },
        { k: "CPL", v: "€18", d: "−9%" },
      ],
      breakdown: [
        { l: "Orgánico", v: 42 },
        { l: "Paid Ads", v: 33 },
        { l: "Social", v: 18 },
        { l: "Referral", v: 7 },
      ],
      top: [
        { n: "Google Ads", v: "3,240", d: "+18%" },
        { n: "LinkedIn", v: "2,180", d: "+31%" },
        { n: "SEO Blog", v: "1,460", d: "+12%" },
        { n: "Newsletter", v: "1,320", d: "+5%" },
      ],
    },
    {
      kpis: [
        { k: "OEE", v: "87%", d: "+3pp" },
        { k: "SLA", v: "99.1%", d: "+0.4" },
        { k: "Stock", v: "92%", d: "−5%", neg: true },
        { k: "Incidencias", v: "4", d: "−60%" },
      ],
      breakdown: [
        { l: "Producción", v: 48 },
        { l: "Logística", v: 28 },
        { l: "Calidad", v: 16 },
        { l: "Mantenimiento", v: 8 },
      ],
      top: [
        { n: "Planta Madrid", v: "94%", d: "+2pp" },
        { n: "Planta BCN", v: "89%", d: "+4pp" },
        { n: "Planta Sevilla", v: "82%", d: "+1pp" },
        { n: "Planta Valencia", v: "78%", d: "−2pp" },
      ],
    },
    {
      kpis: [
        { k: "EBITDA", v: "€640K", d: "+15%" },
        { k: "DSO", v: "38d", d: "−4d" },
        { k: "Liquidez", v: "1.8x", d: "+0.2" },
        { k: "Cash flow", v: "€420K", d: "+22%" },
      ],
      breakdown: [
        { l: "Operativo", v: 64 },
        { l: "Inversión", v: 22 },
        { l: "Financiación", v: 14 },
      ],
      top: [
        { n: "Q4 2025", v: "€1.8M", d: "+18%" },
        { n: "Q3 2025", v: "€1.5M", d: "+9%" },
        { n: "Q2 2025", v: "€1.4M", d: "+6%" },
        { n: "Q1 2025", v: "€1.3M", d: "+3%" },
      ],
    },
  ];

  const ds = datasets[active];

  const trend = useMemo(() => {
    const n = periods[period].n;
    const seed = active * 11 + period * 3;
    const arr: number[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(
        50 +
          Math.sin((i + seed) * 0.55) * 12 +
          i * (1.4 + active * 0.25) +
          Math.cos(i * 1.2 + seed) * 6
      );
    }
    return arr;
  }, [active, period]);

  const w = 360, h = 90;
  const tMax = Math.max(...trend), tMin = Math.min(...trend);
  const linePath = trend
    .map((v, i) => {
      const x = (i / (trend.length - 1)) * w;
      const y = h - ((v - tMin) / (tMax - tMin || 1)) * (h - 8) - 4;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  const breakTotal = ds.breakdown.reduce((a, b) => a + b.v, 0);
  const donutR = 28;
  const donutC = 2 * Math.PI * donutR;
  

  const topMax = Math.max(
    ...ds.top.map((r) => parseFloat(r.v.replace(/[^\d.-]/g, "")) || 0)
  );

  return (
    <DemoFrame label="Panel ejecutivo · datos sintéticos">
      <p className="demo-help">Las áreas cambian la muestra. El periodo cambia solo la curva de tendencia; los indicadores son ejemplos fijos, no agregados de esa curva.</p>
      {/* Header: tabs + period */}
      <div className="flex items-end justify-between mb-4 gap-3 border-b border-white/10 demo-bi-controls">
        <div className="flex flex-wrap gap-1">
          {filters.map((f, i) => (
            <button
              key={f}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className={`px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition-colors ${
                active === i
                  ? "text-primary border-b border-primary -mb-px"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1 pb-1.5">
          {periods.map((p, i) => (
            <button
              key={p.id}
              aria-pressed={period === i}
              onClick={() => setPeriod(i)}
              className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider border transition-colors ${
                period === i
                  ? "border-primary text-primary bg-primary/15"
                  : "border-white/10 text-white/55 hover:text-white"
              }`}
            >
              {p.id}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards with sparklines */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 demo-kpis">
        {ds.kpis.map((k, i) => (
          <div key={k.k} className="bg-white/[0.03] p-3 border border-white/10">
            <p className="text-[9px] uppercase tracking-wider text-white/50">{k.k}</p>
            <div className="flex items-baseline justify-between gap-2 mt-1">
              <p className="text-display text-xl leading-none text-white">{k.v}</p>
              <span
                className={`text-[10px] font-mono tabular-nums shrink-0 ${
                  k.neg ? "text-destructive" : "text-primary"
                }`}
              >
                {k.d}
              </span>
            </div>
            <svg viewBox="0 0 60 16" className="w-full h-4 mt-2" preserveAspectRatio="none">
              <path
                d={sparkPath(active * 5 + i * 3, 60, 16)}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeOpacity="0.85"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Trend + composition */}
      <div className="grid md:grid-cols-3 gap-2 mb-2">
        <div className="md:col-span-2 bg-white/[0.03] p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-wider text-white/50">
              Tendencia · {filters[active]}
            </p>
            <p className="text-[9px] font-mono text-primary">
              {periods[period].id} · n={trend.length}
            </p>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bi-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.45" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={t}
                x1="0"
                y1={h * t}
                x2={w}
                y2={h * t}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
                strokeDasharray="2 3"
              />
            ))}
            <path d={areaPath} fill="url(#bi-grad)" />
            <path
              d={linePath}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            />
            {trend.map((v, i) => {
              const x = (i / (trend.length - 1)) * w;
              const y = h - ((v - tMin) / (tMax - tMin || 1)) * (h - 8) - 4;
              return <circle key={i} cx={x} cy={y} r="1.6" fill="hsl(var(--primary))" />;
            })}
          </svg>
        </div>

        <div className="bg-white/[0.03] p-4 border border-white/10">
          <p className="text-[10px] uppercase tracking-wider text-white/50 mb-3">
            Composición
          </p>
          <div className="flex items-center gap-3 demo-composition-layout">
            <svg viewBox="0 0 80 80" className="w-20 h-20 shrink-0 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={donutR}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              {ds.breakdown.map((b, i) => {
                const len = (b.v / breakTotal) * donutC;
                const offset = -ds.breakdown.slice(0, i).reduce((sum, part) => sum + (part.v / breakTotal) * donutC, 0);
                return (
                  <circle
                    key={b.l}
                    cx="40"
                    cy="40"
                    r={donutR}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeOpacity={1 - i * 0.2}
                    strokeWidth="8"
                    strokeDasharray={`${len} ${donutC}`}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dasharray 0.5s ease" }}
                  />
                );
              })}
            </svg>
            <div className="flex-1 space-y-1 text-[10px] min-w-0">
              {ds.breakdown.map((b, i) => (
                <div key={b.l} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="w-1.5 h-1.5 shrink-0"
                      style={{
                        background: "hsl(var(--primary))",
                        opacity: 1 - i * 0.2,
                      }}
                    />
                    <span className="truncate text-white/80">{b.l}</span>
                  </span>
                  <span className="font-mono tabular-nums text-white/55">
                    {Math.round((b.v / breakTotal) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ranked table */}
      <div className="bg-white/[0.03] border border-white/10">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <p className="text-[10px] uppercase tracking-wider text-white/50">
            Desglose ilustrativo
          </p>
          <p className="text-[9px] font-mono text-white/45">
            {ds.top.length} registros
          </p>
        </div>
        <table className="w-full text-xs demo-ranked-table">
          <tbody>
            {ds.top.map((row, i) => {
              const cur = parseFloat(row.v.replace(/[^\d.-]/g, "")) || 0;
              const pct = topMax ? (cur / topMax) * 100 : 0;
              const neg = row.d.startsWith("−") || row.d.startsWith("-");
              return (
                <tr
                  key={row.n}
                  className={i < ds.top.length - 1 ? "border-b border-white/5" : ""}
                >
                  <td className="pl-4 py-2 w-8 text-[10px] font-mono text-white/45">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="py-2 text-white/85">{row.n}</td>
                  <td className="py-2 w-1/3 px-3">
                    <div className="h-1 bg-white/[0.06]">
                      <div
                        className="h-full bg-primary/80 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-2 text-right font-mono tabular-nums text-white/80">
                    {row.v}
                  </td>
                  <td className="px-4 py-2 text-right text-[10px] font-mono w-16 tabular-nums">
                    <span className={neg ? "text-destructive" : "text-primary"}>{row.d}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DemoFrame>
  );
};

/* 04 — AGENT */
type TraceEntry = { t: string; system: string; action: string; status: "run" | "ok" };

export const AgentDemo = () => {
  const timers = useDemoTimers();
  const [approved, setApproved] = useState(false);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [trace, setTrace] = useState<TraceEntry[]>([]);
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  const tasks = [
    "Cuenta de email creada",
    "Invitación a Slack enviada",
    "Licencia de Jira asignada",
    "Contrato preparado para revisión",
    "Agenda semana 1 enviada",
  ];

  const traceFor: { system: string; logs: string[] }[] = [
    { system: "Google Workspace", logs: ["POST /users → marta@example.com", "Alias creado · MFA forzado", "Buzón provisionado (30 GB)"] },
    { system: "Slack API", logs: ["users.admin.invite → #general, #equipo", "Canal #onboarding-marta creado", "Bot de bienvenida enviado"] },
    { system: "Atlassian Jira", logs: ["Licencia 'Software' asignada", "Permisos: Project ORD · Developer", "Board personal generado"] },
    { system: "Documentos + ERP", logs: ["Plantilla de ejemplo rellenada", "Borrador preparado", "Firma pendiente de una persona"] },
    { system: "Calendar + Notion", logs: ["5 reuniones programadas", "Página onboarding clonada", "Email resumen enviado a manager"] },
  ];

  const now = () => new Date().toLocaleTimeString("es", { hour12: false });

  const run = () => {
    if (!approved || running) return;
    timers.clear();
    setRunning(true);
    setStep(0);
    setTrace([]);
    setActiveSystem(null);

    let elapsed = 0;
    tasks.forEach((task, i) => {
      const sys = traceFor[i];
      sys.logs.forEach((log) => {
        elapsed += 380;
        timers.schedule(() => {
          setActiveSystem(sys.system);
          setTrace((prev) => [...prev, { t: now(), system: sys.system, action: log, status: "run" }]);
        }, elapsed);
      });
      elapsed += 250;
      timers.schedule(() => {
        setStep(i + 1);
        setTrace((prev) => [...prev, { t: now(), system: sys.system, action: `✓ ${task}`, status: "ok" }]);
      }, elapsed);
    });

    timers.schedule(() => {
      setRunning(false);
      setActiveSystem(null);
    }, elapsed + 600);
  };

  return (
    <DemoFrame label="Onboarding · traza simulada">
      <div className="grid md:grid-cols-2 gap-3">
        {/* LEFT — checklist */}
        <div className="border border-primary/40 p-4 bg-primary/10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-wider text-primary">Plan del agente</p>
            <p className="text-[10px] text-white/55 tabular-nums">{step}/{tasks.length}</p>
          </div>
          <ul className="space-y-2 text-xs">
            {tasks.map((t, i) => {
              const done = i < step;
              const current = running && i === step;
              return (
                <li
                  key={t}
                  className={`flex gap-2 items-center transition-all ${
                    done ? "text-white" : current ? "text-primary" : "text-white/35"
                  }`}
                >
                  <span className={done ? "text-primary" : current ? "text-primary animate-pulse" : ""}>
                    {done ? "●" : current ? "◐" : "○"}
                  </span>
                  <span className="flex-1">{t}</span>
                  {current && <span className="text-[9px] uppercase tracking-wider text-primary">en curso</span>}
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT — live trace terminal */}
        <div className="border border-white/10 bg-black/40 flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <p className="text-[10px] uppercase tracking-wider text-white/55 font-mono">agent.trace</p>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${running ? "bg-primary animate-pulse" : "bg-white/20"}`} />
              <span className="text-[10px] text-white/55 font-mono">
                {activeSystem ?? (running ? "init" : "idle")}
              </span>
            </div>
          </div>
          <div className="p-3 h-56 overflow-y-auto font-mono text-[10px] space-y-1 leading-relaxed demo-trace" aria-label="Traza de la simulación">
            {trace.length === 0 && (
              <p className="text-white/40">$ esperando ejecución...</p>
            )}
            {trace.map((e, idx) => (
              <div key={idx} className="flex gap-2 animate-fade-in">
                <span className="text-white/40 shrink-0">{e.t}</span>
                <span className="text-primary/85 shrink-0">[{e.system}]</span>
                <span className={e.status === "ok" ? "text-primary" : "text-white/85"}>{e.action}</span>
              </div>
            ))}
            {running && (
              <div className="flex gap-1 text-primary">
                <span className="animate-pulse">▍</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 mt-5 text-xs">
        <input type="checkbox" checked={approved} disabled={running} onChange={(event) => setApproved(event.target.checked)} />
        Autorizar las acciones simuladas
      </label>
      <button
        onClick={run}
        disabled={running || !approved}
        className="mt-5 w-full py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:shadow-glow transition-all disabled:opacity-50"
      >
        {running ? "Ejecutando..." : "Simular onboarding de Marta"}
      </button>
    </DemoFrame>
  );
};

/* 05 — DOCUMENT (with file selector foldable) */
type DocSource = { id: string; name: string; size: string; required?: boolean; clauseTitle?: string };

export const DocumentDemo = () => {
  const [risk, setRisk] = useState<"Bajo" | "Alto">("Bajo");
  const [extra, setExtra] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [filesOpen, setFilesOpen] = useState(true);

  const sources: DocSource[] = [
    { id: "crm", name: "Datos cliente · CRM", size: "2.4 KB", required: true },
    { id: "tarifa", name: "Tarifa vigente 2026", size: "18 KB", required: true },
    { id: "plantilla", name: "Plantilla maestra v3", size: "44 KB" },
    { id: "anexo", name: "Anexo de privacidad · ejemplo", size: "12 KB", clauseTitle: "Anexo I — Privacidad (pendiente de revisión)" },
    { id: "historico", name: "Histórico contratación", size: "8 KB", clauseTitle: "Apéndice — Histórico cliente" },
    { id: "sla", name: "Catálogo de SLAs", size: "6 KB", clauseTitle: "Anexo II — Niveles de servicio" },
  ];

  const [selected, setSelected] = useState<string[]>(["crm", "tarifa", "plantilla", "anexo"]);

  const toggle = (id: string) => {
    const src = sources.find((s) => s.id === id);
    if (src?.required) return;
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setGenerated(false);
  };

  const optionalSelected = selected.filter((id) => !sources.find((s) => s.id === id)?.required);
  const includedSections = optionalSelected.length;

  return (
    <DemoFrame label="Ensamblador de borradores">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          {/* Sources foldable */}
          <div className="border border-white/10">
            <button
              type="button"
              onClick={() => setFilesOpen((v) => !v)}
              aria-expanded={filesOpen}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs"
            >
              <span className="flex items-center gap-2">
                <span className="text-primary">▤</span>
                <span className="text-white/90">Fuentes de datos</span>
                <span className="text-[10px] font-mono text-white/45">{selected.length} / {sources.length}</span>
              </span>
              <span className={`text-primary text-base transition-transform duration-300 ${filesOpen ? "rotate-90" : ""}`}>›</span>
            </button>
            {filesOpen && (
              <div className="border-t border-white/10 divide-y divide-white/5 animate-fade-in">
                {sources.map((s) => {
                  const on = selected.includes(s.id);
                  const req = !!s.required;
                  return (
                    <label
                      key={s.id}
                      className={`flex items-center gap-2.5 px-3 py-2 text-[11px] transition-colors ${
                        req ? "cursor-default opacity-90" : "cursor-pointer hover:bg-white/[0.03]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        disabled={req}
                        onChange={() => toggle(s.id)}
                        className="accent-primary"
                      />
                      <span className={`flex-1 truncate ${on ? "text-white/90" : "text-white/55"}`}>{s.name}</span>
                      <span className="text-[9px] font-mono text-white/40 shrink-0 tabular-nums">{s.size}</span>
                      {req && (
                        <span className="text-[8px] uppercase tracking-wider text-primary shrink-0">obligatoria</span>
                      )}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Other config */}
          <div className="border border-white/10 p-4 space-y-3 text-xs">
            <p className="text-eyebrow text-primary mb-1">— Parámetros</p>
            <div className="text-white/85"><span className="text-white/55">Cliente:</span> Acme S.L.</div>
            <div className="flex items-center gap-2">
              <span className="text-white/55">Riesgo:</span>
              {(["Bajo", "Alto"] as const).map((r) => (
                <button
                  key={r}
                  aria-pressed={risk === r}
                  onClick={() => { setRisk(r); setGenerated(false); }}
                  className={`px-2 py-1 border transition-colors ${
                    risk === r ? "border-primary text-primary bg-primary/10" : "border-white/10 text-white/60 hover:text-white/85"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-white/85 cursor-pointer">
              <input
                type="checkbox"
                checked={extra}
                onChange={(e) => { setExtra(e.target.checked); setGenerated(false); }}
                className="accent-primary"
              />
              Producto adicional
            </label>
          </div>

          <button
            onClick={() => setGenerated(true)}
            className="w-full py-2.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] hover:shadow-glow transition-all"
          >
            Preparar vista previa · {selected.length} fuentes
          </button>
        </div>

        {/* Output preview */}
        <div className="border border-white/10 p-4 bg-black/30 min-h-[260px] text-[10px] leading-relaxed font-mono">
          {generated ? (
            <div className="space-y-1.5 animate-fade-in">
              <p className="text-white/95">BORRADOR ILUSTRATIVO — <mark className="bg-primary/30 text-white px-1">Acme S.L.</mark></p>
              <p className="text-white/65">Cláusula 1. Objeto del contrato...</p>
              <p className="text-white/65">
                Cláusula 2. Precios — <mark className="bg-primary/30 text-white px-1">€{extra ? "48.000" : "32.000"}/año</mark>
              </p>
              <p className="text-white/65">Cláusula 3. Soporte y mantenimiento...</p>
              {sources
                .filter((s) => s.clauseTitle && selected.includes(s.id))
                .map((s) => (
                  <p key={s.id}><mark className="bg-primary/30 text-white px-1">{s.clauseTitle}</mark></p>
                ))}
              {risk === "Alto" && (
                <p><mark className="bg-primary/30 text-white px-1">Cláusula 7-bis. Seguridad reforzada (riesgo alto)</mark></p>
              )}
              <p className="text-white/55 mt-2">— Vista previa con {includedSections} fuentes opcionales. No genera un contrato completo ni acredita una revisión jurídica.</p>
              <p className="text-[9px] text-white/45 border-t border-white/10 pt-1.5 mt-2">
                Compuesto desde <span className="text-primary">{selected.length}</span> fuentes ·{" "}
                {selected
                  .map((id) => sources.find((s) => s.id === id)?.name.split(" · ")[0])
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          ) : (
            <p className="text-white/40">Vista previa vacía. Selecciona las fuentes y pulsa «Preparar vista previa».</p>
          )}
        </div>
      </div>
    </DemoFrame>
  );
};

/* 06 — RAG */
export const RAGDemo = () => {
  const timers = useDemoTimers();
  const [hasEvidence, setHasEvidence] = useState(true);
  const [step, setStep] = useState(0);
  const ask = () => {
    timers.clear();
    setStep(1);
    timers.schedule(() => setStep(2), 1000);
    timers.schedule(() => setStep(3), 2000);
  };
  return (
    <DemoFrame label="Analista corporativo híbrido">
      <label className="flex items-center gap-2 mb-4 text-xs"><input type="checkbox" checked={hasEvidence} onChange={(event) => { timers.clear(); setHasEvidence(event.target.checked); setStep(0); }} />Fuente interna disponible</label>
      <div className="space-y-3 text-xs">
        <div className="flex gap-2 text-[10px] mb-2">
          <span className="px-2 py-1 bg-primary/15 text-primary border border-primary/40">● Corpus de ejemplo</span>
          <span className="px-2 py-1 bg-white/[0.05] text-white/85 border border-white/10">● Catálogo sintético</span>
        </div>
        <div className="bg-white/[0.03] p-3 border border-white/10 text-white/85">
          <p>→ Según nuestra política de ejemplo, ¿cuál es mi límite de alojamiento por noche? Compara tres hoteles ficticios que cumplan.</p>
        </div>
        {step >= 1 && (
          <div className="bg-primary/10 p-3 border border-primary/30 animate-fade-in text-white/90">
            <p className="text-primary text-[10px] mb-1">RAG PRIVADO</p>
            <p>{hasEvidence ? <>Política de viajes de ejemplo, página 4: <span className="text-primary">límite de alojamiento de 150 €/noche</span></> : "No hay una fuente autorizada que establezca el presupuesto."}</p>
          </div>
        )}
        {step >= 2 && (
          <div className="bg-white/[0.04] p-3 border border-white/10 animate-fade-in text-white/85">
            <p className="text-white/55 text-[10px] mb-1">WEB</p>
            <p>{hasEvidence ? "Comparando tres hoteles inventados del catálogo local. No se consulta la web." : "Consulta al catálogo detenida: falta el límite autorizado."}</p>
          </div>
        )}
        {step >= 3 && (
          <div className="bg-white/[0.05] p-3 border border-white/10 animate-fade-in text-white/90">
            <p>{hasEvidence ? "Según la política de ejemplo (pág. 4), el límite es 150 €. Opciones inventadas: Hotel A (120 €), Hotel B (145 €) y Hotel C (138 €). No son precios ni disponibilidad reales." : "No puedo determinar el presupuesto con la evidencia disponible. Necesito la política autorizada antes de recomendar opciones."}</p>
          </div>
        )}
        <button
          onClick={ask}
          disabled={step > 0 && step < 3}
          className="w-full py-2 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] disabled:opacity-60"
        >
          {step === 0 ? "Enviar consulta" : step < 3 ? "Procesando..." : "Reiniciar"}
        </button>
        {step === 3 && (
          <button onClick={() => setStep(0)} className="w-full text-[10px] text-white/55 hover:text-white">
            Reiniciar demo
          </button>
        )}
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
    full: { label: "Total", cls: "bg-primary/20 text-primary border-primary/50" },
    read: { label: "Lectura", cls: "bg-primary/10 text-white/85 border-primary/30" },
    masked: { label: "Enmascarado", cls: "bg-white/[0.05] text-white/65 border-white/10" },
    none: { label: "Bloqueado", cls: "bg-transparent text-white/35 border-white/10 line-through" },
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
      <div className="flex gap-1 mb-5 border-b border-white/10">
        {([
          { id: "access", label: "Acceso por rol" },
          { id: "flow", label: "Flujo de datos" },
        ] as const).map((t) => (
          <button
            key={t.id}
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-[10px] uppercase tracking-[0.18em] border-b-2 -mb-px transition-colors ${
              tab === t.id ? "border-primary text-primary" : "border-transparent text-white/55 hover:text-white"
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
                  aria-pressed={on}
                  onClick={() => toggleRole(r.id)}
                  className={`text-left px-3 py-2.5 border transition-all ${
                    on ? "border-primary bg-primary/15" : "border-white/10 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${on ? "text-primary" : "text-white/85"}`}>{r.id}</span>
                    <span className={`w-3 h-3 rounded-full border ${on ? "bg-primary border-primary" : "border-white/15"}`} />
                  </div>
                  <p className="text-[10px] text-white/55 mt-0.5">{r.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="demo-table-scroll" tabIndex={0} role="region" aria-label="Matriz de acceso por rol"><table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-white/50 border-b border-white/10">
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
                <tr key={db.id} className="border-b border-white/5">
                  <td className="py-2.5 text-white/85">
                    <span className="text-white/45 mr-2 font-mono">{db.icon}</span>
                    {db.id}
                  </td>
                  {selected.length === 0 && (
                    <td className="text-right text-[10px] text-white/45">Selecciona un rol</td>
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
          </table></div>

          <div className="flex flex-wrap gap-3 pt-2 text-[10px] text-white/55">
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
                <div className="border border-white/10 bg-white/[0.03] p-2.5 h-full hover:border-primary/40 transition-colors">
                  <p className="text-[9px] uppercase tracking-wider text-primary mb-1.5">{`0${i + 1}`}</p>
                  <p className="text-xs font-medium text-white/90 mb-1.5">{s.title}</p>
                  {s.items.map((it) => (
                    <p key={it} className="text-[10px] text-white/55 font-mono leading-tight">{it}</p>
                  ))}
                </div>
                {i < flowSteps.length - 1 && (
                  <span className="hidden md:block absolute top-1/2 -right-1.5 -translate-y-1/2 text-primary/70 text-xs z-10">›</span>
                )}
              </div>
            ))}
          </div>

          {/* Animated pipeline */}
          <div className="relative mt-6 h-1 bg-white/[0.06] overflow-hidden">
            <div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{ animation: "flowSlide 2.8s linear infinite" }}
            />
          </div>
          <style>{`@keyframes flowSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>

          <div className="grid grid-cols-3 gap-2 mt-5 text-[10px]">
            {[
              { k: "Latencia", v: "Por medir" },
              { k: "Linaje", v: "Registrar cada paso" },
              { k: "PII", v: "Revisar accesos" },
            ].map((m) => (
              <div key={m.k} className="border border-white/10 px-3 py-2">
                <p className="text-white/55 uppercase tracking-wider text-[9px]">{m.k}</p>
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
        <p className="text-eyebrow text-white/55">Fuentes</p>
        {["Excel", "SQL legado", "JSON", "CRM", "ERP", "IoT"].map((s) => (
          <div key={s} className="border border-white/10 px-2 py-1.5 text-white/55 bg-white/[0.02]">{s}</div>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-eyebrow text-primary">Orquestación</p>
        <div className="border border-primary/40 bg-primary/10 p-3 text-center">
          <p className="text-primary text-[10px]">CLOUD</p>
          <p className="font-mono text-white/85">AWS · GCP · Azure</p>
        </div>
        <div className="border border-primary/40 bg-primary/10 p-3 text-center">
          <p className="text-primary text-[10px]">ON-PREM</p>
          <p className="font-mono text-white/85">Servidores privados</p>
        </div>
        <div className="border border-primary bg-primary/20 p-3 text-center">
          <p className="font-mono text-white">Data Lakehouse</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-eyebrow text-white/55">Salida</p>
        {["IA / ML", "Dashboards", "Apps de negocio", "API tiempo real"].map((s) => (
          <div key={s} className="border border-primary/30 px-2 py-1.5 bg-primary/10 text-white/90">{s}</div>
        ))}
      </div>
    </div>
    <p className="text-[10px] text-center text-white/55 mt-4 uppercase tracking-widest">Ejemplo de arquitectura · disponibilidad y latencia por validar</p>
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
  const timers = useDemoTimers();
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
    timers.clear();
    setTarget(next);
    setDone(false);
    setScanning(true);
    timers.schedule(() => {
      setScanning(false);
      setDone(true);
    }, 1400);
  };

  return (
    <DemoFrame label="Reconocimiento de figuras">
      <p className="demo-help">Las figuras ya están etiquetadas en el código. La selección resalta coincidencias; no ejecuta visión artificial ni mide precisión.</p>
      <div className="space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/55 mb-2">
            Selecciona la figura objetivo
          </p>
          <div className="grid grid-cols-4 gap-2 demo-shape-buttons">
            {shapes.map((s) => (
              <button
                key={s}
                aria-pressed={target === s}
                onClick={() => run(s)}
                className={`flex flex-col items-center gap-1 py-3 border transition-colors ${
                  target === s
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-white/10 text-white/55 hover:text-white hover:border-white/25"
                }`}
              >
                <ShapeIcon shape={s} className="w-5 h-5" />
                <span className="text-[9px] uppercase tracking-wider">{labels[s]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 demo-figures">
          {SCENES.map((scene, idx) => (
            <div
              key={idx}
              className="relative aspect-square bg-white/[0.03] border border-white/10 overflow-hidden"
            >
              {/* Shapes */}
              {scene.map((item, i) => {
                const matches = item.shape === target;
                const reveal = done && matches;
                return (
                  <div
                    key={i}
                    className={`absolute transition-colors duration-300 ${
                      reveal ? "text-primary" : "text-white/40"
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
                          coincidencia
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
              <div className="absolute top-1.5 left-1.5 text-[8px] uppercase tracking-wider font-mono text-white/55">
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

        <p className="text-[10px] text-center text-white/55 uppercase tracking-widest">
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
