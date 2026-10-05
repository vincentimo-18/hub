# AI toolkit — vídeo y animación con Claude Opus 5.5

Inventario de los 10 repos de la lista de Charlie Hills: qué es cada uno, para qué sirve, cómo
se usa, qué necesita en el Mac y cuánto cuesta. Todos generan la imagen **con código**
(canvas, p5.js, three.js, WebGL), la renderizan fotograma a fotograma en Chrome sin ventana
y la montan en MP4 con ffmpeg. Salvo uno, no usan modelos de vídeo ni de imagen.

## Instalar en el Mac (una vez)

```bash
git clone https://github.com/vincentimo-18/hub.git && cd hub
bash ai-toolkit/install-mac.sh
```

El script instala con Homebrew `node`, `ffmpeg`, `python@3.12`, `ruby`, `imagemagick` y Chrome.
Instala las 4 skills en `~/.claude/skills` y como plugins, así que sirven en **cualquier
carpeta** donde abras `claude`. Además clona los repos de referencia en `~/ai-toolkit/repos`.
Puedes volver a ejecutarlo cuando quieras para actualizar todo.

En las sesiones de Claude Code en la nube que abras sobre este repo, las skills se cargan solas
gracias a `.claude/settings.json`.

Para saber qué tienes, abre `claude` y pregunta *"¿qué herramientas de vídeo tengo?"*. La
skill `ai-toolkit` (en `.claude/skills/ai-toolkit/`) le explica a Claude el catálogo y
cuándo usar cada herramienta.

> Trabaja los vídeos en una carpeta aparte (p. ej. `~/videos/mi-proyecto`), no dentro de
> este repo: es tu web y los renders pesan cientos de MB.

## Resumen

