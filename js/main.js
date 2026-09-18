/* Oscar Burgos — site behaviour. Renders content from js/data.js on every page.
   Each page only contains its <main>; the nav, contact block, footer and
   lightbox are injected here so they stay identical everywhere. */
(function () {
  const S = window.SITE || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PAGE = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  /* ---------- Shared chrome: nav, contact, footer, lightbox ---------- */
  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="assets/img/icons.svg#${id}"></use></svg>`;
  const iconLink = (l) => `<a href="${esc(l.url)}" ${l.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'} aria-label="${esc(l.label)}" title="${esc(l.label)}">${icon(l.icon)}</a>`;
  const NAV =[["index.html", "Home"], ["work.html", "Work"], ["credits.html", "Credits"], ["awards.html", "Awards"], ["about.html", "About"], ["#contact", "Contact"]];
  document.body.insertAdjacentHTML("afterbegin", `
    <a class="skip" href="#main">Skip to content</a>
    <header class="nav" id="top">
      <a class="brand" href="index.html" aria-label="Oscar Burgos — home">
        <img src="assets/img/timo-192.png" alt="" width="36" height="36" class="brand__timo">
        <img src="assets/img/oscar-burgos-signature.png" alt="Oscar Burgos" class="brand__sig" height="34">
      </a>
      <nav class="nav__links" id="nav-links">
        ${NAV.map(([href, label]) => `<a href="${href}"${href === PAGE ? ' class="is-active" aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
      <div class="nav__social">${(S.links || []).filter((l) => l.nav && l.icon).map(iconLink).join("")}</div>
      <a class="btn btn--small nav__cta" href="#contact">Let's talk</a>
      <button class="nav__burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span></button>
    </header>`);
  const main = $("main");
  main.id = main.id || "main";
  main.insertAdjacentHTML("afterend", `
    <section class="section contact" id="contact">
      <div class="section__head">
        <h2 class="section__title">Contact</h2>
        <p class="section__note">Based in London · working worldwide</p>
      </div>
      <p class="contact__big">Got a creature to bring to life, a story to tell, or a pipeline to figure out?<br>
        <a id="contact-email" href="#">Write to me</a>.</p>
      <ul class="social" id="links"></ul>
    </section>
    <footer class="footer">
      <span>© <span id="year"></span> Oscar Burgos</span>
      <div class="footer__social">${(S.links || []).filter((l) => l.icon).map(iconLink).join("")}</div>
      <a href="#top">Back to top ↑</a>
    </footer>
    <div class="lightbox" id="lightbox" hidden>
      <button class="lightbox__close" id="lightbox-close" aria-label="Close">×</button>
      <div class="lightbox__frame" id="lightbox-frame"></div>
    </div>`);

  /* ---------- Small text bindings ---------- */
  $$("[data-site]").forEach((el) => { const v = S[el.dataset.site]; if (v) el.textContent = v; });
  $$("[data-timo]").forEach((el) => { const v = S.timo && S.timo[el.dataset.timo]; if (v) el.textContent = v; });
  const mail = $("#contact-email"); if (mail && S.email) mail.href = "mailto:" + S.email;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Video helpers ---------- */
  function parseVideo(url) {
    if (!url) return null;
    let m;
    if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/))) return { kind: "youtube", id: m[1] };
    if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return { kind: "vimeo", id: m[1] };
    if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return { kind: "file", id: url };
    return null;
  }
  function playerUrl(v, opts = {}) {
    if (v.kind === "youtube") {
      const q = opts.background
        ? `autoplay=1&mute=1&loop=1&playlist=${v.id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`
        : `autoplay=1&rel=0&modestbranding=1`;
      return `https://www.youtube-nocookie.com/embed/${v.id}?${q}`;
    }
    if (v.kind === "vimeo") {
      const q = opts.background ? `background=1&autoplay=1&muted=1&loop=1&autopause=0` : `autoplay=1&title=0&byline=0&portrait=0`;
      return `https://player.vimeo.com/video/${v.id}?${q}`;
    }
    return null;
  }
  function thumbFor(item) {
    if (item.thumb) return item.thumb;
    const v = parseVideo(item.video);
    if (v && v.kind === "youtube") return `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
    if (v && v.kind === "vimeo") return `https://vumbnail.com/${v.id}_large.jpg`;
    return "";
  }
  /* Keep a muted <video> playing: some browsers pause autoplay in background tabs / low-power mode. */
  function keepPlaying(vid) {
    let retries = 0;
    const play = () => { vid.play().catch(() => {}); };
    vid.addEventListener("pause", () => {
      if (vid.ended || vid.dataset.sleep || document.visibilityState !== "visible" || retries++ > 5) return;
      setTimeout(play, 400);
    });
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && !vid.dataset.sleep) { retries = 0; play(); } });
    return play;
  }

  /* ---------- Hero video background ---------- */
  const heroBg = $("#hero-bg");
  if (heroBg && S.hero) {
    if (S.hero.poster) $("#hero-poster").src = S.hero.poster;
    const v = parseVideo(S.hero.video);
    if (v && !reduceMotion) {
      if (v.kind === "file") {
        const vid = document.createElement("video");
        Object.assign(vid, { src: v.id, autoplay: true, muted: true, loop: true, playsInline: true, preload: "metadata" });
        vid.setAttribute("muted", ""); vid.setAttribute("playsinline", "");
        vid.className = "hero__video";
        vid.addEventListener("canplay", () => heroBg.classList.add("has-video"));
        heroBg.appendChild(vid);
        const play = keepPlaying(vid);
        vid.addEventListener("canplay", play, { once: true });
      } else {
        const f = document.createElement("iframe");
        f.src = playerUrl(v, { background: true });
        f.allow = "autoplay; fullscreen"; f.title = "Background video"; f.tabIndex = -1;
        f.className = "hero__video hero__video--embed";
        f.addEventListener("load", () => setTimeout(() => heroBg.classList.add("has-video"), 600));
        heroBg.appendChild(f);
      }
    }
  }

  /* ---------- Signature in the hero ---------- */
  const SIGNATURE = "assets/img/oscar-burgos-signature.png";
  const title = $(".hero__title");
  if (title) {
    const img = new Image();
    img.onload = () => { img.className = "hero__signature"; img.alt = "Oscar Burgos"; title.appendChild(img); title.classList.add("has-signature"); };
    img.src = SIGNATURE;
  }

  /* ---------- Marquee ---------- */
  const marquee = $("#marquee");
  if (marquee && S.marquee) {
    const items = S.marquee.map((t) => `<span class="marquee__item">${esc(t)}</span>`).join("");
    marquee.innerHTML = items + items;
  }

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox"), frame = $("#lightbox-frame");
  function openVideo(url) {
    const v = parseVideo(url);
    if (!v) { window.open(url, "_blank", "noopener"); return; }
    frame.innerHTML = v.kind === "file"
      ? `<video src="${esc(v.id)}" controls autoplay playsinline></video>`
      : `<iframe src="${playerUrl(v)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video"></iframe>`;
    lightbox.hidden = false; document.body.style.overflow = "hidden"; $("#lightbox-close").focus();
  }
  function closeVideo() { lightbox.hidden = true; frame.innerHTML = ""; document.body.style.overflow = ""; }
  $("#lightbox-close").addEventListener("click", closeVideo);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeVideo(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeVideo(); });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-video]"); if (!a) return;
    e.preventDefault(); openVideo(a.dataset.video);
  });

  /* ---------- Reels (home): two silent loops, click for the full reel ---------- */
  const reels = $("#reels-grid");
  if (reels && S.reels) {
    reels.innerHTML = S.reels.map((r) => {
      const t = thumbFor(r);
      const preview = r.preview && !reduceMotion ? `<video class="reel__preview" src="${esc(r.preview)}" muted loop playsinline preload="metadata"></video>` : "";
      const inner = `${t ? `<img src="${esc(t)}" alt="" loading="lazy">` : `<div class="reel__placeholder"></div>`}${preview}`;
      const media = r.video
        ? `<button class="reel__media" data-video="${esc(r.video)}" aria-label="Play ${esc(r.title)}">${inner}<span class="card__play" aria-hidden="true">▶</span></button>`
        : `<div class="reel__media reel__media--soon">${inner}<span class="reel__soon">Full reel soon</span></div>`;
      return `<article class="reel">
        ${media}
        <div class="reel__body">
          <p class="mono">${esc(r.kicker)}</p>
          <h3 class="reel__title">${esc(r.title)}</h3>
          <p class="reel__desc">${esc(r.description)}</p>
        </div></article>`;
    }).join("");
    const previews = $$(".reel__preview");
    if (previews.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting) { delete v.dataset.sleep; v.play().then(() => v.parentElement.classList.add("has-preview")).catch(() => {}); }
        else { v.dataset.sleep = "1"; v.pause(); }
      }), { threshold: 0.3 });
      previews.forEach((v) => { v.muted = true; v.defaultMuted = true; keepPlaying(v); io.observe(v); });
    }
  }

  /* ---------- Project cards (home + work) ---------- */
  function card(p, i) {
    const t = thumbFor(p);
    const tag = p.video ? `data-video="${esc(p.video)}" href="${esc(p.video)}"` : (p.link ? `href="${esc(p.link)}" target="_blank" rel="noopener"` : `href="#" aria-disabled="true"`);
    const media = t ? `<img src="${esc(t)}" alt="" loading="lazy">` : `<div class="card__placeholder"><span>${String(i + 1).padStart(2, "0")}</span></div>`;
    const awards = (p.awards || []).length ? `<ul class="card__awards">${p.awards.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : "";
    const badge = p.video ? `<span class="card__play" aria-hidden="true">▶</span>` : `<span class="card__cat">${p.link ? "Read more" : "Video soon"}</span>`;
    return `<a class="card${p.featured ? " card--featured" : ""}" data-kind="${esc(p.kind || "")}" ${tag}>
      <div class="card__media">${media}${badge}</div>
      <div class="card__body">
        <div class="card__top"><span>${esc(p.role)}</span><span>${esc(p.year)}</span></div>
        <h3 class="card__title">${esc(p.title)}</h3>
        <p class="card__desc">${esc(p.description)}</p>
        ${awards}
      </div></a>`;
  }
  const homeWork = $("#home-work");
  if (homeWork && S.aiWork) {
    const picks = S.aiWork.filter((p) => p.home).slice(0, 3);
    homeWork.innerHTML = picks.map((p, i) => card({ ...p, featured: false }, i)).join("");
  }
  const grid = $("#ai-grid");
  if (grid && S.aiWork) {
    grid.innerHTML = S.aiWork.map(card).join("");
    const filters = $("#work-filters");
    if (filters) {
      const kinds = [...new Set(S.aiWork.map((p) => p.kind).filter(Boolean))];
      filters.innerHTML = ["All", ...kinds].map((k, i) => `<button class="chip${i ? "" : " is-active"}" data-kind="${esc(k)}">${esc(k)}</button>`).join("");
      filters.addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        $$(".chip", filters).forEach((c) => c.classList.toggle("is-active", c === b));
        $$(".card", grid).forEach((c) => c.classList.toggle("is-hidden", b.dataset.kind !== "All" && c.dataset.kind !== b.dataset.kind));
      });
    }
  }

  /* ---------- Credits list ---------- */
  const credits = $("#credits-list");
  if (credits && S.credits) {
    credits.innerHTML = S.credits.map((c) => `<li>
      <span class="credit__year">${esc(c.year)}</span>
      <span class="credit__title">${esc(c.title)}</span>
      <span class="credit__role">${esc(c.role)}</span>
      <span class="credit__studio">${esc(c.studio)}</span></li>`).join("");
  }

  /* ---------- Awards ---------- */
  const awardBlock = (a) => `<li class="award${a.kind === "credit" ? " award--credit" : ""}">
      <b>${esc(a.title)}</b>
      ${(a.items || []).map((i) => `<span>${esc(i)}</span>`).join("")}
      ${a.kind === "credit" ? `<em>Production credit</em>` : ""}</li>`;
  const homeAwards = $("#home-awards");
  if (homeAwards && S.awards) {
    homeAwards.innerHTML = S.awards.slice(0, 3).map((a) => `<a class="award-card" href="awards.html">
      <span class="mono">${esc(a.year)}</span><b>${esc(a.title)}</b><span>${esc((a.items || [])[0] || "")}</span></a>`).join("");
  }
  const awardsFull = $("#awards-full");
  if (awardsFull && S.awards) {
    const years = [...new Set(S.awards.map((a) => a.year))].sort((a, b) => String(b).localeCompare(String(a)));
    awardsFull.innerHTML = years.map((y) => `<div class="awards-year">
      <h3>${esc(y)}</h3>
      <ul>${S.awards.filter((a) => a.year === y).map(awardBlock).join("")}</ul></div>`).join("");
  }

  /* ---------- Simple lists ---------- */
  const fill = (id, arr, fn) => { const el = $(id); if (el && arr) el.innerHTML = arr.map(fn).join(""); };
  fill("#studios", S.studios, (s) => `<li>${esc(s)}</li>`);
  fill("#partners", S.partners, (s) => `<li>${esc(s)}</li>`);
  const cvItem = (e) => `<li><b>${esc(e.what)}</b><span class="y">${esc(e.when)}</span><span class="w">${esc(e.where)}</span></li>`;
  fill("#education", S.education, cvItem);
  fill("#teaching", S.teaching, cvItem);
  const tools = $("#tools");
  if (tools && S.tools) tools.innerHTML = Object.entries(S.tools).map(([group, list]) =>
    `<dl class="toolkit__row"><dt>${esc(group)}</dt><dd>${list.map((t) => `<span>${esc(t)}</span>`).join("")}</dd></dl>`).join("");
  fill("#talks", S.talks, (t) => `<li><a href="${esc(t.link)}" target="_blank" rel="noopener">${t.thumb ? `<img src="${esc(t.thumb)}" alt="" loading="lazy">` : ""}<div><b>${esc(t.title)}</b><span>${esc(t.role)} · ${esc(t.when)}</span></div></a></li>`);
  fill("#links", (S.links || []).filter((l) => l.icon), (l) => `<li>${iconLink(l)}</li>`);

  /* ---------- Timo ---------- */
  const timo = $("#timo-avatar");
  if (timo) timo.addEventListener("click", () => {
    timo.classList.remove("is-barking"); void timo.offsetWidth; timo.classList.add("is-barking");
    setTimeout(() => timo.classList.remove("is-barking"), 1400);
  });

  /* ---------- Mobile nav ---------- */
  const burger = $("#burger"), links = $("#nav-links");
  burger.addEventListener("click", () => { const open = links.classList.toggle("is-open"); burger.setAttribute("aria-expanded", open); });
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") { links.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); } });

  /* ---------- Nav: transparent over the hero, solid everywhere else ---------- */
  const nav = $(".nav"), hasHero = !!$(".hero");
  const onScroll = () => nav.classList.toggle("is-solid", !hasHero || window.scrollY > 40);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); reveal.unobserve(en.target); } });
  }, { threshold: 0.12 });
  /* Anything already on screen shows at once (no dependence on observer timing); the rest animates in as you scroll. */
  const inView = (el) => { const r = el.getBoundingClientRect(); return r.top < window.innerHeight && r.bottom > 0; };
  $$(".reveal, .reel, .card, .credits li, .award-card, .awards-year, .studio__card, .timo__inner, .about > *, .page-head > *").forEach((el) => {
    el.classList.add("reveal");
    if (inView(el)) el.classList.add("is-in"); else reveal.observe(el);
  });
})();
