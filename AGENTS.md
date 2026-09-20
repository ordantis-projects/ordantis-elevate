# Instrucciones para agentes que trabajen en la web de Ordantis

## Fuente de verdad

- `content/site.ts` contiene capacidades, preguntas de investigación y evidencia publicada.
- `content/identity.ts` contiene identidad y navegación. Los componentes cliente no deben importar el corpus completo de `content/site.ts` solo para leer el menú.
- `content/pages.ts` contiene páginas corporativas y el inventario indexable.
- `content/home.ts`, `content/services.ts` y `content/diagnostic.ts` contienen los módulos compartidos de la identidad recuperada, el catálogo original y el diagnóstico; se consumen también en Markdown.
- `content/service-details.ts`, `content/original-sections.ts` y `content/faq.ts` amplían los bloques originales. `content/page-updates.ts` mantiene las fechas de revisión por URL, sin refrescar las demás.
- HTML, Markdown, sitemap y `llms-full.txt` deben derivarse de esas fuentes.
- Una propuesta técnica interna no es un caso de éxito. No publiques nombres, organismos, localizaciones, importes ni resultados sin autorización y evidencia verificable.
- Aclaración del propietario (17 de septiembre): los PDF aportados son propuestas. Hay un trabajo en curso cuya identidad no está autorizada para publicación. Generalizar las decisiones técnicas sin publicar nombre, siglas, códigos, métricas contractuales ni combinaciones de detalles que permitan identificarlo. El estado de propuesta prevalece sobre cualquier afirmación comercial del propio PDF; no copiar sus logotipos, capturas o cifras a la web.

## Diseño y publicación: decisiones del propietario

- La referencia visual es el diseño original del commit `2b9eaa6`: blanco, azul marino, cian, Inter y Space Grotesk, flechas de marca, botones rectangulares, metodología oscura y pie oscuro. No sustituirlo por otra identidad ni por plantillas de tarjetas pastel sin aprobación expresa.
- Las nuevas capacidades, guías y Labs deben ampliar ese sistema visual. La mejora SEO/GEO no autoriza un rediseño.
- Preferencias de apariencia (19 de septiembre): adaptar automáticamente claro/oscuro mediante `prefers-color-scheme`, sin selector, cookies ni almacenamiento de tema. Preservar el diseño claro y los colores de logos externos; intro, formularios, cookies y contenido deben ser legibles en oscuro desde el primer pintado, también sin JavaScript.
- Portada: el propietario prefiere la composición ancha original con flechas pequeñas animadas por el fondo (revisión del 14 de septiembre). No volver a sustituirla por una figura gigante de chevrones apilados ni por una columna lateral de ilustración.
- Intro solicitada después por el propietario: flecha hacia la derecha que revela el logotipo antes de la portada. Mantenerla breve y saltable, omitirla con movimiento reducido y dejar acceso directo sin JavaScript. No convertirla en una pantalla de carga obligatoria ni alterar el hero por añadirla. Véase `docs/BRAND_INTRO_2026-09-14.md`.
- Corrección solicitada el 18 de septiembre: la portada no debe aparecer antes de la intro. Mantener la cobertura desde el primer pintado, la animación renderizada en servidor y su salida independiente de la hidratación; no volver al arranque exclusivamente en `useEffect`. Véase `docs/BRAND_INTRO_FIRST_PAINT_2026-09-18.md`.
- Interfaz (15 de septiembre): no mostrar enlaces a `llms.txt`, `llms-full.txt`, sitemap ni al repositorio GitHub Research de Ordantis, incluido el pie y la página 404. Conservar los endpoints técnicos, su descubrimiento no visual y las referencias editoriales. La sección Research y sus resultados siguen visibles; retirar accesos no convierte un repositorio público en privado.
- Conservar los 12 servicios originales y sus anclas. No eliminar prestaciones o interacciones al reorganizar rutas sin dejar una correspondencia y explicar la decisión.
- Conservar la cinta de empresas en movimiento, las cuatro geometrías giratorias en su breakpoint original y las nueve demos de servicios. Movimiento reducido y pausa son alternativas de accesibilidad, no una justificación para dejar la experiencia estática por defecto.
- Las demos recuperadas están en `components/demos/original-demos.tsx`. Sus clases originales se compilan con Tailwind 3, acotadas a `.service-demo`; no cargar su reset en el resto de la web. Mantener explícitos datos sintéticos, límites, temporizadores cancelables y ausencia de llamadas externas.
- No publicar perfiles personales de equipo ni Person schema por defecto.
- Trabajo local hasta nueva autorización: no deploy, push con publicación, envío de sitemap ni IndexNow. Medición con Redes Ordantis; las previsualizaciones locales no envían analítica.
- El 16 de septiembre el propietario autorizó actualizar únicamente la previsualización privada existente de Cloudflare. Ese pase se registra en `docs/PRIVATE_PREVIEW_2026-09-16.md`; no autoriza publicar en el dominio principal ni abrir Access. Para próximas publicaciones, confirmar el alcance de la petición vigente.
- Revisión móvil y contacto del 16 de septiembre: usar «Iniciar diagnóstico» como CTA principal, con el email como alternativa; tres preguntas y email solo al final, datos adicionales opcionales y plegados, resumen completo en el envío. Mantener visible la primera capa de privacidad. El propietario aprobó enlaces contextuales discretos desde Empresa a Albacete y Valencia, fuera del menú principal y del pie.
- Flechas de enlaces: utilizar el SVG compartido `DiagonalArrow`, con trazo fino y `currentColor`, en móvil y escritorio. No usar el carácter Unicode diagonal en controles: iOS puede convertirlo en un emoji azul con recuadro. Esta corrección no cambia las flechas animadas del fondo.
- Cookies (19 de septiembre): conservar Aceptar y Rechazar con igual visibilidad y añadir Personalizar. Necesarias siempre activas; única categoría opcional Analítica, desactivada para visitantes nuevos. Abrir o modificar la selección no da permiso: solo Guardar preferencias aplica la elección. Mantener retirada efectiva, reapertura desde el pie y ausencia de analítica en local y privada. Véase `docs/COOKIE_CUSTOMIZATION_2026-09-19.md`.
- Presentación editorial (18 de septiembre): el propietario pide retirar las fechas de revisión visibles y el bloque repetido «Nota de evidencia» de las guías, incluido el texto sobre propuestas internas. No reintroducir esos banners en cada guía ni la fecha global del pie. Conservar la procedencia en el registro interno, las fuentes, el etiquetado de ejemplos inventados y los límites específicos de experimentos; no presentar propuestas como proyectos ejecutados. Las fechas reales del sitemap, JSON-LD y metadatos técnicos no se eliminan ni se refrescan por este ajuste visual.

