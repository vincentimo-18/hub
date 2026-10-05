#!/usr/bin/env bash
# Instala en el Mac todo el kit de vídeo/animación con Opus 5.5:
#   - dependencias con Homebrew
#   - skills de Claude Code (disponibles en TODOS tus proyectos)
#   - repos de referencia en ~/ai-toolkit/repos
# Se puede ejecutar varias veces: si algo ya está, lo actualiza o lo salta.
#
# Uso:  bash ai-toolkit/install-mac.sh

set -euo pipefail

HUB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TOOLKIT_DIR="$HOME/ai-toolkit"
REPOS_DIR="$TOOLKIT_DIR/repos"
SKILLS_DIR="$HOME/.claude/skills"

say()  { printf '\n\033[1;33m▸ %s\033[0m\n' "$*"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$*"; }
warn() { printf '  \033[31m!\033[0m %s\n' "$*"; }

[[ "$(uname)" == "Darwin" ]] || { echo "Este script es para macOS."; exit 1; }

# ── 1. Homebrew y dependencias ────────────────────────────────────────────────
say "Dependencias (Homebrew)"
if ! command -v brew >/dev/null; then
  warn "Homebrew no está instalado. Instálalo desde https://brew.sh y vuelve a ejecutar este script."
  exit 1
fi
for pkg in git node ffmpeg python@3.12 ruby imagemagick; do
  if brew list --formula "$pkg" >/dev/null 2>&1; then ok "$pkg"; else brew install "$pkg"; fi
done

if [[ -d "/Applications/Google Chrome.app" ]]; then
  ok "Google Chrome"
else
  brew install --cask google-chrome
fi

# Ruby de Homebrew (el del sistema es 2.6; la skill de videoclips necesita 3.2+)
RUBY_BIN="$(brew --prefix ruby)/bin"
if ! grep -qs "$RUBY_BIN" "$HOME/.zshrc"; then
  echo "export PATH=\"$RUBY_BIN:\$PATH\"" >> "$HOME/.zshrc"
  ok "Ruby de Homebrew añadido al PATH en ~/.zshrc"
fi
export PATH="$RUBY_BIN:$PATH"
gem list -i bundler >/dev/null 2>&1 || gem install bundler

# ── 2. Claude Code ───────────────────────────────────────────────────────────
say "Claude Code"
if ! command -v claude >/dev/null; then
  warn "No encuentro el comando 'claude'. Instálalo (https://claude.com/claude-code) y vuelve a ejecutar."
  exit 1
fi
ok "$(claude --version)"

# ── 3. Repos ─────────────────────────────────────────────────────────────────
say "Repos en $REPOS_DIR"
mkdir -p "$REPOS_DIR"
REPOS=(
  tuzhechen2005/opus-video-skills          # skills: painted-animation, kinetic-reel
  JohnHeibel/ClaudeAnimationBase           # kit de animación pintada (Clawd)
  JohnHeibel/PDoomVideo                    # videoclip P(doom), ejemplo completo
  yihui-dev/awesome-opus5-5-videos         # 475 prompts de vídeos virales
  athemeroy/awesome-opus-5-5-videos        # guía de 1.000+ vídeos: cómo se hicieron
  diggerhq/shipvideo                       # URL → vídeo de lanzamiento (servicio remoto)
  dgreenheck/tidewater                     # juego de pesca WebGPU
  riba2534/claude-opus-5-5-demo            # 3 juegos 3D de un prompt
)
for r in "${REPOS[@]}"; do
  dir="$REPOS_DIR/$(basename "$r")"
  if [[ -d "$dir/.git" ]]; then
    git -C "$dir" pull --ff-only -q && ok "$r (actualizado)"
  else
    git clone -q --depth 1 "https://github.com/$r.git" "$dir" && ok "$r"
  fi
done

# ── 4. Skills ────────────────────────────────────────────────────────────────
say "Skills de Claude Code"
mkdir -p "$SKILLS_DIR"
link_skill() {  # $1 = origen, $2 = nombre
  ln -sfn "$1" "$SKILLS_DIR/$2" && ok "$2  →  $1"
}
# opus-video-skills se enlaza en ~/.claude/skills/<nombre> porque su SKILL.md llama
# a ~/.claude/skills/<nombre>/scripts/... con esa ruta exacta.
link_skill "$REPOS_DIR/opus-video-skills/skills/painted-animation" painted-animation
link_skill "$REPOS_DIR/opus-video-skills/skills/kinetic-reel"      kinetic-reel
# Catálogo propio: le dice a Claude qué herramientas tienes y cuál usar.
link_skill "$HUB_DIR/.claude/skills/ai-toolkit" ai-toolkit

# Plugins (instalación oficial vía marketplace, ámbito usuario)
claude plugin marketplace add lemomo-ai/lemo-opuscar                    >/dev/null 2>&1 || true
claude plugin marketplace add makevoid/motion-graphics-music-video-skill >/dev/null 2>&1 || true
claude plugin marketplace update >/dev/null 2>&1 || true
for p in lemo-opuscar@lemolab motion-graphics-music-video@makevoid-music-video; do
  claude plugin install "$p" >/dev/null 2>&1 && ok "$p" || warn "no se pudo instalar $p"
done

# ── 5. Resumen ───────────────────────────────────────────────────────────────
say "Listo"
cat <<EOF
  Skills:  painted-animation · kinetic-reel · lemo-opuscar · motion-graphics-music-video · ai-toolkit
  Repos:   $REPOS_DIR

  Pendiente (solo si vas a usar la skill de videoclips, que es de pago):
    1. Crea una clave en https://fal.ai (créditos ~30 \$ por canción de 3 min)
    2. En Claude Code:  /plugin configure motion-graphics-music-video@makevoid-music-video

  Abre una terminal nueva (para el PATH de Ruby), entra en una carpeta de trabajo
  y ejecuta 'claude'. Pregunta: "¿qué herramientas de vídeo tengo?"
EOF
