# Enlaces técnicos fuera de la interfaz — 15 de septiembre de 2026

El propietario solicita que `llms.txt`, el sitemap y GitHub Research no tengan acceso directo desde la interfaz.

## Cambios

- Retirados del pie los tres accesos «GitHub research», «llms.txt» y «Sitemap».
- Retirado de la portada el acceso «Código y resultados» al mismo repositorio de Ordantis. Se mantiene «Revisar EXIST 2026» y toda la sección Research.
- En las referencias de Research y las guías, se conserva como texto la atribución al repositorio, sin enlace directo. `SourceReference` aplica esta decisión de manera consistente a referencias de guías, research y capacidades. Los enlaces a otras fuentes no se alteran.
- La página 404 ofrece «Ver guías técnicas» en lugar de abrir el XML del sitemap.

No se borran los endpoints `llms.txt`, `llms-full.txt`, sitemap, robots ni Markdown. Se mantienen el descubrimiento en la cabecera HTML/HTTP, el sitemap declarado en robots y las referencias originales en el inventario editorial y las citas estructuradas. La respuesta es la misma para personas y rastreadores; no se condiciona por User-Agent.

Esta decisión elimina accesos visibles, no aplica control de acceso ni vuelve privado un repositorio público. No se retira la sección Research, su ficha EXIST ni sus resultados.

## Verificación

`tests/e2e/links.spec.ts` comprueba en todas las páginas indexables que no existan accesos HTML a esos recursos, además de validar enlaces y fragmentos. `tests/e2e/public-interface.spec.ts` comprueba el pie en los cinco tamaños, la navegación desde el 404 y las respuestas 200 de los archivos técnicos. La batería de preparación para buscadores mantiene su comprobación completa de HTML, schema, robots y Markdown.

Solo local. Sin publicación, cambios en cuentas, envío de sitemap ni modificación de privacidad de GitHub.

## Resultado del pase

`npm run quality` completo correcto: 71 pruebas unitarias, 80 archivos editoriales, 435 pares de similitud, 12 artefactos SEO/GEO, nueve invariantes y compilación de 64 rutas. El pase de navegador tuvo 112 pruebas correctas y 12 omisiones previstas; la única discrepancia correspondía a la suposición de reproducción de la intro tras restaurar el scroll, investigada y documentada en `BRAND_INTRO_2026-09-14.md`. En concreto, pasan las diez verificaciones de interfaz/404, el grafo completo de enlaces y las dos auditorías de preparación para buscadores.

Después de precisar ese contrato, las 40 pruebas de intro pasan en los cinco anchos. No se cambió el código de la aplicación después del pase de 112 pruebas. Capturas del pie y la intro guardadas en `.quality/footer-public-*.png` y `.quality/intro-*.png`.
