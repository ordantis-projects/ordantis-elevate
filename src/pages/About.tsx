import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  { title: "Experiencia", body: "Conocimiento profundo sobre soluciones superficiales. No vendemos tendencias, resolvemos problemas." },
  { title: "Confianza", body: "Seguridad y transparencia en todo lo que construimos y recomendamos." },
  { title: "Pragmatismo", body: "Soluciones que funcionan en la realidad, no solo en teoría." },
  { title: "Colaboración", body: "Crecemos con nuestros clientes, entendiendo su negocio como si fuera el nuestro." },
];

const achievements = [
  { title: "Programa StartupV", body: "Seleccionados para el programa de aceleración StartupV, reconocimiento a startups con alto potencial de crecimiento." },
  { title: "Finalistas Proyecto Sherpa", body: "Reconocidos como uno de los 8 proyectos más prometedores en el programa de emprendimiento Sherpa (2025)." },
  { title: "Premios Talento C. Valenciana", body: "Uno de los 4 finalistas en los premios organizados por Caixa y Levante Periódico, categoría Empresa." },
  { title: "Cátedra HP", body: "Respaldados por la Cátedra HP de la UPV, referente en innovación y emprendimiento tecnológico." },
  { title: "Cybersecurity Ventures II", body: "Acelerados por Incibe como startup tecnológica destacada en ciberseguridad." },
  { title: "Sigma Data Club", body: "Líderes de una de las comunidades universitarias de datos más activas de España." },
];

/* TEAM SECTION — intentionally hidden, see uploaded brief.
const team = [
  { name: "Sergio Ortiz", role: "CEO", bio: "...", linkedin: "linkedin.com/in/sergio-ortiz" },
  { name: "Fernando Martínez", role: "CTO", bio: "...", linkedin: "linkedin.com/in/fernando-martinez" },
];
*/

const About = () => {
  useScrollReveal();
  return (
    <div>
      <section className="pt-40 pb-24 bg-gradient-hero">
        <div className="container-luxe">
          <p className="text-eyebrow mb-8 reveal">— Sobre Ordantis</p>
          <h1 className="text-display text-[clamp(3rem,8vw,8rem)] max-w-5xl reveal">
            Tu departamento <span className="text-primary">externo</span> de Datos e IA.
          </h1>
        </div>
      </section>

      <section className="py-32">
        <div className="container-luxe grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <p className="text-eyebrow mb-4">— Misión</p>
            <h2 className="text-display text-3xl md:text-4xl">
              Ayudar a las empresas a competir en un mundo cada vez más digital.
            </h2>
          </div>
          <div className="lg:col-span-7 reveal">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Implementamos soluciones de datos e IA que generan resultados medibles, y capacitamos a tu equipo para mantenerlas en el tiempo. La IA no es una moda, es una herramienta de negocio.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface-1/30 border-y border-hairline">
        <div className="container-luxe grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <p className="text-eyebrow mb-4">— Visión</p>
            <h2 className="text-display text-3xl md:text-4xl">
              Democratizar el acceso a la inteligencia artificial.
            </h2>
          </div>
          <div className="lg:col-span-7 reveal">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ser el socio de las empresas actuando como un departamento de datos externo, permitiendo el acceso a soluciones de datos avanzadas sin necesidad de grandes inversiones o equipos internos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container-luxe">
          <p className="text-eyebrow mb-8 reveal">— Valores</p>
          <h2 className="text-display text-4xl md:text-6xl mb-16 reveal">Cómo trabajamos.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline">
            {values.map((v, i) => (
              <div key={v.title} className="bg-background p-8 reveal hover:bg-surface-1 transition-colors duration-500">
                <span className="text-eyebrow text-primary">0{i + 1}</span>
                <h3 className="text-display text-2xl mt-6 mb-4">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface-1/30 border-y border-hairline">
        <div className="container-luxe">
          <p className="text-eyebrow mb-8 reveal">— Nuestros logros</p>
          <h2 className="text-display text-4xl md:text-6xl mb-16 reveal max-w-3xl">
            Avalados por el ecosistema de innovación español.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <div key={a.title} className="reveal glass-card p-8">
                <p className="text-eyebrow text-primary mb-4">— {String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-display text-xl mb-3">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
