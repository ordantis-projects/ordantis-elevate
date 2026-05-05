import { useScrollReveal } from "@/hooks/useScrollReveal";

const cookieTypes = [
  {
    title: "Técnicas",
    body: "Permiten la navegación a través de la página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan, incluyendo la gestión y operativa de la página web y habilitar sus funciones (identificar la sesión, acceder a partes restringidas, recordar elementos del pedido, gestionar el pago, etc.). Son necesarias para el funcionamiento adecuado del sitio y no requieren consentimiento.",
  },
  {
    title: "Preferencias o personalización",
    body: "Permiten recordar información que cambia la forma en que la página se comporta o el aspecto que tiene (idioma, número de resultados, región del usuario). Si es el propio usuario quien elige esas características, se considera un servicio expresamente solicitado y no requiere consentimiento.",
  },
  {
    title: "Análisis o medición",
    body: "Permiten comprender cómo interactúan los visitantes con la web y realizar análisis estadístico del uso. La información recogida se utiliza para introducir mejoras en los productos y servicios ofrecidos por el responsable.",
  },
  {
    title: "Marketing o publicidad comportamental",
    body: "Almacenan información sobre el comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil específico para mostrar anuncios relevantes.",
  },
];

const browserSettings = [
  { browser: "Microsoft Edge / Internet Explorer", path: "Herramientas → Opciones de Internet → Privacidad → Configuración" },
  { browser: "Firefox", path: "Herramientas → Opciones → Privacidad → Cookies" },
  { browser: "Chrome", path: "Opciones → Opciones avanzadas → Privacidad" },
  { browser: "Safari", path: "Preferencias → Privacidad" },
  { browser: "Safari para iOS (iPhone y iPad)", path: "Ajustes → Safari" },
  { browser: "Chrome para Android", path: "Configuración → Configuración de sitios web → Cookies" },
];

