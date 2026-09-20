# Sistema editorial y anti-AI-slop

## Objetivo

El contenido debe permitir que una persona técnica compruebe qué problema se resuelve, con qué datos, bajo qué límites y qué resultado obligaría a detener el trabajo. No se intenta ocultar el uso de herramientas de asistencia. Se evita publicar prosa genérica, claims sin fuente o páginas creadas para cubrir keywords sin aportar una decisión útil.

## Estados de evidencia

1. **Publicado y verificable.** Tiene fuente pública, autor, fecha, método y límites. Puede aparecer como research o evidencia.
2. **Ejecutado con autorización pendiente.** No se publica hasta disponer de permiso y datos suficientes para describirlo sin inducir a error.
3. **Propuesta técnica.** Sirve para formular preguntas y protocolos. No es un caso, cliente ni resultado.
4. **Hipótesis de laboratorio.** Se presenta como roadmap o experimento en preparación.

## Revisión de una página

- La apertura responde a una pregunta o declara una actividad concreta.
- Cada número tiene una fuente, muestra, periodo y métrica.
- Las palabras “líder”, “garantiza”, “ahorro” o “precisión” necesitan evidencia visible.
- La página declara los casos en los que la técnica no encaja.
- Research y guías técnicas incluyen limitaciones.
- El cierre lleva a una acción útil, no a una frase solemne.

## Gates

`scripts/content-quality.mjs` bloquea patrones de alto riesgo. SignsOfAI revisa el corpus español con el catálogo `quality/signsofai-ordantis.json`. Vale aplica las reglas de `.vale/styles/Ordantis`. LanguageTool cubre gramática cuando se configura un endpoint propio.

El resultado de un linter es una señal de revisión. No se utiliza para afirmar quién escribió un texto.

`npm run quality:overlap` compara el texto de las guías mediante TF-IDF y escribe `.quality/editorial-overlap.md`. Bloquea copias léxicas próximas; no sustituye embeddings, revisión de intención ni datos de Search Console. El crawler de `tests/e2e/links.spec.ts` comprueba enlaces internos, fragmentos y páginas sin enlaces de entrada.

Las 30 guías incluyen ejemplos didácticos explícitamente inventados. No deben mezclarse con resultados de research ni atribuirse a un cliente. La revisión detallada y las herramientas realmente ejecutadas constan en `EDITORIAL_REVIEW_2026-08-27.md`.

## Referencias adoptadas

- [SignsOfAI](https://github.com/peopleworks/SignsofAI)
- [no-ai-slop](https://github.com/petergyang/no-ai-slop)
- [Vale](https://github.com/errata-ai/vale)
- [LanguageTool](https://github.com/languagetool-org/languagetool)

## Ejecución del 28 de agosto

SignsOfAI, Vale y LanguageTool ya se han ejecutado localmente por página. Se ha retirado `write-good` del gate español y corregido el catálogo inválido de SignsOfAI. La revisión semántica con embeddings también está ejecutada, con lectura de los doce pares más próximos. Resultados, excepciones y comandos: [revisión del 28 de agosto](EDITORIAL_REVIEW_2026-08-28.md). La similitud no se presenta como una prueba de canibalización ni los detectores como prueba de autoría.
