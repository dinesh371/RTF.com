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
var legalContent = {
  privacy: {
    title: "Privacy Policy",
    body: `
      <h3 style="font-size:1.1rem;font-weight:700;color:#1B2A57;margin-bottom:8px;">Privacy Policy — Rajasthan Travel Fair (RTF) 2026</h3>
      <p><strong>Last Updated:</strong> May 2026</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">1. Who We Are</h4>
      <p>Rajasthan Travel Fair (RTF) is operated by <strong>India Outtabox Pvt Ltd</strong>, headquartered at Sir Pratap Colony, D-1, Near Paanch Batti, Ratanada, Jodhpur, Rajasthan – 342001, India.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">2. Information We Collect</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li><strong>Personal identification information</strong> — Name, email address, phone number, company/organisation name, designation, city/country.</li>
        <li><strong>Registration data</strong> — Information submitted via Google Forms or any registration form on this website.</li>
        <li><strong>Usage data</strong> — Pages visited, time spent on site, browser type, IP address (non-personally identifiable).</li>
        <li><strong>Communication data</strong> — Emails, WhatsApp messages, or other communications you send to us.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">3. How We Use Your Information</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>To process event registrations and FAM trip applications.</li>
        <li>To send event updates, itineraries, and relevant communications.</li>
        <li>To publish participant lists and feedback on our website (with your consent).</li>
        <li>To improve our website and services.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">4. Data Sharing</h4>
      <p>We do <strong>not</strong> sell, rent, or trade your personal data to third parties. We may share data with hotel partners and event co-organisers solely for logistics purposes.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">5. Your Rights</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>Access the personal data we hold about you.</li>
        <li>Request correction or deletion of your data.</li>
        <li>Withdraw consent for communications at any time.</li>
      </ul>
      <p>To exercise your rights, contact us at <a href="mailto:info@rajasthantravelfair.com" style="color:#1B2A57;text-decoration:underline;">info@rajasthantravelfair.com</a>.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">6. Contact Us</h4>
      <p><strong>India Outtabox Pvt Ltd</strong><br>Sir Pratap Colony, D-1, Near Paanch Batti, Ratanada, Jodhpur, Rajasthan – 342001<br>
      📞 +91-91662-22900 | ✉ <a href="mailto:info@rajasthantravelfair.com" style="color:#1B2A57;text-decoration:underline;">info@rajasthantravelfair.com</a></p>
    `
  },
  terms: {
    title: "Terms & Conditions",
    body: `
      <h3 style="font-size:1.1rem;font-weight:700;color:#1B2A57;margin-bottom:8px;">Terms &amp; Conditions — Rajasthan Travel Fair (RTF) 2026</h3>
      <p><strong>Last Updated:</strong> May 2026</p>
      <p>By accessing this website or participating in any RTF event or FAM trip, you agree to be bound by the following Terms &amp; Conditions.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">1. Organiser</h4>
      <p>All RTF events are organised by <strong>India Outtabox Pvt Ltd</strong> ("the Organiser").</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">2. Eligibility</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li><strong>RTF FAM trips</strong> are open to verified Indian travel agents and tour operators.</li>
        <li><strong>RTF Global FAM</strong> is open to international travel agents from UK, USA, Europe, and Australia only.</li>
        <li>The Organiser reserves the right to verify eligibility and decline participation without providing a reason.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">3. FAM Trip Terms</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>Participants must attend all scheduled hotel inspections and sessions.</li>
        <li>Participants must behave professionally toward all organisers, hotel staff, and fellow participants.</li>
        <li>The Organiser reserves the right to remove any participant for misconduct, without refund.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">4. Photography &amp; Media</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>By participating in RTF events, participants consent to being photographed and filmed for promotional purposes.</li>
        <li>Feedback shared may be published on the website or social media with participant's name and company.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">5. Governing Law</h4>
      <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Jodhpur, Rajasthan.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">6. Contact</h4>
      <p><strong>India Outtabox Pvt Ltd</strong><br>📞 +91-91662-22900 | ✉ <a href="mailto:info@rajasthantravelfair.com" style="color:#1B2A57;text-decoration:underline;">info@rajasthantravelfair.com</a></p>
    `
  }
};