const Cookies = () => {
  useScrollReveal();
  return (
    <div>
      <section className="pt-40 pb-24 bg-gradient-hero">
        <div className="container-luxe">
          <p className="text-eyebrow mb-8 reveal">— Aviso legal</p>
          <h1 className="text-display text-[clamp(2.5rem,7vw,6rem)] max-w-5xl reveal">
            Política de <span className="text-primary">cookies</span>.
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container-luxe max-w-4xl space-y-16 text-muted-foreground leading-relaxed">
          <div className="reveal space-y-5">
            <p>
              En Ordantis Solutions SL utilizamos las cookies u otros archivos de funcionalidad similar (en adelante,
              «cookies») para saber cómo utiliza nuestros servicios y poder mejorarlos. Ordantis Solutions SL es
              responsable de las cookies y del tratamiento de los datos obtenidos a través de estas, ya sean propias o
              de terceros, decidiendo sobre la finalidad, contenido y uso del tratamiento de la información recabada.
            </p>
            <p>
              El objetivo de esta política es informarle de manera clara y detallada de qué es una cookie, cuál es su
              finalidad, qué tipos de cookies utilizamos y cómo configurarlas o, en su caso, deshabilitarlas.
            </p>
          </div>

          <div className="reveal space-y-4">
            <h2 className="text-display text-2xl md:text-3xl text-foreground">¿Qué es una cookie?</h2>
            <p>
              Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita nuestra página web
              y que guarda información sobre la navegación que realiza. Algunas cookies resultan esenciales para el buen
              funcionamiento del sitio (cookies técnicas o de personalización), aunque otras —como las cookies de
              análisis o las de publicidad comportamental— requieren que le informemos y recabar su consentimiento para
              ser utilizadas.
            </p>
            <p>
              A continuación detallamos en qué consiste y cuál es la finalidad de cada tipo de cookie, con el objetivo
              de que pueda prestar un consentimiento plenamente informado.
            </p>
          </div>

          <div className="reveal space-y-6">
            <h2 className="text-display text-2xl md:text-3xl text-foreground">Tipos de cookies</h2>
            <div className="grid gap-px bg-hairline border border-hairline">
              {cookieTypes.map((c, i) => (
                <div key={c.title} className="bg-background p-8">
                  <p className="text-eyebrow text-primary mb-3">— 0{i + 1}</p>
                  <h3 className="text-display text-xl text-foreground mb-3">{c.title}</h3>
                  <p className="text-sm leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal space-y-4">
            <h2 className="text-display text-2xl md:text-3xl text-foreground">Cookies utilizadas por Ordantis</h2>
            <p>
              Ordantis Solutions SL utiliza cookies propias y de terceros de tipo <span className="text-foreground">técnicas</span> y{" "}
              <span className="text-foreground">analíticas</span>, para las finalidades expuestas en la siguiente declaración:
            </p>
            <div className="border border-hairline overflow-hidden">
              <div className="grid grid-cols-4 bg-surface-1/40 text-xs uppercase tracking-[0.18em] text-foreground">
                <div className="p-4 border-r border-hairline">Tipo</div>
                <div className="p-4 border-r border-hairline">Finalidad</div>
                <div className="p-4 border-r border-hairline">Caducidad</div>
                <div className="p-4">Propias / Terceros</div>
              </div>
              <div className="grid grid-cols-4 text-sm border-t border-hairline">
                <div className="p-4 border-r border-hairline text-foreground">Técnica</div>
                <div className="p-4 border-r border-hairline">Mantener la sesión y preferencias básicas de navegación.</div>
                <div className="p-4 border-r border-hairline">Sesión</div>
                <div className="p-4">Propia</div>
              </div>
              <div className="grid grid-cols-4 text-sm border-t border-hairline">
                <div className="p-4 border-r border-hairline text-foreground">Analítica</div>
                <div className="p-4 border-r border-hairline">Medir el uso del sitio y mejorar los contenidos.</div>
                <div className="p-4 border-r border-hairline">Hasta 24 meses</div>
                <div className="p-4">Terceros</div>
              </div>
            </div>
            <p className="text-xs italic">
              Esta tabla se actualizará en el momento en que Ordantis Solutions SL incorpore nuevos servicios que
              requieran el uso de cookies adicionales.
            </p>
          </div>

          <div className="reveal space-y-4">
            <h2 className="text-display text-2xl md:text-3xl text-foreground">Consentimiento y desactivación</h2>
            <p>
              Si desactiva las cookies, podrá seguir accediendo a la web pero puede que la navegación por esta no sea
              óptima y alguno de los servicios ofrecidos no funcionen correctamente.
            </p>
            <p>
              Si en un futuro Ordantis Solutions SL llegara a utilizar tipos de cookies diferentes a las contempladas en
              esta Política de Cookies para prestar nuevos servicios, o fuera necesario adaptarla a nuevas exigencias
              legislativas, se lo notificaremos.
            </p>
            <p>
              Puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo a través del menú de
              configuración de su navegador de internet, pudiendo configurarlo para que bloquee las cookies o alerte al
              usuario cuando un servidor quiera guardarlas.
            </p>
          </div>

          <div className="reveal space-y-4">
            <h2 className="text-display text-2xl md:text-3xl text-foreground">Cómo configurar las cookies en su navegador</h2>
            <ul className="border border-hairline divide-y divide-hairline">
              {browserSettings.map((b) => (
                <li key={b.browser} className="grid md:grid-cols-3 gap-4 p-4 text-sm">
                  <span className="text-foreground md:col-span-1">{b.browser}</span>
                  <span className="md:col-span-2">{b.path}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal space-y-4">
            <h2 className="text-display text-2xl md:text-3xl text-foreground">Marco legal</h2>
            <p>
              Esta política de cookies se ha redactado conforme al artículo 22.2 de la Ley 34/2002, de 11 de julio, de
              servicios de la sociedad de la información y de comercio electrónico (LSSI), en relación con el Reglamento
              (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos y garantía de los
              derechos digitales (LOPDGDD). Puede ampliar la información consultando la Guía sobre el uso de las cookies
              publicada por la Agencia Española de Protección de Datos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;
