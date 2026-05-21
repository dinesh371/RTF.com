// ===== MODAL =====
function toggleModal() {
  var modal = document.getElementById("modal");
  if (!modal) return;

  var isHidden = modal.style.display === "none" || modal.style.display === "";
  modal.style.display = isHidden ? "flex" : "none";

  var mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  }
}

// ===== LEGAL MODAL =====
function showLegalModal(type, e) {
  if (e) e.preventDefault();

  var modal = document.getElementById("legalModal");
  var title = document.getElementById("legalModalTitle");
  var body = document.getElementById("legalModalBody");

  if (!modal || !title || !body || typeof legalContent === "undefined" || !legalContent[type]) return;

  title.textContent = legalContent[type].title;
  body.innerHTML = legalContent[type].body;
  modal.style.display = "flex";
}

function closeLegalModal() {
  var modal = document.getElementById("legalModal");
  if (modal) modal.style.display = "none";
}

document.addEventListener("click", function (e) {
  var legalModal = document.getElementById("legalModal");
  if (legalModal && e.target === legalModal) closeLegalModal();
});

// ===== RTF GLOBAL FAM LIGHTBOX =====
let rfgZoomLevel = 1;
let rfgIsDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

function rfgOpenLightbox(src) {
  const lb = document.getElementById("rfgLightbox");
  const img = document.getElementById("rfgLightboxImg");
  if (!lb || !img) return;

  rfgZoomLevel = 1;
  translateX = 0;
  translateY = 0;

  img.src = src;
  img.classList.remove("zoomed");
  img.style.transform = "translate(0px,0px) scale(1)";
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function rfgCloseLightbox() {
  const lb = document.getElementById("rfgLightbox");
  const img = document.getElementById("rfgLightboxImg");

  if (lb) lb.classList.remove("open");

  if (img) {
    img.src = "";
    img.classList.remove("zoomed");
    img.style.transform = "translate(0px,0px) scale(1)";
  }

  rfgZoomLevel = 1;
  translateX = 0;
  translateY = 0;
  document.body.style.overflow = "";
}

// ===== LIGHTBOX CLICK ZOOM =====
document.addEventListener("click", function (e) {
  const lb = document.getElementById("rfgLightbox");
  const img = document.getElementById("rfgLightboxImg");

  if (!lb || !img) return;
  if (!lb.classList.contains("open")) return;

  if (e.target === img) {
    e.stopPropagation();

    if (rfgZoomLevel === 1) {
      rfgZoomLevel = 2.5;
      img.classList.add("zoomed");
    } else {
      rfgZoomLevel = 1;
      translateX = 0;
      translateY = 0;
      img.classList.remove("zoomed");
    }

    img.style.transform =
      "translate(" + translateX + "px, " + translateY + "px) scale(" + rfgZoomLevel + ")";
  }

  if (e.target === lb) rfgCloseLightbox();
});

// ===== DRAG SUPPORT =====
document.addEventListener("mousedown", function (e) {
  const img = document.getElementById("rfgLightboxImg");
  if (!img || e.target !== img || rfgZoomLevel <= 1) return;

  rfgIsDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  img.style.cursor = "grabbing";
});

document.addEventListener("mousemove", function (e) {
  const img = document.getElementById("rfgLightboxImg");
  if (!img || !rfgIsDragging) return;

  translateX = e.clientX - startX;
  translateY = e.clientY - startY;

  img.style.transform =
    "translate(" + translateX + "px, " + translateY + "px) scale(" + rfgZoomLevel + ")";
});

document.addEventListener("mouseup", function () {
  const img = document.getElementById("rfgLightboxImg");
  rfgIsDragging = false;

  if (img && rfgZoomLevel > 1) img.style.cursor = "grab";
});

// ===== MOBILE TOUCH SUPPORT =====
document.addEventListener("touchstart", function (e) {
  const img = document.getElementById("rfgLightboxImg");
  if (!img || e.target !== img || rfgZoomLevel <= 1) return;

  const touch = e.touches[0];
  rfgIsDragging = true;
  startX = touch.clientX - translateX;
  startY = touch.clientY - translateY;
}, { passive: false });

document.addEventListener("touchmove", function (e) {
  const img = document.getElementById("rfgLightboxImg");
  if (!img || !rfgIsDragging) return;

  const touch = e.touches[0];
  translateX = touch.clientX - startX;
  translateY = touch.clientY - startY;

  img.style.transform =
    "translate(" + translateX + "px, " + translateY + "px) scale(" + rfgZoomLevel + ")";

  e.preventDefault();
}, { passive: false });

document.addEventListener("touchend", function () {
  rfgIsDragging = false;
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") rfgCloseLightbox();
});

// ===== MAIN SCRIPT =====
document.addEventListener("DOMContentLoaded", function () {
  var sectionOrder = ["home", "about", "attractions", "rtffam", "rtfglobal"];

  var sections = sectionOrder
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var prevSectionBtn = document.getElementById("prev-page-button");
  var nextSectionBtn = document.getElementById("next-page-button");

  var currentIndex = 0;

  function showPage(index, updateUrl) {
    if (index < 0 || index >= sections.length) return;

    if (updateUrl === undefined) updateUrl = true;

    sections.forEach(function (section) {
      section.classList.remove("active");
      section.style.display = "none";
      section.style.opacity = "0";
      section.style.visibility = "hidden";

      section.querySelectorAll("video").forEach(function (v) {
        try {
          v.pause();
        } catch (err) {}
      });
    });

    currentIndex = index;

    var active = sections[currentIndex];

    active.style.display = "flex";
    active.style.opacity = "1";
    active.style.visibility = "visible";
    active.classList.add("active");

    active.querySelectorAll("video[autoplay], video.bg-video, video.about-bg-video")
      .forEach(function (v) {
        v.muted = true;
        v.play().catch(function () {});
      });

    if (updateUrl) {
      history.pushState(null, "", "#" + active.id);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    updateSectionArrows();
    updateActiveNav();
  }

  function updateSectionArrows() {
    if (prevSectionBtn) {
      prevSectionBtn.classList.toggle("hidden", currentIndex === 0);
    }

    if (nextSectionBtn) {
      nextSectionBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
    }
  }

  function updateActiveNav() {
    var activeId = sections[currentIndex] ? sections[currentIndex].id : "";

    document.querySelectorAll(".nav-link").forEach(function (link) {
      link.classList.remove("text-yellow-300");

      if (link.getAttribute("data-target") === activeId) {
        link.classList.add("text-yellow-300");
      }
    });
  }

  // ===== NAVIGATION CLICK =====
  document.addEventListener("click", function (e) {
    var link = e.target.closest("a.nav-link, button.nav-link, [class*='nav-link']");
    if (!link) return;

    var targetId = link.getAttribute("data-target");
    if (!targetId) return;

    e.preventDefault();

    var index = sections.findIndex(function (s) {
      return s.id === targetId;
    });

    if (index !== -1) showPage(index);

    if (mobileMenu) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    }
  });

  // ===== ARROWS =====
  if (prevSectionBtn) {
    prevSectionBtn.addEventListener("click", function () {
      showPage(currentIndex - 1);
    });
  }

  if (nextSectionBtn) {
    nextSectionBtn.addEventListener("click", function () {
      showPage(currentIndex + 1);
    });
  }

  // ===== MOBILE MENU =====
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // ===== PARTICIPANT SEARCH =====
  var participantSearch = document.getElementById("participantSearch");

  if (participantSearch) {
    participantSearch.addEventListener("keyup", function () {
      var val = this.value.toLowerCase();

      document.querySelectorAll("#participantsTbody tr").forEach(function (row) {
        row.style.display = row.innerText.toLowerCase().includes(val) ? "" : "none";
      });
    });
  }

  // ===== FEEDBACK FINAL FIX =====
  var feedbackTrack = document.getElementById("feedbackTrack");

  if (feedbackTrack) {
    feedbackTrack.style.animation = "none";
    feedbackTrack.style.transform = "none";
    feedbackTrack.style.display = "flex";
    feedbackTrack.style.flexWrap = "nowrap";
    feedbackTrack.style.gap = "22px";
    feedbackTrack.style.width = "max-content";
  }

  var feedbackWrap = document.querySelector(".feedback-track-wrap");

  if (feedbackWrap) {
    feedbackWrap.style.overflowX = "auto";
    feedbackWrap.style.overflowY = "hidden";
    feedbackWrap.style.width = "100%";
    feedbackWrap.style.paddingBottom = "18px";
  }

  document.querySelectorAll(".feedback-card-item").forEach(function (card) {
    card.style.display = "flex";
    card.style.visibility = "visible";
    card.style.opacity = "1";
    card.style.flexShrink = "0";
    card.style.width = "320px";
    card.style.minWidth = "320px";
    card.style.maxWidth = "320px";
  });

  document.querySelectorAll(".feedback-person-img").forEach(function (img) {
    img.setAttribute("loading", "lazy");

    img.onerror = function () {
      this.onerror = null;
      this.src = "images/finallogo1.png";
    };
  });

  // ===== BROWSER BACK =====
  window.addEventListener("popstate", function () {
    var hash = window.location.hash.replace("#", "");

    var index = sections.findIndex(function (s) {
      return s.id === hash;
    });

    if (index !== -1) showPage(index, false);
  });

  // ===== INITIAL LOAD =====
  var initialHash = window.location.hash.replace("#", "");

  var resolvedHash = initialHash === "partners" ? "rtffam" : initialHash;

  var initialIndex = sections.findIndex(function (s) {
    return s.id === resolvedHash;
  });

  showPage(initialIndex !== -1 ? initialIndex : 0, initialIndex === -1);
});
