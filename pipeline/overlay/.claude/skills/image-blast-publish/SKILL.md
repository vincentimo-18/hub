---
name: image-blast-publish
description: Publish a finished IMAGE-BLASTER world to Oscar's website (the hub repo) so it shows up as an interactive 3D splat on worlds.html. Use when the user asks to publish, upload, share, put on the web/site/portfolio, or "subir a la web" a world.
argument-hint: [world-name] [optional --quality 500k|100k|full_res] [optional title / description / project]
allowed-tools: Read Glob Bash(ls *) Bash(node .claude/scripts/project/project-state.mjs *) Bash(node .claude/scripts/project/ensure-local-assets.mjs *) Bash(node .claude/scripts/publish/publish-world.mjs *)
---

Publish world `$0` to the hub website. Extra options may appear in `$ARGUMENTS`.

## Instructions

1. If `$0` is missing, list `worlds/` and ask which world to publish.
2. Check state with `ls -a worlds/$0/output/world` and `node .claude/scripts/project/project-state.mjs --world "$0"`. A world needs at least one `N-world.json` plus a local `.spz`. If the `.spz` is missing but `N-world.json` exists, run `ensure-local-assets.mjs --from` on it first. If no world exists, stop and suggest `Agent(image-blast-world)`.
3. Pick a title and one-sentence description. Default to `scene_name` / `short_caption` from `worlds/$0/image.json`, but if the user gave a project name (e.g. LLAQTA) or wording, use it. Descriptions on the site are in English, short and literal.
4. Do a dry run first and show the user what will be copied and its size:

```bash
node .claude/scripts/publish/publish-world.mjs --world "$0" --title "<title>" --description "<description>" [--project "<project>"] [--quality 500k] --dry-run
```

5. Quality: default `500k` (good on desktop, acceptable on mobile). Use `100k` if the file is > 40 MB or the user wants it light. Never publish a file > 95 MB (GitHub rejects > 100 MB; the script refuses it).
6. After the user confirms, run the same command without `--dry-run`.
7. The script writes into the hub repo (default `../..`, override with `--hub <path>` or `HUB_ROOT`). Do not commit or push the hub repo yourself unless the user asks; report the printed `git add/commit/push` line.

Final response: world slug, generation index, quality and size, files copied into `assets/worlds/<slug>/`, and the page anchor `worlds.html#<slug>`.
