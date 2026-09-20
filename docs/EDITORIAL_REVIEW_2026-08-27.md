# Revisión editorial del 27 de agosto de 2026

## Alcance y criterio

Revisión de las 30 guías, las cinco capacidades, Home, Empresa, Research y Labs. Se ha contrastado el primer grupo de contenidos y artefactos con la conversación, especialmente las propuestas de las líneas 15970–16120 y el clúster de preguntas prioritarias. El estado general del Plan Maestro se mantiene en `IMPLEMENTATION_STATUS.md`.

El objetivo no es hacer pasar un texto asistido por un texto de autoría humana. Se revisan utilidad, precisión, evidencia, repeticiones y frases intercambiables. Ningún detector permite certificar «cero AI slop».

## Hallazgos y cambios

| Hallazgo | Cambio aplicado |
| --- | --- |
| Las guías repetían una estructura útil, pero muchas terminaban en comprobaciones abstractas. | Cada una incorpora una situación didáctica distinta y la decisión que cambia. Los 30 ejemplos se identifican como inventados; no se atribuyen a propuestas, clientes ni resultados. |
| La guía de anonimización presentaba la tabla reversible de alias como parte de la anonimización. | Se distingue seudonimización de anonimización y se enlaza la explicación de la AEPD. |
| Un texto afirmaba que la representación intermedia impedía al generador introducir hechos nuevos. | Se explica que esquema y prompt no bastan: hace falta comprobar las afirmaciones y bloquear o revisar las no respaldadas. |
| Dos artículos RAG repetían recuperación, citas y abstención. | La guía de arquitectura se centra en inventario, fragmentación, permisos y cambios del índice. La otra mantiene cobertura de evidencia, contradicción y abstención. Conservan enlaces entre sí. |
| Servicios descritos como método, sin aclarar qué recibe quien contrata. | Añadidos datos de entrada, entregables propuestos, aceptación y exclusiones en las cinco capacidades. No se prometen porcentajes, plazos o precios inventados. |
| Home y Empresa hablaban de las piezas facilitadas y de cómo se había redactado la web. | Eliminado metadiscurso de producción. Se mantiene el alcance factual de INCIBE y DesafIA. |
| La versión Markdown de Research omitía método y resultado débil de Task 2.3. | Método, aportaciones, resultado débil y condiciones de reproducción salen ahora de la misma fuente que el HTML. |
| Labs no tenía enlaces de entrada. | Añadido a navegación y pie, y enlazada su primera demo desde Data Intelligence y sus guías. |
| Las pruebas locales podían usar los identificadores reales de medición tras aceptar cookies. | GA4 y Clarity solo se habilitan en los dominios públicos de Ordantis y con consentimiento; las vistas locales no envían visitas. |

## Revisión de intenciones próximas

El informe generado por `npm run quality:overlap` compara los 435 pares de guías mediante TF-IDF. Excluye encabezados, referencias y notas comunes. Su puntuación es **similitud léxica**, no probabilidad de autoría ni evidencia de canibalización SEO. El umbral de bloqueo de 0,82 es un control interno contra copias próximas, no un umbral respaldado por Google.

| Par de contenidos | Diferencia que se conserva |
| --- | --- |
| RAG: arquitectura / abstención | Cómo construir y mantener el índice / cómo decidir si una respuesta tiene evidencia suficiente. |
| Informe técnico / Excel a memoria | Validación de afirmaciones del borrador / modelado de celdas, fórmulas y dependencias. |
| Permisos de agentes / human-in-the-loop | Autorización técnica de la operación / capacidad efectiva de la persona para corregir o detenerla. |
| Prompt injection / permisos | Datos externos que intentan cambiar instrucciones / alcance e identidad de cualquier acción. |
| Sensores / agua incompleta | Calidad y procedencia de la lectura / estimación y evaluación de periodos sin observar. |
| Privacidad Edge / audio sin grabación | Arquitectura y ciclo de vida del dispositivo / buffers, registros y derivados del audio. |
| Datos territoriales / mantenimiento de datos públicos | Resolver identidad y ubicación / gestionar versiones, esquema y actualización. |
| Documento a geometría / ocupación de vía pública | Construir hipótesis desde descripciones / contrastar permiso, observación y tolerancia. |
| EXIST modalidades / mediador semántico | Aportación de una señal al modelo / dependencia y versionado del enriquecimiento. |

No se ha creado una URL nueva para cada idea secundaria de la conversación. Una pregunta que ya se resuelve en otra guía se amplía allí, salvo que exista una decisión claramente diferente.

## Herramientas: qué se ha ejecutado y qué no

- Ejecutados en local: reglas editoriales propias sobre `content`, `app` y `components`, tests de cobertura, comparación léxica y revisión manual del texto.
- No-ai-slop se utiliza como referencia editorial, no como un detector de autoría ni como una dependencia instalada.
- SignsOfAI y Vale están configurados en CI; no se ha ejecutado ese CI remoto porque no se ha hecho push. En este equipo se ha encontrado .NET 9, no el .NET 10 que requiere la configuración de SignsOfAI; Vale tampoco está instalado. No se han instalado runtimes globales para simular un resultado.
- LanguageTool sigue siendo opcional y necesita su endpoint. No se presenta como una revisión gramatical ya ejecutada.
- Faltan análisis semántico con embeddings, comparación de intenciones con SERP reales y seguimiento de canibalización con Search Console. El filtro léxico no los sustituye.

## Referencias consultadas

- [No AI Slop](https://github.com/petergyang/no-ai-slop): detalles concretos, aperturas, contrastes y metadiscurso.
- [SignsOfAI](https://github.com/peopleworks/SignsofAI): reglas de revisión y límites de las puntuaciones.
- [AEPD: anonimización y seudonimización](https://www.aepd.es/prensa-y-comunicacion/blog/anonimizacion-y-seudonimizacion): distinción aplicada a la guía documental.
- [Repositorio GEMF](https://github.com/cofrian/exist2026-ordantis): arquitectura, resultados, fallos y reproducción. Se conservan las fuentes académicas originales sin crear perfiles personales en la web.

## Antes de publicar

Revisar datos legales, proveedores de medición y fechas de primera publicación de los borradores. Las fechas de revisión no deben actualizarse automáticamente con cada despliegue. No convertir propuestas en casos públicos sin autorización y pruebas de ejecución.
