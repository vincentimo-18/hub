# Skills de Claude de Oscar

Skills aprobados a partir del **Radar diario**. Cuando apruebas propuestas del reporte ("P1 y P3"), Claude los crea o los actualiza aquí, y tu Mac y tu PC los recogen solos una vez al día.

| Skill | Para qué | Origen |
|---|---|---|
| `cerrar-sesion` | Al final de una sesión buena, guarda lo aprendido como memoria (y repaso mensual para limpiarla) | Charlie Hills, 8 nov 2026 |
| `auditar-setup` | Mide lo que Claude carga en cada mensaje (conectores, skills, hooks) y encuentra reglas que se contradicen. Solo lectura | Charlie Hills, 15 nov 2026 |
| `reel-desde-toma` | Convierte una toma en bruto en un reel vertical con gráficos sincronizados palabra por palabra, con el look de Beat Maps Squad | Charlie Hills, 15 nov 2026 |
| `infografia-mundo-prestado` | Infografías y carruseles para LinkedIn/X dentro de "mundos" de cine y VFX: claqueta, timeline, node graph, dope sheet… | Charlie Hills, 25 oct 2026 |
| `web-que-convierte` | Mejora tu web en pasos: datos, textos, diseño, construcción y qué frena a los visitantes | Charlie Hills, 15 nov 2026 |

## Cómo se usan

En Claude Code (en el terminal o en la app de escritorio, en una sesión local), escribe `/` y el nombre, por ejemplo `/cerrar-sesion`, o pídelo con tus palabras ("edítame este reel").

## Instalación (una sola vez por ordenador)

Necesitas `git`. En Mac viene con las herramientas de Xcode; en Windows se instala con `winget install Git.Git`.

**Mac**, en Terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/vincentimo-18/hub/claude/optimistic-franklin-s8ppeh/claude-skills/instalar-mac.sh -o ~/instalar-skills.sh && bash ~/instalar-skills.sh --programar
```

**PC (Windows)**, en PowerShell:

```powershell
iwr https://raw.githubusercontent.com/vincentimo-18/hub/claude/optimistic-franklin-s8ppeh/claude-skills/instalar-pc.ps1 -OutFile $HOME\instalar-skills.ps1; powershell -ExecutionPolicy Bypass -File $HOME\instalar-skills.ps1 -Programar
```

Esto copia los skills a `~/.claude/skills` y programa una sincronización **cada día a las 9:00 y al encender el ordenador o iniciar sesión**. Si el ordenador estaba apagado a las 9, se pone al día al encenderlo. Solo toca las carpetas de estos skills; los demás skills que tengas no se modifican.

## En la app de Claude (chat y Cowork)

Los skills de Claude Code y los de la app de Claude van por separado. Para tenerlos también en el chat, en **claude.ai → Settings → Capabilities → Skills**, sube el `.zip` de cada skill de la carpeta `zips/`. Ahí se sincronizan solos con todos tus dispositivos.
