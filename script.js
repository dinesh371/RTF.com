/**
 * ============================================================
 * RTF.com - Main Navigation & Interactive Elements Script
 * ============================================================
 * Handles page navigation, modals, search, image sliders, and responsive menus
 */

// ===== MODAL MANAGEMENT =====
/**
 * Toggle modal visibility and close mobile menu if open
 */
function toggleModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.classList.toggle("hidden");
  }

  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  }
}

// ===== MAIN APPLICATION LOGIC =====
document.addEventListener("DOMContentLoaded", function () {
  // Section configuration
  const sectionOrder = ["home", "about", "attractions", "partners", "rtffam", "rtfglobal"];

  // Get all section elements
  const sections = sectionOrder
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // DOM element references
  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const prevBtn = document.getElementById("prev-page-button");
  const nextBtn = document.getElementById("next-page-button");

  let currentIndex = 0;

  /**
   * Display a specific page/section
   * @param {number} index - Section index to display
   * @param {boolean} updateURL - Whether to update browser history
   */
  function showPage(index, updateURL = true) {
    if (index < 0 || index >= sections.length) {
      return;
    }

    // Hide all sections
    sections.forEach(sec => {
      sec.classList.remove("active");
      sec.style.display = "none";
      sec.style.opacity = "0";
      sec.style.visibility = "hidden";
    });

    // Show current section
    currentIndex = index;
    const activeSection = sections[currentIndex];

    activeSection.style.display = "flex";
    activeSection.style.opacity = "1";
    activeSection.style.visibility = "visible";
    activeSection.classList.add("active");

    // Update browser history
    if (updateURL) {
      history.pushState(null, "", `#${activeSection.id}`);
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update navigation UI
    updateArrows();
    updateActiveMenu();
  }

  /**
   * Update prev/next button visibility based on current position
   */
  function updateArrows() {
    if (prevBtn) {
      prevBtn.classList.toggle("hidden", currentIndex === 0);
    }

    if (nextBtn) {
      nextBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
    }
  }

  /**
   * Highlight the active navigation link
   */
  function updateActiveMenu() {
    const activeId = sections[currentIndex]?.id;

    navLinks.forEach(link => {
      link.classList.remove("text-yellow-300");

      if (link.getAttribute("data-target") === activeId) {
        link.classList.add("text-yellow-300");
      }
    });
  }

  // ===== NAVIGATION LINK EVENT LISTENERS =====
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("data-target");
      const index = sections.findIndex(sec => sec.id === targetId);

      if (index !== -1) {
        e.preventDefault();
        showPage(index);
      }

      // Close mobile menu after navigation
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      }
    });
  });

  // ===== PAGINATION BUTTONS =====
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      showPage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      showPage(currentIndex + 1);
    });
  }

  // ===== MOBILE MENU TOGGLE =====
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // ===== PARTNER SEARCH FUNCTIONALITY =====
  const partnerSearch = document.getElementById("partnerSearch");
  const partnerRows = document.querySelectorAll("#partnersTable tbody tr");

  if (partnerSearch && partnerRows.length > 0) {
    partnerSearch.addEventListener("input", function () {
      const searchValue = this.value.trim().toLowerCase();

      partnerRows.forEach(row => {
        const rowText = row.innerText.toLowerCase();
        row.style.display = rowText.includes(searchValue) ? "" : "none";
      });
    });
  }

  // ===== PARTNER LOGOS AUTO LOAD =====
  const partnerLogos = [
    "images/logos/logo1.png",
    "images/logos/logo2.png",
    "images/logos/logo3.png",
    "images/logos/logo4.png",
    "images/logos/logo5.png",
    "images/logos/logo6.png",
    "images/logos/logo7.png",
    "images/logos/logo8.png"
  ];

  /**
   * Load partner logos into a container
   * @param {string} containerId - ID of the container element
   */
  function loadSideLogos(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Container with ID "${containerId}" not found`);
      return;
    }

    container.innerHTML = "";

    // Create and append logo images (duplicated for scrolling effect)
    [...partnerLogos, ...partnerLogos].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Partner Logo";
      img.loading = "lazy";

      // Add error handling for broken images
      img.addEventListener("error", function () {
        console.error(`Failed to load image: ${src}`);
        this.style.display = "none";
      });

      container.appendChild(img);
    });
  }

  loadSideLogos("leftLogos");
  loadSideLogos("rightLogos");

  // ===== IMAGE SLIDER =====
  let slideIndex = 0;
  let slideInterval = null;

  const slideImages = [
    "images/Venue Photos/19.jpeg",
    "images/Venue Photos/20.jpeg",
    "images/Venue Photos/21.jpeg",
    "images/Venue Photos/22.jpeg",
    "images/Venue Photos/23.jpeg"
  ];

  const slideImage = document.getElementById("slideImage");

  /**
   * Change slide to next or previous
   * @param {number} n - Number of slides to advance (can be negative)
   */
  window.changeSlide = function (n) {
    if (!slideImage || slideImages.length === 0) {
      return;
    }

    slideIndex = (slideIndex + n + slideImages.length) % slideImages.length;

    // Fade out transition
    slideImage.style.opacity = "0";
    slideImage.style.transition = "opacity 0.3s ease-in-out";

    // Change image and fade in
    setTimeout(() => {
      slideImage.src = slideImages[slideIndex];
      slideImage.style.opacity = "1";
    }, 300);
  };

  /**
   * Initialize auto-play slider
   */
  if (slideImage) {
    slideInterval = setInterval(() => window.changeSlide(1), 5000);

    // Stop auto-play when user manually changes slide
    slideImage.addEventListener("click", function () {
      clearInterval(slideInterval);
      window.changeSlide(1);
      slideInterval = setInterval(() => window.changeSlide(1), 5000);
    });
  }

  // ===== BROWSER BACK/FORWARD BUTTON SUPPORT =====
  window.addEventListener("popstate", function () {
    const hash = window.location.hash.replace("#", "");
    const index = sections.findIndex(sec => sec.id === hash);

    if (index !== -1) {
      showPage(index, false);
    }
  });

  // ===== INITIALIZE PAGE ON LOAD =====
  const initialHash = window.location.hash.replace("#", "");
  const initialIndex = sections.findIndex(sec => sec.id === initialHash);

  showPage(initialIndex !== -1 ? initialIndex : 0, false);

  // ===== CLEANUP ON PAGE UNLOAD =====
  window.addEventListener("beforeunload", function () {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  });
});
