// ===== MODAL =====
function toggleModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  const isHidden = modal.style.display === "none" || modal.style.display === "";
  modal.style.display = isHidden ? "flex" : "none";

  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  }
}

// ===== LEGAL MODAL =====
// (no change — keep your existing legalContent exactly as is)


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
    });

    currentIndex = index;
    const active = sections[currentIndex];

    active.style.display = "flex";
    active.style.opacity = "1";
    active.style.visibility = "visible";
    active.classList.add("active");

    if (updateUrl) history.pushState(null, "", "#" + active.id);
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
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-target");
      const index = sections.findIndex(s => s.id === targetId);
      if (index !== -1) showPage(index);
    });
  });

  if (prevSectionBtn) prevSectionBtn.addEventListener("click", () => showPage(currentIndex - 1));
  if (nextSectionBtn) nextSectionBtn.addEventListener("click", () => showPage(currentIndex + 1));

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // ===== INITIAL PAGE =====
  showPage(0);

  // ===== SLIDESHOW =====
  initGlobalSlideshow();

  // ===== FEEDBACK SCROLL FIX =====
  duplicateScrollTrack("feedbackTrack");

  // ============================================================
  // 🔥 IMAGE AUTO LOAD (FINAL WORKING)
  // ============================================================

  document.querySelectorAll(".feedback-card-item").forEach(card => {

    const nameEl = card.querySelector("h4");
    if (!nameEl || card.querySelector(".profile-img")) return;

    const displayName = nameEl.innerText.trim();

    const cleanName = displayName
      .replace(/Mr\.|Ms\.|Mrs\./gi, "")
      .replace(/[()]/g, "")
      .trim()
      .toLowerCase();

    // Convert to filename
    const fileName = cleanName.replace(/\s+/g, "-");

    const imagePath = "images/RTF_FAM_Images/" + fileName + ".jpg";

    const profileDiv = document.createElement("div");
    profileDiv.className = "profile-img";

    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = displayName;

    img.onerror = function () {
      profileDiv.innerHTML = "";
      const span = document.createElement("span");

      span.innerText = cleanName
        .split(" ")
        .map(w => w[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

      profileDiv.appendChild(span);
    };

    profileDiv.appendChild(img);
    card.insertBefore(profileDiv, nameEl);

  });

});


// ===== DUPLICATE SCROLL TRACK =====
function duplicateScrollTrack(id) {
  const track = document.getElementById(id);
  if (!track) return;
  track.style.animationPlayState = "running";
}

// ===== SLIDESHOW =====
function initGlobalSlideshow() {
  const slides = document.querySelectorAll(".global-slideshow .slide");
  if (!slides.length) return;

  let current = 0;

  function goToSlide(index) {
    slides[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
  }

  setInterval(() => goToSlide(current + 1), 4000);
}
