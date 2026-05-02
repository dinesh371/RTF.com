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

// ===== MAIN SCRIPT =====
document.addEventListener("DOMContentLoaded", function () {
  const sectionOrder = ["home", "about", "attractions", "rtffam", "rtfglobal"];
  const sections = sectionOrder.map(id => document.getElementById(id)).filter(Boolean);

  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const prevSectionBtn = document.getElementById("prev-page-button");
  const nextSectionBtn = document.getElementById("next-page-button");

  let currentIndex = 0;

  function showPage(index, updateUrl = true) {
    if (index < 0 || index >= sections.length) return;

    sections.forEach(section => {
      section.classList.remove("active");
      section.style.display = "none";
      section.style.opacity = "0";
      section.style.visibility = "hidden";

      section.querySelectorAll("video").forEach(video => {
        try { video.pause(); } catch (e) {}
      });
    });

    currentIndex = index;
    const activeSection = sections[currentIndex];

    activeSection.style.display = "flex";
    activeSection.style.opacity = "1";
    activeSection.style.visibility = "visible";
    activeSection.classList.add("active");

    activeSection.querySelectorAll("video[autoplay], video.bg-video").forEach(video => {
      video.muted = true;
      video.play().catch(() => {});
    });

    if (updateUrl) {
      history.pushState(null, "", "#" + activeSection.id);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    updateSectionArrows();
    updateActiveNav();
  }

  function updateSectionArrows() {
    if (prevSectionBtn) prevSectionBtn.classList.toggle("hidden", currentIndex === 0);
    if (nextSectionBtn) nextSectionBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
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

  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("data-target");
      const index = sections.findIndex(section => section.id === targetId);

      if (index !== -1) showPage(index);

      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      }
    });
  });

  if (prevSectionBtn) {
    prevSectionBtn.addEventListener("click", () => showPage(currentIndex - 1));
  }

  if (nextSectionBtn) {
    nextSectionBtn.addEventListener("click", () => showPage(currentIndex + 1));
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // Participant search
  const participantSearch = document.getElementById("participantSearch");

  if (participantSearch) {
    participantSearch.addEventListener("keyup", function () {
      const searchValue = this.value.toLowerCase();

      document.querySelectorAll("#participantsTbody tr").forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(searchValue) ? "" : "none";
      });
    });
  }

  // Back / forward browser navigation
  window.addEventListener("popstate", function () {
    const hash = window.location.hash.replace("#", "");
    const index = sections.findIndex(section => section.id === hash);

    if (index !== -1) showPage(index, false);
  });

  const initialHash = window.location.hash.replace("#", "");
  const initialIndex = sections.findIndex(section => section.id === initialHash);

  showPage(initialIndex !== -1 ? initialIndex : 0, initialIndex === -1);

  initPdfFlipbook();
});


