# Revisión editorial ejecutada — 28 de agosto de 2026

Trabajo local, sin publicar. Los correctores y el modelo semántico se han ejecutado en este equipo. No se han enviado propuestas ni borradores a servicios de corrección externos. Un detector no certifica autoría humana ni calidad.

## Herramientas y resultados

Segunda pasada del mismo día: textos del diagnóstico, privacidad y cookies ajustados a la implementación real. Se repitieron SignsOfAI, Vale y LanguageTool sobre las 50 páginas: Vale y LanguageTool sin observaciones; SignsOfAI conserva solo las dos revisiones ya justificadas para el índice y FAQ. Se reconoció `Web3Forms` como nombre del proveedor, sin exceptuar frases ni reglas gramaticales. Las 30 guías no cambiaron, por lo que no se presenta la comparación semántica anterior como una nueva ejecución.

| Comprobación | Alcance | Resultado |
| --- | --- | --- |
| SignsOfAI 0.5.0, .NET 10.0.11 | 50 páginas, español, reglas propias | 48 bajo el umbral orientativo de 25; directorio y FAQ con revisión razonada de sus alertas estadísticas |
| Vale 3.19.0 | Reglas Ordantis y repetición; control positivo previo | 50 páginas comprobadas, ninguna incidencia pendiente |
| LanguageTool 6.6, Java 17 | Servidor local, ortografía y gramática españolas | 50 páginas, ninguna observación pendiente; 338 coincidencias de términos técnicos y 11 falsos positivos revisados |
| Solapamiento léxico | TF-IDF, 30 guías, 435 pares | Máximo 0,217; no equivale a semántica ni a datos de búsqueda |
| Solapamiento semántico | MiniLM multilingüe local, 30 guías, 435 pares | Cola de revisión de intención; no se fusionan páginas por un umbral no calibrado |

Informes completos generados: `.quality/signsofai-pages.json`, `.quality/vale-pages.json`, `.quality/languagetool.json`, `.quality/editorial-overlap.md` y `.quality/semantic-overlap.json`. No se incluyen binarios ni modelos en Git.

## Configuración corregida

- SignsOfAI usaba categorías inexistentes (`Brand` y `Evidence`) y no podía cargar las reglas. Ahora usa su esquema válido.
- Vale aplicaba reglas y diccionario ingleses al castellano. El estilo sigue comprobándose con Ordantis; LanguageTool se ocupa de la ortografía española. Un control positivo verifica que las reglas se cargan de verdad.
- LanguageTool ignoraba toda la regla ortográfica española. Ahora solo admite términos exactos revisados; conserva el resto de comprobaciones. Tampoco corta palabras para dividir las peticiones.
- SignsOfAI analiza cada URL, no solo el promedio del corpus. Las revisiones del directorio y de FAQ están vinculadas al hash del texto: un cambio exige nueva revisión. No eximen artefactos ni afirmaciones detectadas por las reglas propias.
- Falsos positivos como «entorno de ejecución», «quien valida» o «aún sin comprobar» conservan la forma correcta. La justificación está en `quality/language-reviewed.json`.

## Correcciones de contenido

Se han aclarado los títulos y métodos de ablación, corregido puntuación y siglas, precisado la respuesta sobre mantenimiento de FAQ y ampliado GovTech con requisitos del procedimiento y un ejemplo de versiones contradictorias. Se conserva la separación entre propuesta, ejemplo inventado y resultado publicado. Solo avanzan las fechas de las guías modificadas.

## Revisión semántica

Modelo: [Xenova/paraphrase-multilingual-MiniLM-L12-v2](https://huggingface.co/Xenova/paraphrase-multilingual-MiniLM-L12-v2), revisión `2c4055b12046f11709e9df2c122e59ffbdc2f900`, cuantización q8, Transformers.js 3.8.1. Fragmentos de hasta 128 tokens, sin truncar texto; media ponderada por palabras y normalización L2. Se excluyen encabezados repetidos, notas comunes y fuentes. El coseno sirve para ordenar la lectura, no demuestra canibalización.

| Par revisado | Coseno | Diferencia de intención que se conserva |
| --- | --- | --- |
| Informe técnico / valoración de subvenciones | 0,887 | Afirmaciones y cálculos respaldados frente a aplicar criterios de una convocatoria; el ejemplo de subvenciones comprueba el periodo del certificado. |
| Desacuerdo de anotadores / subvenciones | 0,858 | Distribuciones de votos en investigación frente a una valoración administrativa documentada. Comparten vocabulario de revisión, no la pregunta. |
| Validar antes de industrializar / subvenciones | 0,852 | Protocolo transversal de aceptación frente a requisitos de un procedimiento concreto. |
| Informe técnico / memoria desde Excel | 0,851 | Control de afirmaciones frente a fórmulas, celdas vacías, unidades y dependencias de una hoja. |
| Leakage temporal / predicción en tiempo real | 0,850 | Información disponible al entrenar frente a colas, concurrencia, plazos y respuesta degradada en operación. |
| Descartar un agente / permisos | 0,850 | Elegir si hace falta autonomía frente a limitar una herramienta cuando el agente ya se ha elegido. |
| Desacuerdo / umbrales soft-hard | 0,846 | Conservar votos originales frente a convertir probabilidades en decisiones discretas. |
| Permisos / human-in-the-loop | 0,846 | Vinculación de autorización a parámetros frente a capacidad real de comprender, rechazar y detener. |
| Desacuerdo / informe técnico | 0,844 | Incertidumbre de las etiquetas frente a afirmaciones documentales. No se interpreta cercanía temática como duplicado. |
| RAG con abstención / informe técnico | 0,842 | Cobertura de una respuesta buscada frente a generación de un documento con campos, cálculos y aprobación. |
| Descartar agente / prompt injection | 0,841 | Selección de arquitectura frente a defensa ante instrucciones introducidas en las fuentes. |
| Modalidades EXIST / umbrales soft-hard | 0,839 | Aportación de una señal frente a la regla final de binarización. |

No se han fusionado estas páginas. Hay que contrastar la intención con consultas e impresiones reales después de publicar; todavía no existe esa evidencia para la nueva arquitectura.

## Repetir

1. Ejecutar `npm run content:export`.
2. `npm run quality:signsofai` usa el CLI instalado; para runtime portátil admite `SIGNSOFAI_DOTNET` y `SIGNSOFAI_DLL`.
3. `npm run quality:vale` admite `VALE_BIN`.
4. `npm run quality:language` necesita `LANGUAGETOOL_URL=http://127.0.0.1:8010/v2/check`. Sin servidor declara NO EJECUTADO, no aprobado.
5. Para semántica, instalar `@huggingface/transformers@3.8.1` en `.quality/semantic` y ejecutar `npm run quality:semantic`. La primera ejecución descarga el modelo; la inferencia posterior es local.

Referencias: [SignsOfAI](https://github.com/peopleworks/SignsofAI), [Vale](https://vale.sh/), [LanguageTool](https://github.com/languagetool-org/languagetool).
