---
name: auditar-setup
description: Audita en modo solo lectura lo que Claude carga antes de cada mensaje (CLAUDE.md, memoria, skills, conectores, hooks) y encuentra reglas que se contradicen. Úsalo cuando Oscar diga /auditar-setup, "audita mi setup", "por qué Claude va lento o gasta tanto" o "limpia mis reglas".
---

# Auditar el setup de Claude

Basado en "Build Opus a playbook" de Charlie Hills (newsletter del 15 nov 2026), adaptado a Oscar. Oscar tiene muchos conectores (Magnific, Martini, Picsart, Comfy Cloud, Figma, Notion, Google Workspace, Adobe, Gmail, Calendar, plugins de marketing/productividad…) y cada uno ocupa contexto en cada mensaje.

**Todo este skill es de solo lectura: informa en el chat y no edita nada** hasta que Oscar apruebe cambios concretos.

## Paso 1: medir lo que se carga

Ejecútalo en la carpeta home del usuario (donde está `.claude`).

1. Ejecuta `claude -p "/context"` en esa carpeta y muestra todo lo que se carga antes de que Oscar escriba: archivos CLAUDE.md, memoria, lista de skills, conectores y el texto propio de Claude Code, con los tokens de cada cosa. Si no se puede ejecutar, estima por tamaño de archivo (4 caracteres ≈ 1 token) y márcalo como estimación.
2. Skills: cuántos hay y cuántos aparecen solo con el nombre, sin descripción, porque la lista se quedó sin espacio.
3. Conectores: lista cada uno, si está duplicado y si falla al conectar.
4. Hooks: lista cada hook de la configuración, qué lo dispara y qué hace. Señala los que añaden texto a cada mensaje, los que apuntan a archivos que ya no existen y los que nunca se probaron.
5. Uso real: lee las sesiones de los últimos 30 días en `~/.claude/projects/`. Calcula los tokens típicos por respuesta, el porcentaje de respuestas por encima de 150.000 tokens y los 10 archivos más leídos con su tamaño. Señala cada skill, conector y hook que no se usó nunca.

Termina con **una tabla ordenada de mayor a menor coste** y una recomendación por fila (mantener / desactivar / revisar).

## Paso 2: reglas que se pelean

1. Lee completos los CLAUDE.md y el índice de memoria. Busca también en skills, hooks y notas de memoria.
2. Busca cuatro cosas:
   - un "siempre" que choca con un "nunca";
   - la misma regla con un número o nombre distinto;
   - una regla que nombra un archivo, herramienta o carpeta que ya no existe;
   - una regla copiada en varios sitios que ya no coinciden.
3. Para cada caso, cita los dos lados textualmente con el archivo de cada uno. Di cuál gana hoy y por qué, y haz una pregunta de sí o no con tu recomendación.
4. No cambies nada. Espera a que Oscar responda pregunta por pregunta.

## Después

Aplica solo los cambios que Oscar apruebe, uno por uno. Para cada cambio, di qué archivo tocas y cómo deshacerlo.
