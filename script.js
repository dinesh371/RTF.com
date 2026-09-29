// ===== REGISTRATION MODAL =====
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
// Footer links call these; they were missing, which caused a JS error on click.
// Replace the placeholder text with your real Privacy Policy / Terms content.
var LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    body: "<p>Privacy Policy content will be updated soon. For queries, contact info@rajasthantravelfair.com.</p>"
  },
  terms: {
    title: "Terms & Conditions",
    body: "<p>Terms &amp; Conditions content will be updated soon. For queries, contact info@rajasthantravelfair.com.</p>"
  }
};

function showLegalModal(type, e) {
  if (e) e.preventDefault();
  var modal = document.getElementById("legalModal");
  var title = document.getElementById("legalModalTitle");
  var body  = document.getElementById("legalModalBody");
  var data  = LEGAL_CONTENT[type];
  if (!modal || !data) return;
  if (title) title.textContent = data.title;
  if (body)  body.innerHTML = data.body;
  modal.style.display = "flex";
}

function closeLegalModal() {
  var modal = document.getElementById("legalModal");
  if (modal) modal.style.display = "none";
}


// ======================================================
// MAIN SCRIPT
// ======================================================
document.addEventListener("DOMContentLoaded", function () {

  // ====================================================
  // FEEDBACK LOOP — works independently for March + August
  // ====================================================
  document.querySelectorAll(".feedback-track").forEach(function (track) {
    track.querySelectorAll(".feedback-clone").forEach(function (clone) {
      clone.remove();
    });

    var cards = Array.from(track.querySelectorAll(".feedback-card-item"));
    cards.forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.classList.add("feedback-clone");
      track.appendChild(clone);
    });

    track.style.animation = "none";
    void track.offsetHeight;
    track.style.animation = "scrollFeedback 180s linear infinite";
  });


  // ====================================================
  // PAGE ORDER
  // ====================================================
  var sectionOrder = [
    "home",
    "about",
    "attractions",
    "rtffam",
    "rtffamaugust",
    "rtfglobal"
  ];

  var sections = sectionOrder
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  // SAFETY FIX: if any section is accidentally nested inside another
  // (e.g. August inside March because of a missing </section>),
  // move every section back to #page-container as a direct child.
  // Otherwise hiding March also hides August -> black page.
  var pageContainer = document.getElementById("page-container");
  if (pageContainer) {
    sections.forEach(function (section) {
      pageContainer.appendChild(section);
    });
  }

  var menuToggle     = document.getElementById("menu-toggle");
  var mobileMenu     = document.getElementById("mobile-menu");
  var prevSectionBtn = document.getElementById("prev-page-button");
  var nextSectionBtn = document.getElementById("next-page-button");

  var currentIndex = 0;


  // ====================================================
  // SHOW SELECTED PAGE
  // ====================================================
  function showPage(index, updateUrl) {
    if (index < 0 || index >= sections.length) return;
    if (updateUrl === undefined) updateUrl = true;

    // Hide every page
    sections.forEach(function (section) {
      section.classList.remove("active");
      section.style.display = "none";
      section.style.opacity = "0";
      section.style.visibility = "hidden";

      section.querySelectorAll("video").forEach(function (video) {
        try { video.pause(); } catch (err) {}
      });
    });

    // Show selected page
    currentIndex = index;
    var activeSection = sections[currentIndex];

    activeSection.style.display = "flex";
    activeSection.style.opacity = "1";
    activeSection.style.visibility = "visible";
    activeSection.classList.add("active");

    // Restart autoplay background videos
    activeSection
      .querySelectorAll("video[autoplay], video.bg-video, video.about-bg-video")
      .forEach(function (video) {
        video.muted = true;
        video.play().catch(function () {});
      });

    if (updateUrl) {
      history.pushState(null, "", "#" + activeSection.id);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    updateSectionArrows();
    updateActiveNav();
  }


  // ====================================================
  // PREVIOUS / NEXT ARROWS
  // ====================================================
  function updateSectionArrows() {
    if (prevSectionBtn) {
      prevSectionBtn.classList.toggle("hidden", currentIndex === 0);
    }
    if (nextSectionBtn) {
      nextSectionBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
    }
  }


  // ====================================================
  // ACTIVE NAVIGATION HIGHLIGHT
  // ====================================================
  function updateActiveNav() {
    var activeId = sections[currentIndex] ? sections[currentIndex].id : "";

    document.querySelectorAll(".nav-link").forEach(function (link) {
      link.classList.remove("text-yellow-300");
      if (link.getAttribute("data-target") === activeId) {
        link.classList.add("text-yellow-300");
      }
    });
  }


  // ====================================================
  // MENU / LINK CLICK
  // ====================================================
  document.addEventListener("click", function (event) {
    var link = event.target.closest(".nav-link");
    if (!link) return;

    var targetId = link.getAttribute("data-target");
    if (!targetId) return;

    var index = sections.findIndex(function (section) {
      return section.id === targetId;
    });
    if (index === -1) return;

    event.preventDefault();
    showPage(index);

    if (mobileMenu) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    }
  });


  // ====================================================
  // PREVIOUS / NEXT CLICK
  // ====================================================
  if (prevSectionBtn) {
    prevSectionBtn.addEventListener("click", function () {
      if (currentIndex > 0) showPage(currentIndex - 1);
    });
  }

  if (nextSectionBtn) {
    nextSectionBtn.addEventListener("click", function () {
      if (currentIndex < sections.length - 1) showPage(currentIndex + 1);
    });
  }


  // ====================================================
  // MOBILE MENU
  // ====================================================
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }


  // ====================================================
  // PARTICIPANT SEARCH — works for March + August
  // ====================================================
  document.querySelectorAll(".participants-search").forEach(function (searchBox) {
    searchBox.addEventListener("input", function () {
      var searchValue = this.value.toLowerCase().trim();
      var panel = this.closest(".fam-panel");
      if (!panel) return;

      var tbody = panel.querySelector(".participants-table tbody");
      if (!tbody) return;

      tbody.querySelectorAll("tr").forEach(function (row) {
        row.style.display = row.textContent.toLowerCase().includes(searchValue) ? "" : "none";
      });
    });
  });


  // ====================================================
  // CLOSE MODALS ON BACKDROP CLICK / ESCAPE
  // ====================================================
  var regModal   = document.getElementById("modal");
  var legalModal = document.getElementById("legalModal");

  if (regModal) {
    regModal.addEventListener("click", function (e) {
      if (e.target === regModal) regModal.style.display = "none";
    });
  }
  if (legalModal) {
    legalModal.addEventListener("click", function (e) {
      if (e.target === legalModal) closeLegalModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (regModal) regModal.style.display = "none";
    closeLegalModal();
  });


  // ====================================================
  // BROWSER BACK / FORWARD
  // ====================================================
  window.addEventListener("popstate", function () {
    var hash = window.location.hash.replace("#", "");
    var index = sections.findIndex(function (section) {
      return section.id === hash;
    });
    if (index !== -1) showPage(index, false);
  });


  // ====================================================
  // INITIAL URL
  // ====================================================
  var initialHash = window.location.hash.replace("#", "");

  // Support old #partners links
  if (initialHash === "partners") initialHash = "rtffam";

  var initialIndex = sections.findIndex(function (section) {
    return section.id === initialHash;
  });

  showPage(initialIndex !== -1 ? initialIndex : 0, false);
});
