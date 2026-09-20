# Medición SEO, GEO y calidad

Estado de las cuentas comprobado el 26 de agosto de 2026; instrumentación local revisada el 28. La revisión de código no acredita recepción de eventos en producción.

- Search Console: propiedad verificada, datos de rendimiento disponibles, vinculada con el flujo web ORDANTIS de GA4 y sitemap antiguo con una URL descubierta.
- Bing Webmaster Tools: propiedad conectada y en procesamiento; todavía no tiene sitemap registrado.
- Microsoft Clarity: proyecto Ordantis comprobado en el perfil de Redes Ordantis, conectado y activo con la propiedad `ORDANTIS SOLUTIONS SL` de GA4; el ID está configurado solo en `.env.local`, todavía no en producción y sin datos.
- Google Analytics: se reutiliza la propiedad existente `ORDANTIS SOLUTIONS SL` de Redes Ordantis y su flujo web verificado para `https://www.ordantis.com/`. El ID correcto está configurado solo en `.env.local`; todavía no hay datos porque la versión nueva no está publicada.
- Keyword Planner: acceso confirmado bajo Redes Ordantis y exportación oficial completada el 29 de agosto. Se midieron 50 consultas para España, Google y agosto de 2025–julio de 2026; el filtro real fue Todos los idiomas. Hay promedio para 19, 31 ausencias y ninguna serie mensual. No se han activado campañas, presupuesto ni gasto. Datos y límites en `SEARCH_INTELLIGENCE.md`.

### Comprobación generativa del 28 de agosto

La propiedad `https://www.ordantis.com/`, consultada bajo Redes, hereda del dominio el control efectivo **Incluir**. No se ha modificado. El informe generativo muestra **4 impresiones**, todas en la portada, entre el 27 de mayo y el 26 de agosto de 2026. No se interpretan como clics o leads. Search Console todavía no ofrece CWV suficientes y muestra una página indexada: es la versión publicada, no la nueva arquitectura local.

