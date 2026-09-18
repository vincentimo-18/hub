/* Oscar Burgos — site behaviour. Renders content from js/data.js. */
(function () {
  const S = window.SITE || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /* ---------- Signature ---------- */
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

  /* ---------- Reels ---------- */
  const reels = $("#reels-grid");
  if (reels && S.reels) {
    reels.innerHTML = S.reels.map((r, i) => {
      const t = thumbFor(r);
      const media = r.video
        ? `<button class="reel__media" data-video="${esc(r.video)}" aria-label="Play ${esc(r.title)}">
             ${t ? `<img src="${esc(t)}" alt="" loading="lazy">` : `<div class="reel__placeholder"></div>`}
             <span class="card__play" aria-hidden="true">▶</span></button>`
        : `<div class="reel__media reel__media--soon"><div class="reel__placeholder"></div><span class="reel__soon">Coming soon</span></div>`;
      return `<article class="reel">
        ${media}
        <div class="reel__body">
          <p class="mono">${esc(r.kicker)}</p>
          <h3 class="reel__title">${esc(r.title)}</h3>
          <p class="reel__desc">${esc(r.description)}</p>
        </div></article>`;
    }).join("");
  }

  /* ---------- AI work ---------- */
  const grid = $("#ai-grid");
  if (grid && S.aiWork) {
    grid.innerHTML = S.aiWork.map((p, i) => {
      const t = thumbFor(p);
      const href = p.video || p.link || "";
      const tag = p.video ? `data-video="${esc(p.video)}" href="${esc(p.video)}"` : (p.link ? `href="${esc(p.link)}" target="_blank" rel="noopener"` : `href="#" aria-disabled="true"`);
      const media = t ? `<img src="${esc(t)}" alt="" loading="lazy">` : `<div class="card__placeholder"><span>${String(i + 1).padStart(2, "0")}</span></div>`;
      const awards = (p.awards || []).length ? `<ul class="card__awards">${p.awards.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : "";
      const badge = p.video ? `<span class="card__play" aria-hidden="true">▶</span>` : `<span class="card__cat">${p.link ? "Read more" : "Video soon"}</span>`;
      return `<a class="card${p.featured ? " card--featured" : ""}" ${tag}>
        <div class="card__media">${media}${badge}</div>
        <div class="card__body">
          <div class="card__top"><span>${esc(p.role)}</span><span>${esc(p.year)}</span></div>
          <h3 class="card__title">${esc(p.title)}</h3>
          <p class="card__desc">${esc(p.description)}</p>
          ${awards}
        </div></a>`;
    }).join("");
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

  /* ---------- About lists ---------- */
  const fill = (id, arr, fn) => { const el = $(id); if (el && arr) el.innerHTML = arr.map(fn).join(""); };
  fill("#studios", S.studios, (s) => `<li>${esc(s)}</li>`);
  fill("#partners", S.partners, (s) => `<li>${esc(s)}</li>`);
  fill("#awards", S.awards, (a) => `<li><span class="y">${esc(a.year)}</span><div><b>${esc(a.what)}</b><span>${esc(a.where)}</span></div></li>`);
  fill("#talks", S.talks, (t) => `<li><a href="${esc(t.link)}" target="_blank" rel="noopener">${t.thumb ? `<img src="${esc(t.thumb)}" alt="" loading="lazy">` : ""}<div><b>${esc(t.title)}</b><span>${esc(t.role)} · ${esc(t.when)}</span></div></a></li>`);
  fill("#links", S.links, (l) => `<li><a href="${esc(l.url)}" ${l.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'}><b>${esc(l.label)}</b><span>${esc(l.handle)}</span></a></li>`);

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

  /* ---------- Nav transparency over the hero ---------- */
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 40);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Active section + reveal ---------- */
  const navAnchors = $$("#nav-links a");
  const sections = navAnchors.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) navAnchors.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id)); });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => spy.observe(s));

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); reveal.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$(".reveal, .reel, .card, .credits li, .studio__card, .timo__inner, .about > *").forEach((el) => { el.classList.add("reveal"); reveal.observe(el); });
})();
