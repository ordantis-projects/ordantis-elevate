# Auditoría de Cloudflare para SEO y GEO

Revisión de 30 de agosto de 2026 sobre la zona `ordantis.com` de la cuenta `Ordantis Solutions`.

## Estado observado

- Cloudflare actúa como DNS, proxy y capa de seguridad. Las cabeceras públicas (`x-github-request-id`, `x-github-edge-region` y `Via: varnish`) muestran que el origen publicado sigue siendo GitHub Pages.
- La portada responde 200, pero `/sitemap.xml`, `/llms.txt` y las páginas locales de Albacete y Valencia responden 404 en producción. Es coherente con que la arquitectura Next.js continúa solo en local.
- AI Crawl Control detectó 345 solicitudes de rastreadores de IA en las últimas 24 horas: 20 permitidas y 325 fallidas. El resumen atribuyó 322 de las respuestas a HTTP 404.
- `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `PerplexityBot`, BingBot y Googlebot no están bloqueados mediante los controles de crawler de Cloudflare.
- El `robots.txt` gestionado de Cloudflare está desactivado. Se conserva así porque el repositorio expresa una política más precisa: búsqueda e inferencia permitidas, entrenamiento restringido.
- Markdown for Agents de Cloudflare exige plan Pro y está desactivado. No hace falta contratarlo: la aplicación ya negocia `Accept: text/markdown` y genera Markdown desde la misma fuente que el HTML.

## Configuración de agente

Se ejecutó el prompt oficial de `developers.cloudflare.com/agent-setup/prompt.md`:

- 13 skills de Cloudflare instaladas en `C:\Users\SERGIO\.agents\skills`;
- MCP registrados: `cloudflare`, `cloudflare-docs`, `cloudflare-bindings`, `cloudflare-builds` y `cloudflare-observability`;
- MCP principal autorizado con permisos de lectura en la cuenta `fermago2005@gmail.com`, organización `Ordantis Solutions`.

Codex debe reiniciarse para cargar los nuevos servidores. Los MCP de bindings, builds y observability solicitarán OAuth cuando se usen por primera vez.

## Política recomendada

1. Mantener permitidos los crawlers de búsqueda y asistentes que aportan citas o referencias.
2. No activar un bloqueo global de AI bots: mezclaría búsqueda, asistentes y entrenamiento.
3. Mantener el `robots.txt` del origen como fuente de verdad y usar Cloudflare para observar incumplimientos.
4. Publicar primero la nueva arquitectura en una URL de preview. Validar 200, canonical, schema, Markdown, sitemap, 404 real, consentimiento y rendimiento antes de cambiar el origen del dominio.
5. Tras el lanzamiento, volver a AI Crawl Control y segmentar respuestas 2xx/4xx por crawler y ruta. El objetivo inmediato no es aumentar solicitudes, sino eliminar los 404 de las URL válidas.

## Previsualización de Workers preparada en local

La ruta recomendada actualmente por Cloudflare para esta aplicación Next.js 16 es vinext sobre Workers. Se preparó sin sustituir el desarrollo habitual con Next.js y sin desplegar:

- `vinext check` declara el proyecto 100 % compatible, sin incompatibilidades ni avisos parciales;
- Inter y Space Grotesk se sirven desde el propio paquete, evitando una dependencia de Google Fonts y conservando la tipografía del diseño;
- el Worker de previsualización usa un nombre separado, `ordantis-web-preview`, `workers.dev`, URL de preview y observabilidad, sin rutas ni dominio personalizado;
- `vinext build` y el empaquetado de Wrangler en modo `--dry-run` terminan correctamente; el Worker comprimido ocupa 1.298,11 KiB y solo declara el binding de activos;
- dos pruebas E2E específicas pasan sobre el runtime local real de Workers: 52 páginas canónicas, HTML con JavaScript desactivado, schema, sitemap, `robots.txt`, `llms.txt`, Markdown y respuestas de bots;
- la revisión visual de escritorio y 390 × 844 confirma el diseño original, las fuentes, el menú móvil, la cinta de empresas animada y la carga diferida de los sellos de confianza.

El build de vinext y Next.js generan formatos distintos para los tipos de ruta en `.next`. El control `typecheck` regenera primero los tipos de Next para que la batería habitual no dependa del último compilador ejecutado.

No se ha creado una URL pública de preview. Aunque no cambie `ordantis.com`, una URL `workers.dev` sería pública y queda supeditada a autorización expresa.

## Por qué `ai-train=no`

La política distingue usos que no deben mezclarse:

- `search=yes` y `ai-input=yes` permiten descubrir, recuperar y citar el contenido público;
- `ai-train=no` expresa que ese contenido no se ofrece para entrenamiento de modelos;
- `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, Bravebot, Googlebot y Bingbot están permitidos;
- `GPTBot`, `CCBot`, `ClaudeBot` y `Google-Extended` están restringidos como rastreadores de desarrollo o entrenamiento.

OpenAI separa expresamente OAI-SearchBot, usado para aparecer en búsqueda, de GPTBot, usado para entrenamiento. Anthropic separa de forma análoga Claude-SearchBot y Claude-User de ClaudeBot. Google-Extended no afecta a Google Search ni a sus sistemas de ranking, pero sí controla conjuntamente el uso para futuros modelos Gemini y el grounding en Gemini Apps y Vertex AI. Por eso mantenerlo restringido protege el contenido sin perjudicar la elegibilidad en Google Search o AI Overviews, aunque reduce una vía potencial de aparición dentro de las aplicaciones Gemini. Cambiar esa excepción requiere una decisión consciente del propietario.

## Límites

La auditoría es una lectura del panel y del dominio publicado. La preparación posterior solo añadió configuración y pruebas locales al repositorio. No se han cambiado DNS, reglas WAF, políticas de bots, origen, caché ni despliegues. Permitir un crawler solo lo hace técnicamente elegible; no obliga a Google, ChatGPT, Claude o Perplexity a citar Ordantis.