El [informe generativo](https://support.google.com/webmasters/answer/16984139) está en despliegue gradual y sus impresiones están incluidas en el informe web general; no deben sumarse a este como si fueran tráfico adicional. El [control de inclusión](https://support.google.com/webmasters/answer/16908024) es independiente de la política de entrenamiento.

## Antes de producción

1. Sustituir el origen actual de GitHub Pages por el despliegue compatible con vinext/Workers ya validado en local, manteniendo Cloudflare delante del dominio. Antes de cambiar producción falta autorizar y comprobar una URL pública de preview.
2. Mantener `www.ordantis.com` como URL canónica y comprobar la redirección del dominio raíz después del cambio de origen.
3. Configurar en producción los IDs de GA4 y Clarity ya creados.
4. Publicar y comprobar que `/sitemap.xml` contiene todas las URL antes de enviarlo a Google y Bing.
5. Validar Organization, WebSite, Service, Article y BreadcrumbList en herramientas de datos estructurados. No se publican perfiles de equipo ni Person schema en esta fase.
6. Completar la revisión jurídica de privacidad, proveedores, domicilio, NIF y transferencias.

## Medición opcional con consentimiento

- `NEXT_PUBLIC_GA_ID` carga GA4 después de aceptación.
- `NEXT_PUBLIC_CLARITY_ID` carga Clarity después de aceptación.
- Los IDs se validan antes de insertarlos en un script: formato `G-...` para GA4 y alfanumérico para Clarity.
- `page_view` se envía en cada navegación de Next.js, incluida la navegación cliente.
- `ai_organic_visit` registra una vez por sesión las visitas identificadas desde ChatGPT, Perplexity, Gemini, Microsoft Copilot, Claude, Poe, Phind, You.com o Meta AI.
- `traffic_group` y `ai_source` permiten construir dimensiones y una audiencia de AI Organic. Si el referer no existe, debe usarse una URL etiquetada con `utm_source`.
- `contact_start` registra una intención: `contact_page`, `email` o `email_draft`. Un clic no demuestra que se haya recibido una consulta.
- El diagnóstico prepara un resumen local revisable, copiable y descargable. Abrir el borrador registra `contact_start` con `contact_method=email_draft`, nunca un envío confirmado. No se incluyen respuestas en los eventos ni en atributos `href`; el panel completo lleva `data-clarity-mask`. Debe validarse el enmascarado con una sesión de prueba al publicar, conforme a [la documentación de Microsoft](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking).
- El código ya no emite `generate_lead` por clics de correo. Ese evento queda reservado a una futura recepción confirmada; la configuración que ya existe en GA4 no prueba que se haya recibido ningún lead.
- Clarity recibe las etiquetas `traffic_group` y `ai_source`, además de `contact_start_contact_page`, `contact_start_email` y `contact_start_email_draft`.
- Los eventos propios eliminan query y fragmento de la URL y conservan solo el origen del referrer. Esto no acredita el comportamiento de todos los eventos automáticos del proveedor: hay que revisar medición mejorada, formularios y parámetros en la cuenta antes de lanzar.

## Configuración de GA4

Completado:

1. Perfil de Redes Ordantis seleccionado y propiedad existente `ORDANTIS SOLUTIONS SL` verificada.
2. Flujo web existente para `https://www.ordantis.com/` verificado.
3. ID correcto del flujo guardado localmente como `NEXT_PUBLIC_GA_ID`, sin incluirlo en Git.
4. `generate_lead` creado y marcado como evento clave, sin asignarle un valor económico ficticio. Desde la revisión local del 28 no se emite por un simple clic; comprobar que ninguna regla en la cuenta lo vuelva a derivar de `contact_start` o `click`.
5. `traffic_group`, `ai_source` y `contact_method` registrados como dimensiones personalizadas de ámbito evento.
6. Audiencia `AI Organic` creada con `traffic_group` exactamente igual a `AI Organic`.
7. Grupo `Canales Ordantis` creado, renombrando la clasificación nativa `AI Assistant` de GA4 como `AI Organic`.
8. Search Console vinculada con la propiedad y el flujo web de Ordantis.
9. Microsoft Clarity conectado y activo con la propiedad de GA4 de Ordantis.

Pendiente tras publicar:

1. Copiar ambos IDs al entorno de producción y verificar la recogida tras consentimiento.
2. Comprobar en GA4 y Clarity los eventos y dimensiones con tráfico real.

## Regla de canal AI Organic

La agrupación de canales de GA4 debe evaluarse sobre la fuente de la sesión. El clasificador local de `lib/analytics-attribution.ts` acepta dominios conocidos completos (o sus subdominios) y valores `utm_source` de una lista explícita. No acepta una mera coincidencia de texto dentro de una URL: `chatgpt.com.ejemplo.net` o una ruta que incluya «claude» no se consideran tráfico de IA. Las pruebas unitarias cubren estos casos.

Nombre del canal: `AI Organic`. La audiencia/canal ya configurados en GA4 y el clasificador del navegador son mecanismos distintos; deben compararse con fuentes reales al lanzar. No se debe clasificar todo el tráfico de Google como IA porque una visita desde una vista generativa puede ser indistinguible del tráfico orgánico convencional. Sin referrer o etiquetado no se atribuye una procedencia que no se puede demostrar.

## Bloqueos antes de activar medición y envío

- **Diagnóstico:** Web3Forms se ha retirado. Solo Diagnóstico llama al endpoint propio `/api/diagnostic`, protegido con Turnstile y preparado para Cloudflare Email Service y el buzón verificado de Redes Ordantis. Contacto abre el correo de la persona. Las pruebas automatizadas interceptan el endpoint y la prueba local real termina en el binding simulado de Wrangler; ninguna acredita recepción en Gmail. Faltan secretos de producción, prueba autorizada de recepción y revisión jurídica final. Activación y límites: [FORM_DELIVERY.md](FORM_DELIVERY.md).
- **Retirada del consentimiento:** corregida y verificada con 35 pruebas aisladas, incluidos SDK activos, descarga pendiente, varias pestañas, almacenamiento bloqueado y caducidad tanto al abrir como durante la visita. Desactiva GA, para Clarity, limpia cookies propias reconocidas y recarga para descargar los SDK. El panel avisa antes. No borra datos ya recibidos ni cookies de terceros. Evidencia y límites de la simulación: [CONSENT_VERIFICATION.md](CONSENT_VERIFICATION.md).
- **Privacidad:** el inventario técnico y la información por capas ya cubren tratamientos, bases, proveedores, transferencias y plazos publicados. Faltan confirmar NIF, proveedor del buzón final, retención efectiva de las cuentas y garantías contractuales, además del escaneo post-despliegue. La revisión técnica no equivale a validación jurídica definitiva. Evidencia: [PRIVACY_COOKIES_REVIEW_2026-08-30.md](PRIVACY_COOKIES_REVIEW_2026-08-30.md).
- **Producción:** queda comprobar ausencia de duplicados, redacción de parámetros sensibles, enmascarado y recepción real bajo consentimiento. No se ha publicado ni enviado tráfico de prueba a las propiedades de Redes Ordantis.

## Búsqueda

- Search Console: consultas, páginas, indexación, enlaces y Core Web Vitals.
- Bing Webmaster Tools: indexación, keywords, inspección y funciones de visibilidad en IA cuando estén disponibles para la cuenta.
- Keyword Planner y Google Trends: lenguaje de demanda, no redacción automática.
- Semrush o SE Ranking: primer proveedor de pago solo cuando exista una pregunta de mercado concreta. Las skills de [SE Ranking](https://github.com/seranking/seo-skills) requieren cuenta y API.

### SEO local

- Medir por separado `/inteligencia-artificial-albacete` y `/inteligencia-artificial-valencia`.
- Consultas objetivo: combinaciones de `empresa`, `consultoría`, `inteligencia artificial`, `IA`, `datos`, `Albacete` y `Valencia`; no agregar todas en una única posición media.
- Registrar impresiones, clics, CTR, posición y consulta en Search Console. Las acciones y visualizaciones del Perfil de Empresa se incorporarán solo después de configurarlo de acuerdo con el modelo real de atención.
- En las pruebas generativas, conservar pregunta exacta, fecha, ciudad solicitada, fuentes citadas, URL de Ordantis utilizada y precisión de la descripción.
- No interpretar una mención sin enlace o una impresión de marca como una recomendación de «mejor empresa».

Plan, límites de dirección y trabajo externo pendiente: `LOCAL_SEO_SPAIN.md`.

## GEO

Se mide por consulta y fuente: aparición de marca, URL citada, pasaje utilizado, precisión de la descripción y competidores citados. `llms.txt` y Markdown ayudan a consumidores que los lean; no se tratan como señal de ranking en Google.

La versión revisada de `llms.txt` funciona como índice breve y enlaza representaciones Markdown de páginas concretas. Las páginas HTML declaran `rel="describedby"` hacia ese índice. `robots.txt` expresa `search=yes`, `ai-input=yes`, `ai-train=no` y `use=reference` para el contenido público, además de mantener bloqueados los rastreadores de entrenamiento declarados. Estas señales describen preferencias; no garantizan cita ni ranking.

## Rendimiento local

La auditoría del 28 de agosto sí se ha ejecutado: Unlighthouse sobre 50 URL y varias tandas Lighthouse móvil sobre inicio y diagnóstico. En la comparación más reciente la precarga por intención reduce los bytes transferidos un 5,1 % y un 5,5 %, pero las medianas de rendimiento pasan de 90 a 89: no hay una mejora estable de velocidad demostrada. LCP final de 3,31 y 2,77 s, aún sobre 2,5 s. Todas las muestras recientes dan 100 en accesibilidad, buenas prácticas y SEO, sin que eso acredite CWV reales ni ranking. Condiciones, informes y límites: [revisión de rendimiento](PERFORMANCE_REVIEW_2026-08-28.md).

## Enlaces técnicos en el pie

No es necesario mostrar `llms.txt` ni el sitemap en el pie para que funcionen. El sitemap se declara en `robots.txt` y se enviará a Search Console/Bing solo cuando se autorice publicar. `llms.txt` es opcional y no es un requisito de Google. Los enlaces actuales se mantienen: el propietario preguntó por su necesidad, no pidió retirarlos. Fuentes: [guía de sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) y [guía de Google para funciones de IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Cadencia

- Cada pull request: lint, tipos, tests, anti-slop, schema y Lighthouse.
- Semanal durante el lanzamiento: cobertura e indexación.
- Mensual: consultas, citas generativas, páginas huérfanas y contenido que necesita actualización.
- Trimestral: matriz de entidad, evidencia publicada y riesgos de canibalización.
