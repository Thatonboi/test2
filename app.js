/* ============================================================================
   APP LOGIC
   ----------------------------------------------------------------------------
   Renders the CONTENT object (js/data.js) into the DOM and wires up
   navigation between screens (Home / Portfolio) and overlays (Project
   detail / Contact). You shouldn't need to edit this file for normal
   content updates — see js/data.js instead.
============================================================================ */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     ICONS — small inline SVG path library, referenced by name
  --------------------------------------------------------------------- */
  const ICONS = {
    github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.53 9.53 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor"/>',
    linkedin: '<path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" fill="currentColor"/><path d="M5.25 7.03A2.02 2.02 0 1 0 5.25 3a2.02 2.02 0 0 0 0 4.03Z" fill="currentColor"/><path d="M20.44 20.5h-3.37v-6.28c0-1.5-.03-3.42-2.08-3.42-2.09 0-2.41 1.63-2.41 3.31v6.39H9.2V8.5h3.24v1.64h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17v7Z" fill="currentColor"/>',
    twitter: '<path d="M17.75 3h3.07l-6.71 7.67L22 21h-6.19l-4.85-6.34L5.4 21H2.32l7.17-8.2L2 3h6.35l4.38 5.79L17.75 3Zm-1.08 16.17h1.7L7.42 4.74h-1.83l11.08 14.43Z" fill="currentColor"/>',
    mail: '<path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/><path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    phone: '<path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.1-.24 10.6 10.6 0 0 0 3.3.53 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 10.6 10.6 0 0 0 .53 3.3 1 1 0 0 1-.25 1.02L6.6 10.8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" fill="none"/>',
    pin: '<path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" fill="none"/><circle cx="12" cy="9.5" r="2.4" stroke="currentColor" stroke-width="1.6" fill="none"/>',
    external: '<path d="M14 4h6v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M10 14 20 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    code: '<path d="m8 9-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
    orbit: '<ellipse cx="12" cy="12" rx="9.5" ry="4.2" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/>'
  };

  function iconSvg(name, extraClass) {
    const path = ICONS[name] || ICONS.external;
    return `<svg class="${extraClass || ""}" viewBox="0 0 24 24">${path}</svg>`;
  }

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------------------------------------------------------------------
     RENDER: Hero / About
  --------------------------------------------------------------------- */
  function renderPerson() {
    const p = CONTENT.person;

    document.title = `${p.name} — ${p.title}`;
    $("#brandBtn").textContent = p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    $("#personEyebrow").textContent = p.greeting || "Hello, I'm";

    // big two-line name treatment (last word gets its own line)
    const nameParts = p.name.trim().split(" ");
    const nameHtml = nameParts.length > 1
      ? `${nameParts.slice(0, -1).join(" ")}<br>${nameParts[nameParts.length - 1]}`
      : nameParts[0];
    $("#personName").innerHTML = nameHtml;

    $("#personRole").textContent = p.roleLine || p.title;
    $("#aboutText").textContent = p.bio;

    const avatarImg = $("#avatarImg");
    avatarImg.src = p.avatar;
    avatarImg.alt = p.name;
    avatarImg.onerror = () => { avatarImg.src = "profile.svg"; };

    $("#resumeBtn").href = p.resumeUrl || "#";
    $("#availabilityText").textContent = p.availability || p.location || "";

    // focus areas — interactive underline list (mirrors the About reference layout)
    const focusWrap = $("#focusList");
    focusWrap.innerHTML = "";
    (p.focusAreas || []).forEach((area) => {
      const row = document.createElement("div");
      row.className = "focus-item";
      row.innerHTML = `<span>${area}</span>${iconSvg("external")}`;
      focusWrap.appendChild(row);
    });

    // hero socials
    renderSocials($("#heroSocials"), p.socials, "icon-btn");
  }

  function renderSocials(container, socials, btnClass) {
    if (!container) return;
    container.innerHTML = "";
    (socials || []).forEach((s) => {
      const a = document.createElement("a");
      a.className = btnClass;
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", s.name);
      a.innerHTML = iconSvg(s.icon);
      container.appendChild(a);
    });
  }

  /* ---------------------------------------------------------------------
     RENDER: Experience timeline
  --------------------------------------------------------------------- */
  function renderExperience() {
    const wrap = $("#timeline");
    wrap.innerHTML = "";
    CONTENT.experience.forEach((job) => {
      const item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML = `
        <div class="timeline-head">
          <span class="timeline-role">${job.role}</span>
          <span class="timeline-period">${job.period}</span>
        </div>
        <div class="timeline-company">${job.company}</div>
        <p class="timeline-desc">${job.description}</p>
        <div class="tag-row">${(job.tags || []).map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      `;
      wrap.appendChild(item);
    });
  }

  /* ---------------------------------------------------------------------
     RENDER: Project tiles (shared between Home preview + Portfolio grid)
  --------------------------------------------------------------------- */
  function projectTile(project) {
    const tile = document.createElement("button");
    tile.className = "project-tile";
    tile.setAttribute("data-project-id", project.id);
    tile.setAttribute("aria-label", `Open project: ${project.title}`);
    tile.innerHTML = `
      <img src="${project.cover}" alt="" loading="lazy" onerror="this.src='project1.svg'">
      ${project.model ? `<span class="tile-badge">${iconSvg("orbit")}<span>360°</span></span>` : ""}
      <div class="project-tile-label">
        <span class="project-tile-cat">${project.category}</span>
        <span class="project-tile-title">${project.title}</span>
      </div>
    `;
    tile.addEventListener("click", () => openProject(project.id));
    return tile;
  }

  function renderProjects() {
    const previewGrid = $("#projectsPreviewGrid");
    const fullGrid = $("#projectsFullGrid");
    previewGrid.innerHTML = "";
    fullGrid.innerHTML = "";

    const preview = CONTENT.projects.slice(0, 4);
    preview.forEach((p) => previewGrid.appendChild(projectTile(p)));
    CONTENT.projects.forEach((p) => fullGrid.appendChild(projectTile(p)));
  }

  /* ---------------------------------------------------------------------
     RENDER: Contact overlay
  --------------------------------------------------------------------- */
  function renderContact() {
    const c = CONTENT.contact;
    const p = CONTENT.person;
    $("#contactSheetTitle").textContent = c.heading;
    $("#contactMessage").textContent = c.message;

    const list = $("#contactList");
    list.innerHTML = "";
    const rows = [
      { icon: "mail", label: "Email", value: p.email, href: `mailto:${p.email}` },
      { icon: "phone", label: "Phone", value: p.phone, href: `tel:${p.phone.replace(/[^\d+]/g, "")}` },
      { icon: "pin", label: "Location", value: p.location, href: null }
    ].filter((r) => r.value);

    rows.forEach((r) => {
      const el = document.createElement(r.href ? "a" : "div");
      el.className = "contact-row";
      if (r.href) el.href = r.href;
      el.innerHTML = `
        <span class="contact-row-icon">${iconSvg(r.icon)}</span>
        <span class="contact-row-text">
          <span class="contact-row-label">${r.label}</span>
          <span class="contact-row-value">${r.value}</span>
        </span>
      `;
      list.appendChild(el);
    });

    renderSocials($("#contactSocials"), p.socials, "icon-btn");
  }

  /* ---------------------------------------------------------------------
     PROJECT DETAIL OVERLAY
  --------------------------------------------------------------------- */
  function openProject(id) {
    const project = CONTENT.projects.find((p) => p.id === id);
    if (!project) return;

    $("#projectSheetCategory").textContent = project.category;
    $("#projectSheetTitle").textContent = project.title;
    $("#projectSheetDesc").textContent = project.description;

    $("#projectSheetTags").innerHTML = (project.tags || [])
      .map((t) => `<span class="tag">${t}</span>`).join("");

    const linksWrap = $("#projectSheetLinks");
    linksWrap.innerHTML = "";
    if (project.links && project.links.live) {
      linksWrap.innerHTML += `<a class="btn btn-primary" href="${project.links.live}" target="_blank" rel="noopener">${iconSvg("external")}Live site</a>`;
    }
    if (project.links && project.links.code) {
      linksWrap.innerHTML += `<a class="btn btn-ghost" href="${project.links.code}" target="_blank" rel="noopener">${iconSvg("code")}View code</a>`;
    }

    const galleryWrap = $("#projectSheetGallery");
    galleryWrap.innerHTML = "";
    (project.gallery || []).forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${project.title} screenshot`;
      img.loading = "lazy";
      galleryWrap.appendChild(img);
    });

    setUpModelViewer(project);

    $("#projectSheet").scrollTop = 0;
    openSheet("project");
  }

  /* ---------------------------------------------------------------------
     3D MODEL VIEWER — loads project.model (an .stl path) into the canvas
     container, with a graceful fallback to the cover image when there's
     no model, the file fails to load, or the browser lacks WebGL.
  --------------------------------------------------------------------- */
  let currentReset = null;

  function setUpModelViewer(project) {
    const canvasWrap = $("#viewerCanvas");
    const fallbackImg = $("#projectSheetCover");
    const loadingEl = $("#viewerLoading");
    const hintEl = $("#viewerHint");
    const resetBtn = $("#viewerReset");

    fallbackImg.hidden = true;
    canvasWrap.hidden = false;
    hintEl.hidden = true;
    resetBtn.hidden = true;
    currentReset = null;

    function useFallback() {
      if (window.ModelViewer) window.ModelViewer.dispose();
      canvasWrap.hidden = true;
      loadingEl.hidden = true;
      hintEl.hidden = true;
      resetBtn.hidden = true;
      fallbackImg.src = project.cover;
      fallbackImg.alt = project.title;
      fallbackImg.onerror = () => { fallbackImg.src = "project1.svg"; };
      fallbackImg.hidden = false;
    }

    const supportsWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
      } catch (e) { return false; }
    })();

    if (!project.model || !supportsWebGL || !window.ModelViewer) {
      useFallback();
      return;
    }

    loadingEl.hidden = false;

    const controls = window.ModelViewer.load(canvasWrap, project.model, {
      color: project.modelColor || 0xc9a76b,
      onLoad: () => {
        loadingEl.hidden = true;
        hintEl.hidden = false;
        resetBtn.hidden = false;
      },
      onError: () => { useFallback(); }
    });
    currentReset = controls ? controls.resetView : null;
  }

  $("#viewerReset") && $("#viewerReset").addEventListener("click", () => {
    if (currentReset) currentReset();
  });

  /* ---------------------------------------------------------------------
     SHEET (overlay) open/close — shared for project + contact
  --------------------------------------------------------------------- */
  function openSheet(name) {
    const sheet = $(`#${name}Sheet`);
    const backdrop = $(`#${name}Backdrop`);
    sheet.hidden = false;
    backdrop.hidden = false;
    // force reflow so the transition runs
    void sheet.offsetHeight;
    sheet.classList.add("active");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSheet(name) {
    const sheet = $(`#${name}Sheet`);
    const backdrop = $(`#${name}Backdrop`);
    sheet.classList.remove("active");
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
    if (name === "project" && window.ModelViewer) window.ModelViewer.dispose();
    setTimeout(() => {
      sheet.hidden = true;
      backdrop.hidden = true;
    }, 460);
  }

  /* ---------------------------------------------------------------------
     SCREEN NAVIGATION (Home / Portfolio)
  --------------------------------------------------------------------- */
  function goToScreen(name) {
    $$(".screen").forEach((s) => s.classList.toggle("active", s.dataset.screen === name));
    $$(".topnav-link[data-nav]").forEach((b) => b.classList.toggle("active", b.dataset.nav === name));
    const activeScroll = $(`#screen-${name} .screen-scroll`);
    if (activeScroll) activeScroll.scrollTop = 0;
  }

  /* ---------------------------------------------------------------------
     EVENT WIRING
  --------------------------------------------------------------------- */
  function wireEvents() {
    // nav buttons (dock + "see all" link)
    $$("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => goToScreen(btn.dataset.nav));
    });

    // open overlay buttons (contact)
    $$("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => openSheet(btn.dataset.open));
    });

    // close overlay buttons
    $$("[data-close]").forEach((btn) => {
      btn.addEventListener("click", () => closeSheet(btn.dataset.close));
    });

    // click backdrop to close
    $("#projectBackdrop").addEventListener("click", () => closeSheet("project"));
    $("#contactBackdrop").addEventListener("click", () => closeSheet("contact"));

    // escape key closes any open sheet
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if ($("#projectSheet").classList.contains("active")) closeSheet("project");
      if ($("#contactSheet").classList.contains("active")) closeSheet("contact");
    });
  }

  /* ---------------------------------------------------------------------
     INIT
  --------------------------------------------------------------------- */
  function init() {
    renderPerson();
    renderExperience();
    renderProjects();
    renderContact();
    wireEvents();
    goToScreen("home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
