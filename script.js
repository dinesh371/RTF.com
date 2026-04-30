// Toggle Modal and Close Mobile Menu
function toggleModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.toggle("hidden");

  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu?.classList.contains("flex")) {
    mobileMenu.classList.remove("flex");
    mobileMenu.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const pageSections = Array.from(document.querySelectorAll(".page-section"));
  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const prevPageButton = document.getElementById("prev-page-button");
  const nextPageButton = document.getElementById("next-page-button");

  let currentPageIndex = 0;

  // Show Selected Page
  function showPage(index) {
    if (index < 0 || index >= pageSections.length) return;

    pageSections.forEach((section) => {
      section.classList.remove("active");
      section.style.display = "none";
      section.style.opacity = "0";
      section.style.visibility = "hidden";
    });

    currentPageIndex = index;
    const activePage = pageSections[currentPageIndex];

    activePage.style.display = "block";
    activePage.style.visibility = "visible";
    activePage.style.opacity = "1";
    activePage.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    updateNavButtons();
    updateActiveNavLink();
  }

  // Update Arrow Buttons
  function updateNavButtons() {
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

  // Active Navbar Link
  function updateActiveNavLink() {
    navLinks.forEach((link) => {
      link.classList.remove("text-yellow-300");

      const target = link.getAttribute("data-target");
      const activeSectionId = pageSections[currentPageIndex]?.id;

      if (target === activeSectionId) {
        link.classList.add("text-yellow-300");
      }
    });
  }

  // Navbar Click
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("data-target");
      const index = pageSections.findIndex((section) => section.id === targetId);

      if (index !== -1) {
        showPage(index);
      }

      if (mobileMenu?.classList.contains("flex")) {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // Arrow Navigation
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

  // Mobile Menu Toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // Partners Search
  const partnerSearch = document.getElementById("partnerSearch");

  if (partnerSearch) {
    partnerSearch.addEventListener("keyup", function () {
      const value = this.value.toLowerCase();
      const rows = document.querySelectorAll("#partnersTable tbody tr");

      rows.forEach((row) => {
        row.style.display = row.innerText.toLowerCase().includes(value)
          ? ""
          : "none";
      });
    });
  }

  // Image Slider
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

  setInterval(() => {
    window.changeSlide(1);
  }, 5000);

  // Initial Load
  showPage(0);
});
