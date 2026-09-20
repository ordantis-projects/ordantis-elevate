# Calidad de la exportación de Keyword Planner

Fecha: 29 de agosto de 2026. Estado: **utilizable con limitaciones** para priorizar clústeres y revisar el lenguaje de páginas existentes. No es adecuada para estimar tamaño de mercado, estacionalidad o dificultad SEO.

## Controles superados

- El original descargado se conserva sin modificar y con SHA-256 `CCF24A9776AAC4D9068DE4D5F79058A33980A25B873A99190A125BB49CD95BB0`.
- Las 50 semillas tienen una fila y solo una en la exportación: no hay duplicados ni consultas sin cruzar.
- Las 31 ausencias de promedio permanecen como `null`; no se convierten en cero.
- Los cambios desde base cero se separan de un porcentaje finito.
- La competencia y las pujas conservan su significado publicitario.

## Hallazgos que limitan el uso

| Severidad | Hallazgo | Impacto | Tratamiento |
| --- | --- | --- | --- |
| Media | El alcance solicitado era español, pero el plan ejecutado muestra Todos los idiomas. | Puede mezclar búsquedas en otros idiomas, aunque las consultas introducidas estén en español. | Declarar el filtro real y repetir con español si el selector se habilita. |
| Media | Solo 19 de 50 consultas tienen promedio. | No permite ordenar con precisión la cola especializada ni interpretar ausencias como falta de demanda. | Priorizar por clúster y mantener las 31 ausencias como desconocidas. |
| Media | Ninguna consulta incluye serie mensual. | No se puede analizar estacionalidad ni comprobar los cambios por mes. | Esperar una exportación con desglose o usar otra fuente con la misma ventana. |
| Alta si se interpreta mal | Competencia, índice y pujas son de Google Ads. | Usarlos como dificultad orgánica produciría decisiones SEO falsas. | Mantenerlos solo como contexto comercial publicitario. |
| Media | `MCP vs API` muestra +900 % y `desarrollo de agentes de IA` infinito. | Un cambio extremo sobre base pequeña o cero parece más estable de lo que es. | Tratarlo como señal exploratoria, no como pronóstico. |

## Conclusión operativa

La medición respalda reforzar `/capacidades` y `/capacidades/data-intelligence`. Agentes, predicción y documentos conservan páginas propias por intención, no por el tamaño de la cifra. No se crean nuevas URLs para GovTech, RAG o variantes sin promedio. El siguiente contraste válido es con SERP y consultas reales de Search Console después de publicar e indexar la arquitectura.
