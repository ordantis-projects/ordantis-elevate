# Móvil y recorrido de diagnóstico — 16 de septiembre de 2026

## Alcance autorizado

Mejorar la experiencia móvil conservando la identidad original, unificar el CTA, simplificar el final del diagnóstico y añadir enlaces contextuales a Albacete y Valencia desde Empresa. Tras completar la verificación local, el propietario confirmó actualizar la previsualización privada; subida registrada en `PRIVATE_PREVIEW_MOBILE_2026-09-16.md`.

## Cambios

- Portada móvil: descripción breve antes de la acción, detalle técnico después, áreas táctiles de al menos 44 px y flechas de fondo atenuadas en la zona de lectura. Se mantienen las 44 flechas, la intro, el movimiento de empresas, los 12 servicios y las nueve demos.
- Menú móvil: enlaces amplios numerados, CTA «Iniciar diagnóstico» y correo alternativo. Cierre por Escape, enlace, clic exterior, salida del foco y cambio al breakpoint de escritorio. No introduce un bloqueo modal de la página.
- Diagnóstico: tres preguntas y un cuarto paso de envío. Campos adicionales plegados; el email se pide una sola vez al final. Revisión de respuestas, orientación, copia, descarga y borrador siguen disponibles en apartados secundarios.
- El envío conserva las tres respuestas, todos los campos opcionales, la selección múltiple de infraestructura, el contexto y la orientación. Se reutiliza `buildDiagnosticSummary`; no se ha modificado el transporte del backend ni sus destinatarios.
- Los errores no borran el cuestionario ni disparan reintentos. El bloqueo de envío evita duplicados; tras la aceptación desaparece el botón de envío. La aceptación del servicio no se presenta como confirmación de entrega o lectura.
- Turnstile se adapta al ancho real de su contenedor: compacto por debajo de 300 px y flexible en el resto. Al cambiar de tamaño se renueva el widget; al volver de paso se invalida el token anterior. Se conserva validación de servidor.
- Primera capa de privacidad visible, no escondida dentro de un desplegable. Textos corregidos a `web@ordantis.com` → `contacto@ordantis.com` → buzones internos autorizados. No se publican las direcciones de reenvío internas.
- Empresa enlaza contextualmente a las dos áreas, sin añadirlas a la navegación principal ni al pie. Se distingue domicilio registral en Albacete de área de servicio en Valencia. El control de enlaces entrantes ahora exige estas dos páginas también.
- HTML y Markdown comparten el contenido; se actualizó la descripción Markdown del envío, que todavía describía solo un borrador. Los archivos técnicos siguen sin enlaces visibles en la interfaz.

## Verificación

- `npm run quality`: superado; 71 tests unitarios, lint, tipos, control editorial, solapamiento, invariantes SEO y build de Next.
- `npm run build:vinext`: superado sin desplegar. Mantiene una advertencia sobre chunks grandes; esta revisión no afirma una mejora cuantificada de Core Web Vitals.
- 35 pruebas del formulario con proveedores y envíos simulados: cinco anchos, resumen completo, validación de campos plegados, caducidad del antispam, ausencia de duplicados, error de servidor, límite temporal y pérdida de conexión. No se enviaron correos reales.
- Primera pasada visual: 10 pruebas correctas, con capturas en 320, 390, 768, 1024 y 1440 px. Inspección de portada móvil, menú estrecho, escritorio y pantalla final del diagnóstico.
- Regresión completa tras el último ajuste de etiquetas: `npm run test:e2e -- --workers=4`, 492 pruebas correctas y 18 omitidas por su restricción de breakpoint/proyecto, sin fallos (4,9 minutos). Incluye las 55 páginas en cinco anchos, el grafo de enlaces internos, el contenido/schema sin JavaScript, la retirada del consentimiento, la intro, las demos y el recorrido de diagnóstico sin envío.
- Comprobación adicional con emulación táctil (390 × 844, rotación a 844 × 390): menú desplazable, navegación al diagnóstico y avance de preguntas correctos; cero desbordamiento y cero errores de página. Los campos conservan tipografía de al menos 16 px en móvil.
- Previsualización Next local disponible en `http://127.0.0.1:3000/`. No se ha hecho una nueva prueba remota autenticada ni un envío real. El paquete de Cloudflare está compilado, no publicado.

## Límites

Las pruebas son en navegador automatizado; no sustituyen una comprobación física en Safari/iOS y Android con sus teclados y lectores de pantalla. No se ha alterado Access, DNS, cuentas de medición, cookies, secrets ni rutas de envío. Las políticas siguen necesitando la validación jurídica ya documentada.

Referencias de implementación: [tamaños oficiales de Turnstile](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/) y [modelo de información por capas de la AEPD](https://www.aepd.es/sites/default/files/2019-09/guia-modelo-clausula-informativa.pdf).
