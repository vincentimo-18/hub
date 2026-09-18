/* =====================================================================
   CONTENIDO DEL SITIO — edita este archivo para añadir cosas.
   Todo lo que se ve en la página (proyectos, créditos, enlaces, textos
   cortos) sale de aquí. No hace falta tocar index.html ni main.js.

   Campos de un proyecto:
     title       Título
     role        Tu rol (Director, Lead Animator, ...)
     year        "2025" o "2025 – 2026"
     category    "ai-film" | "vfx" | "talk"   (define la pestaña del filtro)
     tags        Lista corta de etiquetas
     description Una o dos frases
     thumb       Ruta a una imagen 16:9 (opcional; sin ella se genera una tarjeta tipográfica)
     video       URL de YouTube o Vimeo (opcional; abre un lightbox con el vídeo)
     link        URL externa (opcional; si no hay vídeo se abre este enlace)
     awards      Lista de premios / selecciones (opcional)
     featured    true para que ocupe doble ancho en la parrilla
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

  showreel: "https://vimeo.com/1060555798",
  linktree: "https://linktr.ee/burgosdraw",

  /* Tira de créditos que corre en el marquee bajo el hero */
  marquee: [
    "Mufasa: The Lion King", "Avengers: Infinity War", "Avatar: The Last Airbender",
    "Prehistoric Planet", "Predator: Badlands", "Christopher Robin", "His Dark Materials",
    "The Suicide Squad", "Tom & Jerry", "Maleficent: Mistress of Evil", "The LEGO Ninjago Movie",
    "Wonder Park", "Man vs Baby"
  ],

  projects: [
    {
      title: "LLAQTA — The Lost City",
      role: "Creator & Director",
      year: "Ongoing",
      category: "ai-film",
      tags: ["Original IP", "Sci-fi survival series", "Worldbuilding"],
      description:
        "Episodic, fully AI-generated sci-fi survival series. A long-term worldbuilding project " +
        "with a trailer released on YouTube and the V-3 origin-sequence spinoff created with OpenArt Director Mode.",
      thumb: "assets/img/hero-llaqta.jpg",
      video: "",
      link: "https://linktr.ee/burgosdraw",
      featured: true
    },
    {
      title: "The Immigrants",
      role: "Director",
      year: "2025 – 2026",
      category: "ai-film",
      tags: ["AI short film", "3'14\""],
      description: "An AI short film about leaving, arriving and everything in between.",
      video: "",
      link: "https://linktr.ee/burgosdraw",
      awards: [
        "Finalist — AI Movie Awards Mallorca (AIMA)",
        "Finalist — Loop Festival, Japan 2026",
        "Shortlisted — AI Film Awards, French Riviera"
      ]
    },
    {
      title: "Mika: Into the Unknown",
      role: "Director",
      year: "2025",
      category: "ai-film",
      tags: ["AI short film", "Beat Maps Squad"],
      description: "A short adventure produced with the Beat Maps Squad collective.",
      video: "",
      link: "https://bmsquad.com/project/mika",
      awards: ["3rd Place & Audience Favorite — Big Screen Hack"]
    },
    {
      title: "Out of Power",
      role: "Beat Maps Squad",
      year: "2025",
      category: "ai-film",
      tags: ["Studio project", "Social cause"],
      description: "Cinematic, AI-assisted visual production for a social-cause initiative.",
      video: "",
      link: "https://bmsquad.com/project/out-of-power"
    },
    {
      title: "Mufasa: The Lion King",
      role: "Lead Animator · MPC",
      year: "2024",
      category: "vfx",
      tags: ["Disney", "Creature animation"],
      description: "Led animation teams on Disney's photoreal prequel, developing keyframe performances for complex creatures.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "Prehistoric Planet",
      role: "Lead Animator · MPC",
      year: "2022 – 2023",
      category: "vfx",
      tags: ["Apple TV+", "VES & Annie nominated"],
      description: "Creature locomotion and behaviour for the BBC / Apple TV+ natural-history series.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "Avatar: The Last Airbender — S2",
      role: "Senior Animator · Framestore",
      year: "2025",
      category: "vfx",
      tags: ["Netflix", "Character & creature"],
      description: "Senior character and creature animation for the second season of the Netflix series.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "Predator: Badlands",
      role: "Senior Animator · Trixter",
      year: "2025",
      category: "vfx",
      tags: ["20th Century Studios", "Creature"],
      description: "High-quality keyframe creature animation.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "Avengers: Infinity War",
      role: "Animator · Framestore",
      year: "2018",
      category: "vfx",
      tags: ["Marvel", "Academy Award nominee", "VES winner"],
      description: "Character animation, blending motion capture with keyframe acting.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "Christopher Robin",
      role: "Animator · Framestore",
      year: "2018",
      category: "vfx",
      tags: ["Disney", "Academy Award nominee"],
      description: "Expressive character animation for Winnie the Pooh and friends.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "His Dark Materials",
      role: "Animator · Framestore",
      year: "2019 – 2021",
      category: "vfx",
      tags: ["HBO / BBC", "BAFTA winner"],
      description: "Dæmon creature animation across the series.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "The Suicide Squad",
      role: "Animator · Framestore",
      year: "2021",
      category: "vfx",
      tags: ["DC / Warner Bros."],
      description: "Creature and character animation.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "Maleficent: Mistress of Evil",
      role: "Senior Animator · MPC",
      year: "2019",
      category: "vfx",
      tags: ["Disney"],
      description: "Creature and character animation.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "The LEGO Ninjago Movie",
      role: "Senior Animator · Animal Logic",
      year: "2017",
      category: "vfx",
      tags: ["Warner Bros.", "Stylized"],
      description: "Stylized character performances in Sydney.",
      link: "https://www.imdb.com/name/nm4443508/"
    },
    {
      title: "Warsaw Glitch 2026",
      role: "Speaker",
      year: "28 – 30 Aug 2026",
      category: "talk",
      tags: ["Warsaw, Poland", "AI & animation"],
      description: "Talk on animating the future: seventeen years of VFX craft meeting generative AI pipelines.",
      thumb: "assets/img/warsaw-glitch-2026.jpg",
      link: "https://warsawglitch.com"
    }
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