## Posicionamiento editorial

Ordantis es una empresa de I+D aplicada en inteligencia artificial y datos. El 16 de septiembre el propietario priorizó administraciones públicas, retos GovTech y empresas con necesidades de I+D, machine learning, modelos predictivos e ingeniería de sistemas de datos. Investigación, ML y datos encabezan la oferta. Agentes, RAG y documentos se conservan como componentes o especialidades secundarias, no como identidad comercial. Evita presentarla como un “departamento externo”, una consultora genérica de digitalización o automatización, o una fábrica de contenido. Véase `docs/RD_GOVTECH_POSITIONING_2026-09-16.md`.

Revisión del 17 de septiembre: el propietario rechaza la prominencia de BI, RAG y análisis documental en «Modelos y componentes del sistema». El catálogo principal utiliza `projectServicePhases`: ocho servicios, con predicción, optimización y visión en Desarrollo. Los otros cuatro se conservan en un grupo complementario plegado después de las cuatro fases, con sus anclas y demos; no reintroducirlos en la metodología de portada ni como capacidades comerciales equivalentes. HTML, Markdown y llms mantienen esa distinción. Correspondencia y QA en `docs/SERVICE_FOCUS_2026-09-17.md`; incluido únicamente en la privada según `docs/PRIVATE_PREVIEW_BALANCED_2026-09-17.md`.

Nueva precisión del propietario (17 de septiembre): el mensaje se había vuelto demasiado exclusivo de I+D. El público incluye empresas que invierten en ML, ciencia de datos y sistemas de IA exigentes, además de administraciones y GovTech. ML, ciencia e ingeniería de datos e I+D siguen siendo las tres capacidades principales; no forzar una hipótesis de investigación para cualquier encargo de desarrollo o integración. Distinguir esos alcances y sus condiciones de entrega. Portada muestra problemas y capacidades antes del ecosistema de emprendimiento, conservando los logos y el diseño. EXIST acredita su experimento de NLP/multimodalidad, no implantaciones predictivas para clientes. Véase `docs/AUDIENCE_BALANCE_2026-09-17.md`. El propietario autorizó después «continúa subiendo a la privada»: versión `ba02b762-1b8e-442d-801b-c8f93ffee772`, alias staging, con Access y despliegue activo sin cambios. Registro en `docs/PRIVATE_PREVIEW_BALANCED_2026-09-17.md`; no autoriza publicar en el dominio principal ni nuevas subidas automáticas.

## Reglas editoriales

1. Empieza por la pregunta o el resultado comprobable.
2. Nombra datos, decisiones, restricciones, errores y fuentes.
3. No inventes cifras, clientes, certificaciones, adjudicaciones ni posiciones de mercado.
4. Si una afirmación numérica no tiene fuente, elimínala o añádela al registro de evidencia pendiente.
5. Evita contrastes como “no solo X, sino Y”, aperturas vacías, tríadas decorativas, cierres grandilocuentes y atribuciones vagas.
6. Aplica la prueba de portabilidad: si una frase sirve igual para cualquier consultora, necesita un hecho concreto o debe desaparecer.
7. Los artículos derivados de propuestas se etiquetan como preguntas de investigación y explican criterio de parada.
8. Research incluye autores, fecha, método, resultados, fuentes y limitaciones.

## Calidad obligatoria

Antes de cerrar un cambio ejecuta:

```bash
npm run quality
```

El CI añade SignsOfAI, Vale y Lighthouse. LanguageTool se activa cuando existe `LANGUAGETOOL_URL`. Para una nueva página indexable añade metadata, canonical, schema apropiado, Markdown, sitemap y enlaces internos.

## Accesibilidad y móvil

- Diseña primero a 320 px y comprueba 390, 768, 1024 y 1440 px.
- No ocultes desbordamientos para disimular un componente roto.
- Objetivos táctiles de al menos 44 px cuando sean controles principales.
- Un único H1 por página, jerarquía de encabezados y navegación por teclado.
- Respeta `prefers-reduced-motion` y no ocultes contenido esencial detrás de animaciones.
- Usa `next/image` con dimensiones o `fill` más `sizes`.

## Definición de terminado

- Las URL válidas responden 200 y una inexistente responde 404.
- El HTML inicial contiene título y contenido sustancial.
- `Accept: text/markdown` devuelve Markdown solo cuando su `q` supera al HTML y envía `Vary: Accept`.
- No hay errores de lint, tipos, tests, contenido, build ni enlaces.
- El cambio se revisa visualmente en móvil y escritorio.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
