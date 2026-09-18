# oscarburgos — sitio personal

Web estática de **Oscar Burgos** — Director & VFX Animator. Sin build, sin dependencias: HTML + CSS + JS.

## Estructura

```
index.html            Estructura de la página (hero, work, about, studio, Timo, contact)
css/style.css         Estilos. Paleta: negro #060606 · oro #E3C23C · carmesí #901625
js/data.js            ★ TODO EL CONTENIDO editable: proyectos, créditos, premios, enlaces, textos
js/main.js            Renderiza data.js, filtros, lightbox de vídeo, menú móvil
assets/img/           Imágenes (Timo, favicon, hero, tarjeta Warsaw Glitch…)
site.webmanifest      Icono / nombre para "añadir a pantalla de inicio"
```

## Cómo añadir cosas

Todo se edita en `js/data.js`.

**Vídeo de la cabecera** → `hero.video`. Acepta un MP4 local (`assets/video/hero.mp4`,
recomendado: 10-30 s, sin audio, ≤ 15 MB), o un enlace de YouTube / Vimeo (se incrusta en
silencio y en bucle). Si está vacío se muestra `hero.poster` como imagen fija. El póster se
ve siempre debajo, así que si el vídeo falla o tarda, la web no se queda en negro.

**Reels** → `reels`: dos entradas (Showreel 2025 y Cartoon reel) con `video` de YouTube o
Vimeo. La miniatura se obtiene sola; si quieres otra, pon `thumb`.

**Trabajo seleccionado IA** → `aiWork`: un objeto por vídeo:

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
  featured: true                      // opcional: doble ancho
}
```

**Filmografía** → `credits`: `{ title, role, studio, year }`. Solo lista, sin vídeos.

**Charlas** → `talks`. **Enlaces** (Contact) → `links`. **Timo** → `timo`.

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
