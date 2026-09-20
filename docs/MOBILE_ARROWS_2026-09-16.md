# Flechas diagonales consistentes en móvil

Las capturas del propietario muestran que Safari/iOS representa el carácter diagonal Unicode como emoji con recuadro azul en las etapas del proyecto. Se sustituye por `components/diagonal-arrow.tsx`: SVG de trazo fino con `currentColor`, oculto a lectores de pantalla. Se utiliza el mismo gráfico en todas las flechas diagonales de enlaces, menú y etapas; se conservan los contenedores y sus interacciones.

Las 44 flechas animadas del fondo permanecen sin cambios. No se aplica la primera interpretación de aumentar su opacidad, porque las capturas aclaran que el problema son los emojis de navegación.

Verificación: `npm run quality` y `npm run build:vinext` correctos. Inspección visual en el paquete local Workers a 390 y 1440 px: cuatro SVG en las etapas, ausencia de caracteres diagonales en su texto, cero desbordamiento y cero errores de página. Capturas en `.quality/mobile-arrow-chromium.png` y `.quality/desktop-arrow-chromium.png`. WebKit no está instalado; no se ha hecho una comprobación física en iPhone.

Actualizada la misma previsualización privada con `wrangler versions upload --preview-alias staging --keep-vars`: versión `10bfbfa0-a5f9-4a7e-b2b1-e6602935cd6c`; anterior `c421c15b-dab3-4294-a2b7-378e1a5e6a89` conservada. Alias y URL de versión devuelven HTTP 302 a Cloudflare Access sin autenticación. El despliegue activo conserva `d7e32d8b-69d6-4a59-b7ea-d461accf4525` al 100 %; no se ha actualizado producción.
