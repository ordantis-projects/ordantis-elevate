# Web de Ordantis

Sitio HTML-first de Ordantis para SEO, búsqueda generativa y consumo por agentes. Está construido con Next.js App Router y usa una única fuente editorial para HTML, Markdown, sitemap y `llms-full.txt`.

## Desarrollo

La interfaz conserva la identidad original del commit `2b9eaa6`: blanco, azul y cian, flechas de marca, tipografía, cinta de empresas en movimiento, figuras 3D, metodología desplegable, nueve demos y pie oscuro. Las páginas nuevas amplían ese sistema. Consulta `docs/RECUPERACION_DISENO_2026-08-28.md` para la correspondencia entre el original y lo nuevo.

```bash
npm ci
npm run dev
```

Comprobación completa:

```bash
npm run quality
```

## Rutas principales

- `/capacidades` y sus páginas de modelos predictivos, ciencia e ingeniería de datos, I+D aplicada, visión e integración avanzada.
- `/govtech`.
- `/research/exist-2026`.
- `/insights` con preguntas derivadas de patrones de propuestas internas.
- `/labs/calidad-datos`: demo reproducible con datos sintéticos, contrato editable y descarga de evaluación.
- `/empresa`, `/contacto`, `/privacidad` y `/cookies`.
- `/diagnostico`: cuestionario local con resumen revisable, borrador voluntario y envío directo opcional protegido con Cloudflare Turnstile.
- `/llms.txt`, `/llms-full.txt` y `/markdown/...`.

Las rutas antiguas en inglés tienen redirecciones permanentes. GitHub Pages no debe usarse para esta versión porque convertiría las rutas de App Router en fallbacks incorrectos. El destino previsto es Cloudflare Workers mediante vinext, manteniendo `https://www.ordantis.com` como canonical y el dominio raíz como redirección.

## Producción

La previsualización privada y producción usan Workers distintos. `wrangler.jsonc` pertenece a la privada; `wrangler.production.jsonc` declara `ordantis-web`, la ruta `www.ordantis.com/*`, correo transaccional y los hostnames admitidos por Turnstile. Los secretos se guardan en Cloudflare y nunca en Git ni en el bundle.

```bash
npm run quality
npm run deploy:production
```

El despliegue compila con `ORDANTIS_DEPLOYMENT=production` y publica `dist/client` junto al Worker SSR. El dominio raíz conserva su redirección permanente a `www`. Antes de cada lanzamiento hay que comprobar `/robots.txt`, `/sitemap.xml`, canonicals, Markdown negociado, una URL 404 y el formulario. Para deshacer un lanzamiento se retira temporalmente la ruta del Worker o se vuelve a desplegar una versión anterior verificada; el origen histórico de GitHub Pages no es el proceso normal de publicación.

## Controles de calidad

- [SignsOfAI](https://github.com/peopleworks/SignsofAI): revisión explicable en español y gate en CI.
- [no-ai-slop](https://github.com/petergyang/no-ai-slop): reglas editoriales adaptadas al manual de Ordantis.
- [Vale](https://github.com/errata-ai/vale) y [write-good](https://github.com/vale-cli/write-good): estilo programable.
- [LanguageTool](https://github.com/languagetool-org/languagetool): gramática mediante endpoint self-hosted opcional.
- [schema-dts](https://github.com/google/schema-dts): tipado del grafo JSON-LD.
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci): rendimiento, accesibilidad, prácticas y SEO.
- [Unlighthouse](https://github.com/harlan-zw/unlighthouse): rastreo multipágina bajo demanda y programado.
- [Claude SEO](https://github.com/AgriciDaniel/claude-seo): referencia metodológica para auditorías falsables, no dependencia de producción.

Las páginas de Agent Engineering enlazan las fuentes técnicas primarias de MCP, Agent Skills, A2A y Promptfoo. Langfuse y Phoenix quedan como opciones de laboratorio; no se anuncian como integraciones activas.

## Variables externas

Consulta `.env.example`. La web no carga GA4 ni Clarity sin consentimiento. Search Console, Bing Webmaster Tools, Keyword Planner y SE Ranking requieren cuentas o credenciales del propietario y no se simulan en código. IndexNow queda preparado con `npm run indexnow`: solo envía las URLs cuando el propietario configura `INDEXNOW_KEY` y la web desplegada puede servir `/indexnow-key.txt`.

Las vistas de localhost, la previsualización privada y los hosts distintos de `ordantis.com` / `www.ordantis.com` no habilitan GA4 ni Clarity, aunque haya IDs y se acepte analítica. Los identificadores públicos se incorporan en la compilación; `TURNSTILE_SECRET` y `DIAGNOSTIC_RECIPIENT` permanecen como secretos del Worker.

El gate local añade comparación léxica de las 30 guías (`npm run quality:overlap`). Playwright verifica navegación, móvil, el Lab, enlaces internos y páginas huérfanas (`npm run test:e2e`). Consulta `docs/IMPLEMENTATION_STATUS.md` para separar implementado, pendiente y no verificado en producción.

## Evidencia

El material de propuestas es privado y solo se utiliza para descubrir preguntas. EXIST 2026 sí se publica porque dispone de paper, repositorio, resultados oficiales y limitaciones. Consulta `docs/EDITORIAL.md` y `docs/MEASUREMENT.md`.
