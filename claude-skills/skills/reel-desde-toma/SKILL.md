---
name: reel-desde-toma
description: Convierte una toma en bruto hablando a cámara en un reel vertical 1080x1920 con gráficos en movimiento sincronizados palabra por palabra. Úsalo cuando Oscar diga /reel-desde-toma, "edítame este reel", "corta esta toma" o deje un raw.mp4 y pida un reel para Instagram, LinkedIn, X o TikTok.
---

# Reel desde una toma en bruto

Basado en "Get Claude editing your reels" de Charlie Hills (newsletter del 15 nov 2026), adaptado a Oscar: director y animador VFX, cineasta con IA en Beat Maps Squad.

## Antes de empezar

- Comprueba que existan `ffmpeg` y una herramienta de transcripción con tiempos por palabra (`whisper`, `whisper.cpp` o `faster-whisper`). Si faltan, di cómo instalarlas en macOS (`brew install ffmpeg`) o Windows (`winget install ffmpeg`) y pide permiso antes de instalar nada.
- Para renderizar, usa Playwright o Puppeteer con Chromium; si no está, pide permiso para instalarlo.
- Trabaja dentro de la carpeta donde está la toma. Se espera un archivo `raw.mp4`; si tiene otro nombre, pregunta cuál usar.

## Paso 1: cortar la toma

1. Corta `raw.mp4` para un reel corto: quita cada pausa de más de 0,25 s y cada arranque en falso o frase repetida, quedándote con la última toma limpia de cada frase. Nunca cortes dentro de una palabra.
2. Guarda el resultado como `cut.mp4`.
3. Transcribe `cut.mp4` con tiempos por palabra y guarda cada palabra con su inicio y su fin en `words.json`.
4. Enséñale a Oscar la transcripción completa y espera su OK antes del paso 2.

## Paso 2: el montaje

Crea `reel.html`, una página de 1080x1920 que exponga `window.seek(t)` (t en segundos) y dibuje el fotograma de ese instante.

- `seek(t)` tiene que ser una función pura: el mismo t dibuja siempre el mismo fotograma. Nada de temporizadores, animaciones CSS ni números aleatorios sin semilla fija.
- Después renderiza `reel.mp4` a 30 fps con el audio de `cut.mp4` debajo.

### Dirección

1. **Primero el movimiento, después la cara.** La cara de Oscar sale como máximo en una cuarta parte del reel: en la frase de arranque, en el remate y en la pregunta final. El resto del tiempo, objetos reales representan lo que dice.
2. **Cada frase se convierte en una imagen que entra justo en su palabra.** Si dice "tres pasos", se construyen tres cosas. Si dice un número, el número aparece en esa palabra. Si nombra una herramienta (Magnific, Dreamina, ComfyUI, CapCut, Topaz…), su interfaz real se construye en pantalla mientras la nombra. Si compara dos cosas, van lado a lado.
3. **Sin recortes.** Profundidad, movimientos de cámara y objetos que se construyen, entran volando, se ensamblan o se intercambian. Nada de tarjetas estáticas con una línea de texto ni flechas de clip-art.
4. **Cosas reales, no dibujos de cosas:** capturas reales, logos reales y clips reales de los trabajos de Oscar cuando ayuden. Pregunta qué material puede usar.
5. **Look Beat Maps Squad** (por defecto, salvo que Oscar pida otro): fondo negro `#060606`, acentos en oro `#E3C23C` y carmesí `#901625`, una tipografía sans limpia y entradas sin rebote. Si Oscar quiere otro look, que lo diga en una línea.
6. **Sonido:** un whoosh suave en cada corte y música unos 18 dB por debajo de la voz.

Planifica el tiempo de cada momento contra `words.json` **antes** de escribir código. Después constrúyelo, renderízalo y para.

## Notas

- La primera versión casi nunca es la final: espera 2 a 4 rondas de notas de Oscar y aplica solo lo que pida.
- No publiques nada. Entrega `reel.mp4` en la carpeta.
