/* Worlds viewer — walks through Gaussian splats published by the image-blaster
   pipeline (see pipeline/README.md). Cards are rendered by main.js from
   assets/worlds/worlds.js; this module only opens the full-screen viewer.
   three.js and Spark come from the import map in worlds.html. */
import * as THREE from "three";
import { SparkRenderer, SplatMesh, SparkControls } from "@sparkjsdev/spark";

const WORLDS = window.WORLDS || [];
const $ = (id) => document.getElementById(id);
const viewer = $("world-viewer"), canvas = $("world-canvas"), status = $("world-status");
const soundBtn = $("world-sound"), captureBtn = $("world-capture");

let renderer, scene, camera, controls, splat, audio, current;

function setup() {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060606);
  scene.add(new SparkRenderer({ renderer }));
  camera = new THREE.PerspectiveCamera(65, 1, 0.05, 1000);
  controls = new SparkControls({ canvas });
  window.addEventListener("resize", resize);
}

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

/* World Labs splats come in OpenCV axes (y down) with the source camera at the origin:
   flip them, apply the metric scale, and start the viewer where the original frame was shot. */
async function open(world) {
  if (!renderer) setup();
  current = world;
  $("world-viewer-title").textContent = world.title;
  $("world-viewer-kicker").textContent = [world.project, world.year].filter(Boolean).join(" · ");
  status.textContent = "Loading world…";
  status.hidden = false;
  viewer.hidden = false;
  document.body.style.overflow = "hidden";
  resize();
  camera.position.set(0, 0, 0);
  camera.quaternion.identity();

  if (splat) { scene.remove(splat); splat.dispose(); }
  splat = new SplatMesh({ url: world.splat });
  if (world.flipY !== false) splat.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
  splat.scale.setScalar(world.scale || 1);
  splat.position.y = world.groundOffset || 0;
  scene.add(splat);

  stopSound();
  soundBtn.hidden = !world.ambient;
  if (world.ambient) { audio = new Audio(world.ambient); audio.loop = true; }

  renderer.setAnimationLoop(() => {
    controls.update(camera);
    renderer.render(scene, camera);
  });
  history.replaceState(null, "", `#${world.slug}`);
  $("world-close").focus();

  const loading = splat;
  try {
    await loading.initialized;
    if (splat === loading) status.hidden = true;
  } catch (err) {
    if (splat === loading) status.textContent = "This world could not be loaded.";
    console.error(err);
  }
}

function close() {
  viewer.hidden = true;
  document.body.style.overflow = "";
  renderer?.setAnimationLoop(null);
  stopSound();
  history.replaceState(null, "", location.pathname + location.search);
}

function stopSound() {
  if (audio) { audio.pause(); audio = null; }
  soundBtn.textContent = "Sound off";
  soundBtn.setAttribute("aria-pressed", "false");
}

soundBtn.addEventListener("click", () => {
  if (!audio) return;
  const on = audio.paused;
  if (on) audio.play().catch(() => {}); else audio.pause();
  soundBtn.textContent = on ? "Sound on" : "Sound off";
  soundBtn.setAttribute("aria-pressed", String(on));
});

/* Save the current view as a PNG — a start/end frame for video models, a framing test, a matte. */
captureBtn.addEventListener("click", () => {
  renderer.render(scene, camera);
  canvas.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${current.slug}-${new Date().toISOString().replace(/[:.]/g, "-")}.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }, "image/png");
});

$("world-close").addEventListener("click", close);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !viewer.hidden) close(); });
document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-world]");
  if (!card) return;
  e.preventDefault();
  const world = WORLDS.find((w) => w.slug === card.dataset.world);
  if (world) open(world);
});

/* Deep links: worlds.html#<slug> opens that world directly. */
function openFromHash() {
  const world = WORLDS.find((w) => w.slug === decodeURIComponent(location.hash.slice(1)));
  if (world && (viewer.hidden || world !== current)) open(world);
}
window.addEventListener("hashchange", openFromHash);
openFromHash();
