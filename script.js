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

  function showPage(index, updateUrl = true) {
    if (index < 0 || index >= sections.length) return;

    // Hide all sections and pause their videos
    sections.forEach(section => {
      section.classList.remove("active");
      section.style.display = "none";
      section.style.opacity = "0";
      section.style.visibility = "hidden";

      // Pause any video in sections being hidden
      const vid = section.querySelector("video");
      if (vid) vid.pause();
    });

    currentIndex = index;

    const activeSection = sections[currentIndex];
    activeSection.style.display = "flex";
    activeSection.style.opacity = "1";
    activeSection.style.visibility = "visible";
    activeSection.classList.add("active");

    // Play the video in the newly visible section
    const activeVideo = activeSection.querySelector("video");
    if (activeVideo) {
      activeVideo.muted = true; // required for autoplay policy
      activeVideo.play().catch(() => {}); // silently ignore browser blocks
    }

    if (updateUrl) {
      history.pushState(null, "", "#" + activeSection.id);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    updateArrows();
    updateActiveNav();
  }

  function updateArrows() {
    if (prevBtn) prevBtn.classList.toggle("hidden", currentIndex === 0);
    if (nextBtn) nextBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
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

  // ===== ABOUT IMAGE SLIDER =====
  let slideIndex = 0;

  const slideImages = [
    "images/Venue Photos/19.jpeg",
    "images/Venue Photos/20.jpeg",
    "images/Venue Photos/21.jpeg",
    "images/Venue Photos/22.jpeg",
    "images/Venue Photos/23.jpeg"
  ];

  const slideImageElement = document.getElementById("slideImage");

  window.changeSlide = function (direction) {
    if (!slideImageElement) return;

    slideIndex = (slideIndex + direction + slideImages.length) % slideImages.length;
    slideImageElement.style.opacity = "0";

    setTimeout(() => {
      slideImageElement.src = slideImages[slideIndex];
      slideImageElement.loading = "lazy";
      slideImageElement.style.opacity = "1";
    }, 300);
  };

  if (slideImageElement) {
    setInterval(() => window.changeSlide(1), 5000);
  }

  // ===== PARTNERS DATA =====
  const partners = [
    ["Mr. Guneet Singh", "Founder", "Your Nice Trip", "Faridabad"],
    ["Mr. Anil Dhingra", "ED", "Unique Air Services", "Delhi"],
    ["Mr. Narender Sharma", "Director", "Perfection Consulting (India) Pvt Ltd", "Delhi"],
    ["Mr. Nilesh Bhutwala", "Partner", "Travel Theme Holidays", "Surat"],
    ["Ms. Leena Jumde", "CEO", "Travel Gratitude", "Mumbai"],
    ["Mr. Sachin Sharma", "MD", "Travel By Passion", "Delhi"],
    ["Ms. Priyanka Mohidekar", "Director", "Touring Toes LLP", "Pune"],
    ["Mr. Dilip Soni", "Owner", "Sonii Travels", "Mumbai"],
    ["Mr. Niranjan Ji", "Director", "Smithasya Enter Pvt Ltd (Holiday Kool)", "Pune"],
    ["Ms. Madhuri Wadangenkar", "Founder", "Skip The Line Tour", "Mumbai"],
    ["Mr. Ganesh L Sakhara", "Owner", "ShreeNath Travels", "Pune"],
    ["Mr. Alankaran Verma", "Owner", "Sai Tour & Travels", "Una"],
    ["Mr. Madhu", "CEO & Founder", "NB4 Holidays", "Kochi"],
    ["Mr. Tejas Kale", "Director", "My Travel World Travel", "Pune"],
    ["Mr. Kartik Pachchigar", "Owner", "Magical India Holidays", "Surat"],
    ["Mr. Tushar Patel", "Sales Executive", "Magical India Holidays", "Surat"],
    ["Mr. Ram Raj Singh", "Founder & MD", "Luxurious Heritage", "Delhi"],
    ["Mr. Mahendra R Jain", "Owner", "Kering Holiday", "Mumbai"],
    ["Mr. Mukesh Kumar", "Founder", "KaaSaa Events", "Delhi"],
    ["Ms. Dilpreet (Sheena) Sewal", "Founder", "India TajMahal tour operators", "Delhi"],
    ["Mr. Pushpendra Sen", "Founder", "Historical India Tours And Travels", "Orchha"],
    ["Mr. Shubham Gupta", "Manager", "Galaxy Holidays", "Pune"],
    ["Ms. Sarika Chopra", "Founder & CEO", "Explorers-Den", "Faridabad"],
    ["Ms. Chandni Sharma", "Director", "Ascel Group", "Ghaziabad"],
    ["Mr. Devendra P. Divekar", "Owner", "Go Weekends", "Mumbai"],
    ["Ms. Pooja", "Founder", "Journey Master", "Delhi"],
    ["Mr. Santhosh Kumar", "Owner", "GodZone Holidays & Tours", "Alibaug"],
    ["Ms. Pooja V Patil", "Owner", "Plango Holidays Explore World", "Mumbai"],
    ["Ms. Neetu Gola", "Founder", "Om Sai Travels", "Delhi"],
    ["Mr. Aman Saini", "Owner", "Colors of India", "Delhi"]
  ];

  const partnerGrid = document.getElementById("partnerGrid");
  const partnerSearch = document.getElementById("partnerSearch");
  const cityFilter = document.getElementById("cityFilter");

  if (partnerGrid && partnerSearch && cityFilter) {
    const cities = [...new Set(partners.map(partner => partner[3]))].sort();

    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      cityFilter.appendChild(option);
    });

    function renderPartners() {
      const keyword = partnerSearch.value.toLowerCase().trim();
      const city = cityFilter.value;

      const filteredPartners = partners.filter(partner => {
        const searchableText = partner.join(" ").toLowerCase();
        const matchesSearch = searchableText.includes(keyword);
        const matchesCity = !city || partner[3] === city;

        return matchesSearch && matchesCity;
      });

      partnerGrid.innerHTML = "";

      filteredPartners.forEach((partner, index) => {
        partnerGrid.innerHTML += `
          <div class="partner-card">
            <div class="partner-no">${String(index + 1).padStart(2, "0")}</div>
            <h4>${partner[0]}</h4>
            <p>${partner[1]}</p>
            <span>${partner[2]}</span>
            <small>${partner[3]}</small>
          </div>
        `;
      });
    }

    partnerSearch.addEventListener("input", renderPartners);
    cityFilter.addEventListener("change", renderPartners);

    renderPartners();
  }

  // ===== HASH / INITIAL PAGE LOAD =====
  window.addEventListener("popstate", function () {
    const hash = window.location.hash.replace("#", "");
    const index = sections.findIndex(section => section.id === hash);

    if (index !== -1) showPage(index, false);
  });

  const initialHash = window.location.hash.replace("#", "");
  const initialIndex = sections.findIndex(section => section.id === initialHash);

  showPage(initialIndex !== -1 ? initialIndex : 0, initialIndex === -1);
});
