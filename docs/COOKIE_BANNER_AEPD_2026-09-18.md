# Aviso de cookies contrastado con la AEPD

Petición del propietario: revisar la web de la Agencia Española de Protección de Datos y adaptar el aviso. Consulta realizada el 18 de septiembre de 2026.

## Fuentes oficiales y alcance

- [Guía sobre el uso de cookies, mayo de 2024](https://www.aepd.es/guias/guia-cookies.pdf), apartado 3.1.2.2, páginas 19–22: primera capa, finalidades, terceros, enlace a la política y opciones de aceptación y rechazo. La guía contempla prescindir de un panel adicional cuando solo existe una finalidad opcional.
- [FAQ de la AEPD sobre cookies](https://www.aepd.es/preguntas-frecuentes/17-internet-y-redes-sociales/FAQ-1707-importancia-de-las-cookies-en-la-proteccion-de-datos): aceptación y rechazo simultáneos, con igual visibilidad.
- [Política de cookies de la AEPD](https://www.aepd.es/politica-de-cookies): declara solo cookies técnicas. No se copia esa declaración a Ordantis, cuya aplicación permite analítica opcional mediante GA4 y Clarity.

Es una revisión técnica y editorial basada en esas fuentes, no una certificación jurídica. No se ha realizado en este pase una auditoría autenticada de los ajustes reales de Google, Microsoft o Cloudflare ni de sus contratos o transferencias.

## Cambios

- Título «Cookies y privacidad» y descripción accesible del diálogo. Identifica Ordantis y explica almacenamiento necesario, cookies de terceros, medición de visitas, mapas de interacción y reconstrucciones de sesión.
- Botones «Rechazar cookies» y «Aceptar cookies», ambos en la primera capa con el mismo estilo, ancho y alto. Se conserva rechazo antes de aceptación en el orden visual y de teclado.
- Enlace visible «Política de cookies». La preferencia se puede revisar desde «Gestionar cookies» del pie. No se añade un paso intermedio de configuración: la única finalidad opcional es analítica; no hay una categoría de publicidad habilitada por la aplicación.
- Se conserva el bloqueo de GA4 y Clarity sin aceptación, la retirada con recarga si había SDK activos, la caducidad a 180 días y la propagación a otras pestañas. No se modifica el alcance ni la versión de la preferencia guardada.
- El aviso no desaparece por navegar o desplazarse. Se puede cerrar rechazando sin activar analítica. La intro queda por delante del aviso durante su reproducción; el contenido sigue renderizado en servidor.
- La política refleja los nuevos botones, la categoría única y que navegar no equivale a aceptar. Se actualiza únicamente la fecha editorial real de `/cookies`. El inventario histórico no se presenta como una nueva comprobación de cookies efectivas.
- Se conserva la identidad visual, el NIF exclusivamente en páginas legales y el bloqueo de analítica en local y previsualizaciones privadas.

## Controles

`npm run quality` correcto: lint, tipos, 85 pruebas unitarias, 86 archivos de contenido, 12 artefactos SEO/GEO y nueve invariantes, build de 71 rutas. Se actualizan los selectores de los tests que dependían de los nombres anteriores.

Pruebas en cinco anchos (320, 390, 768, 1024 y 1440 px): diez controles específicos del aviso, 35 de analítica con proveedores simulados, 55 de intro y diez de interfaz pública. El primer pase supera 109 de 110: el nuevo aviso persistente cubre el CTA inferior del 404 a 320 px. Se ajusta ese recorrido para rechazar antes de pulsar el CTA y se repiten las diez pruebas de interfaz, todas correctas. No se utilizan clics forzados ni se oculta el aviso para pasar el test. Nuevo pase de lint y tipos correcto tras el ajuste.

Se comprueban descripción accesible, igualdad geométrica y visual de botones, objetivos táctiles de al menos 44 px, ausencia de desbordamiento, reapertura y navegación sin consentimiento implícito. Las pruebas de analítica interceptan los proveedores: no llegan visitas ni datos a Google o Microsoft. Inspección visual de las capturas del aviso en escritorio y a 320 px completada.

Cambio local. No se publica en la privada ni en el dominio principal, no se cambian cuentas, Access, DNS, secretos ni proveedores.

Actualización posterior del 19 de septiembre: el propietario pide también Personalizar. Se añade una selección opcional sin retirar la aceptación y rechazo directos; comportamiento y comprobaciones en `COOKIE_CUSTOMIZATION_2026-09-19.md`.
