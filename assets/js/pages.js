/* =========================================================
   PRIMA MACHINERY CO. | PAGE LOGIC
   ========================================================= */
(function () {
  "use strict";
  const C = window.PRIMA_CONFIG;
  const P = window.PRIMA_PRODUCTS || [];
  const CATS = window.PRIMA_CATEGORIES || [];
  const { ICONS, esc, fullName, waLink, waProduct, enquiryLink, catById, img, productCard, initReveal, lightbox } = window.Prima;
  const $ = (sel, root = document) => root.querySelector(sel);
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;

  const inCat = (p, catId) => p.categories.includes(catId);
  const inCatList = (catId) => P.filter((p) => inCat(p, catId));
  const countIn = (catId) => inCatList(catId).length;
  const galleryItems = () => {
    const items = [];
    P.forEach((p) => p.images.forEach((src, i) => items.push({ src, caption: fullName(p) + (p.images.length > 1 ? `, view ${i + 1}` : ""), category: p.category, categories: p.categories, product: p.id })));
    (window.PRIMA_GALLERY_EXTRA || []).forEach((g) => items.push(g));
    return items;
  };

  /* ================= HOME ================= */
  function home() {
    const featured = P.filter((p) => p.featured);
    // Hero visual
    const [main, ...rest] = featured;
    if (main) {
      $("#heroVisual").innerHTML = `
        <a class="hero__main" href="product.html?id=${main.id}" aria-label="${esc(fullName(main))}">
          ${img(main.images[0], fullName(main), 'fetchpriority="high" loading="eager"')}
          <span class="hero__badge">Featured machine<strong>${esc(fullName(main))}</strong></span>
        </a>
        <div class="hero__thumbs">
          ${rest.slice(0, 2).map((p) => `
            <a class="hero__thumb" href="product.html?id=${p.id}">
              ${img(p.images[0], fullName(p))}
              <span>${esc(p.model || p.name)}<small>${esc(p.model ? p.name : catById(p.category).name)}</small></span>
            </a>`).join("")}
        </div>`;
    }
    // Categories
    $("#catGrid").innerHTML = CATS.map((c, i) => `
      <a class="cat-card reveal reveal-d${i % 4}" href="products.html?cat=${c.id}">
        <span class="cat-card__media">${img((inCatList(c.id)[0] || {}).images?.[0], c.name)}</span>
        <span class="cat-card__body">
          <span class="cat-card__count">${countIn(c.id)} machine${countIn(c.id) === 1 ? "" : "s"}</span>
          <h3>${esc(c.name)}</h3>
          <p>${esc(c.blurb)}</p>
          <span class="cat-card__more">View range ${ICONS.arrow}</span>
        </span>
      </a>`).join("");
    // Featured products
    $("#featuredGrid").innerHTML = featured.map(productCard).join("");
    // Intro image (second featured)
    const intro = featured[1] || featured[0];
    if (intro) $("#introImg").innerHTML = img(intro.images[0], fullName(intro));
    // Gallery preview
    const g = galleryItems().filter((x, i, arr) => arr.findIndex((y) => y.product === x.product) === i || !x.product).slice(0, 5);
    $("#homeGallery").innerHTML = g.map((x, i) => `
      <button class="g-item reveal" type="button" data-i="${i}">
        ${img(x.src, x.caption)}<span class="g-item__cap">${esc(x.caption)}</span>
      </button>`).join("");
    const lb = lightbox(g);
    $("#homeGallery").addEventListener("click", (e) => { const b = e.target.closest(".g-item"); if (b) lb.open(+b.dataset.i); });
  }

  /* ================= PRODUCTS (catalogue with search + filters) ================= */
  function products() {
    let state = { cat: params.get("cat") || "all", q: params.get("q") || "" };
    if (state.cat !== "all" && !catById(state.cat)) state.cat = "all";
    const grid = $("#productGrid"), count = $("#resultCount"), input = $("#search"), clear = $(".search-clear");
    input.value = state.q;

    const filterBtns = (cls) => [{ id: "all", name: "All Machines" }, ...CATS].map((c) => `
      <li><button class="filter-btn ${cls || ""}" type="button" data-cat="${c.id}">
        <span>${esc(c.name)}</span><span class="count">${c.id === "all" ? P.length : countIn(c.id)}</span>
      </button></li>`).join("");
    $("#filterList").innerHTML = filterBtns();
    $("#filterChips").innerHTML = filterBtns().replace(/<\/?li>/g, "");

    const norm = (t) => String(t).toLowerCase().normalize("NFKD").replace(/[^\w\s/]/g, " ");
    const haystack = (p) => norm([p.name, p.model, p.short, p.description, (catById(p.category) || {}).name, ...(p.features || []), ...(p.applications || [])].join(" "));

    function render() {
      const terms = norm(state.q).split(/\s+/).filter(Boolean);
      const list = P.filter((p) => (state.cat === "all" || inCat(p, state.cat)) && terms.every((t) => haystack(p).includes(t)));
      document.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("is-active", b.dataset.cat === state.cat));
      clear.classList.toggle("is-visible", !!state.q);
      const catName = state.cat === "all" ? "all categories" : catById(state.cat).name;
      count.textContent = `${list.length} machine${list.length === 1 ? "" : "s"} in ${catName}${state.q ? ` matching “${state.q}”` : ""}`;
      $("#catTitle").textContent = state.cat === "all" ? "All Machines" : catById(state.cat).name;
      grid.innerHTML = list.length ? list.map(productCard).join("") : `
        <div class="empty-state" style="grid-column:1/-1">
          <h3>No machines found</h3>
          <p>Try a different search term or category, or tell us what you need and we’ll help.</p>
          <div class="btn-row" style="justify-content:center">
            <button class="btn btn--outline" type="button" id="resetFilters">Show all machines</button>
            <a class="btn btn--wa" href="${waLink(`Hello ${C.company}, I am looking for a machine for: ${state.q || "my application"}.`)}" target="_blank" rel="noopener">${ICONS.whatsapp}Ask on WhatsApp</a>
          </div>
        </div>`;
      const reset = $("#resetFilters");
      if (reset) reset.onclick = () => { state = { cat: "all", q: "" }; input.value = ""; sync(); };
      initReveal(grid);
      const url = new URL(location.href);
      state.cat === "all" ? url.searchParams.delete("cat") : url.searchParams.set("cat", state.cat);
      state.q ? url.searchParams.set("q", state.q) : url.searchParams.delete("q");
      history.replaceState(null, "", url);
      document.title = `${state.cat === "all" ? "Our Machines" : catById(state.cat).name} | ${C.company}`;
    }
    const sync = () => render();

    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      state.cat = b.dataset.cat; render();
      if (window.innerWidth > 1024) window.scrollTo({ top: $("#catalog").offsetTop - 100, behavior: "smooth" });
    });
    let t;
    input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { state.q = input.value.trim(); render(); }, 120); });
    $("#searchForm").addEventListener("submit", (e) => { e.preventDefault(); state.q = input.value.trim(); render(); });
    clear.addEventListener("click", () => { input.value = ""; state.q = ""; render(); input.focus(); });
    render();
  }

  /* ================= PRODUCT DETAIL ================= */
  function product() {
    const p = P.find((x) => x.id === params.get("id"));
    const root = $("#productRoot");
    if (!p) {
      root.innerHTML = `<div class="container section"><div class="empty-state"><h3>Machine not found</h3><p>The machine you are looking for may have moved.</p><a class="btn btn--primary" href="products.html">Browse all machines</a></div></div>`;
      return;
    }
    const cat = catById(p.category);
    const name = fullName(p);
    // SEO
    document.title = `${name} | ${cat.name} | ${C.company}`;
    const desc = `${p.short} Enquire with ${C.company}, ${C.location}.`;
    $('meta[name="description"]').setAttribute("content", desc);
    $('meta[property="og:title"]').setAttribute("content", `${name} | ${C.company}`);
    $('meta[property="og:description"]').setAttribute("content", desc);
    $('link[rel="canonical"]').setAttribute("href", `${C.domain}/product.html?id=${p.id}`);
    const ld = { "@context": "https://schema.org", "@type": "Product", name, description: p.description, category: cat.name, image: p.images.map((i) => `${C.domain}/${i}`), brand: { "@type": "Brand", name: C.company }, manufacturer: { "@type": "Organization", name: C.company } };
    if (p.model) ld.model = p.model;
    const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

    $("#crumbCat").innerHTML = `<a href="products.html?cat=${cat.id}">${esc(cat.name)}</a>`;
    $("#crumbName").textContent = p.name;

    const thumbs = p.images.length > 1 ? `<div class="pd-gallery__thumbs">${p.images.map((src, i) => `<button class="pd-thumb${i === 0 ? " is-active" : ""}" type="button" data-i="${i}" aria-label="View image ${i + 1}">${img(src, `${name}, view ${i + 1}`)}</button>`).join("")}</div>` : "";
    const specs = p.specs && p.specs.length
      ? `<table class="spec-table"><tbody>${p.specs.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table>`
      : `<div class="notice">${ICONS.info}<div><h3>Specifications available on request</h3><p>Technical specifications vary with size and configuration. Tell us your material, sheet size and output requirement and we will share the details for the model that suits you.</p><div class="btn-row"><a class="btn btn--primary btn--sm" href="${enquiryLink(p)}">Request specifications</a><a class="btn btn--wa btn--sm" href="${waLink(`Hello ${C.company}, please share the technical specifications for the ${name}.`)}" target="_blank" rel="noopener">${ICONS.whatsapp}Ask on WhatsApp</a></div></div></div>`;

    root.innerHTML = `
      <section class="section" style="padding-top:clamp(36px,5vw,64px)">
        <div class="container">
          <div class="pd">
            <div class="pd-gallery reveal">
              <div class="pd-gallery__main" role="button" tabindex="0" aria-label="Enlarge image">${img(p.images[0], name, 'loading="eager" fetchpriority="high"')}</div>
              ${thumbs}
            </div>
            <div class="pd-info reveal reveal-d1">
              <span class="chip chip--cat">${esc(cat.name)}</span>${p.model ? `<span class="chip chip--model-inline">Model: ${esc(p.model)}</span>` : ""}
              <h1>${esc(p.name)}${p.model ? ` <span style="color:var(--steel-500)">${esc(p.model)}</span>` : ""}</h1>
              <p class="lead">${esc(p.short)}</p>
              <div class="pd-cta">
                <a class="btn btn--primary" href="${enquiryLink(p)}">${ICONS.quote}Request Price</a>
                <a class="btn btn--wa" href="${waProduct(p)}" target="_blank" rel="noopener">${ICONS.whatsapp}WhatsApp Enquiry</a>
              </div>
              <div class="pd-call">
                <span class="pd-call__ico">${ICONS.phone}</span>
                <div><small>Speak directly with ${esc(C.contactPerson)}</small><a href="tel:${C.phoneE164}">${C.phoneDisplay}</a></div>
              </div>
              <ul class="pd-quick">
                ${p.features.slice(0, 3).map((f) => `<li>${ICONS.check}<span>${esc(f)}</span></li>`).join("")}
              </ul>
            </div>
          </div>

          <div class="tabs reveal">
            <div class="tabs__list" role="tablist">
              <button class="tabs__btn" role="tab" id="t-ov" aria-controls="p-ov" aria-selected="true">Overview</button>
              <button class="tabs__btn" role="tab" id="t-ft" aria-controls="p-ft" aria-selected="false" tabindex="-1">Key Features</button>
              <button class="tabs__btn" role="tab" id="t-sp" aria-controls="p-sp" aria-selected="false" tabindex="-1">Specifications</button>
              <button class="tabs__btn" role="tab" id="t-ap" aria-controls="p-ap" aria-selected="false" tabindex="-1">Applications</button>
            </div>
            <div class="tabs__panel" role="tabpanel" id="p-ov" aria-labelledby="t-ov"><p class="lead" style="max-width:820px">${esc(p.description)}</p></div>
            <div class="tabs__panel" role="tabpanel" id="p-ft" aria-labelledby="t-ft" hidden><ul class="feature-list">${p.features.map((f) => `<li>${ICONS.check}<span>${esc(f)}</span></li>`).join("")}</ul></div>
            <div class="tabs__panel" role="tabpanel" id="p-sp" aria-labelledby="t-sp" hidden>${specs}</div>
            <div class="tabs__panel" role="tabpanel" id="p-ap" aria-labelledby="t-ap" hidden><ul class="app-tags">${p.applications.map((a) => `<li>${esc(a)}</li>`).join("")}</ul></div>
          </div>
        </div>
      </section>`;

    // Gallery interactions
    const mainBox = $(".pd-gallery__main"), mainImg = mainBox.querySelector("img");
    let current = 0;
    const items = p.images.map((src, i) => ({ src, caption: `${name}, view ${i + 1}` }));
    const lb = lightbox(items);
    root.querySelectorAll(".pd-thumb").forEach((t) => t.addEventListener("click", () => {
      current = +t.dataset.i;
      root.querySelectorAll(".pd-thumb").forEach((x) => x.classList.toggle("is-active", x === t));
      mainImg.classList.remove("is-placeholder"); delete mainImg.dataset.fellBack;
      mainImg.src = p.images[current];
    }));
    const openLb = () => lb.open(current, items);
    mainBox.addEventListener("click", openLb);
    mainBox.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(); } });

    // Tabs (keyboard accessible)
    const tabs = [...root.querySelectorAll(".tabs__btn")];
    const select = (tab) => {
      tabs.forEach((t) => { const on = t === tab; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; $("#" + t.getAttribute("aria-controls")).hidden = !on; });
      tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length]);
        if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length]);
      });
    });

    // Related
    const related = P.filter((x) => x.id !== p.id && inCat(x, p.category)).concat(P.filter((x) => x.id !== p.id && !inCat(x, p.category) && x.featured)).slice(0, 3);
    $("#relatedGrid").innerHTML = related.map(productCard).join("");
    initReveal();
  }

  /* ================= GALLERY ================= */
  function gallery() {
    const all = galleryItems();
    let cat = "all";
    const usedCats = CATS.filter((c) => all.some((g) => (g.categories || [g.category]).includes(c.id)));
    $("#galleryFilters").innerHTML = [{ id: "all", name: "All" }, ...usedCats].map((c) => `<button class="filter-btn" type="button" data-gcat="${c.id}">${esc(c.name)}</button>`).join("");
    const grid = $("#galleryGrid");
    let shown = all;
    const lb = lightbox(all);
    const render = () => {
      shown = cat === "all" ? all : all.filter((g) => g.categories ? g.categories.includes(cat) : g.category === cat);
      document.querySelectorAll("[data-gcat]").forEach((b) => b.classList.toggle("is-active", b.dataset.gcat === cat));
      grid.innerHTML = shown.map((g, i) => `<button class="g-item reveal" type="button" data-i="${i}">${img(g.src, g.caption)}<span class="g-item__cap">${esc(g.caption)}</span></button>`).join("");
      initReveal(grid);
    };
    $("#galleryFilters").addEventListener("click", (e) => { const b = e.target.closest("[data-gcat]"); if (b) { cat = b.dataset.gcat; render(); } });
    grid.addEventListener("click", (e) => { const b = e.target.closest(".g-item"); if (b) lb.open(+b.dataset.i, shown); });
    render();
  }

  /* ================= CONTACT (enquiry form) ================= */
  function contact() {
    const form = $("#enquiryForm");
    const sel = $("#f-machine");
    sel.innerHTML = `<option value="">Select a machine (optional)</option>` +
      CATS.map((c) => `<optgroup label="${esc(c.name)}">${P.filter((p) => p.category === c.id).map((p) => `<option value="${esc(fullName(p))}">${esc(fullName(p))}</option>`).join("")}</optgroup>`).join("") +
      `<option value="Other / Not sure">Other / Not sure</option>`;

    // Pre-fill from "Request Price" / "Enquire Now" links
    const m = params.get("machine"), model = params.get("model");
    if (m) {
      const wanted = model ? `${m} (${model})` : m;
      if (![...sel.options].some((o) => o.value === wanted)) sel.insertAdjacentHTML("beforeend", `<option>${esc(wanted)}</option>`);
      sel.value = wanted;
      $("#f-message").value = `I would like a price quotation for the ${wanted}. Please share details, specifications and delivery time.`;
      $("#enquiryBanner").innerHTML = `<div class="notice" style="margin-bottom:22px">${ICONS.info}<div><h3 style="margin:0">Enquiry for: ${esc(wanted)}</h3><p style="margin:4px 0 0">The machine name${model ? " and model" : ""} will be included with your enquiry.</p></div></div>`;
    }

    $("#contactWa").href = waLink(`Hello ${C.company}, I would like to enquire about your machines.`);
    const mapQ = encodeURIComponent(C.address || C.mapQuery);
    $("#mapFrame").src = `https://maps.google.com/maps?q=${mapQ}&z=12&output=embed`;
    if (C.address) $("#addrLine").textContent = `${C.address}, ${C.location}`;

    const fields = {
      name: { el: $("#f-name"), test: (v) => v.length >= 2, msg: "Please enter your name." },
      phone: { el: $("#f-phone"), test: (v) => /^[+\d][\d\s()-]{6,}$/.test(v), msg: "Please enter a valid phone / WhatsApp number." },
      email: { el: $("#f-email"), test: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), msg: "Please enter a valid e-mail address." },
      message: { el: $("#f-message"), test: (v) => v.length >= 5, msg: "Please tell us briefly what you need." }
    };
    const validate = () => {
      let ok = true, first = null;
      Object.values(fields).forEach((f) => {
        const v = f.el.value.trim(), good = f.test(v), wrap = f.el.closest(".field");
        wrap.classList.toggle("has-error", !good);
        wrap.querySelector(".field__error").textContent = good ? "" : f.msg;
        f.el.setAttribute("aria-invalid", !good);
        if (!good) { ok = false; first = first || f.el; }
      });
      if (first) first.focus();
      return ok;
    };
    Object.values(fields).forEach((f) => f.el.addEventListener("input", () => f.el.closest(".field").classList.remove("has-error")));

    const summary = () => {
      const d = new FormData(form);
      const line = (k, v) => (v ? `${k}: ${v}\n` : "");
      return `New enquiry: ${C.company} website\n\n` +
        line("Name", d.get("name")) + line("Company", d.get("company")) + line("Phone", d.get("phone")) +
        line("E-mail", d.get("email")) + line("City / Country", d.get("location")) + line("Machine", d.get("machine")) +
        `\nMessage:\n${d.get("message")}`;
    };
    const status = $("#formStatus");
    const say = (type, html) => { status.className = `form-status is-${type}`; status.innerHTML = html; status.scrollIntoView({ behavior: "smooth", block: "nearest" }); };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form.querySelector(".hp input").value) return;          // spam honeypot
      if (!validate()) return;
      const text = summary();
      if (C.formEndpoint) {
        const btn = form.querySelector('[type="submit"]'); btn.disabled = true; btn.textContent = "Sending…";
        try {
          const d = new FormData(form); d.append("_subject", `Website enquiry: ${d.get("machine") || "General"}`);
          const r = await fetch(C.formEndpoint, { method: "POST", body: d, headers: { Accept: "application/json" } });
          if (!r.ok) throw new Error();
          form.reset();
          say("success", `<strong>Thank you, your enquiry has been sent.</strong> ${esc(C.contactPerson)} will get back to you shortly. For a faster response, <a href="${waLink(text)}" target="_blank" rel="noopener">message us on WhatsApp</a>.`);
        } catch {
          say("error", `Sorry, the message could not be sent. Please <a href="${waLink(text)}" target="_blank" rel="noopener">send it on WhatsApp</a> or call <a href="tel:${C.phoneE164}">${C.phoneDisplay}</a>.`);
        } finally { btn.disabled = false; btn.innerHTML = `${ICONS.arrow}Send Enquiry`; }
      } else {
        window.open(waLink(text), "_blank", "noopener");
        say("success", `<strong>Your enquiry is ready in WhatsApp.</strong> Press send in WhatsApp to deliver it to ${esc(C.contactPerson)}. Prefer e-mail? <a href="mailto:${C.email}?subject=${encodeURIComponent("Website enquiry: " + (new FormData(form).get("machine") || "General"))}&body=${encodeURIComponent(text)}">Send it by e-mail instead</a>.`);
      }
    });
    $("#sendEmail").addEventListener("click", () => {
      if (!validate()) return;
      const machine = new FormData(form).get("machine") || "General";
      location.href = `mailto:${C.email}?subject=${encodeURIComponent("Website enquiry: " + machine)}&body=${encodeURIComponent(summary())}`;
    });
  }

  /* ================= E-CATALOGUE ================= */
  function catalogue() {
    $("#catDate").textContent = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long" });
    $("#catDoc").innerHTML = CATS.filter((c) => countIn(c.id)).map((c) => `
      <h2 class="cat-doc-title">${esc(c.name)}</h2>
      ${P.filter((p) => p.category === c.id).map((p) => `
        <div class="cat-doc-item">
          <div class="frame">${img(p.images[0], fullName(p), 'loading="eager"')}</div>
          <div>
            <div class="cat-doc-meta">${p.model ? `Model ${esc(p.model)} · ` : ""}${esc(c.name)}</div>
            <h3>${esc(p.name)}</h3>
            <p style="color:var(--muted)">${esc(p.description)}</p>
            <strong style="font-family:var(--font-head);color:var(--navy-900)">Key features</strong>
            <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
            <p style="margin-top:12px;font-size:.92rem"><strong>Applications:</strong> ${p.applications.map(esc).join(", ")}</p>
            ${p.specs && p.specs.length ? `<table class="spec-table" style="margin-top:12px"><tbody>${p.specs.map((r) => `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table>` : `<p style="font-size:.88rem;color:var(--steel-500)">Specifications available on request.</p>`}
            <p class="no-print" style="margin:12px 0 0"><a href="product.html?id=${p.id}">View machine page →</a></p>
          </div>
        </div>`).join("")}`).join("");
    $("#printBtn").addEventListener("click", () => window.print());
  }

  ({ home, products, product, gallery, contact, catalogue }[page] || (() => {}))();
})();
