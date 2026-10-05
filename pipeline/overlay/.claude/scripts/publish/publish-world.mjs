#!/usr/bin/env node
/* Publica un mundo de image-blaster en la web (hub).

   Copia el último world generado de worlds/<slug>/output/world/ a
   <hub>/assets/worlds/<slug>/ y lo añade/actualiza en <hub>/assets/worlds/worlds.js,
   que es lo que lee worlds.html.

   Uso (desde la raíz de image-blaster):
     node .claude/scripts/publish/publish-world.mjs --world <slug> \
       [--quality 500k|100k|full_res] [--title "…"] [--description "…"] \
       [--project "LLAQTA"] [--year 2026] [--hub <ruta al repo hub>] [--dry-run]

   Por defecto el hub es ../.. (image-blaster vive en hub/pipeline/image-blaster). */
import fs from "node:fs";
import path from "node:path";

const GITHUB_FILE_LIMIT = 95 * 1024 * 1024; // GitHub rechaza archivos > 100 MB
const WARN_SIZE = 40 * 1024 * 1024;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) args[key] = true;
    else { args[key] = next; i++; }
  }
  return args;
}

const fail = (msg) => { console.error(`error: ${msg}`); process.exit(1); };
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/* Visible indexed files: "N-slug.ext" → { index, name } */
function indexed(dir, re) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => !f.startsWith(".") && re.test(f))
    .map((f) => ({ name: f, index: Number(f.split("-")[0]) }))
    .filter((f) => Number.isFinite(f.index))
    .sort((a, b) => b.index - a.index);
}

function readManifest(file) {
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, "utf8");
  const m = src.match(/window\.WORLDS\s*=\s*([\s\S]*?);\s*$/);
  if (!m) fail(`no entiendo ${file}: debe terminar en "window.WORLDS = [...];"`);
  return JSON.parse(m[1]);
}