| # | Repo | Tipo | Para qué | ¿Skill? | Coste |
|---|---|---|---|---|---|
| 1 | [JohnHeibel/PDoomVideo](https://github.com/JohnHeibel/PDoomVideo) | Ejemplo | Videoclip completo de Clawd, para estudiar | No | — |
| 2 | [yihui-dev/awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) | Lista | 475 prompts de vídeos virales | No | — |
| 3 | [dgreenheck/tidewater](https://github.com/dgreenheck/tidewater) | Ejemplo | Juego de pesca 3D en WebGPU | No | — |
| 4 | [riba2534/claude-opus-5-5-demo](https://github.com/riba2534/claude-opus-5-5-demo) | Ejemplo | 3 juegos 3D, un prompt cada uno | No | — |
| 5 | [lemomo-ai/lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) | **Skill** | Cortos en 43 estilos de cine | ✅ `lemo-opuscar` | Solo tokens |
| 6 | [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) | Kit | Motor de animación pintada de Clawd | No (lo cubre `painted-animation`) | Solo tokens |
| 7 | [athemeroy/awesome-opus-5-5-videos](https://github.com/athemeroy/awesome-opus-5-5-videos) | Lista | Cómo se hizo cada look (1.000+ vídeos) | No | — |
| 8 | [diggerhq/shipvideo](https://github.com/diggerhq/shipvideo) | Servicio | URL → vídeo de lanzamiento | No (remoto) | OpenComputer |
| 9 | [makevoid/motion-graphics-music-video-skill](https://github.com/makevoid/motion-graphics-music-video-skill) | **Skill** | Canción → videoclip | ✅ `motion-graphics-music-video` | **~30 $ Fal** por canción |
| 10 | [tuzhechen2005/opus-video-skills](https://github.com/tuzhechen2005/opus-video-skills) | **Skills** | Animación pintada + reels tipográficos | ✅ `painted-animation`, `kinetic-reel` | Solo tokens |

"Solo tokens" quiere decir que no paga ningún servicio externo; solo consume tu uso de Claude.

---

## Skills instaladas

### `painted-animation` — dibujos animados en acuarela (opus-video-skills)
Cortos de dibujos pintados a mano (acuarela y tinta) con el personaje Clawd, más videoclips con
letra y karaoke sincronizado al ritmo. Usa p5.js + p5.brush.
- **Ejemplo:** *"Haz un vídeo de 15 segundos de Clawd intentando atrapar una mariposa."*
- **Proceso:** crea la carpeta del proyecto, te enseña el storyboard, renderiza, revisa hojas de
  contacto y entrega `out/*.mp4`.
- **Tiempo:** 1,5–2,5 s por fotograma, así que son minutos por vídeo.
- **Necesita:** Node, Chrome, ffmpeg, y Python + numpy (solo para sincronizar al ritmo).
- **Seguridad:** ✅ sin hooks ni descargas remotas.

### `kinetic-reel` — reels de tipografía cinética (opus-video-skills)
Showreels con tipografía grande y condensada, micro-texto tipo HUD, capas generativas en three.js
(partículas, mármol líquido, cromo) y música sintetizada al mismo compás. Encaja con tu reel o
con promos.
- **Ejemplo:** *"Haz un reel de 60 s con tipografía cinética de mis tres proyectos a partir de
  este CV."*
- **Salida:** `out/*.mp4`. Con la GPU del Mac es muy rápido (8–40 ms por fotograma).
- **Seguridad:** ✅

### `lemo-opuscar` — cortos en 43 estilos de cine
Una biblioteca de 43 estilos: tinta china, ukiyo-e, RPG pixel, producto 3D en cristal… Cada uno
tiene un `STYLE.md` y un corto de muestra. Claude hace de director: tratamiento, fotogramas de
estilo, animación, voz en off, música, mezcla y MP4 a 1920×1080.
- **Ejemplo:** *"Haz un explainer de 60 s sobre X en estilo Chinese Ink Wash."* Te hace una
  ronda de preguntas y luego trabaja solo.
- **Salida:** carpeta `<nombre>/` con `TREATMENT.md`, los renders y `<nombre>.mp4`.
- **Tiempo:** 30–60 min por corto.
- **Necesita:** Node 20+, ffmpeg y Python 3.11+.
  - La primera vez descarga ~350 MB.
  - Voz (kokoro, en inglés) +0,55 GB; música +140 MB; instrumentos hasta 1,4 GB.
- **Seguridad:** ✅ con matiz. Guarda su biblioteca en `~/lemo-opuscar` y la **actualiza sola
  desde GitHub** en cada uso, así que ejecutas la última versión sin revisarla.

### `motion-graphics-music-video` — canción → videoclip (makevoid) 💸
Le das una canción y una idea. Investiga, escribe `docs/PLAN.md` con los prompts y el
presupuesto, y **espera tu aprobación**. Luego genera personajes y clips con Fal (GPT Image 2.5,
MiniMax H3), compone en p5.js, mezcla el audio en Python y aplica VFX en Swift.
- **Coste:** ~30 $ de créditos de Fal + ~3M tokens por una canción de 3 min. Unos 5 GB de disco
  por vídeo.
- **Configurar la clave:** `/plugin configure motion-graphics-music-video@makevoid-music-video`.
  Pide la clave en [fal.ai](https://fal.ai).
- **Uso:** `/motion-graphics-music-video:motion-graphics-music-video` + ruta de la canción +
  idea. El MP4 queda en `<proyecto>/output/`.
- **Necesita:** Ruby 3.2+, Node 22+, Python 3, ffmpeg, ImageMagick y Chrome. Para los VFX:
  macOS 14+ y las Xcode Command Line Tools (`xcode-select --install`). Está hecho para Mac.
- **Seguridad:** ⚠️ precaución. Es legítimo, pero cuando apruebas el plan gasta en Fal sin
  volver a preguntar, dentro del presupuesto acordado. **Fija un presupuesto ajustado** en el
  plan. Lo que subes a Fal queda en URLs públicas por enlace.
- La lista de LinkedIn enlazaba `antonioevans/...`, que es una copia antigua de este repo.
  Instalamos el original, `makevoid`.

---

## Repos de referencia (en `~/ai-toolkit/repos`)

### ClaudeAnimationBase — kit de animación pintada
Es el motor general sacado del videoclip P(doom). Incluye a Clawd con 31 emociones, vistas,
sombreros y bailes; un motor de pintura y cámara; transiciones con pincel; y un renderizador de
hojas de contacto y MP4. `ANIMATION_GUIDE.md` es la guía para el modelo.
```bash
cd ~/ai-toolkit/repos/ClaudeAnimationBase && npm install
npm run video          # → out/video.mp4
npm run sheet          # → out/sheet.jpg (hoja de contacto)
```
Para tu propio vídeo, abre `claude` dentro de la carpeta y di: *"Lee ANIMATION_GUIDE.md y haz un
vídeo de 15 segundos de Clawd…"*. Necesita Node 22.12+. La skill `painted-animation` ya
empaqueta este enfoque. Usa el kit cuando quieras tocar el motor a mano.

### PDoomVideo — el videoclip P(doom)
El código completo del videoclip (156 s, 9 capítulos, con la canción). Sirve para estudiar cómo
se estructura una pieza larga. En Mac hay que pasarle la ruta de Chrome:
```bash
npm install
node render.mjs --frames=0:156.6 --workers=4 --chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
node render.mjs --encode --out=out/pdoom.mp4
```

### awesome-opus5-5-videos (yihui-dev) — banco de prompts
475 vídeos con su prompt. Los datos están en `data/videos.json` y hay un `.md` por vídeo en
`prompts/`. Categorías: motion (288), interactive (70), explainer (62) y 3d (55).
- **Uso:** filtra por `category` y `tech_tags` (canvas, svg, threejs, shader, gsap…) y descarta
  los que tienen `prompt_partial: true`. Unos 196 prompts están incompletos.
- Ejemplo: *"Busca en ~/ai-toolkit/repos/awesome-opus5-5-videos/data/videos.json prompts de
  motion con threejs que tengan el prompt completo"*.

### awesome-opus-5-5-videos (athemeroy) — cómo se hizo cada look
No es para copiar y pegar. Es un análisis de 1.401 vídeos y 168 casos revisados que clasifica
cómo se produjo cada uno: 2D dibujado en código, explainer, 3D, metraje propio, modelo de vídeo
externo… Úsalo para decidir la técnica antes de empezar.
- Docs útiles: `docs/visual-effects-fit.md` y `production-brief.md`. Algunos están solo en chino.
- Diferencia con el anterior: yihui te da el **prompt**; athemeroy te dice **qué pipeline usar**.

### shipvideo — vídeo de lanzamiento desde una URL
Pegas una URL o un prompt y en un servidor remoto (OpenComputer) Opus escribe una página HTML,
la renderiza y entrega un MP4 de 20–40 s. No se ejecuta en tu Mac.
- Lo más fácil es usar [launchvideo.io](https://launchvideo.io).
- Para tenerlo en tu cuenta: `npx opencomputer template deploy https://github.com/diggerhq/shipvideo`
  (necesita cuenta en OpenComputer; se paga allí).

### tidewater — juego de pesca WebGPU
Isla tropical con océano en tiempo real, pesca con tensión de sedal, tienda y barco, sobre un
motor WebGPU propio. Sirve como referencia de lo que se puede hacer en 3D en el navegador.
- Jugar: [dgreenheck.github.io/tidewater](https://dgreenheck.github.io/tidewater/)
- En local: `npm install && npm run dev` y abre http://127.0.0.1:5189 en Chrome o Safari.
- La primera carga compila cientos de shaders y puede tardar más de 1 min.

### claude-opus-5-5-demo — 3 juegos 3D de un prompt
Un pelícano en bici, un mapa FPS y un juego de karts, cada uno hecho con un solo prompt (están
en el README, en chino). Sirven de ejemplo de prompts de una sola frase.
```bash
cd pelican-bike && npm install && node build.mjs   # abre dist/index.html
```

---

## ¿Qué uso para…?

| Quiero… | Herramienta |
|---|---|
| Un corto animado pintado / un videoclip con letra | `painted-animation` |
| Un reel o promo con tipografía potente | `kinetic-reel` |
| Un corto con un estilo visual concreto y voz en off | `lemo-opuscar` |
| Un videoclip con personajes generados por IA para una canción | `motion-graphics-music-video` (de pago) |
| Un vídeo de lanzamiento de una web | shipvideo / launchvideo.io |
| Inspiración o un prompt de partida | awesome-opus5-5-videos (yihui) |
| Saber qué técnica usar para un look | awesome-opus-5-5-videos (athemeroy) |

## Mantenimiento

- Actualizar todo: `bash ai-toolkit/install-mac.sh`
- Ver plugins: `claude plugin list`
- Desinstalar una skill: `claude plugin uninstall <nombre>`, o borra el enlace en
  `~/.claude/skills/<nombre>`.
