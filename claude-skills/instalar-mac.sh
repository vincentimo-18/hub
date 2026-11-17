#!/usr/bin/env bash
# Instala y sincroniza los skills de Oscar en Claude Code (Mac).
# Uso:
#   bash instalar-mac.sh             -> instala/actualiza ahora
#   bash instalar-mac.sh --programar -> además lo programa a diario (09:00) con launchd
set -euo pipefail

REPO_URL="https://github.com/vincentimo-18/hub.git"
RAMA="${SKILLS_RAMA:-claude/optimistic-franklin-s8ppeh}"
CLON="$HOME/.claude-skills-repo"
DESTINO="$HOME/.claude/skills"

if [ -d "$CLON/.git" ]; then
  git -C "$CLON" fetch --quiet origin "$RAMA"
  git -C "$CLON" checkout --quiet -B "$RAMA" "origin/$RAMA"
else
  git clone --quiet --branch "$RAMA" "$REPO_URL" "$CLON"
fi

mkdir -p "$DESTINO"
for skill in "$CLON"/claude-skills/skills/*/; do
  nombre="$(basename "$skill")"
  rm -rf "${DESTINO:?}/$nombre"
  cp -R "$skill" "$DESTINO/$nombre"
  echo "OK  $nombre"
done
echo "Skills al día en $DESTINO ($(date '+%Y-%m-%d %H:%M'))"

if [ "${1:-}" = "--programar" ]; then
  PLIST="$HOME/Library/LaunchAgents/com.oscar.claude-skills.plist"
  mkdir -p "$(dirname "$PLIST")"
  cp "$0" "$HOME/.claude-skills-sync.sh"
  cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.oscar.claude-skills</string>
  <key>ProgramArguments</key><array><string>/bin/bash</string><string>$HOME/.claude-skills-sync.sh</string></array>
  <key>StartCalendarInterval</key><dict><key>Hour</key><integer>9</integer><key>Minute</key><integer>0</integer></dict>
  <key>RunAtLoad</key><true/>
  <key>StandardOutPath</key><string>$HOME/.claude-skills-sync.log</string>
  <key>StandardErrorPath</key><string>$HOME/.claude-skills-sync.log</string>
</dict></plist>
EOF
  launchctl unload "$PLIST" 2>/dev/null || true
  launchctl load "$PLIST"
  echo "Programado: cada día a las 09:00 y al encender el Mac. Log: ~/.claude-skills-sync.log"
fi