function writeManifest(file, worlds) {
  const header = "/* Generado por pipeline/overlay/.claude/scripts/publish/publish-world.mjs — no editar a mano\n" +
    "   salvo para cambiar título/descripción u orden. */\n";
  fs.writeFileSync(file, `${header}window.WORLDS = ${JSON.stringify(worlds, null, 2)};\n`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const slug = args.world;
  if (!slug || slug === true) fail("falta --world <slug>");
  const quality = args.quality || "500k";
  const root = process.cwd();
  const hub = path.resolve(args.hub || process.env.HUB_ROOT || path.join(root, "..", ".."));
  const dryRun = Boolean(args["dry-run"]);

  if (!fs.existsSync(path.join(hub, "worlds.html"))) fail(`${hub} no parece el repo hub (no hay worlds.html). Usa --hub <ruta>.`);
  const worldDir = path.join(root, "worlds", slug);
  if (!fs.existsSync(worldDir)) fail(`no existe ${path.relative(root, worldDir)}`);

  // Latest world generation
  const outWorld = path.join(worldDir, "output", "world");
  const latest = indexed(outWorld, /^\d+-world\.json$/)[0];
  if (!latest) fail(`no hay ningún N-world.json en ${path.relative(root, outWorld)}: genera el mundo primero (image-blast-world).`);
  const n = latest.index;
  const world = readJson(path.join(outWorld, latest.name));
  const files = fs.readdirSync(outWorld).filter((f) => f.startsWith(`${n}-world-`));

  // Splat: requested quality, falling back to the lighter ones
  const order = [quality, "500k", "100k", "full_res"].filter((q, i, a) => a.indexOf(q) === i);
  let spzName;
  for (const q of order) {
    const name = `${n}-world-${q.replace(/[^a-z0-9_-]/gi, "_")}.spz`;
    if (files.includes(name)) { spzName = name; break; }
  }
  if (!spzName) fail(`no hay .spz local para la generación ${n}. Ejecuta ensure-local-assets.mjs --from "${path.relative(root, path.join(outWorld, latest.name))}"`);
  const spzSize = fs.statSync(path.join(outWorld, spzName)).size;
  if (spzSize > GITHUB_FILE_LIMIT) fail(`${spzName} pesa ${mb(spzSize)}: GitHub no acepta archivos > 100 MB. Usa --quality 500k o 100k.`);
  if (spzSize > WARN_SIZE) console.warn(`aviso: ${spzName} pesa ${mb(spzSize)}; en móvil tardará. Considera --quality 100k.`);

  const thumb = files.find((f) => f.startsWith(`${n}-world-thumbnail.`));
  const pano = files.find((f) => f.startsWith(`${n}-world-pano.`));

  // Ambient loop (latest), if the SFX step ran
  const ambient = indexed(path.join(worldDir, "output", "sfx"), /^\d+-ambient-loop.*\.(mp3|opus)$/)[0];

  // Text defaults from the image analysis
  const imageJsonPath = path.join(worldDir, "image.json");
  const image = fs.existsSync(imageJsonPath) ? readJson(imageJsonPath) : {};
  const sem = world.assets?.splats?.semantics_metadata || {};

  const dest = path.join(hub, "assets", "worlds", slug);
  const rel = (f) => `assets/worlds/${slug}/${f}`;
  const copies = [[path.join(outWorld, spzName), "world.spz"]];
  if (thumb) copies.push([path.join(outWorld, thumb), `thumb${path.extname(thumb)}`]);
  if (pano) copies.push([path.join(outWorld, pano), `pano${path.extname(pano)}`]);
  if (ambient) copies.push([path.join(worldDir, "output", "sfx", ambient.name), `ambient${path.extname(ambient.name)}`]);

  const manifestPath = path.join(hub, "assets", "worlds", "worlds.js");
  const worlds = readManifest(manifestPath);
  const prev = worlds.find((w) => w.slug === slug) || {};
  const pick = (arg, fallback) => (typeof arg === "string" ? arg : fallback);
  const entry = {
    slug,
    title: pick(args.title, prev.title || image.scene_name || slug),
    description: pick(args.description, prev.description || image.short_caption || ""),
    project: pick(args.project, prev.project || ""),
    year: pick(args.year, prev.year || String(new Date().getFullYear())),
    splat: rel("world.spz"),
    thumb: thumb ? rel(`thumb${path.extname(thumb)}`) : "",
    pano: pano ? rel(`pano${path.extname(pano)}`) : "",
    ambient: ambient ? rel(`ambient${path.extname(ambient.name)}`) : "",
    flipY: sem.flip_y ?? true,
    scale: sem.metric_scale_factor ?? 1,
    groundOffset: sem.ground_plane_offset ?? 0,
    generation: n,
    quality: spzName.replace(`${n}-world-`, "").replace(".spz", ""),
  };

  console.log(`mundo:     ${slug} (generación ${n}, ${entry.quality}, ${mb(spzSize)})`);
  for (const [from, to] of copies) console.log(`copiar:    ${path.relative(root, from)} → ${path.relative(hub, path.join(dest, to))}`);
  if (dryRun) { console.log("entrada:", JSON.stringify(entry, null, 2)); console.log("(dry-run: no se ha escrito nada)"); return; }

  fs.mkdirSync(dest, { recursive: true });
  for (const [from, to] of copies) fs.copyFileSync(from, path.join(dest, to));
  const i = worlds.findIndex((w) => w.slug === slug);
  if (i >= 0) worlds[i] = entry; else worlds.unshift(entry);
  writeManifest(manifestPath, worlds);

  console.log(`manifest:  ${path.relative(hub, manifestPath)} (${worlds.length} mundo${worlds.length === 1 ? "" : "s"})`);
  console.log(`web:       worlds.html#${slug}`);
  console.log(`siguiente: cd ${hub} && git add assets/worlds && git commit -m "Add world: ${entry.title}" && git push`);
}

main();
