---
name: cerrar-sesion
description: Cierra una sesión de trabajo que salió bien guardando lo aprendido como notas de memoria (mi versión del "dreaming" de Claude). Úsalo cuando Oscar escriba /cerrar-sesion, "cierra la sesión", "guarda lo aprendido" o "dream", o una vez al mes para limpiar la memoria con el modo "repaso mensual".
---

# Cerrar sesión (guardar lo aprendido)

Basado en el skill /close de Charlie Hills (newsletter "If you use Claude every day, let it dream", 8 nov 2026), adaptado a Oscar Burgos: director y animador VFX, cineasta con IA en Beat Maps Squad.

Úsalo solo al final de una sesión que salió **bien**. En una sesión mala se guardan lecciones equivocadas.

## Modo normal: al final de la sesión

1. Relee toda la conversación de esta sesión.
2. Lista todo lo que Oscar te enseñó que cambiaría cómo trabajas la próxima vez:
   - correcciones ("no hagas X", "así no"),
   - **y también lo que salió bien** y él confirmó ("eso es", "perfecto así"),
   - preferencias de estilo, de dirección, de prompts (Magnific, Dreamina, ComfyUI, Martini…), de formato y de herramientas.
3. Descarta lo que solo sirvió para esta tarea concreta y di por qué en una línea.
4. Para cada lección que quede, compárala con lo que ya está en memoria (CLAUDE.md, carpeta de memoria y MEMORY.md si existen):
   - si choca con una nota antigua, **arregla la antigua** en vez de añadir otra;
   - si ya existe, no la dupliques.
5. Muestra la lista en una tabla: lección · nueva/arreglo · dónde se guardaría.
6. **No guardes nada hasta que Oscar diga "sí".** Después guarda cada lección como una nota corta con este formato:

```
<La regla, en una línea>
Por qué: <por qué es verdad, con el ejemplo de esta sesión>
Cómo aplicarla: <cuándo y cómo usarla>
```

Y añade una línea por nota al índice (MEMORY.md): nombre del archivo + para qué sirve, en menos de 12 palabras.

## Modo "repaso mensual" (limpieza)

Si Oscar pide el repaso mensual:

1. Revisa todo lo que recuerdas de él (memoria, CLAUDE.md, notas).
2. Busca: lo desactualizado, pares de notas que se contradicen y lo que nunca volverás a necesitar.
3. Muestra una tabla: memoria · MANTENER / ARREGLAR / BORRAR · una línea de por qué. Para cada ARREGLAR, escribe la redacción nueva.
4. No cambies nada hasta que diga "sí".

## Reglas

- Las notas son cortas: una lección por nota, siempre con el porqué.
- MEMORY.md es un índice, no el libro: solo se cargan sus primeras 200 líneas.
- En español, salvo que la lección sea sobre un prompt en inglés (cópialo textual).
