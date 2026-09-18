/* =====================================================================
   CONTENIDO DEL SITIO — edita este archivo para añadir cosas.
   Todo lo que se ve en la página sale de aquí. No hace falta tocar
   index.html ni main.js.

   hero.video   Vídeo de fondo de la cabecera. Puede ser:
                - un MP4 local:  "assets/video/hero.mp4"  (recomendado, se ve
                  perfecto y sin logos; 10-30 s, sin audio, ≤ 15 MB)
                - un enlace de YouTube o Vimeo (se incrusta en silencio y en bucle)
                - ""  → se usa hero.poster como imagen fija
   reels        Los dos demo reels grandes (YouTube o Vimeo).
   aiWork       Trabajo seleccionado con IA: vídeos de YouTube/Vimeo. La
                miniatura de YouTube se saca sola; para Vimeo pon `thumb`.
   credits      Filmografía VFX / animación: lista limpia, sin vídeos.
   ===================================================================== */

window.SITE = {
  name: "Oscar Burgos",
  handle: "@burgosdraw",
  role: "Director & VFX Animator",
  tagline: "I am animating the future",
  location: "London, UK",
  email: "theonevincent@gmail.com",

  intro:
    "Colombian animation and creative director with seventeen years in the industry. " +
    "Character and creature animator on Marvel's Avengers: Infinity War and The Suicide Squad, " +
    "lead animation artist on Disney's Mufasa: The Lion King. Co-founder and creative director of " +
    "Beat Maps Squad, a London-based AI-first creative studio.",

  linktree: "https://linktr.ee/burgosdraw",

  hero: {
    video: "https://vimeo.com/1060555798",   // cámbialo cuando quieras: MP4 local, YouTube o Vimeo
    poster: "assets/img/hero-llaqta.jpg"     // imagen fija de respaldo (y para móviles con datos)
  },

  reels: [
    {
      title: "Showreel 2025",
      kicker: "Character & creature animation",
      description: "Seventeen years of keyframe performance: Mufasa, Avatar: The Last Airbender, Prehistoric Planet, Avengers: Infinity War and more.",
      video: "https://vimeo.com/1060555798",
      thumb: ""
    },
    {
      title: "Cartoon reel",
      kicker: "Stylized & feature animation",
      description: "Stylized character work: The LEGO Ninjago Movie, Wonder Park, Tom & Jerry, Metegol and commercials.",
      video: "",          // pega aquí el enlace de YouTube o Vimeo
      thumb: ""
    }
  ],

  /* Tira de créditos que corre bajo la cabecera */
  marquee: [
    "Mufasa: The Lion King", "Avengers: Infinity War", "Avatar: The Last Airbender",
    "Prehistoric Planet", "Predator: Badlands", "Christopher Robin", "His Dark Materials",
    "The Suicide Squad", "Tom & Jerry", "Maleficent: Mistress of Evil", "The LEGO Ninjago Movie",
    "Wonder Park", "Man vs Baby"
  ],

  /* Trabajo seleccionado — IA. Solo vídeos. */
  aiWork: [
    {
      title: "LLAQTA — The Lost City",
      role: "Creator & Director",
      year: "Ongoing",
      description: "Episodic, fully AI-generated sci-fi survival series. Long-term worldbuilding project; trailer on YouTube, V-3 origin sequence made with OpenArt Director Mode.",
      video: "",                              // enlace de YouTube del tráiler
      thumb: "assets/img/hero-llaqta.jpg",
      featured: true
    },
    {
      title: "The Immigrants",
      role: "Director",
      year: "2025 – 2026",
      description: "AI short film, 3'14\".",
      video: "",
      awards: ["Finalist — AI Movie Awards Mallorca (AIMA)", "Finalist — Loop Festival, Japan 2026", "Shortlisted — AI Film Awards, French Riviera"]
    },
    {
      title: "Mika: Into the Unknown",
      role: "Director",
      year: "2025",
      description: "AI short film made with the Beat Maps Squad collective.",
      video: "",
      link: "https://bmsquad.com/project/mika",
      awards: ["3rd Place & Audience Favorite — Big Screen Hack"]
    },
    {
      title: "Out of Power",
      role: "Beat Maps Squad",
      year: "2025",
      description: "Cinematic, AI-assisted visual production for a social-cause initiative.",
      video: "",
      link: "https://bmsquad.com/project/out-of-power"
    }
  ],

  /* Filmografía VFX / animación — lista, sin vídeos */
  credits: [
    { title: "Unannounced feature film", role: "Senior Character/Creature Animator", studio: "Framestore", year: "2025 –" },
    { title: "Avatar: The Last Airbender — S2", role: "Senior Animator", studio: "Framestore · Netflix", year: "2025" },
    { title: "Man vs Baby", role: "Senior Animator", studio: "Framestore · Netflix", year: "2025" },
    { title: "Predator: Badlands", role: "Senior Animator", studio: "Trixter", year: "2025" },
    { title: "Mufasa: The Lion King", role: "Lead Animator", studio: "MPC · Disney", year: "2024" },
    { title: "Prehistoric Planet", role: "Lead Animator", studio: "MPC · Apple TV+", year: "2022 – 2023" },
    { title: "The Suicide Squad", role: "Animator", studio: "Framestore · Warner Bros.", year: "2021" },
    { title: "Tom & Jerry", role: "Animator", studio: "Framestore · Warner Bros.", year: "2021" },
    { title: "His Dark Materials", role: "Animator", studio: "Framestore · HBO / BBC", year: "2019 – 2021" },
    { title: "Maleficent: Mistress of Evil", role: "Senior Animator", studio: "MPC · Disney", year: "2019" },
    { title: "Christopher Robin", role: "Animator", studio: "Framestore · Disney", year: "2018" },
    { title: "Avengers: Infinity War", role: "Animator", studio: "Framestore · Marvel", year: "2018" },
    { title: "The LEGO Ninjago Movie", role: "Senior Animator", studio: "Animal Logic · Warner Bros.", year: "2017" },
    { title: "Wonder Park", role: "Senior Animator", studio: "Ilion Animation · Paramount", year: "2015 – 2016" },
    { title: "Little Rooster's Egg-cellent Adventure", role: "Animation Supervisor", studio: "Huevocartoon", year: "2013 – 2014" },
    { title: "Metegol (Underdogs)", role: "Senior Animator", studio: "Catmandu / 100 Bares", year: "2012" }
  ],

  /* Charlas */
  talks: [
    { title: "Warsaw Glitch 2026", role: "Speaker", when: "28 – 30 Aug 2026 · Warsaw, Poland", link: "https://warsawglitch.com", thumb: "assets/img/warsaw-glitch-2026.jpg" }
  ],

  /* Estudios y partners — se muestran como texto en la sección About */
  studios: ["Framestore", "MPC", "Animal Logic", "Trixter", "Ilion Animation", "Huevocartoon", "Catmandu / 100 Bares"],
  partners: ["Magnific", "Dreamina", "Topaz Labs", "CapCut"],

  awards: [
    { what: "The Immigrants", where: "Finalist — AI Movie Awards Mallorca (AIMA) · Finalist — Loop Festival Japan · Shortlisted — AI Film Awards French Riviera", year: "2026" },
    { what: "Mika: Into the Unknown", where: "3rd Place & Audience Favorite — Big Screen Hack", year: "2025" },
    { what: "Prehistoric Planet", where: "VES & Annie Award nominated", year: "2023" },
    { what: "His Dark Materials", where: "BAFTA Award winner", year: "2020" },
    { what: "Avengers: Infinity War", where: "Academy Award nominated · VES Award winner", year: "2019" },
    { what: "Christopher Robin", where: "Academy Award nominated", year: "2019" }
  ],

  timo: {
    name: "Timo",
    title: "Studio dog · Chief Morale Officer",
    blurb:
      "Timo supervises every shot from under the desk. Springer spaniel, glasses, zero notes on the animation, " +
      "strong opinions about lunch. He is also the face of this site's favicon."
  },

  links: [
    { label: "Email", url: "mailto:theonevincent@gmail.com", handle: "theonevincent@gmail.com" },
    { label: "Instagram", url: "https://www.instagram.com/burgosdraw/", handle: "@burgosdraw" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/oscar-burgos-gomez/", handle: "oscar-burgos-gomez" },
    { label: "Vimeo", url: "https://vimeo.com/oscarburgos", handle: "vimeo.com/oscarburgos" },
    { label: "IMDb", url: "https://www.imdb.com/name/nm4443508/", handle: "nm4443508" },
    { label: "Behance", url: "https://www.behance.net/oscarburgos", handle: "behance.net/oscarburgos" },
    { label: "Beat Maps Squad", url: "https://bmsquad.com", handle: "bmsquad.com" },
    { label: "Linktree", url: "https://linktr.ee/burgosdraw", handle: "linktr.ee/burgosdraw" }
  ]
};
