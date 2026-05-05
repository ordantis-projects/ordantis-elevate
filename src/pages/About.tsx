import { useScrollReveal } from "@/hooks/useScrollReveal";
import startupvLogo from "@/assets/backers/startupv.svg";
import startinfLogo from "@/assets/backers/logo_startinf.png";
import sherpaLogo from "@/assets/backers/sherpa.svg";
import catedraHpLogo from "@/assets/backers/catedra-hp.png";
import talentoJovenLogo from "@/assets/backers/talentojoven.png";
import incibeRaw from "@/assets/backers/incibe.svg?raw";

const cleanSvgMarkup = (raw: string) => {
  const start = raw.indexOf("<svg");
  return start >= 0 ? raw.slice(start) : raw;
};
const incibeSvg = cleanSvgMarkup(incibeRaw);

const values = [
  { title: "Experiencia", body: "Conocimiento profundo sobre soluciones superficiales. No vendemos tendencias, resolvemos problemas." },
  { title: "Confianza", body: "Seguridad y transparencia en todo lo que construimos y recomendamos." },
  { title: "Pragmatismo", body: "Soluciones que funcionan en la realidad, no solo en teoría." },
  { title: "Colaboración", body: "Crecemos con nuestros clientes, entendiendo su negocio como si fuera el nuestro." },
];

type Achievement = {
  title: string;
  body: string;
  logo?: string;
  rawSvgs?: string[];
  url?: string;
};

const achievements: Achievement[] = [
  { title: "Programa StartupV", body: "Integrados en StartUPV, el ecosistema emprendedor de la UPV, desde donde seguimos desarrollando Ordantis con acompañamiento, recursos y conexión institucional.", logo: startupvLogo },
  { title: "Apoyo de start.inf - ETSINF (UPV)", body: "Start.inf, programa de emprendimiento de la ETSINF-UPV, nos proporciona asesoramiento, acompañamiento y espacio de trabajo para consolidar Ordantis como proyecto empresarial.", logo: startinfLogo },
  { title: "Finalistas Proyecto Sherpa", body: "Reconocidos como uno de los 8 proyectos más prometedores en el programa de emprendimiento Sherpa (2025).", logo: sherpaLogo },
  { title: "Premios Talento C. Valenciana", body: "Uno de los 4 finalistas en los Premios Talento Joven de la Comunitat Valenciana, en la categoría Empresa.", logo: talentoJovenLogo },
  { title: "Cátedra HP", body: "Respaldados por la Cátedra HP de la UPV, referente en innovación y emprendimiento tecnológico.", logo: catedraHpLogo },
  { title: "Cybersecurity Ventures II", body: "Acelerados por Incibe como startup tecnológica destacada en ciberseguridad.", rawSvgs: [incibeSvg] },
];

/* TEAM SECTION — intentionally hidden, see uploaded brief.
const team = [
  { name: "Sergio Ortiz", role: "CEO", bio: "...", linkedin: "linkedin.com/in/sergio-ortiz" },
  { name: "Fernando Martínez", role: "CTO", bio: "...", linkedin: "linkedin.com/in/fernando-martinez" },
];
*/

const About = () => {
  useScrollReveal();
  const getAchievementUrl = (title: string) => {
    switch (title) {
      case "Finalistas Proyecto Sherpa":
        return "https://www.feda.es/actualidad/noticias/item/13650-el-programa-sherpa-de-feda-ya-tiene-los-ocho-finalistas-para-un-total-de-15-000-euros-en-premios";
      case "Premios Talento C. Valenciana":
        return "https://www.levante-emv.com/comunitat-valenciana/2026/02/10/finalistas-premios-talento-joven-2026-126518511.html";
      case "Cybersecurity Ventures II":
        return "https://www.incibe.es/node/619170";
      default:
        return undefined;
    }
  };

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
            {achievements.map((a) => {
              const url = getAchievementUrl(a.title);

              return (
                <div key={a.title} className="reveal glass-card p-8 flex flex-col">
                  <div className="h-14 mb-6 flex items-center gap-4">
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer" aria-label={a.title} className="inline-flex h-full items-center gap-4">
                        {a.rawSvgs?.map((svg, idx) => (
                          <div
                            key={idx}
                            role="img"
                            aria-label={a.title}
                            className="h-full inline-flex items-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-[140px]"
                            dangerouslySetInnerHTML={{ __html: svg }}
                          />
                        ))}
                        {a.logo && (
                          <img
                            src={a.logo}
                            alt={a.title}
                            className="h-full w-auto max-w-[180px] object-contain"
                          />
                        )}
                      </a>
                    ) : (
                      <>
                        {a.rawSvgs?.map((svg, idx) => (
                          <div
                            key={idx}
                            role="img"
                            aria-label={a.title}
                            className="h-full inline-flex items-center [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-[140px]"
                            dangerouslySetInnerHTML={{ __html: svg }}
                          />
                        ))}
                        {a.logo && (
                          <img
                            src={a.logo}
                            alt={a.title}
                            className="h-full w-auto max-w-[180px] object-contain"
                          />
                        )}
                      </>
                    )}
                  </div>
                  <h3 className="text-display text-xl mb-3">{a.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