function showLegalModal(type, e) {
  if (e) e.preventDefault();
  var modal = document.getElementById("legalModal");
  var title = document.getElementById("legalModalTitle");
  var body  = document.getElementById("legalModalBody");
  if (!modal || !legalContent[type]) return;
  title.textContent = legalContent[type].title;
  body.innerHTML    = legalContent[type].body;
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

// ===== RTF GLOBAL FAM — LIGHTBOX =====
// ===== RTF GLOBAL FAM — LIGHTBOX WITH ZOOM =====
var rfgZoomLevel = 1;

function rfgOpenLightbox(src) {
  var lb  = document.getElementById("rfgLightbox");
  var img = document.getElementById("rfgLightboxImg");

  if (!lb || !img) return;

  rfgZoomLevel = 1;
  img.src = src;
  img.classList.remove("zoomed");
  img.style.transform = "scale(1)";
  img.style.transformOrigin = "center center";

  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function rfgCloseLightbox() {
  var lb  = document.getElementById("rfgLightbox");
  var img = document.getElementById("rfgLightboxImg");

  if (lb) lb.classList.remove("open");

  if (img) {
    img.src = "";
    img.classList.remove("zoomed");
    img.style.transform = "scale(1)";
  }

  rfgZoomLevel = 1;
  document.body.style.overflow = "";
}

// Click image to zoom in / zoom out
document.addEventListener("click", function (e) {
  var lb  = document.getElementById("rfgLightbox");
  var img = document.getElementById("rfgLightboxImg");

  if (!lb || !img || !lb.classList.contains("open")) return;

  if (e.target === img) {
    if (rfgZoomLevel === 1) {
      rfgZoomLevel = 2.2;
      img.classList.add("zoomed");
      img.style.transform = "scale(" + rfgZoomLevel + ")";
      img.style.transformOrigin = "center center";
    } else {
      rfgZoomLevel = 1;
      img.classList.remove("zoomed");
      img.style.transform = "scale(1)";
    }
  }

  if (e.target === lb) {
    rfgCloseLightbox();
  }
});

// ESC close
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    rfgCloseLightbox();
  }
});

// ===== MAIN SCRIPT =====
document.addEventListener("DOMContentLoaded", function () {
  var sectionOrder = ["home", "about", "attractions", "rtffam", "rtfglobal"];
  var sections = sectionOrder.map(function (id) { return document.getElementById(id); }).filter(Boolean);

  var menuToggle     = document.getElementById("menu-toggle");
  var mobileMenu     = document.getElementById("mobile-menu");
  var prevSectionBtn = document.getElementById("prev-page-button");
  var nextSectionBtn = document.getElementById("next-page-button");

  var currentIndex = 0;

  function showPage(index, updateUrl) {
    if (index < 0 || index >= sections.length) return;
    if (updateUrl === undefined) updateUrl = true;

    sections.forEach(function (section) {
      section.classList.remove("active");
      section.style.display    = "none";
      section.style.opacity    = "0";
      section.style.visibility = "hidden";
      section.querySelectorAll("video").forEach(function (v) {
        try { v.pause(); } catch (err) {}
      });
    });

    currentIndex = index;
    var active = sections[currentIndex];

    // FIX: Use flex for all sections (consistent with CSS .page-section.active { display: flex })
    active.style.display    = "flex";
    active.style.opacity    = "1";
    active.style.visibility = "visible";
    active.classList.add("active");

    active.querySelectorAll("video[autoplay], video.bg-video, video.about-bg-video").forEach(function (v) {
      v.muted = true;
      v.play().catch(function () {});
    });

    if (updateUrl) history.pushState(null, "", "#" + active.id);
    window.scrollTo({ top: 0, behavior: "smooth" });

    updateSectionArrows();
    updateActiveNav();
    restartScrollAnimations(active);
  }

  function restartScrollAnimations(section) {
    var tracks = section.querySelectorAll(
      ".logo-track, .feedback-track, .gallery-scroll-track"
    );
    tracks.forEach(function (track) {
      track.style.animation = "none";
      void track.offsetWidth;
      track.style.animation = "";
    });
  }

  function updateSectionArrows() {
    if (prevSectionBtn) prevSectionBtn.classList.toggle("hidden", currentIndex === 0);
    if (nextSectionBtn) nextSectionBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
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

  // FIX: Single click handler via event delegation only — no double-binding
  document.addEventListener("click", function(e) {
    var link = e.target.closest("a.nav-link, button.nav-link, [class*='nav-link']");
    if (!link) return;
    var targetId = link.getAttribute("data-target");
    if (!targetId) return;
    e.preventDefault();
    var index = sections.findIndex(function (s) { return s.id === targetId; });
    if (index !== -1) showPage(index);
    if (mobileMenu) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    }
  });

  if (prevSectionBtn) prevSectionBtn.addEventListener("click", function () { showPage(currentIndex - 1); });
  if (nextSectionBtn) nextSectionBtn.addEventListener("click", function () { showPage(currentIndex + 1); });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  var participantSearch = document.getElementById("participantSearch");
  if (participantSearch) {
    participantSearch.addEventListener("keyup", function () {
      var val = this.value.toLowerCase();
      document.querySelectorAll("#participantsTbody tr").forEach(function (row) {
        row.style.display = row.innerText.toLowerCase().includes(val) ? "" : "none";
      });
    });
  }

  window.addEventListener("popstate", function () {
    var hash = window.location.hash.replace("#", "");
    var index = sections.findIndex(function (s) { return s.id === hash; });
    if (index !== -1) showPage(index, false);
  });

  var initialHash  = window.location.hash.replace("#", "");
  var resolvedHash = initialHash === "partners" ? "rtffam" : initialHash;
  var initialIndex = sections.findIndex(function (s) { return s.id === resolvedHash; });
  showPage(initialIndex !== -1 ? initialIndex : 0, initialIndex === -1);
});
