#!/usr/bin/env bash
# Instala / actualiza image-blaster dentro de hub/pipeline/image-blaster
# y le aplica nuestros añadidos (pipeline/overlay): skill de publicar en la web + reglas.
#
#   ./pipeline/setup.sh            # instala la versión fijada (IMAGE_BLASTER_REF)
#   ./pipeline/setup.sh latest     # actualiza a lo último de main
set -euo pipefail

REPO="https://github.com/neilsonnn/image-blaster.git"
# Versión probada. Cambia este hash para actualizar de forma controlada.
IMAGE_BLASTER_REF="4acb43ba126a12358f71838d1b1a05e856b10eaf"

HERE="$(cd "$(dirname "$0")" && pwd)"
DEST="$HERE/image-blaster"
REF="${1:-$IMAGE_BLASTER_REF}"
[ "$REF" = "latest" ] && REF="main"

if [ ! -d "$DEST/.git" ]; then
  echo "→ clonando image-blaster en $DEST"
  git clone "$REPO" "$DEST"
fi

echo "→ checkout $REF"
git -C "$DEST" fetch --quiet origin
if [ "$REF" = "main" ]; then
  git -C "$DEST" checkout --quiet main && git -C "$DEST" pull --quiet --ff-only
else
  git -C "$DEST" checkout --quiet "$REF"
fi

echo "→ aplicando overlay (skill image-blast-publish, reglas del hub)"
cp -R "$HERE/overlay/." "$DEST/"
# Que git status de image-blaster no muestre nuestros añadidos como cambios
EXCLUDE="$DEST/.git/info/exclude"
for p in .claude/skills/image-blast-publish/ .claude/scripts/publish/ .claude/rules/hub.md; do
  grep -qxF "$p" "$EXCLUDE" 2>/dev/null || echo "$p" >> "$EXCLUDE"
done

if [ ! -f "$DEST/.env" ]; then
  cp "$DEST/.env.example" "$DEST/.env"
  echo "→ creado $DEST/.env — pon ahí WORLD_LABS_API_KEY y FAL_KEY (o pásaselas a Claude)"
fi

missing=()
for bin in node bun ffmpeg ffprobe claude; do command -v "$bin" >/dev/null || missing+=("$bin"); done
if [ ${#missing[@]} -gt 0 ]; then
  echo "⚠ faltan: ${missing[*]}"
  echo "  node ≥ 20: https://nodejs.org · bun: curl -fsSL https://bun.sh/install | bash"
  echo "  ffmpeg: brew install ffmpeg · claude: curl -fsSL https://claude.ai/install.sh | bash"
fi

cat <<MSG

listo. para usarlo:
  cd "$DEST"
  # mete una imagen en input/
  claude
  > blast it and confirm each step with me
  > /image-blast-publish <slug>      # cuando quieras subirlo a worlds.html
MSG
