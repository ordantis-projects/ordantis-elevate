# Presentación de las guías — 18 de septiembre de 2026

El propietario solicita retirar las fechas de revisión visibles y el bloque repetido «Nota de evidencia» sobre propuestas técnicas internas.

- Se retira el banner de las 37 guías y la nota genérica de su índice. Markdown y `llms-full.txt` ya no repiten ese texto por guía.
- Se retira «Actualizado el» de los artículos, «Contenido revisado» del pie y «Revisado el» de las cuatro demos de Labs. Se conserva la fecha de publicación de los artículos y la versión de los métodos.
- Se conservan fechas técnicas reales, sitemap, JSON-LD y metadatos; no se modifican fechas editoriales por este ajuste de presentación.
- Los campos internos de procedencia permanecen en el corpus. Los ejemplos siguen marcados como inventados y se conservan las fuentes, condiciones de parada y límites concretos de las pruebas. Las notas legales y las aclaraciones específicas de Labs y research no se eliminan.
- No se cambia la identidad visual ni el contenido de los métodos, y no se presenta ninguna propuesta como proyecto realizado.

## Verificación

`npm run quality` superado: lint, tipos, 84 pruebas unitarias, revisión de 86 archivos de contenido, controles SEO/GEO y build de 71 rutas. Cincuenta pruebas de navegador superadas a 320, 390, 768, 1024 y 1440 px; se verifican las 37 guías en escritorio, ausencia del banner, mantenimiento de fechas de Article y ausencia de desbordamiento. Revisión visual de capturas móvil y escritorio completada. La revisión de componentes conserva los límites servidor/cliente y utiliza la fuente ligera de identidad en el pie.

Cambio local, sin actualización de la privada de Cloudflare ni publicación en el dominio principal.

Publicación posterior autorizada: incorporado al alias staging privado en la versión `f5529f37-6f32-4d4c-ad83-2248951246e3`, con Access conservado. Registro en [publicación privada](PRIVATE_PREVIEW_2026-09-18.md). La web pública no se modifica.
