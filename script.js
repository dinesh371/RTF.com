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

  const sectionOrder = [
    "home",
    "about",
    "attractions",
    "partners",
    "rtffam",
    "rtfglobal"
  ];

  const sections = sectionOrder
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const prevBtn = document.getElementById("prev-page-button");
  const nextBtn = document.getElementById("next-page-button");

  let currentIndex = 0;

  // ===== SHOW PAGE =====
  function showPage(index, updateURL = true) {
    if (index < 0 || index >= sections.length) return;

    sections.forEach(sec => {
      sec.classList.remove("active");
      sec.style.display = "none";
      sec.style.opacity = "0";
      sec.style.visibility = "hidden";
    });

    currentIndex = index;
    const active = sections[currentIndex];

    active.style.display = "flex";
    active.style.opacity = "1";
    active.style.visibility = "visible";
    active.classList.add("active");

    // ✅ UPDATE URL (IMPORTANT FIX)
    if (updateURL) {
      history.pushState(null, "", "#" + active.id);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    updateArrows();
    updateActiveMenu();
  }

  // ===== ARROWS =====
  function updateArrows() {
    if (prevBtn) prevBtn.classList.toggle("hidden", currentIndex === 0);
    if (nextBtn) nextBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
  }

  // ===== ACTIVE MENU =====
  function updateActiveMenu() {
    const activeId = sections[currentIndex]?.id;

    navLinks.forEach(link => {
      link.classList.remove("text-yellow-300");

      if (link.getAttribute("data-target") === activeId) {
        link.classList.add("text-yellow-300");
      }
    });
  }

  // ===== NAV CLICK =====
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("data-target");
      const index = sections.findIndex(sec => sec.id === targetId);

      if (index !== -1) showPage(index);

      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      }
    });
  });

  // ===== ARROW CLICK =====
  if (prevBtn) {
    prevBtn.addEventListener("click", () => showPage(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => showPage(currentIndex + 1));
  }

  // ===== MOBILE MENU =====
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // ===== PARTNER SEARCH =====
  const partnerSearch = document.getElementById("partnerSearch");
  if (partnerSearch) {
    partnerSearch.addEventListener("keyup", function () {
      const value = this.value.toLowerCase();
      const rows = document.querySelectorAll("#partnersTable tbody tr");

      rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
      });
    });
  }

  // ===== IMAGE SLIDER =====
  let slideIndex = 0;
  const slideImages = [
    "images/Venue Photos/19.jpeg",
    "images/Venue Photos/20.jpeg",
    "images/Venue Photos/21.jpeg",
    "images/Venue Photos/22.jpeg",
    "images/Venue Photos/23.jpeg"
  ];

  const slideImage = document.getElementById("slideImage");

  window.changeSlide = function (n) {
    if (!slideImage) return;

    slideIndex = (slideIndex + n + slideImages.length) % slideImages.length;

    slideImage.style.opacity = "0";

    setTimeout(() => {
      slideImage.src = slideImages[slideIndex];
      slideImage.style.opacity = "1";
    }, 300);
  };

  if (slideImage) {
    setInterval(() => changeSlide(1), 5000);
  }

  // ===== HANDLE BACK BUTTON (IMPORTANT FIX) =====
  window.addEventListener("popstate", function () {
    const hash = window.location.hash.replace("#", "");
    const index = sections.findIndex(sec => sec.id === hash);

    if (index !== -1) {
      showPage(index, false);
    }
  });

  // ===== LOAD FROM URL =====
  const initialHash = window.location.hash.replace("#", "");
  const initialIndex = sections.findIndex(sec => sec.id === initialHash);

  showPage(initialIndex !== -1 ? initialIndex : 0, false);

});