// ===== PDF FLIPBOOK =====
function initPdfFlipbook() {
  const pdfUrl = "/Documents/RTF_Global_Fam_Itinerary.pdf";

  const canvasWrap = document.getElementById("flipbookCanvasWrap");
  const canvas = document.getElementById("flipbookCanvas");
  const loadState = document.getElementById("pdfLoadState");
  const prevPdfBtn = document.getElementById("pdfPrevBtn");
  const nextPdfBtn = document.getElementById("pdfNextBtn");
  const pageCount = document.getElementById("pdfPageCount");
  const thumbStrip = document.getElementById("pdfThumbStrip");

  if (!canvas || !canvasWrap) return;

  let pdfDoc = null;
  let currentPage = 1;
  let rendering = false;
  let pendingPage = null;

  loadPdfJs()
    .then(() => {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      return pdfjsLib.getDocument(pdfUrl).promise;
    })
    .then(doc => {
      pdfDoc = doc;

      if (loadState) loadState.style.display = "none";

      renderPage(1);
      buildThumbs();
    })
    .catch(error => {
      console.warn("PDF flipbook load error:", error);
      showErrorState();
    });

  function loadPdfJs() {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function renderPage(pageNumber) {
    if (!pdfDoc) return;

    if (rendering) {
      pendingPage = pageNumber;
      return;
    }

    rendering = true;
    currentPage = pageNumber;

    updatePdfControls();

    pdfDoc.getPage(pageNumber).then(page => {
      const containerWidth = canvasWrap.clientWidth || 760;
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.max((containerWidth - 24) / viewport.width, 0.5);
      const scaledViewport = page.getViewport({ scale });

      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(scaledViewport.width * pixelRatio);
      canvas.height = Math.floor(scaledViewport.height * pixelRatio);

      canvas.style.width = `${Math.floor(scaledViewport.width)}px`;
      canvas.style.height = `${Math.floor(scaledViewport.height)}px`;

      const context = canvas.getContext("2d");
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      return page.render({
        canvasContext: context,
        viewport: scaledViewport
      }).promise;
    }).then(() => {
      rendering = false;

      if (pendingPage !== null) {
        const nextPage = pendingPage;
        pendingPage = null;
        renderPage(nextPage);
      }
    }).catch(error => {
      rendering = false;
      console.warn("PDF render error:", error);
      showErrorState();
    });
  }

  function updatePdfControls() {
    if (!pdfDoc) return;

    if (pageCount) {
      pageCount.textContent = `Page ${currentPage} / ${pdfDoc.numPages}`;
    }

    if (prevPdfBtn) prevPdfBtn.disabled = currentPage <= 1;
    if (nextPdfBtn) nextPdfBtn.disabled = currentPage >= pdfDoc.numPages;

    document.querySelectorAll(".thumb-item").forEach(item => {
      item.classList.toggle("active-thumb", Number(item.dataset.page) === currentPage);
    });
  }

  function goToPreviousPdfPage() {
    if (!pdfDoc || currentPage <= 1) return;
    renderPage(currentPage - 1);
    scrollActiveThumb();
  }

  function goToNextPdfPage() {
    if (!pdfDoc || currentPage >= pdfDoc.numPages) return;
    renderPage(currentPage + 1);
    scrollActiveThumb();
  }

  if (prevPdfBtn) prevPdfBtn.addEventListener("click", goToPreviousPdfPage);
  if (nextPdfBtn) nextPdfBtn.addEventListener("click", goToNextPdfPage);

  document.addEventListener("keydown", function (event) {
    const rtfGlobalSection = document.getElementById("rtfglobal");

    if (!rtfGlobalSection || !rtfGlobalSection.classList.contains("active")) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPreviousPdfPage();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNextPdfPage();
    }
  });

  function buildThumbs() {
    if (!thumbStrip || !pdfDoc) return;

    thumbStrip.innerHTML = "";

    for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
      const thumbItem = document.createElement("button");
      thumbItem.type = "button";
      thumbItem.className = "thumb-item";
      thumbItem.dataset.page = pageNumber;
      thumbItem.setAttribute("aria-label", `Open page ${pageNumber}`);

      const thumbCanvas = document.createElement("canvas");
      thumbItem.appendChild(thumbCanvas);
      thumbStrip.appendChild(thumbItem);

      thumbItem.addEventListener("click", function () {
        renderPage(Number(this.dataset.page));
        scrollActiveThumb();
      });

      renderThumb(pageNumber, thumbCanvas);
    }

    updatePdfControls();
  }

  function renderThumb(pageNumber, thumbCanvas) {
    pdfDoc.getPage(pageNumber).then(page => {
      const viewport = page.getViewport({ scale: 0.18 });

      thumbCanvas.width = viewport.width;
      thumbCanvas.height = viewport.height;

      page.render({
        canvasContext: thumbCanvas.getContext("2d"),
        viewport
      });
    }).catch(error => {
      console.warn(`Thumbnail render error on page ${pageNumber}:`, error);
    });
  }

  function scrollActiveThumb() {
    setTimeout(() => {
      const activeThumb = document.querySelector(".thumb-item.active-thumb");

      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }
    }, 80);
  }

  function showErrorState() {
    if (loadState) {
      loadState.style.display = "flex";
      loadState.innerHTML = `
        <p style="color:#ef4444;font-weight:700;margin:0;">
          PDF failed to load.
        </p>
        <a href="${pdfUrl}" target="_blank" style="color:#facc15;text-decoration:underline;margin-top:8px;">
          Open PDF directly
        </a>
      `;
    }

    if (pageCount) pageCount.textContent = "PDF not loaded";
    if (prevPdfBtn) prevPdfBtn.disabled = true;
    if (nextPdfBtn) nextPdfBtn.disabled = true;
  }

  window.addEventListener("resize", function () {
    if (pdfDoc) renderPage(currentPage);
  });
}
