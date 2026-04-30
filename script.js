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

  const pageSections = sectionOrder
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const prevPageButton = document.getElementById("prev-page-button");
  const nextPageButton = document.getElementById("next-page-button");

  let currentPageIndex = 0;

  function showPage(index) {
    if (index < 0 || index >= pageSections.length) return;

    pageSections.forEach(section => {
      section.classList.remove("active");
      section.style.display = "none";
      section.style.opacity = "0";
      section.style.visibility = "hidden";
    });

    currentPageIndex = index;
    const activePage = pageSections[currentPageIndex];

    activePage.style.display = "flex";
    activePage.style.opacity = "1";
    activePage.style.visibility = "visible";
    activePage.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    updateButtons();
    updateActiveMenu();
  }

  function updateButtons() {
    if (prevPageButton) {
      prevPageButton.classList.toggle("hidden", currentPageIndex === 0);
    }

    if (nextPageButton) {
      nextPageButton.classList.toggle(
        "hidden",
        currentPageIndex === pageSections.length - 1
      );
    }
  }

  function updateActiveMenu() {
    const activeId = pageSections[currentPageIndex]?.id;

    navLinks.forEach(link => {
      link.classList.remove("text-yellow-300");

      if (link.getAttribute("data-target") === activeId) {
        link.classList.add("text-yellow-300");
      }
    });
  }

  // ===== NAV MENU CLICK =====
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("data-target");
      const index = pageSections.findIndex(section => section.id === targetId);

      if (index !== -1) {
        showPage(index);
      }

      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      }
    });
  });

  // ===== ARROW BUTTONS =====
  if (prevPageButton) {
    prevPageButton.addEventListener("click", function () {
      showPage(currentPageIndex - 1);
    });
  }

  if (nextPageButton) {
    nextPageButton.addEventListener("click", function () {
      showPage(currentPageIndex + 1);
    });
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
        row.style.display = row.innerText.toLowerCase().includes(value)
          ? ""
          : "none";
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

  const slideImageElement = document.getElementById("slideImage");

  window.changeSlide = function (n) {
    if (!slideImageElement) return;

    slideIndex = (slideIndex + n + slideImages.length) % slideImages.length;
    slideImageElement.style.opacity = "0";

    setTimeout(() => {
      slideImageElement.src = slideImages[slideIndex];
      slideImageElement.loading = "lazy";
      slideImageElement.style.opacity = "1";
    }, 300);
  };

  if (slideImageElement) {
    setInterval(() => {
      window.changeSlide(1);
    }, 5000);
  }

  // Initial page
  showPage(0);
});
