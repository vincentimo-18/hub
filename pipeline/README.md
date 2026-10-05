# Pipeline · image-blaster

[image-blaster](https://github.com/neilsonnn/image-blaster) (Neilson Koerner-Safrata, MIT) convierte **una sola imagen**
en un set 3D completo en unos 5 minutos. No es una app con botones: son *skills* y *agents* de Claude Code
que orquestan varios modelos. Abres `claude` dentro de la carpeta, le das una imagen y le dices
**"blast it"**.

## Qué sale de una imagen

| Salida | Formato | Modelo | Para qué te sirve |
|---|---|---|---|
| Entorno estático explorable | Gaussian splat `.spz` (100k / 500k / full_res) + panorama + collider `.glb` | World Labs **Marble 1.1** | Location scouting dentro de tu propio plano: mover la cámara, buscar ángulos nuevos, mantener continuidad del set |
| Clean plate (la imagen sin los objetos) | `.png` | **Nano Banana** (o gpt-image-2) | Plate limpio para composición, o para que Marble genere el set vacío |
| Props / objetos sueltos | `.glb` / `.obj` con PBR | **Hunyuan 3D** vía FAL (o Meshy) | Llevar al Blender/Unreal/Maya: blocking, layout, proxies |
| Sonido | `.mp3`: ambiente en loop + impactos por objeto | **ElevenLabs SFX** vía FAL | Room tone / ambiente del set, foley de props |

Todo queda en disco en `worlds/<slug>/` y se ve en un visor local (React + three.js) en `http://localhost:5173/<slug>`.

## Cómo funciona por dentro

```
input/imagen.png
  └─ image-blast-project   crea worlds/<slug>/ y mueve la imagen a source/
  └─ image-blast-uncover   Claude "lee" la imagen: escena, luz, atmósfera, sonido
                           y lista de objetos separables  → image.json  (gratis)
                           ── tú confirmas qué objetos quieres ──
  └─ image-blast-plate     borra esos objetos de la imagen → 1-<slug>-plate.png
  └─ image-blast-world     plate + prompt "set vacío" → Marble → .spz/.glb/pano
  └─ image-blast-3d  ×N    por objeto: lo aísla (Nano Banana) → Hunyuan 3D → .glb
  └─ image-blast-sfx       ambiente en loop + 4 impactos por objeto
  └─ image-blast-publish   (nuestro) sube el mundo a worlds.html de la web
```

Las generaciones van en *agents* en segundo plano, así que mundo, objetos y sonido salen en paralelo.
Nada se sobreescribe: cada regeneración crea `N+1-…` con un JSON oculto al lado que guarda el prompt y la
respuesta del proveedor (se puede reanudar si algo falla).

Además trae `image-blast-wildcard`: busca y lanza **cualquier modelo de FAL** que le pidas (siempre te pide
confirmar el endpoint antes de gastar).

## Instalación (una vez)

Necesitas: `node` ≥ 20, [`bun`](https://bun.sh), `ffmpeg`, y [Claude Code](https://claude.ai/install.sh).

```bash
cd hub
./pipeline/setup.sh          # clona image-blaster en pipeline/image-blaster y aplica nuestros añadidos
```

Claves (en `pipeline/image-blaster/.env`, que no se sube a git):

- `WORLD_LABS_API_KEY` → https://platform.worldlabs.ai/
- `FAL_KEY` → https://fal.ai/ (3D, sonido y edición de imagen)

Si no las pones, Claude te las pide al arrancar.

`pipeline/image-blaster/` está en `.gitignore`: el repo de la web solo guarda el script de instalación y
nuestros añadidos (`pipeline/overlay/`). Está fijado a un commit probado; `./pipeline/setup.sh latest`
lo actualiza a lo último.

## Uso

```bash
cd hub/pipeline/image-blaster
cp ~/Desktop/llaqta-canyon.png input/
claude
```

Y dentro de Claude:

- `blast it and confirm each step with me` — paso a paso, te pregunta antes de cada gasto (recomendado las primeras veces).
- `blast it` — todo de una.
- Cosas sueltas: `/image-blast-3d llaqta-canyon "la lanza de Sua" --face-count 200000`,
  `/image-blast-sfx llaqta-canyon "viento entre rocas, loop"`, `/image-blast-world llaqta-canyon --regenerate`.
- `/image-blast-publish llaqta-canyon` — lo publica en la web (ver abajo).

Consejos:

- **La imagen manda.** Plano general, buena luz, sin desenfoque fuerte ni personajes tapando el set.
  Un key frame de Midjourney / Nano Banana a 16:9 funciona muy bien.
- Para **escenarios**, quita los personajes en el paso de objetos (o pídeselo al plate) para que Marble
  genere el set vacío; luego a los personajes los metes tú en el plano.
- Para props con detalle sube `--face-count` (por defecto 50k; hasta 1.5M). Para layout rápido, `--generate-type LowPoly`.

## Dónde encaja en nuestro pipeline (LLAQTA y demás)

```
key frame (MJ / Nano Banana / Magnific)
   └─ image-blaster ──► set 3D (.spz) ──► buscar ángulos ──► frames inicio/fin ──► Seedance / Kling / Veo
                    ├─► panorama ───────► referencia de luz / HDRI aproximado
                    ├─► props .glb ─────► Blender: layout, previs, proxies para personajes
                    └─► ambiente .mp3 ──► room tone para el montaje
```

1. **Continuidad de localización.** Del mismo set sacas el plano general, el contraplano y el detalle: todos
   comparten geometría y luz. Esos frames van como *start/end frame* o referencia a Seedance/Kling, y el
   `llaqta-prompt-builder` ya describe el sitio (Canyon Pass, Salt Flats…) para que el prompt cuadre.
2. **Previs.** El collider `.glb` + los props se abren en Blender para bloquear cámara y movimiento antes de generar vídeo.
3. **Sonido.** El loop de ambiente es un buen punto de partida para el room tone de la secuencia.
4. **Escaparate.** El mundo se publica en la web como pieza interactiva.

Para sacar frames: en el visor local de image-blaster (`localhost:5173/<slug>`) o en la página
`worlds.html` de la web, que tiene un botón **Capture frame** que descarga un PNG del encuadre actual.

## Publicar en la web (`worlds.html`)

Añadimos un skill propio, `image-blast-publish`, que copia el último mundo generado a
`assets/worlds/<slug>/` y lo registra en `assets/worlds/worlds.js`:

```bash
# desde Claude:  /image-blast-publish llaqta-canyon
# o a mano, desde pipeline/image-blaster:
node .claude/scripts/publish/publish-world.mjs --world llaqta-canyon \
  --title "Canyon Pass" --description "A narrow red-rock pass in the Open Wastes." \
  --project LLAQTA --dry-run      # quita --dry-run para escribir
```

Copia el splat (`500k` por defecto; `--quality 100k` para que vaya ligero en móvil) y la miniatura (la
panorámica solo con `--with-pano`, pesa ~12 MB) y el loop de ambiente si existe. Luego, en el repo hub: `git add assets/worlds && git commit && git push`.

La página `worlds.html` muestra una tarjeta por mundo; al hacer clic abre un visor a pantalla completa
(three.js + [Spark](https://sparkjs.dev), desde CDN, sin build) que arranca en el punto de vista de la imagen
original: arrastrar para mirar, WASD para moverse, E/Q subir/bajar, botón de sonido y **Capture frame**.
`worlds.html#<slug>` abre un mundo directamente (para compartir).

Límites: GitHub no acepta archivos de más de 100 MB (el script se niega a publicarlos); los `full_res` suelen
pasarse, así que usa `500k` o `100k`.

## Costes

Cada blast completo gasta créditos en World Labs (un mundo Marble) y en FAL (una edición de imagen por
plate y por objeto, un modelo Hunyuan por objeto y varias llamadas de SFX). Con 5-6 objetos son bastantes
llamadas de pago por imagen: revisa las tarifas actuales en World Labs y FAL. El modo "confirm each step"
te deja parar antes de cada gasto. La parte de análisis (`uncover`) es gratis.
