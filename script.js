// ===== MODAL =====
function toggleModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.toggle("hidden");

  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  }
}

// ===== MAIN SCRIPT — single DOMContentLoaded, no duplicates =====
document.addEventListener("DOMContentLoaded", function () {

  // ── Section order ──────────────────────────────────────────────
  const sectionOrder = ["home", "about", "attractions", "partners", "rtffam", "rtfglobal"];
  const sections = sectionOrder.map(id => document.getElementById(id)).filter(Boolean);

  const navLinks     = document.querySelectorAll(".nav-link");
  const menuToggle   = document.getElementById("menu-toggle");
  const mobileMenu   = document.getElementById("mobile-menu");
  const prevBtn      = document.getElementById("prev-page-button");
  const nextBtn      = document.getElementById("next-page-button");

  let currentIndex = 0;

  // ── showPage ───────────────────────────────────────────────────
  function showPage(index, updateUrl = true) {
    if (index < 0 || index >= sections.length) return;

    // Hide all sections; pause their videos
    sections.forEach(section => {
      section.classList.remove("active");
      section.style.display    = "none";
      section.style.opacity    = "0";
      section.style.visibility = "hidden";

      section.querySelectorAll("video").forEach(v => {
        try { v.pause(); } catch (e) {}
      });
    });

    currentIndex = index;
    const activeSection = sections[currentIndex];

    activeSection.style.display    = "flex";
    activeSection.style.opacity    = "1";
    activeSection.style.visibility = "visible";
    activeSection.classList.add("active");

    // Play background / autoplay videos in the active section
    // (only videos with autoplay attribute or class bg-video)
    activeSection.querySelectorAll("video[autoplay], video.bg-video").forEach(v => {
      v.muted = true;
      v.play().catch(() => {});
    });

    if (updateUrl) {
      history.pushState(null, "", "#" + activeSection.id);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    updateArrows();
    updateActiveNav();
  }

  function updateArrows() {
    if (prevBtn) prevBtn.classList.toggle("hidden", currentIndex === 0);
    if (nextBtn) nextBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
  }

  function updateActiveNav() {
    const activeId = sections[currentIndex]?.id;
    navLinks.forEach(link => {
      link.classList.remove("text-yellow-300");
      if (link.getAttribute("data-target") === activeId) {
        link.classList.add("text-yellow-300");
      }
    });
  }

  // ── Nav link clicks ────────────────────────────────────────────
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-target");
      const index = sections.findIndex(s => s.id === targetId);
      if (index !== -1) showPage(index);
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      }
    });
  });

  // ── Arrow buttons ──────────────────────────────────────────────
  if (prevBtn) prevBtn.addEventListener("click", () => showPage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showPage(currentIndex + 1));

  // ── Mobile menu toggle ─────────────────────────────────────────
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // ── About slide image auto-rotate ─────────────────────────────
  let slideIndex = 0;
  const slideImages = [
    "images/Venue Photos/19.jpeg",
    "images/Venue Photos/20.jpeg",
    "images/Venue Photos/21.jpeg",
    "images/Venue Photos/22.jpeg",
    "images/Venue Photos/23.jpeg"
  ];
  const slideImageEl = document.getElementById("slideImage");

  window.changeSlide = function (dir) {
    if (!slideImageEl) return;
    slideIndex = (slideIndex + dir + slideImages.length) % slideImages.length;
    slideImageEl.style.opacity = "0";
    setTimeout(() => {
      slideImageEl.src = slideImages[slideIndex];
      slideImageEl.style.opacity = "1";
    }, 300);
  };

  if (slideImageEl) setInterval(() => window.changeSlide(1), 5000);

  // ── Participant search (correct ID: participantSearch) ─────────
  const participantSearch = document.getElementById("participantSearch");
  if (participantSearch) {
    participantSearch.addEventListener("keyup", function () {
      const val = this.value.toLowerCase();
      document.querySelectorAll("#participantsTbody tr").forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(val) ? "" : "none";
      });
    });
  }

  // ── Hash / back-button navigation ─────────────────────────────
  window.addEventListener("popstate", function () {
    const hash = window.location.hash.replace("#", "");
    const idx  = sections.findIndex(s => s.id === hash);
    if (idx !== -1) showPage(idx, false);
  });

  // ── Initial page load ──────────────────────────────────────────
  const initialHash  = window.location.hash.replace("#", "");
  const initialIndex = sections.findIndex(s => s.id === initialHash);
  showPage(initialIndex !== -1 ? initialIndex : 0, initialIndex === -1);

  // ── PDF.js Flipbook for #rtfglobal ─────────────────────────────
  initPdfFlipbook();
});

