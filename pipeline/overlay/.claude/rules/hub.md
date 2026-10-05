# IMAGE-BLASTER dentro del hub de Oscar Burgos

Esta copia de image-blaster vive en `hub/pipeline/image-blaster/` (se instala con `pipeline/setup.sh`).
El repo padre (`../..`) es la web de Oscar Burgos, publicada en GitHub Pages.

- Reply in the user's language (usually Spanish). The "vibes" rule about tone still applies.
- The user is a director / VFX animator working on AI films (e.g. LLAQTA). Typical goal: turn a key frame or concept image into a consistent 3D location to scout camera angles, extract start/end frames for video models (Seedance, Kling), use the panorama as lighting reference, and bring props (`.glb`) into Blender.
- After a full IMAGE-BLAST, offer one extra step: publish the world to the website with `/image-blast-publish <slug>`.
- Never write into `../..` (the hub repo) except through `.claude/scripts/publish/publish-world.mjs`.
