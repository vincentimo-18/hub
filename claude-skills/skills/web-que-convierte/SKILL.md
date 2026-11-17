---
name: web-que-convierte
description: Mejora o rediseña la web personal o de estudio de Oscar con un proceso en cuatro pasos (datos, textos, diseño a partir de webs de referencia, revisión de qué frena a los visitantes). Úsalo cuando Oscar diga /web-que-convierte, "mejora mi web", "rediseña la web" o "por qué mi web no consigue clientes".
---

# Web que convierte

Basado en "Build your website" de Charlie Hills (newsletter del 15 nov 2026), adaptado a la web de Oscar: el repo `hub`, una web estática en HTML, CSS y JS sin build, con todo el contenido en `js/data.js`.

Cada paso se enseña y se aprueba antes de seguir. Nunca inventes logos, prensa, testimonios, cifras ni premios.

## Paso 1: archivo de datos (CONTEXT.md)

Si no existe un `CONTEXT.md`, entrevista a Oscar **una pregunta cada vez** hasta poder explicarle el encargo a un desconocido:

- qué es exactamente la web (portfolio personal, web del estudio Beat Maps Squad o las dos cosas);
- a quién sirve (productoras, marcas, festivales, estudios de VFX que contratan);
- qué tiene que contener;
- qué debe hacer un visitante (contactar, ver el reel, contratar).

Lee primero `README.md`, `about.html` y `js/data.js` para no preguntar lo que ya está ahí. Enséñale la lista de datos y espera su "sí" antes de guardar.

## Paso 2: textos (COPY.md)

1. Propón las páginas que necesita la web y confirma la lista con Oscar.
2. Entrevístale página por página preguntando solo lo que falta: qué tiene que decir cada página, qué pruebas puede enseñar (créditos, premios, clientes reales) y qué debe hacer el visitante después.
3. Pregunta qué búsquedas debería posicionar cada página (por ejemplo "AI film director London" o "creature animator").
4. Escribe todo en `COPY.md`, pensado primero para personas, con los términos de búsqueda en títulos, encabezados y primeras líneas de forma natural.
5. Enséñaselo antes de construir nada.

## Paso 3: diseño (DESIGN.md)

1. Oscar elige unas 5 webs cuyo look le encante. Pueden ser de estudios de VFX o animación, directores o galerías de referencia de diseño. Si alguna ofrece un DESIGN.md descargable, úsalo.
2. Únelas en un solo `DESIGN.md`: colores, tipografías, espaciado y componentes, con una sección de registro de decisiones.
3. **La marca de Oscar manda en colores y tipografía** (negro `#060606`, oro `#E3C23C`, carmesí `#901625`, ver `css/style.css`). Las referencias mandan en el layout y la sensación.
4. Enséñaselo antes de construir.

## Paso 4: construir

- Aplica `COPY.md` textualmente y cada decisión visual de `DESIGN.md`, respetando la estructura del repo: el contenido en `js/data.js`, y la navegación, el contacto y el pie en `js/main.js`.
- Haz que se vea lo mejor posible sin salirte de `DESIGN.md`.
- Ábrela en local, haz capturas de cada página (escritorio y móvil), revísalas contra `DESIGN.md`, arregla lo que falle y después enséñale el resultado.
- Añade los títulos de página, las meta descriptions, las etiquetas Open Graph, un sitemap y encabezados semánticos, y comprueba que carga rápido.
- La web se publica con GitHub Pages: no hagas push a la rama principal sin permiso de Oscar.

## Paso 5: qué frena a los visitantes

Con la web publicada, lee todas las páginas y di las **5 cosas que más impiden que un visitante contacte**, ordenadas por impacto. Después propón la reescritura de la portada que arregla las 5 y espera su OK.
