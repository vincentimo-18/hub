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

**Un proyecto nuevo** → añade un objeto a `projects`:

```js
{
  title: "Nombre del proyecto",
  role: "Director",
  year: "2026",
  category: "ai-film",      // "ai-film" | "vfx" | "talk"
  tags: ["AI short film"],
  description: "Una o dos frases.",
  thumb: "assets/img/mi-proyecto.jpg",   // opcional, 16:9
  video: "https://youtu.be/XXXX",        // opcional: YouTube o Vimeo → se abre en lightbox
  link: "https://…",                     // opcional: si no hay vídeo, abre este enlace
  awards: ["Finalist — Festival X"],     // opcional
  featured: true                          // opcional: tarjeta a doble ancho
}
```

**Un enlace nuevo** (Contact) → añade `{ label, url, handle }` a `links`.

**La firma / logo** → está en `assets/img/oscar-burgos-signature.png` (extraída del banner de Magnific). Para cambiarla, sustituye ese archivo
(PNG con fondo transparente, idealmente ≥ 1600 px de ancho). El hero la detecta
automáticamente y sustituye el título tipográfico por ella.

**Timo** → nombre, título y texto en `timo`. Iconos en `assets/img/timo-*.png`.

## Ver en local

Abre `index.html` en el navegador, o:

```bash
python3 -m http.server 8080   # → http://localhost:8080
```

## Publicar (GitHub Pages)

1. En GitHub: *Settings → Pages → Source: Deploy from a branch*.
2. Elige la rama y la carpeta `/ (root)`.
3. La web queda en `https://<usuario>.github.io/<repo>/`. Para un dominio propio, añade un archivo `CNAME`.
