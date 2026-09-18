/* =====================================================================
   CONTENIDO DEL SITIO — edita este archivo para añadir cosas.
   Todo lo que se ve en las páginas sale de aquí. No hace falta tocar
   los .html ni main.js.

   Páginas:  index.html   hero + reels + 3 destacados + premios
             work.html    todos los proyectos IA (con filtros) + charlas
             credits.html filmografía VFX
             awards.html  premios y festivales
             about.html   bio, toolkit, formación, estudio, Timo

   hero.video   Vídeo de fondo de la cabecera: MP4 local (recomendado,
                10-30 s, sin audio, ≤ 15 MB), YouTube/Vimeo, o "" (póster fijo).
   reels        Los dos demo reels. `preview` = MP4 corto y mudo que se
                reproduce en bucle en la portada; `video` = reel completo
                (YouTube/Vimeo) que se abre al hacer clic.
   aiWork       Proyectos IA. `home: true` = aparece en la portada (máx. 3).
                `kind` = filtro en Work (Short film, Series, Commercial, Promo…).
                `video` = YouTube/Vimeo → se abre en lightbox y la miniatura
                sale sola; `thumb` para poner otra imagen.
   awards       Premios y festivales: un bloque por proyecto y año.
   credits      Filmografía VFX / animación: lista, sin vídeos.
                Los proyectos bajo NDA van siempre como "Unannounced".
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
    "lead animation artist on Disney's Mufasa: The Lion King. Founder and director of " +
    "Beat Maps Squad, a London-based AI-first creative studio.",

  linktree: "https://linktr.ee/burgosdraw",

  hero: {
    video: "assets/video/hero.mp4",          // cámbialo cuando quieras: MP4 local, YouTube o Vimeo
    poster: "assets/img/hero-poster.jpg"     // imagen fija de respaldo (y para móviles con datos)
  },

  reels: [
    {
      title: "Showreel 2025",
      kicker: "Character & creature animation",
      description: "Seventeen years of keyframe performance: Mufasa, Avatar: The Last Airbender, Prehistoric Planet, Avengers: Infinity War and more.",
      video: "https://vimeo.com/1060555798",
      preview: "assets/video/hero.mp4",
      thumb: ""
    },
    {
      title: "Cartoon reel",
      kicker: "Stylized & feature animation",
      description: "Stylized character work: The LEGO Ninjago Movie, Wonder Park, Tom & Jerry, Metegol and commercials.",
      video: "https://vimeo.com/1060957248",
      preview: "assets/video/reel-cartoon-preview.mp4",
      thumb: ""
    }
  ],

  /* Tira de créditos que corre bajo la cabecera */
  marquee: [
    "Mufasa: The Lion King", "Avengers: Infinity War", "Avatar: The Last Airbender",
    "Prehistoric Planet", "Predator: Badlands", "Christopher Robin", "His Dark Materials",
    "The Suicide Squad", "Tom & Jerry", "Maleficent: Mistress of Evil", "The LEGO Ninjago Movie",
    "Wonder Park", "Man vs Baby", "Metegol"
  ],

  /* Proyectos IA. `video` abre un lightbox (YouTube/Vimeo); `link` abre otra web. */
  aiWork: [
    {
      title: "Between the Lines",
      role: "Director",
      year: "2026",
      kind: "Short film",
      description: "My biggest AI project to date: a 13-minute animated short. Fabio, a Colombian AI engineer, returns home after the death of his grandmother and, with a copy of One Hundred Years of Solitude, learns to notice the world again. Beat Maps Squad / James Drake Media co-production.",
      video: "https://www.youtube.com/watch?v=J5DBrX75cgM",
      thumb: "assets/img/between-the-lines.jpg",
      awards: ["Best Animation — FICOCC, Venezuela 2026", "Best Animation, 2nd Place — Warsaw Glitch Awards 2026", "Official Selection — AI Film Awards Venice 2026"],
      featured: true,
      home: true
    },
    {
      title: "LLAQTA — The Lost City",
      role: "Creator & Director",
      year: "Ongoing",
      kind: "Series",
      description: "Episodic, fully AI-generated sci-fi survival series. Long-term worldbuilding project; V-3 origin sequence made with OpenArt Director Mode.",
      video: "https://www.youtube.com/watch?v=CH0WEs3IJ18",
      thumb: "assets/img/llaqta-poster.jpg",
      home: true
    },
    {
      title: "The Wind Changes",
      role: "Director",
      year: "2026",
      kind: "Short film",
      description: "Dialogue-free short about a young field mouse who loses his home and learns to trust again. Born at the official CapCut bootcamp with Fully Focused; the story was imagined by my son.",
      video: "https://www.youtube.com/watch?v=LTzDrQNBVxc",
      awards: ["Best Sound — Warsaw Glitch Film Festival 2026", "Official Selection — Bali International AI Film Festival 2026"],
      home: true
    },
    {
      title: "The Immigrants",
      role: "Director",
      year: "2025 – 2026",
      kind: "Short film",
      description: "AI short film, 3'14\".",
      video: "",                              // enlace de YouTube/Vimeo del corto
      thumb: "",                              // imagen 16:9 cuando la tengas
      link: "https://bmsquad.com/project/the-immigrants",
      awards: ["Finalist — AI Movie Awards Mallorca (AIMA)", "Finalist — Loop Festival, Japan 2026", "Shortlisted — AI Film Awards, French Riviera"]
    },
    {
      title: "Pan Twardowski",
      role: "Director",
      year: "2026",
      kind: "Short film",
      description: "AI-animated short built around the Polish legend of Pan Twardowski, the sorcerer who outwitted the devil. Made with Beat Maps Squad for Warsaw Glitch 2026.",
      video: "https://www.youtube.com/watch?v=Y4M4Ttsi5TA",
      thumb: "assets/img/pan-twardowski.jpg"
    },
    {
      title: "Pan Twardowski Goes to Warsaw Glitch",
      role: "Beat Maps Squad",
      year: "2026",
      kind: "Promo",
      description: "54-second animated festival promo for Warsaw Glitch 2026, starring the sorcerer and his rooster.",
      video: "https://www.youtube.com/watch?v=tp8IpIApqcA"
    },
    {
      title: "Mika: Into the Unknown",
      role: "Director",
      year: "2025",
      kind: "Short film",
      description: "AI short film made with the Beat Maps Squad collective.",
      video: "https://www.youtube.com/watch?v=2LNbsueLofQ",
      link: "https://bmsquad.com/project/mika",
      awards: ["3rd Place & Audience Favorite — Big Screen Hack"]
    },
    {
      title: "Out of Power",
      role: "Beat Maps Squad",
      year: "2025",
      kind: "Commercial",
      description: "Cinematic, AI-assisted visual production for a social-cause initiative. Runway AI Film Contest.",
      video: "",
      link: "https://bmsquad.com/project/out-of-power"
    }
  ],

  /* Filmografía VFX / animación — lista, sin vídeos. NDA → "Unannounced". */
  credits: [
    { title: "Unannounced feature film", role: "Senior Character/Creature Animator", studio: "Framestore", year: "2026 –" },
    { title: "Unannounced streaming series", role: "Senior Animator", studio: "Important Looking Pirates", year: "2026" },
    { title: "Unannounced documentary series (AI-assisted)", role: "Senior Animator · Freelance", studio: "Under NDA", year: "2026 –" },
    { title: "Avatar: The Last Airbender — S2", role: "Senior Character/Creature Animator", studio: "Framestore · Netflix", year: "2025" },
    { title: "Man vs Baby", role: "Senior Animator", studio: "Framestore · Netflix", year: "2025" },
    { title: "Predator: Badlands", role: "Senior Animator", studio: "Trixter", year: "2025" },
    { title: "Mufasa: The Lion King", role: "Lead Animator", studio: "MPC · Disney", year: "2024" },
    { title: "Prehistoric Planet", role: "Lead Animator", studio: "MPC · Apple TV+", year: "2022 – 2023" },
    { title: "The Suicide Squad", role: "Character/Creature Animator", studio: "Framestore · Warner Bros.", year: "2021" },
    { title: "Tom & Jerry", role: "Character/Creature Animator", studio: "Framestore · Warner Bros.", year: "2021" },
    { title: "His Dark Materials", role: "Character/Creature Animator", studio: "Framestore · HBO / BBC", year: "2019 – 2021" },
    { title: "Maleficent: Mistress of Evil", role: "Senior Character/Creature Animator", studio: "MPC · Disney", year: "2018" },
    { title: "Christopher Robin", role: "Character/Creature Animator", studio: "Framestore · Disney", year: "2018" },
    { title: "Avengers: Infinity War", role: "Character/Creature Animator", studio: "Framestore · Marvel", year: "2018" },
    { title: "The LEGO Ninjago Movie", role: "Senior Character Animator", studio: "Animal Logic · Warner Bros.", year: "2017" },
    { title: "Wonder Park", role: "Senior Character Animator", studio: "Ilion Animation · Paramount", year: "2015 – 2016" },
    { title: "Little Rooster's Egg-cellent Adventure", role: "Animation Supervisor", studio: "Huevocartoon", year: "2013 – 2014" },
    { title: "Metegol (Underdogs)", role: "Senior Character Animator", studio: "Catmandu / 100 Bares", year: "2012" },
    { title: "La Máquina que hace Estrellas", role: "Animation Director", studio: "Nut's", year: "2011 – 2012" },
    { title: "Cuentos de la Selva", role: "Character Animator", studio: "Aleph Media", year: "2009" }
  ],

  /* Charlas */
  talks: [
    { title: "Warsaw Glitch 2026", role: "Speaker", when: "28 – 30 Aug 2026 · Warsaw, Poland", link: "https://warsawglitch.com", thumb: "assets/img/warsaw-glitch-2026.jpg" }
  ],

  /* Estudios y partners — se muestran como texto en About */
  studios: ["Framestore", "MPC", "Important Looking Pirates", "Animal Logic", "Trixter", "Ilion Animation", "Huevocartoon", "Catmandu / 100 Bares"],
  partners: ["Magnific", "Dreamina", "Topaz Labs", "CapCut"],

  /* About: herramientas, formación y docencia (listas cortas) */
  tools: {
    "3D & post": ["Maya", "Blender", "Unreal Engine", "ZBrush", "After Effects", "Premiere Pro", "DaVinci Resolve", "CapCut Pro"],
    "Generative AI": ["ComfyUI", "Seedance", "Magnific", "Dreamina", "Topaz Astra", "OpenArt", "Weavy", "Runway", "Midjourney", "Flux", "Kling", "Veo", "ElevenLabs"],
    "2D": ["Photoshop", "Procreate", "Toon Boom Harmony", "TVPaint"]
  },
  education: [
    { what: "AI Filmmaking", where: "Curious Refuge", when: "2025" },
    { what: "Advanced Character Animation", where: "iAnimate & Animsquad", when: "2011 – 2014" },
    { what: "Traditional Animation", where: "Garaycochea School", when: "2011 – 2012" },
    { what: "Master in CG Animation", where: "Image Campus, Argentina", when: "2008 – 2009" },
    { what: "BA in Graphic Design", where: "Jorge Tadeo Lozano University, Colombia", when: "2002 – 2006" }
  ],
  teaching: [
    { what: "Animation Instructor", where: "Animation Gym · Animum · Image Campus", when: "2018 – 2020" },
    { what: "Lead Animator (freelance)", where: "Stories AG", when: "2025" },
    { what: "Character Animator (freelance)", where: "Gizmo · Rocket Frames · Redknuckles · Agora — Netflix's Maniac, Clash Royale, Gatorade", when: "2013 – 2020" }
  ],

  /* Premios y festivales. Un bloque por proyecto y año; `items` = una línea por reconocimiento.
     `kind`: "award" (premio a un proyecto propio) o "credit" (producción en la que participó). */
  awards: [
    { year: "2026", title: "Between the Lines", kind: "award", items: [
      "Best Animation (Short Film) — Five Continents International Film Festival (FICOCC), Venezuela",
      "Special Mention, Screenplay — FICOCC, Venezuela",
      "Special Mention, Original Score — FICOCC, Venezuela",
      "Best Animation, 2nd Place — Warsaw Glitch Awards, Poland",
      "Official Selection — AI Film Awards Venice, Italy" ] },
    { year: "2026", title: "The Wind Changes", kind: "award", items: [
      "Best Sound (Winner) — Warsaw Glitch Film Festival, Poland",
      "Honorable Mention, Best Screenplay — Warsaw Glitch Film Festival, Poland",
      "Honorable Mention, Best Editing — Warsaw Glitch Film Festival, Poland",
      "Semifinalist, Animation — Warsaw Glitch Film Festival, Poland",
      "Official Selection — Fully Focused × CapCut",
      "Official Selection — Bali International AI Film Festival, Indonesia" ] },
    { year: "2026", title: "The Immigrants", kind: "award", items: [
      "Finalist — AI Movie Awards Mallorca (AIMA)",
      "Finalist — Loop Festival, Japan",
      "Shortlisted — AI Film Awards, French Riviera" ] },
    { year: "2025", title: "Mika: Into the Unknown", kind: "award", items: ["3rd Place — Big Screen Hack", "Audience Favorite — Big Screen Hack"] },
    { year: "2023", title: "Prehistoric Planet", kind: "credit", items: ["VES Award nominee", "Annie Award nominee"] },
    { year: "2020", title: "His Dark Materials", kind: "credit", items: ["BAFTA Award winner"] },
    { year: "2019", title: "Avengers: Infinity War", kind: "credit", items: ["Academy Award nominee — Best Visual Effects", "VES Award winner"] },
    { year: "2019", title: "Christopher Robin", kind: "credit", items: ["Academy Award nominee — Best Visual Effects"] }
  ],

  timo: {
    name: "Timo",
    title: "Studio dog · Chief Morale Officer",
    blurb:
      "Timo supervises every shot from under the desk. Springer spaniel, glasses, zero notes on the animation, " +
      "strong opinions about lunch. He is also the face of this site's favicon."
  },

  /* Redes: se muestran como iconos. `icon` = id del sprite assets/img/icons.svg
     (instagram, youtube, linkedin, vimeo, imdb, behance, linktree, mail).
     `nav: true` = también arriba, en la barra de navegación (máx. 3-4). */
  links: [
    { label: "Instagram — Beat Maps Squad", url: "https://www.instagram.com/beatmapssquad/", icon: "instagram", nav: true },
    { label: "YouTube — Beat Maps Squad", url: "https://www.youtube.com/@BeatMapsSquad", icon: "youtube", nav: true },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/oscar-burgos-gomez/", icon: "linkedin", nav: true },
    { label: "Instagram — @burgosdraw", url: "https://www.instagram.com/burgosdraw/", icon: "instagram" },
    { label: "Vimeo", url: "https://vimeo.com/oscarburgos", icon: "vimeo" },
    { label: "IMDb", url: "https://www.imdb.com/name/nm4443508/", icon: "imdb" },
    { label: "Behance", url: "https://www.behance.net/oscarburgos", icon: "behance" },
    { label: "Linktree", url: "https://linktr.ee/burgosdraw", icon: "linktree" },
    { label: "Email", url: "mailto:theonevincent@gmail.com", icon: "mail" }
  ]
};
