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

  function showPage(index, updateURL = true) {
    if (index < 0 || index >= sections.length) return;

    sections.forEach(sec => {
      sec.classList.remove("active");
      sec.style.display = "none";
      sec.style.opacity = "0";
      sec.style.visibility = "hidden";
    });

    currentIndex = index;
    const activeSection = sections[currentIndex];

    activeSection.style.display = "flex";
    activeSection.style.opacity = "1";
    activeSection.style.visibility = "visible";
    activeSection.classList.add("active");

    if (updateURL) {
      history.pushState(null, "", "#" + activeSection.id);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    updateArrows();
    updateActiveMenu();
  }

  function updateArrows() {
    if (prevBtn) {
      prevBtn.classList.toggle("hidden", currentIndex === 0);
    }

    if (nextBtn) {
      nextBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
    }
  }

  function updateActiveMenu() {
    const activeId = sections[currentIndex]?.id;

    navLinks.forEach(link => {
      link.classList.remove("text-yellow-300");

      if (link.getAttribute("data-target") === activeId) {
        link.classList.add("text-yellow-300");
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("data-target");
      const index = sections.findIndex(sec => sec.id === targetId);

      if (index !== -1) {
        e.preventDefault();
        showPage(index);
      }

      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      }
    });
  });

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

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // ===== PARTNER SEARCH =====
  const partnerSearch = document.getElementById("partnerSearch");
  const partnerRows = document.querySelectorAll("#partnersTable tbody tr");

  if (partnerSearch && partnerRows.length > 0) {
    partnerSearch.addEventListener("input", function () {
      const value = this.value.trim().toLowerCase();

      partnerRows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(value) ? "" : "none";
      });
    });
  }

  // ===== SIDE LOGOS AUTO LOAD =====
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

  function loadSideLogos(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    [...partnerLogos, ...partnerLogos].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Partner Logo";
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
    "images/Venue Photos/21.jpeg",
    "images/Venue Photos/22.jpeg",
    "images/Venue Photos/23.jpeg"
  ];

  const slideImage = document.getElementById("slideImage");

  window.changeSlide = function (n) {
    if (!slideImage || slideImages.length === 0) return;

    slideIndex = (slideIndex + n + slideImages.length) % slideImages.length;

    slideImage.style.opacity = "0";

    setTimeout(() => {
      slideImage.src = slideImages[slideIndex];
      slideImage.style.opacity = "1";
    }, 300);
  };

  if (slideImage) {
    setInterval(() => window.changeSlide(1), 5000);
  }

  // ===== BROWSER BACK/FORWARD =====
  window.addEventListener("popstate", function () {
    const hash = window.location.hash.replace("#", "");
    const index = sections.findIndex(sec => sec.id === hash);

    if (index !== -1) {
      showPage(index, false);
    }
  });

  // ===== LOAD INITIAL SECTION =====
  const initialHash = window.location.hash.replace("#", "");
  const initialIndex = sections.findIndex(sec => sec.id === initialHash);

  showPage(initialIndex !== -1 ? initialIndex : 0, false);
});
