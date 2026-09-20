# Apariencia automática del dispositivo

El propietario solicita compatibilidad con la configuración claro/oscuro del visitante, sin selector. El modo claro sigue siendo el diseño existente; el oscuro utiliza azul marino, texto claro y cian de marca.

## Implementación

- Variables CSS bajo `prefers-color-scheme: dark`, sin estado React, scripts de tema, cookies o almacenamiento de preferencia. La apariencia cambia también si cambia el sistema con la página abierta.
- `color-scheme` y metadatos estáticos `viewport` para controles nativos y colores del navegador. Aplicada la guía Next.js y la documentación instalada de `generate-viewport`; no se introduce un componente cliente para resolver una preferencia CSS.
- Superficies, texto y bordes de portada, páginas corporativas, capacidades, artículos, Labs, diagnóstico, tablas legales y panel de cookies adaptados al fondo oscuro. Las secciones originalmente oscuras y los botones cian conservan su identidad.
- El SVG del logotipo adapta únicamente las letras azul marino a texto claro. Conserva geometría y flecha cian. Los logos externos mantienen sus colores sobre una base blanca, sin inversión ni recoloreado.
- La intro y su cobertura temprana comparten el fondo del tema desde el primer pintado. Se mantienen salida independiente de hidratación, salto, movimiento reducido y acceso sin JavaScript.
- Las 44 flechas animadas, enlaces con SVG fino, cinta de empresas y controles originales permanecen. No cambian contenido, rutas, metadatos editoriales, grafo SEO/GEO ni el comportamiento del consentimiento o envío del diagnóstico.

## Verificación

Capturas de portada, intro, personalización de cookies y diagnóstico revisadas visualmente en móvil y escritorio. Pruebas de navegador en 320, 390, 768, 1024 y 1440 px: cambio claro/oscuro en vivo, ausencia de selector y almacenamiento de tema, intro antes de hidratación, renderizado oscuro sin JavaScript, legibilidad de campos y textos seleccionados y ausencia de desbordamiento horizontal.

Las comprobaciones de contraste cubren títulos, descripciones, campos y controles de consentimiento seleccionados con umbral 4,5:1; no constituyen una auditoría completa ni certificación WCAG. Los tests del diagnóstico no envían solicitudes reales de contacto. Una prueba de navegación local se ajusta para rechazar previamente las cookies, evitando que el panel esperado intercepte el enlace en 320 px.

Pase final de navegador: 55 pruebas correctas de apariencia, diseño recuperado y experiencia móvil; incluye las 20 nuevas comprobaciones de apariencia. El pase anterior de apariencia, cookies e intro superó 85 pruebas. Las capturas finales revisadas incluyen `.quality/appearance-home-dark-viewport-desktop.png`, `.quality/appearance-intro-dark-mobile-320.png`, `.quality/appearance-cookies-dark-mobile-320.png` y `.quality/appearance-diagnostic-dark-desktop.png`.

`npm run quality` superado al cerrar el cambio: lint, tipos, 85 pruebas unitarias, revisión editorial de 86 archivos y 666 pares, 12 artefactos SEO/GEO y nueve invariantes, exportación y compilación de 71 rutas. Advertencia no bloqueante: el inventario Browserslist instalado requiere actualización; no se modifican dependencias por esta tarea.

Referencia técnica: [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme), incluida la adaptación de SVG incrustado al esquema del elemento padre.

## Publicación

Cambio local. No se sube a Cloudflare ni se alteran Access, despliegue público, cuentas, destinatarios o secretos. La privada sigue en la versión anterior hasta una nueva petición de publicación.

Publicación posterior autorizada mediante «subela»: actualización exclusiva del alias privado staging a `186b3659-7b45-4530-875b-43197224339e`. Access y despliegue activo conservados; registro en `PRIVATE_PREVIEW_APPEARANCE_2026-09-19.md`.
