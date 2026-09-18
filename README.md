# oscarburgos — sitio personal

Web estática de **Oscar Burgos** — Director & VFX Animator. Sin build, sin dependencias: HTML + CSS + JS.

## Estructura

```
index.html            Portada: hero con vídeo, los dos reels, 3 proyectos destacados, premios
work.html             Todos los proyectos IA (con filtros) + charlas
credits.html          Filmografía VFX
awards.html           Premios y festivales
about.html            Bio, estudio (Beat Maps Squad) y Timo
css/style.css         Estilos. Paleta: negro #060606 · oro #E3C23C · carmesí #901625
js/data.js            ★ TODO EL CONTENIDO editable: proyectos, créditos, premios, enlaces, textos
js/main.js            Inyecta nav + contacto + pie en todas las páginas, renderiza data.js,
                      filtros, lightbox de vídeo, menú móvil
assets/img/           Imágenes (firma, Timo, favicon, pósters, miniaturas…)
assets/video/         hero.mp4 (cabecera) y reel-cartoon-preview.mp4 (loop del Cartoon reel)
site.webmanifest      Icono / nombre para "añadir a pantalla de inicio"
```

La nav, el bloque de contacto y el pie se generan desde `main.js`: para cambiarlos
se edita ahí una sola vez y salen iguales en las cinco páginas.

## Cómo añadir cosas

Todo se edita en `js/data.js`.

**Vídeo de la cabecera** → `hero.video`. Acepta un MP4 local (`assets/video/hero.mp4`,
recomendado: 10-30 s, sin audio, ≤ 15 MB), o un enlace de YouTube / Vimeo (se incrusta en
silencio y en bucle). Si está vacío se muestra `hero.poster` como imagen fija. El póster se
ve siempre debajo, así que si el vídeo falla o tarda, la web no se queda en negro.

**Reels** → `reels`: dos entradas (Showreel 2025 y Cartoon reel). `video` = reel completo
(YouTube o Vimeo, se abre al hacer clic); `preview` = MP4 corto y mudo que se reproduce en
bucle en la portada (10-15 s, ≤ 4 MB).

**Proyectos IA** → `aiWork`: un objeto por proyecto. `home: true` lo pone en la portada
(máximo 3); `kind` es el filtro de la página Work:

```js
{
  title: "Nombre",
  role: "Director",
  year: "2026",
  description: "Una o dos frases.",
  video: "https://youtu.be/XXXX",     // YouTube o Vimeo → lightbox; miniatura automática
  thumb: "",                          // opcional
  link: "https://…",                  // opcional, si no hay vídeo
  awards: ["Finalist — Festival X"],  // opcional
  kind: "Short film",                 // Short film · Series · Commercial · Promo…
  home: true,                         // opcional: sale en la portada
  featured: true                      // opcional: doble ancho en Work
}
```

**Premios y festivales** → `awards`: `{ year, title, kind, items: ["Finalist — …"] }`.
`kind: "award"` para premios a tus proyectos, `"credit"` para producciones en las que
participaste (se muestran atenuadas con la etiqueta "Production credit").

**Filmografía** → `credits`: `{ title, role, studio, year }`. Solo lista, sin vídeos.

**Charlas** → `talks`. **Timo** → `timo`.

**Redes** → `links`: se muestran como iconos (arriba en la nav, abajo en Contact y en el pie).
`icon` es el id dentro de `assets/img/icons.svg` (instagram, youtube, linkedin, vimeo, imdb,
behance, linktree, mail); `nav: true` lo pone también en la barra superior. Iconos de
[Simple Icons](https://simpleicons.org) (CC0).

**Tipografía y cabeceras**: Inter (títulos grandes en mayúsculas, peso 500) + IBM Plex Mono
para etiquetas. Las páginas interiores tienen una cabecera con titular a dos tonos
(`<span class="dim">` para la segunda frase en gris) sobre un brillo carmesí/oro y una
imagen de fondo atenuada (`<img class="page-head__bg">`).

**La firma / logo** → `assets/img/oscar-burgos-signature.png` (extraída del banner de
Magnific). Para cambiarla, sustituye ese archivo por un PNG con fondo transparente.

## Ver en local

Abre `index.html` en el navegador, o:

```bash
python3 -m http.server 8080   # → http://localhost:8080
```

## Publicar (GitHub Pages)

1. En GitHub: *Settings → Pages → Source: Deploy from a branch*.
2. Elige la rama y la carpeta `/ (root)`.
3. La web queda en `https://<usuario>.github.io/<repo>/`. Para un dominio propio, añade un archivo `CNAME`.
