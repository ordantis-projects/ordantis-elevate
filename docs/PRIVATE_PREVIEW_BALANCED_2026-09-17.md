# Actualización privada: machine learning, ciencia de datos y sistemas de IA

## Autorización y resultado

El propietario pide «continúa subiendo a la privada». Se actualiza únicamente el alias staging existente del Worker `ordantis-web-preview`, en Ordantis Solutions, con la sesión verificada de `fermago2005@gmail.com`. No se publica en `ordantis.com` ni se modifica Access.

- Enlace estable: https://staging-ordantis-web-preview.ordantis-solutions.workers.dev/
- Versión nueva: `ba02b762-1b8e-442d-801b-c8f93ffee772`, número 11.
- Creación: `2026-09-17T21:51:47.810431Z`.
- Enlace de versión: https://ba02b762-ordantis-web-preview.ordantis-solutions.workers.dev/
- Versión previa conservada: `cb1a50eb-67f1-4d86-b007-1940768cc601`.
- Publicación: `npx wrangler versions upload --config dist/server/wrangler.json --preview-alias staging --keep-vars --message 'Private staging: balanced ML and data offering for businesses and public bodies, two technical guides, preserved original design, preview root indexing safeguard'`.

Incluye los ajustes de `SERVICE_FOCUS_2026-09-17.md` y `AUDIENCE_BALANCE_2026-09-17.md`: ocho servicios principales y cuatro especialidades secundarias conservadas, énfasis en ML y ciencia de datos para empresas y administraciones, alcance diferenciado de desarrollo, investigación e integración y condiciones de entrega. Las dos guías nuevas explican mantenimiento predictivo con pocas averías y cambios operativos frente a cambios de medición. Los ejemplos son inventados y las propuestas no se presentan como implantaciones realizadas.

Se mantienen diseño, flechas originales de fondo, SVG de enlaces en ambos dispositivos, intro breve y saltable, cinta de empresas, cuatro geometrías, nueve demos, diagnóstico y privacidad. Se conserva la confidencialidad del trabajo en curso. No se incorporan los PDF internos, extracciones, informes de QA, secretos ni source maps a los activos.

## Verificación previa

- `npm run quality` final: código 0, lint y tipos, 81 pruebas unitarias, 83 archivos de contenido, 666 pares de guías, 12 artefactos SEO/GEO y 9 invariantes; compilación de 71 rutas y 62 páginas indexables previstas para el dominio público.
- 85 pruebas de navegador sobre diseño recuperado, equilibrio de públicos, intro y experiencia móvil: correctas a 320, 390, 768, 1024 y 1440 px. Complementadas con 45 comprobaciones de maquetación de nueve rutas, incluidas las dos guías nuevas: un H1, cero desbordamientos y cero errores JavaScript. Capturas inspeccionadas de portada, alcance, entrega y artículos; Open Graph responde 200 y se revisa visualmente.
- Vale: 62 páginas, cero observaciones y control positivo correcto.
- SignsOfAI: 62 páginas, sin artefactos ni patrones propios de afirmaciones sin respaldo; revisiones por hash exacto de FAQ e índice de guías. Las dos guías nuevas puntúan 0. No se interpreta el detector como prueba de autoría o calidad.
- LanguageTool 6.6 local: 62 páginas, cero observaciones pendientes, 616 coincidencias técnicas reconocidas. Brier y survival se añaden como términos técnicos; dos falsas alertas tienen revisión contextual exacta. Servidor auxiliar detenido al terminar.
- Dos pruebas de rastreo final en Next: las 62 páginas ofrecen HTML, metadatos y entidades coherentes sin JavaScript y las páginas públicas no tienen noindex accidental.
- Compilación fresca `npm run build:vinext`: correcta. Se mantiene visible el aviso de algunos paquetes de más de 500 kB; no se eleva el umbral para ocultarlo.
- Dos pruebas del runtime local de Cloudflare: correctas, incluyendo HTML inicial de las 62 páginas, robots privado, canonical, sitemap y Markdown. El test exige noindex en cada página HTML y en respuestas a rastreadores; detectó una omisión del matcher en `/`, corregida con una regla explícita para la raíz.
- Configuración compilada: `ORDANTIS_DEPLOYMENT=preview`, Worker privado, cero rutas personalizadas, hostname de Turnstile limitado a staging y bindings de correo y secretos requeridos conservados.
- Subida de prueba final: correcta; 4.162,89 KiB y 1.348,25 KiB gzip.

## Verificación remota e aislamiento

La subida termina correctamente: 24 activos nuevos, 51 reutilizados; arranque del Worker de 14 ms según Cloudflare. `versions view` confirma número, alias staging, fecha, modo preview y presencia de `TURNSTILE_SECRET`, `DIAGNOSTIC_RECIPIENT`, `DIAGNOSTIC_EMAIL` y `ASSETS`, sin imprimir ni cambiar valores secretos. Se mantienen remitente `web@ordantis.com` y destinatario permitido `contacto@ordantis.com`.

Se solicitan sin autenticación nueve recursos tanto al alias estable como a la URL de versión: portada, capacidades, diagnóstico, las dos guías nuevas, robots, llms, sitemap y JavaScript de la intro. Los 18 resultados son HTTP 302 al login de `black-scene-abc1.cloudflareaccess.com`. No se usa noindex como sustituto de Access.

El despliegue activo conserva `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %, comprobado antes y después. No se ejecutan `versions deploy`, `triggers deploy`, cambios de DNS, políticas de Access, push, IndexNow ni envíos de sitemap. No se cambia la web pública.

Este pase verifica la versión remota, la protección anónima y el contenido en el runtime local de Workers. No completa una sesión remota autenticada ni envía un diagnóstico real. Para revisar, abrir el enlace estable e identificarse con uno de los correos ya autorizados.

La ampliación de Keyword Planner para el nuevo foco, un benchmark predictivo propio y la auditoría `web-perf` siguen pendientes según el documento de audiencia. La dependencia de Chrome DevTools MCP impide esa auditoría; no se atribuyen nuevos valores de Core Web Vitals a esta versión.
