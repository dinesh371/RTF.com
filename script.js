/**
 * ============================================================
 * RTF.com - FINAL CLEAN SCRIPT (PRODUCTION READY)
 * ============================================================
 * Smooth scroll navigation + animations + UI fixes
 */

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

document.addEventListener("DOMContentLoaded", function () {

  // ===== NAVIGATION (SCROLL BASED) =====
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("data-target");

      if (targetId) {
        e.preventDefault();
        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Close mobile menu
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      }
    });
  });

  // ===== ACTIVE MENU ON SCROLL =====
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;

      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("text-yellow-300");

      if (link.getAttribute("data-target") === current) {
        link.classList.add("text-yellow-300");
      }
    });
  });

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // ===== PARTNER SEARCH =====
  const partnerSearch = document.getElementById("partnerSearch");
  const partnerRows = document.querySelectorAll("#partnersTable tbody tr");

  if (partnerSearch) {
    partnerSearch.addEventListener("input", function () {
      const value = this.value.toLowerCase();

      partnerRows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(value) ? "" : "none";
      });
    });
  }

  // ===== LOGO AUTO LOAD =====
  const partnerLogos = [
    "images/logos/logo1.png",
    "images/logos/logo2.png",
    "images/logos/logo3.png",
    "images/logos/logo4.png",
    "images/logos/logo5.png"
  ];

  function loadSideLogos(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    [...partnerLogos, ...partnerLogos].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.loading = "lazy";
      container.appendChild(img);
    });
  }

  loadSideLogos("leftLogos");
  loadSideLogos("rightLogos");

  // ===== IMAGE SLIDER =====
  let slideIndex = 0;

  const slideImages = [
    "images/Venue Photos/19.jpeg",
    "images/Venue Photos/20.jpeg",
    "images/Venue Photos/21.jpeg"
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

  // ===== SOFT SCROLL ANIMATION =====
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(sec => observer.observe(sec));

});