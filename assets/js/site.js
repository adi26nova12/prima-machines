/* =========================================================
   PRIMA MACHINERY CO. | SHARED LAYOUT & HELPERS
   Renders header, footer and floating buttons on every page.
   ========================================================= */
(function () {
  "use strict";
  const C = window.PRIMA_CONFIG;
  const CATS = window.PRIMA_CATEGORIES || [];
  const PLACEHOLDER = "assets/img/placeholder-machine.svg";

  /* ---------- Icons (inline SVG, stroke-based) ---------- */
  const s = (d, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  const ICONS = {
    phone: s('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    mail: s('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
    pin: s('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    clock: s('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    user: s('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
    arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    chevron: s('<path d="m6 9 6 6 6-6"/>'),
    chevL: s('<path d="m15 18-6-6 6-6"/>'),
    chevR: s('<path d="m9 18 6-6-6-6"/>'),
    up: s('<path d="m18 15-6-6-6 6"/>'),
    close: s('<path d="M18 6 6 18M6 6l12 12"/>'),
    check: s('<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>'),
    search: s('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    quote: s('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>'),
    download: s('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>'),
    info: s('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
    globe: s('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>'),
    gear: s('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    handshake: s('<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.2L21 4"/><path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/>'),
    bolt: s('<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>'),
    target: s('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
    shield: s('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
    truck: s('<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'),
    chat: s('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    // category icons
    blade: s('<path d="M3 20h18M5 20V9l14-5v16"/><path d="M5 13l14-5"/>'),
    flute: s('<path d="M2 16c2.5 0 2.5-6 5-6s2.5 6 5 6 2.5-6 5-6 2.5 6 5 6"/><path d="M2 20h20M2 6h20"/>'),
    die: s('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10v10H7z" stroke-dasharray="2 2"/>'),
    reel: s('<circle cx="9" cy="12" r="7"/><circle cx="9" cy="12" r="2"/><path d="M9 19h13"/>'),
    layers: s('<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/>'),
    print: s('<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>'),
    staple: s('<path d="M3 7h18v13H3z"/><path d="M3 7l4-4h10l4 4M9 12h6v4"/>'),
    line: s('<rect x="2" y="9" width="5" height="7" rx="1"/><rect x="9.5" y="9" width="5" height="7" rx="1"/><rect x="17" y="9" width="5" height="7" rx="1"/><path d="M7 12.5h2.5M14.5 12.5H17M2 20h20"/>')
  };
  const WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.7 17.8L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.4A11.8 11.8 0 0 0 20.4 3.6z"/></svg>';
  ICONS.whatsapp = WA_SVG;

  /* ---------- Helpers ---------- */
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fullName = (p) => p.model ? `${p.name} (${p.model})` : p.name;
  const waLink = (text) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  const waProduct = (p) => waLink(`Hello ${C.company}, I am interested in the ${fullName(p)}. Please share price and details.\n\nProduct page: ${C.domain}/product.html?id=${p.id}`);
  const enquiryLink = (p) => `contact.html?machine=${encodeURIComponent(p.name)}${p.model ? `&model=${encodeURIComponent(p.model)}` : ""}#enquiry`;
  const catById = (id) => CATS.find((c) => c.id === id);
  const catIcon = (id, cls = "cat-ico") => { const c = catById(id); return `<span class="${cls}">${ICONS[c ? c.icon : "gear"] || ICONS.gear}</span>`; };
  const img = (src, alt, attrs = "") => `<img src="${esc(src || PLACEHOLDER)}" alt="${esc(alt)}" loading="lazy" decoding="async" ${attrs}>`;

  // Any product image that fails to load falls back to the neutral placeholder.
  document.addEventListener("error", (e) => {
    const t = e.target;
    if (t && t.tagName === "IMG" && !t.dataset.fellBack) {
      t.dataset.fellBack = "1";
      t.src = PLACEHOLDER;
      t.classList.add("is-placeholder");
    }
  }, true);

  /* ---------- Header ---------- */
  function renderHeader() {
    const page = document.body.dataset.page;
    const link = (href, label, key) => `<li><a class="nav__link" href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a></li>`;
    const dropdown = CATS.map((c) => `<a href="products.html?cat=${c.id}"><span>${esc(c.name)}</span></a>`).join("");
    const html = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="topbar">
        <div class="container">
          <div class="topbar__group">
            <a class="topbar__item" href="tel:${C.phoneE164}">${ICONS.phone}${C.phoneDisplay}</a>
            <a class="topbar__item topbar__hide-md" href="mailto:${C.email}">${ICONS.mail}${C.email}</a>
          </div>
          <div class="topbar__group topbar__right">
            <span class="topbar__item">${ICONS.pin}${C.location}</span>
            ${C.hours ? `<span class="topbar__item">${ICONS.clock}${esc(C.hours)}</span>` : ""}
          </div>
        </div>
      </div>
      <header class="site-header" id="siteHeader">
        <div class="container nav">
          <a class="brand" href="index.html" aria-label="${C.company} home"><img src="assets/img/logo.svg" alt="${C.company}" width="225" height="48"></a>
          <div class="nav-backdrop" data-nav-close></div>
          <nav class="nav__panel" id="navPanel" aria-label="Main">
            <ul class="nav__menu">
              ${link("index.html", "Home", "home")}
              ${link("about.html", "About Us", "about")}
              <li class="nav__item--drop">
                <button class="nav__link" type="button" aria-expanded="false" aria-controls="navDrop"${page === "products" || page === "product" ? ' aria-current="page"' : ""}>Products ${ICONS.chevron}</button>
                <div class="dropdown" id="navDrop">${dropdown}<div class="dropdown__all"><a href="products.html">View all machines ${ICONS.arrow}</a></div></div>
              </li>
              ${link("gallery.html", "Gallery", "gallery")}
              ${link("catalogue.html", "E-Catalogue", "catalogue")}
              ${link("contact.html", "Contact Us", "contact")}
            </ul>
            <div class="nav__panel-cta" style="display:none">
              <a class="btn btn--primary btn--block" href="contact.html#enquiry">${ICONS.quote}Get a Quote</a>
              <a class="btn btn--wa btn--block" href="${waLink(`Hello ${C.company}, I would like to enquire about your machines.`)}" target="_blank" rel="noopener">${ICONS.whatsapp}WhatsApp Us</a>
              <a class="btn btn--outline btn--block" href="tel:${C.phoneE164}">${ICONS.phone}${C.phoneDisplay}</a>
            </div>
          </nav>
          <div class="nav__actions">
            <a class="btn btn--primary btn--sm btn--quote" href="contact.html#enquiry">Get a Quote</a>
            <button class="nav__toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="navPanel"><span></span></button>
          </div>
        </div>
      </header>`;
    document.getElementById("site-header").outerHTML = html;

    const body = document.body;
    const toggle = document.querySelector(".nav__toggle");
    const setOpen = (open) => {
      body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () => setOpen(!body.classList.contains("nav-open")));
    document.querySelectorAll("[data-nav-close]").forEach((el) => el.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setOpen(false); dropItem.classList.remove("is-open"); } });

    const dropItem = document.querySelector(".nav__item--drop");
    const dropBtn = dropItem.querySelector("button");
    dropBtn.addEventListener("click", () => {
      const open = !dropItem.classList.contains("is-open");
      dropItem.classList.toggle("is-open", open);
      dropBtn.setAttribute("aria-expanded", open);
    });
    document.addEventListener("click", (e) => { if (!dropItem.contains(e.target) && !body.classList.contains("nav-open")) dropItem.classList.remove("is-open"); });

    const header = document.getElementById("siteHeader");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Footer & floating buttons ---------- */
  function renderFooter() {
    const year = new Date().getFullYear();
    const catLinks = CATS.slice(0, 7).map((c) => `<li><a href="products.html?cat=${c.id}">${esc(c.name)}</a></li>`).join("");
    document.getElementById("site-footer").outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <img src="assets/img/logo-white.svg" alt="${C.company}" width="225" height="48" loading="lazy">
              <p>Paper, printing and packaging machinery from Amritsar, Punjab, for buyers across India and overseas.</p>
              <div class="btn-row" style="margin-top:20px">
                <a class="btn btn--wa btn--sm" href="${waLink(`Hello ${C.company}, I would like to enquire about your machines.`)}" target="_blank" rel="noopener">${ICONS.whatsapp}WhatsApp</a>
                <a class="btn btn--ghost-light btn--sm" href="catalogue.html">${ICONS.download}E-Catalogue</a>
              </div>
            </div>
            <div>
              <h4>Machines</h4>
              <ul class="footer-links">${catLinks}<li><a href="products.html">All machines →</a></li></ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul class="footer-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="catalogue.html">E-Catalogue</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                ${C.indiamart ? `<li><a href="${esc(C.indiamart)}" target="_blank" rel="noopener">IndiaMART</a></li>` : ""}
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul class="footer-contact">
                <li>${ICONS.user}<span>${C.contactPerson}</span></li>
                <li>${ICONS.phone}<a href="tel:${C.phoneE164}">${C.phoneDisplay}</a></li>
                <li>${ICONS.mail}<a href="mailto:${C.email}">${C.email}</a></li>
                <li>${ICONS.pin}<span>${C.address ? esc(C.address) + "<br>" : ""}${C.location}</span></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${year} ${C.company}. All rights reserved.</span>
            <span>Paper · Printing · Packaging Machinery</span>
          </div>
        </div>
      </footer>
      <div class="fab">
        <a class="fab__call" href="tel:${C.phoneE164}" aria-label="Call ${C.phoneDisplay}">${ICONS.phone}</a>
        <a class="fab__wa" href="${waLink(`Hello ${C.company}, I would like to enquire about your machines.`)}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICONS.whatsapp}</a>
      </div>
      <button class="back-top" type="button" aria-label="Back to top">${ICONS.up}</button>`;
    const bt = document.querySelector(".back-top");
    bt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => bt.classList.toggle("is-visible", window.scrollY > 700), { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal(root = document) {
    const els = root.querySelectorAll(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Shared product card ---------- */
  function productCard(p, i = 0) {
    const cat = catById(p.category);
    return `
      <article class="product-card reveal reveal-d${i % 3}">
        <a class="product-card__media" href="product.html?id=${p.id}" aria-label="${esc(fullName(p))}">
          ${img(p.images[0], fullName(p))}
          ${p.model ? `<span class="chip chip--model">${esc(p.model)}</span>` : ""}
        </a>
        <div class="product-card__body">
          <div class="product-card__cat">${esc(cat ? cat.name : "")}</div>
          <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3>
          <p>${esc(p.short)}</p>
          <a class="product-card__link" href="product.html?id=${p.id}">View details ${ICONS.arrow}</a>
          <div class="product-card__actions">
            <a class="btn btn--primary" href="${enquiryLink(p)}">Request Price</a>
            <a class="btn btn--wa" href="${waProduct(p)}" target="_blank" rel="noopener">${ICONS.whatsapp}WhatsApp</a>
          </div>
        </div>
      </article>`;
  }

  /* ---------- Lightbox ---------- */
  function lightbox(items) {
    let box = document.querySelector(".lightbox");
    if (!box) {
      document.body.insertAdjacentHTML("beforeend", `
        <div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button class="lightbox__btn lightbox__close" type="button" aria-label="Close">${ICONS.close}</button>
          <button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous image">${ICONS.chevL}</button>
          <figure><img alt=""><figcaption></figcaption></figure>
          <button class="lightbox__btn lightbox__next" type="button" aria-label="Next image">${ICONS.chevR}</button>
        </div>`);
      box = document.querySelector(".lightbox");
    }
    let list = items, idx = 0, lastFocus = null;
    const im = box.querySelector("img"), cap = box.querySelector("figcaption");
    const show = (i) => {
      idx = (i + list.length) % list.length;
      im.classList.remove("is-placeholder"); delete im.dataset.fellBack;
      im.src = list[idx].src; im.alt = list[idx].caption || "";
      cap.textContent = list[idx].caption || "";
      const multi = list.length > 1;
      box.querySelector(".lightbox__prev").style.display = multi ? "" : "none";
      box.querySelector(".lightbox__next").style.display = multi ? "" : "none";
    };
    const close = () => { box.classList.remove("is-open"); document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
    box.querySelector(".lightbox__close").onclick = close;
    box.querySelector(".lightbox__prev").onclick = () => show(idx - 1);
    box.querySelector(".lightbox__next").onclick = () => show(idx + 1);
    box.onclick = (e) => { if (e.target === box) close(); };
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    return {
      open(i, newItems) { if (newItems) list = newItems; lastFocus = document.activeElement; show(i); box.classList.add("is-open"); document.body.style.overflow = "hidden"; box.querySelector(".lightbox__close").focus(); }
    };
  }

  window.Prima = { ICONS, esc, fullName, waLink, waProduct, enquiryLink, catById, catIcon, img, productCard, initReveal, lightbox, PLACEHOLDER };

  renderHeader();
  renderFooter();
  document.addEventListener("DOMContentLoaded", () => initReveal());
  if (document.readyState !== "loading") initReveal();
})();
