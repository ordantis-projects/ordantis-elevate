# Pie de página — 18 de septiembre de 2026

El propietario solicita mejorar el bloque oscuro con el logo y los enlaces corporativos y legales, manteniendo la estética de Ordantis.

- Se conserva el fondo azul marino, el logo original, las fuentes locales y el cian. Se destaca la marca y el correo en una fila superior, separada de la navegación por una línea fina.
- La descripción refleja ML, datos y sistemas de IA para empresas y administraciones. No se añaden clientes, perfiles sociales, cifras ni oficinas.
- Tres grupos de navegación con etiquetas accesibles: Ordantis, conocimiento e información legal. Se conservan todos los destinos anteriores y el botón de preferencias de cookies.
- En móvil: marca y contacto apilados; dos columnas de enlaces y bloque legal a ancho completo con enlaces en dos columnas. Controles de al menos 44 px, foco visible en cian y flechas SVG compartidas, sin animaciones ni JavaScript adicional.
- No reaparecen fechas de revisión, NIF ni accesos visibles a llms, sitemap o GitHub Research. Las páginas locales siguen fuera del pie.

`npm run quality` superado: lint, tipos, 84 pruebas unitarias, controles de contenido/SEO y build de 71 rutas. Diez pruebas de interfaz superadas en cinco anchos (320, 390, 768, 1024 y 1440 px), con comprobación de zonas táctiles, apertura de preferencias, foco, destinos y ausencia de desbordamiento. Capturas del componente con viewport alto para evitar que la cabecera fija tape un pie móvil mayor de una pantalla; las comprobaciones geométricas usan los tamaños normales. Revisión visual móvil y escritorio completada.

Cambio local; no se actualiza la privada de Cloudflare ni la web pública en este pase.

Publicación posterior autorizada: incorporado al alias staging privado en la versión `f5529f37-6f32-4d4c-ad83-2248951246e3`, con Access conservado. Registro en [publicación privada](PRIVATE_PREVIEW_2026-09-18.md). La web pública no se modifica.