// ===== PDF FLIPBOOK =====
function initPdfFlipbook() {
  const pdfUrl    = "files/RTF_Global_Fam_Itinerary.pdf";
  const canvasWrap = document.getElementById("flipbookCanvasWrap");
  const canvas    = document.getElementById("flipbookCanvas");
  const loadState = document.getElementById("pdfLoadState");
  const prevPdf   = document.getElementById("pdfPrevBtn");
  const nextPdf   = document.getElementById("pdfNextBtn");
  const pageCount = document.getElementById("pdfPageCount");
  const thumbStrip = document.getElementById("pdfThumbStrip");

  if (!canvas || !canvasWrap) return;

  // Dynamically load PDF.js from CDN
  if (typeof pdfjsLib === "undefined") {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = function () {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      loadPdf();
    };
    script.onerror = function () {
      showIframeFallback(pdfUrl);
    };
    document.head.appendChild(script);
  } else {
    loadPdf();
  }

  let pdfDoc     = null;
  let currentPage = 1;
  let rendering  = false;
  const thumbCanvases = {};

  function loadPdf() {
    if (loadState) {
      loadState.style.display = "flex";
    }
    pdfjsLib.getDocument(pdfUrl).promise.then(function (doc) {
      pdfDoc = doc;
      if (loadState) loadState.style.display = "none";
      renderPage(1);
      buildThumbs();
    }).catch(function (err) {
      console.warn("PDF load error:", err);
      showIframeFallback(pdfUrl);
    });
  }

  function renderPage(num) {
    if (!pdfDoc || rendering) return;
    rendering = true;
    currentPage = num;

    if (pageCount) {
      pageCount.textContent = `Page ${num} / ${pdfDoc.numPages}`;
    }
    if (prevPdf) prevPdf.disabled = num <= 1;
    if (nextPdf) nextPdf.disabled = num >= pdfDoc.numPages;

    // Update active thumb
    document.querySelectorAll(".thumb-item").forEach((el, i) => {
      el.classList.toggle("active-thumb", i + 1 === num);
    });

    pdfDoc.getPage(num).then(function (page) {
      const containerWidth = canvasWrap.offsetWidth || 740;
      const viewport = page.getViewport({ scale: 1 });
      const scale    = (containerWidth - 20) / viewport.width;
      const scaledVP = page.getViewport({ scale });

      canvas.width  = scaledVP.width;
      canvas.height = scaledVP.height;

      const ctx = canvas.getContext("2d");
      const renderCtx = { canvasContext: ctx, viewport: scaledVP };

      page.render(renderCtx).promise.then(function () {
        rendering = false;
      });
    });
  }

  function buildThumbs() {
    if (!thumbStrip || !pdfDoc) return;
    thumbStrip.innerHTML = "";

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const thumbItem = document.createElement("div");
      thumbItem.className = "thumb-item" + (i === 1 ? " active-thumb" : "");
      thumbItem.dataset.page = i;

      const thumbCanvas = document.createElement("canvas");
      thumbItem.appendChild(thumbCanvas);
      thumbStrip.appendChild(thumbItem);

      thumbItem.addEventListener("click", function () {
        renderPage(parseInt(this.dataset.page));
        // Scroll thumb into view
        this.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });

      // Render thumb
      pdfDoc.getPage(i).then(function (page) {
        const vp = page.getViewport({ scale: 0.18 });
        thumbCanvas.width  = vp.width;
        thumbCanvas.height = vp.height;
        thumbCanvas.style.width  = "100%";
        thumbCanvas.style.height = "100%";
        page.render({ canvasContext: thumbCanvas.getContext("2d"), viewport: vp });
      });
    }
  }

  function showIframeFallback(url) {
    if (loadState) loadState.style.display = "none";
    if (canvas) canvas.style.display = "none";
    const iframe = document.createElement("iframe");
    iframe.src = url + "#toolbar=1&navpanes=0";
    iframe.className = "pdf-iframe-fallback";
    iframe.title = "RTF Global FAM Itinerary";
    if (canvasWrap) canvasWrap.appendChild(iframe);
    // Hide controls if iframe shown
    const controls = document.getElementById("flipbookControls");
    if (controls) controls.style.display = "none";
    if (thumbStrip) thumbStrip.style.display = "none";
  }

  // Arrow button events
  if (prevPdf) {
    prevPdf.addEventListener("click", function () {
      if (currentPage > 1) {
        renderPage(currentPage - 1);
        scrollActiveThumb();
      }
    });
  }

  if (nextPdf) {
    nextPdf.addEventListener("click", function () {
      if (pdfDoc && currentPage < pdfDoc.numPages) {
        renderPage(currentPage + 1);
        scrollActiveThumb();
      }
    });
  }

  // Keyboard navigation when rtfglobal section is active
  document.addEventListener("keydown", function (e) {
    const rtfSection = document.getElementById("rtfglobal");
    if (!rtfSection || !rtfSection.classList.contains("active")) return;
    if (!pdfDoc) return;

    if (e.key === "ArrowLeft" && currentPage > 1) {
      renderPage(currentPage - 1);
      scrollActiveThumb();
    }
    if (e.key === "ArrowRight" && currentPage < pdfDoc.numPages) {
      renderPage(currentPage + 1);
      scrollActiveThumb();
    }
  });

  function scrollActiveThumb() {
    setTimeout(() => {
      const activeThumb = document.querySelector(".thumb-item.active-thumb");
      if (activeThumb) activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, 50);
  }
}
