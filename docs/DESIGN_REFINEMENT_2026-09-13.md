# Refinamiento visual de Ordantis — 13 de septiembre de 2026

## Encargo y límites

Mejorar el acabado de la web existente manteniendo su identidad. Referencia: diseño original `2b9eaa6` y decisiones del propietario recogidas en `AGENTS.md`. Se aplica Impeccable como refinamiento de una estética existente, no como sustitución de marca.

Se conservan blanco, azul marino, cian, Inter, Space Grotesk, botones rectangulares, metodología y pie oscuros. No se despliega ni se modifican cuentas, campañas o servicios externos.

## Cambios

- Portada: la propuesta inicial de dos columnas y figura grande se retiró el 14 de septiembre por indicación del propietario. Se recuperan la composición ancha, el titular y las 44 flechas pequeñas animadas de la portada anterior, también en móvil. Los accesos de fase quedan a continuación del bloque principal.
- Acceso directo a las cuatro fases desde la portada y navegación de fases más clara en Servicios. Se conservan destinos y anclas originales. Los nuevos accesos usan `IntentLink` para no precargar Servicios solo por aparecer en pantalla.
- Ecosistema de emprendimiento: alineación en seis columnas, tres en tableta y dos en móvil. No se editan los archivos de los sellos.
- Ventajas: columnas editoriales con separadores, sin tres cajas de idéntico peso.
- EXIST: composición asimétrica y resultados con sus denominadores visibles (de 144, de 117 y de 186), tomados de `researchEvidence.results`. Se conserva también el cuarto resultado y los enlaces de evidencia.
- Metodología: introducción a dos columnas y numeración visible de fases. Conserva los cuatro desplegables y las geometrías giratorias desde 1536 px.
- Capacidades: toda la fila es un enlace con estado de interacción. Conserva las cinco capacidades y sus descripciones.
- Guías destacadas: cuadrícula editorial de tres/dos/una columna, categoría obtenida de la fuente de capacidades y las seis guías originales completas.
- Servicios: jerarquía de títulos, navegación, fondos alternos de fase y estados de apertura. Conserva las 12 fichas y las nueve demos.
- Preguntas frecuentes: introducción fija durante la lectura en escritorio, indicador de apertura y estados de interacción; sin posición fija en móvil.
- Cierre de diagnóstico: composición lateral en escritorio, apilada en móvil. El flujo de envío y sus destinatarios no cambian.
- Selección de texto y cursor de edición con colores de marca. Se mantienen foco visible y movimiento reducido.
- Corregidos dos destinos internos del Lab documental: la guía de informes y la capacidad Document Intelligence.

## Lo que no se ha eliminado

La cinta de empresas sigue animada, con pausa y alternativa de movimiento reducido. Se mantienen servicios, demos, investigación, preguntas, programas INCIBE/DesafIA y campos del diagnóstico. No se añaden perfiles personales ni se inventan resultados o clientes. No se modifican fechas de otras páginas por cambios de presentación.

## Verificación

Revisión visual inicial de portada, metodología, evidencia, programas y Servicios en escritorio y de portada y Servicios a 390 px. Portada móvil sin desbordamiento horizontal. La prueba de regresión inicial comprobaba separación entre texto y decoración; tras la corrección del propietario comprueba la ausencia de la figura grande, el fondo con 44 flechas pequeñas en movimiento, cuatro accesos de fase, cinco capacidades, seis guías, denominadores y altura táctil.

El primer `npm run quality` completo terminó correctamente: 71 pruebas unitarias, control editorial en 78 archivos, 435 pares, 12 artefactos SEO/GEO, 9 invariantes y build de 64 rutas. El primer intento de navegador quedó impedido por `spawn EPERM`; se autorizó Chromium para ejecutar la suite local. La revisión E2E detectó una precarga automática en los nuevos enlaces de fase y se corrigió reutilizando `IntentLink`.

El segundo `npm run quality` completo también pasó. La suite posterior terminó con **431 pruebas correctas, 18 omisiones previstas y una discrepancia**: el comprobador de enlaces exigía enlaces HTML entrantes para Albacete y Valencia, aunque el propietario había solicitado mantener esas páginas fuera del catálogo y la navegación visibles. No eran errores 404. El contrato de la prueba se ajusta exclusivamente para esas dos páginas y comprueba sitemap, `llms.txt` y Markdown accesible; las demás páginas siguen necesitando enlaces entrantes y todos los enlaces y fragmentos se siguen verificando.

Confirmación visual final: portada de producción local a 320 y 1440 px, y cuadrícula editorial de las seis guías mediante teclado. Capturas en `.quality/preview-home-*.png`. Sin desbordamientos en las vistas comprobadas.

Cierre del 14 de septiembre: `npm run quality` completo correcto tras el ajuste de la prueba. Repetición dirigida de `links.spec.ts` en escritorio correcta (1 prueba, 16,1 s), con las 55 páginas, enlaces, fragmentos y vías de descubrimiento verificadas. El código de la aplicación no cambió después del pase de 431 pruebas; las 18 omisiones son verificaciones que no corresponden al ancho probado o no necesitan repetirse por tamaño. No quedan fallos pendientes de este pase. Las dos páginas locales siguen deliberadamente sin enlaces HTML entrantes: comprobar su sitemap no convierte esa decisión en una mejora de enlazado interno.

No se atribuyen resultados de rendimiento de producción a esta revisión. Sin despliegue, envío de sitemap, cambios de cuenta ni correos reales.

## Corrección solicitada por el propietario — 14 de septiembre

Se retira exclusivamente la nueva composición gráfica de la portada. Se restauran el tamaño, la distribución y la velocidad anteriores de las flechas pequeñas, el titular a todo el ancho y sus espaciados responsive. La alternativa de movimiento reducido se conserva. No se eliminan servicios, contenido, evidencia, guías ni las demás mejoras del pase anterior. La preferencia queda registrada en `AGENTS.md` para no volver a sustituir las flechas por una ilustración gigante.

Verificación de esta corrección: `npm run quality` completo correcto (71 pruebas unitarias y build de 64 rutas) y **35 pruebas E2E correctas** de diseño recuperado y precarga por intención en 320, 390, 768, 1024 y 1440 px. Comprueban animación real, movimiento reducido, ausencia de desbordamiento, navegación por teclado, servicios y diagnóstico sin envío. Revisión visual de las capturas nuevas de escritorio y 320 px: figura grande ausente, titular ancho y flechas pequeñas recuperados. Previsualización local en el puerto 3000; no se ha publicado.
