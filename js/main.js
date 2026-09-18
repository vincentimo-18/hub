/* Oscar Burgos — site behaviour. Renders content from js/data.js. */
(function () {
  const S = window.SITE || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Small text bindings ---------- */
  $$("[data-site]").forEach((el) => { const v = S[el.dataset.site]; if (v) el.textContent = v; });
  $$("[data-timo]").forEach((el) => { const v = S.timo && S.timo[el.dataset.timo]; if (v) el.textContent = v; });
  const showreel = $("#showreel-btn"); if (showreel && S.showreel) showreel.href = S.showreel;
  const mail = $("#contact-email"); if (mail && S.email) mail.href = "mailto:" + S.email;
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Signature: swap the typographic title for the brand image if it exists ---------- */
  const SIGNATURE = "assets/img/oscar-burgos-signature.png";
  const title = $(".hero__title");
  if (title) {
    const img = new Image();
    img.onload = () => {
      img.className = "hero__signature";
      img.alt = "Oscar Burgos";
      title.appendChild(img);
      title.classList.add("has-signature");
    };
    img.src = SIGNATURE;
  }

  /* ---------- Marquee ---------- */
  const marquee = $("#marquee");
  if (marquee && S.marquee) {
    const items = S.marquee.map((t) => `<span class="marquee__item">${esc(t)}</span>`).join("");
    marquee.innerHTML = items + items; // duplicated for a seamless loop
  }

  /* ---------- Video helpers ---------- */
  function embedUrl(url) {
    if (!url) return null;
    let m;
    if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/)))
      return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`;
    if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)))
      return `https://player.vimeo.com/video/${m[1]}?autoplay=1&title=0&byline=0&portrait=0`;
    return null;
  }

  const lightbox = $("#lightbox"), frame = $("#lightbox-frame");
  function openVideo(url) {
    const src = embedUrl(url);
    if (!src) { window.open(url, "_blank", "noopener"); return; }
    frame.innerHTML = `<iframe src="${src}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video"></iframe>`;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lightbox-close").focus();
  }
  function closeVideo() { lightbox.hidden = true; frame.innerHTML = ""; document.body.style.overflow = ""; }
  $("#lightbox-close").addEventListener("click", closeVideo);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeVideo(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeVideo(); });

  /* ---------- Projects ---------- */
  const CAT_LABEL = { "ai-film": "AI film", vfx: "VFX", talk: "Talk" };
  const grid = $("#projects");
  function cardHTML(p, i) {
    const href = p.video || p.link || "#";
    const isVideo = !!p.video;
    const media = p.thumb
      ? `<img src="${esc(p.thumb)}" alt="" loading="lazy">`
      : `<div class="card__placeholder"><span>${String(i + 1).padStart(2, "0")}</span></div>`;
    const play = isVideo ? `<span class="card__play" aria-hidden="true">▶</span>` : "";
    const tags = (p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("");
    const awards = (p.awards || []).length ? `<ul class="card__awards">${p.awards.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : "";
    return `
      <a class="card${p.featured ? " card--featured" : ""}" data-category="${esc(p.category)}"
         href="${esc(href)}" ${isVideo ? 'data-video="1"' : 'target="_blank" rel="noopener"'}>
        <div class="card__media">${media}${play}<span class="card__cat">${esc(CAT_LABEL[p.category] || p.category)}</span></div>
        <div class="card__body">
          <div class="card__top"><span>${esc(p.role)}</span><span>${esc(p.year)}</span></div>
          <h3 class="card__title">${esc(p.title)}</h3>
          <p class="card__desc">${esc(p.description)}</p>
          ${awards}
          <div class="card__tags">${tags}</div>
        </div>
      </a>`;
  }
  if (grid && S.projects) {
    grid.innerHTML = S.projects.map(cardHTML).join("");
    grid.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-video]");
      if (!a) return;
      e.preventDefault();
      openVideo(a.getAttribute("href"));
    });
  }

  /* ---------- Filters ---------- */
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip"); if (!btn) return;
    $$(".chip").forEach((c) => { c.classList.toggle("is-active", c === btn); c.setAttribute("aria-selected", c === btn); });
    const f = btn.dataset.filter;
    $$(".card", grid).forEach((card) => card.classList.toggle("is-hidden", f !== "all" && card.dataset.category !== f));
  });

  /* ---------- About lists ---------- */
  const fill = (id, arr, fn) => { const el = $(id); if (el && arr) el.innerHTML = arr.map(fn).join(""); };
  fill("#studios", S.studios, (s) => `<li>${esc(s)}</li>`);
  fill("#partners", S.partners, (s) => `<li>${esc(s)}</li>`);
  fill("#awards", S.awards, (a) => `<li><span class="y">${esc(a.year)}</span><div><b>${esc(a.what)}</b><span>${esc(a.where)}</span></div></li>`);
  fill("#links", S.links, (l) => `<li><a href="${esc(l.url)}" ${l.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'}><b>${esc(l.label)}</b><span>${esc(l.handle)}</span></a></li>`);

  /* ---------- Timo ---------- */
  const timo = $("#timo-avatar");
  if (timo) timo.addEventListener("click", () => {
    timo.classList.remove("is-barking"); void timo.offsetWidth; timo.classList.add("is-barking");
    setTimeout(() => timo.classList.remove("is-barking"), 1400);
  });

  /* ---------- Mobile nav ---------- */
  const burger = $("#burger"), links = $("#nav-links");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") { links.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); } });

  /* ---------- Active section + reveal ---------- */
  const navAnchors = $$("#nav-links a");
  const sections = navAnchors.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => spy.observe(s));

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); reveal.unobserve(en.target); } });
  }, { threshold: 0.15 });
  $$(".reveal, .card, .studio__card, .timo__inner, .about > *").forEach((el) => { el.classList.add("reveal"); reveal.observe(el); });
})();
