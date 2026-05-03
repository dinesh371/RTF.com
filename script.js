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
      <p>Rajasthan Travel Fair (RTF) is operated by <strong>India Outtabox Pvt Ltd</strong>, headquartered at Sir Pratap Colony, D-1, Near Paanch Batti, Ratanada, Jodhpur, Rajasthan – 342001, India. This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website or participate in our events.</p>

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
      <p>We do <strong>not</strong> sell, rent, or trade your personal data to third parties. We may share data with:</p>
      <ul style="list-style:disc;padding-left:20px;">
        <li>Hotel partners and event co-organisers solely for logistics and event management purposes.</li>
        <li>Service providers (e.g., Google Forms, email platforms) who help us operate the website.</li>
        <li>Regulatory or legal authorities if required by law.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">5. Data Retention</h4>
      <p>We retain your personal data for as long as necessary for the purposes outlined in this policy, or as required by law. Event-related data is typically retained for 3 years after the event.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">6. Your Rights</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>Access the personal data we hold about you.</li>
        <li>Request correction or deletion of your data.</li>
        <li>Withdraw consent for communications at any time.</li>
        <li>Lodge a complaint with the relevant data protection authority.</li>
      </ul>
      <p>To exercise your rights, contact us at <a href="mailto:info@rajasthantravelfair.com" style="color:#1B2A57;text-decoration:underline;">info@rajasthantravelfair.com</a>.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">7. Cookies</h4>
      <p>Our website may use basic cookies for functional purposes (e.g., remembering your section on the page). We do not use advertising or tracking cookies. By using our site, you consent to this limited use of cookies.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">8. Security</h4>
      <p>We take reasonable technical and organisational measures to protect your personal information against unauthorised access, loss, or misuse. However, no internet transmission is 100% secure.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">9. Third-Party Links</h4>
      <p>Our website may contain links to external sites (e.g., Google Forms). We are not responsible for the privacy practices of those sites and encourage you to review their policies.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">10. Changes to This Policy</h4>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">11. Contact Us</h4>
      <p><strong>India Outtabox Pvt Ltd</strong><br>Sir Pratap Colony, D-1, Near Paanch Batti, Ratanada, Jodhpur, Rajasthan – 342001<br>
      📞 +91-91662-22900 | ✉ <a href="mailto:info@rajasthantravelfair.com" style="color:#1B2A57;text-decoration:underline;">info@rajasthantravelfair.com</a></p>
    `
  },
  terms: {
    title: "Terms & Conditions",
    body: `
      <h3 style="font-size:1.1rem;font-weight:700;color:#1B2A57;margin-bottom:8px;">Terms &amp; Conditions — Rajasthan Travel Fair (RTF) 2026</h3>
      <p><strong>Last Updated:</strong> May 2026</p>
      <p>By accessing this website or participating in any RTF event or FAM trip, you agree to be bound by the following Terms &amp; Conditions. Please read them carefully.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">1. Organiser</h4>
      <p>All RTF events are organised by <strong>India Outtabox Pvt Ltd</strong> ("the Organiser"), a company registered in India. References to "RTF", "we", "us", or "our" refer to India Outtabox Pvt Ltd and the Rajasthan Travel Fair initiative.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">2. Eligibility</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li><strong>RTF FAM trips</strong> are open to verified Indian travel agents and tour operators.</li>
        <li><strong>RTF Global FAM</strong> is open to international travel agents from UK, USA, Europe, and Australia only.</li>
        <li>The Organiser reserves the right to verify eligibility and decline participation without providing a reason.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">3. Registration</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>Registration is subject to availability and confirmation by the Organiser.</li>
        <li>Submitting a registration form does not guarantee participation.</li>
        <li>Participants must provide accurate and truthful information. False information may result in disqualification.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">4. FAM Trip Terms</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>Participants are expected to attend all scheduled hotel inspections, activities, and sessions unless otherwise communicated.</li>
        <li>Any costs not specified as included in the FAM itinerary are the responsibility of the participant.</li>
        <li>Participants must behave professionally and respectfully toward all organisers, hotel staff, and fellow participants.</li>
        <li>The Organiser reserves the right to remove any participant from the FAM trip for misconduct, without refund or compensation.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">5. Cancellation &amp; Changes</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>The Organiser reserves the right to modify or cancel any event or FAM trip due to circumstances beyond our control.</li>
        <li>If an event is cancelled by the Organiser, participants will be notified as soon as possible.</li>
        <li>Participant cancellations may be subject to terms communicated at the time of confirmation.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">6. Photography &amp; Media</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>By participating in RTF events, participants consent to being photographed and filmed for promotional purposes.</li>
        <li>Feedback shared with the Organiser may be published on the website or social media with the participant's name and company.</li>
        <li>Participants wishing to opt out of media use must notify the Organiser in writing before the event.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">7. Liability</h4>
      <ul style="list-style:disc;padding-left:20px;">
        <li>The Organiser shall not be liable for any personal injury, loss, damage, or theft of personal property during FAM trips or events.</li>
        <li>Participants are encouraged to carry their own travel insurance.</li>
      </ul>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">8. Intellectual Property</h4>
      <p>All content on this website, including logos, text, images, and videos, is the property of India Outtabox Pvt Ltd / Rajasthan Travel Fair and may not be reproduced without written permission.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">9. Governing Law</h4>
      <p>These Terms &amp; Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Jodhpur, Rajasthan.</p>

      <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">10. Contact</h4>
      <p><strong>India Outtabox Pvt Ltd</strong><br>Sir Pratap Colony, D-1, Near Paanch Batti, Ratanada, Jodhpur, Rajasthan – 342001<br>
      📞 +91-91662-22900 | ✉ <a href="mailto:info@rajasthantravelfair.com" style="color:#1B2A57;text-decoration:underline;">info@rajasthantravelfair.com</a></p>
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
  var modal = document.getElementById("legalModal");
  if (modal && e.target === modal) closeLegalModal();
});

// ===== RTF GLOBAL FAM — LIGHTBOX =====
function rfgOpenLightbox(src) {
  var lb  = document.getElementById("rfgLightbox");
  var img = document.getElementById("rfgLightboxImg");
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add("open");
}

function rfgCloseLightbox() {
  var lb = document.getElementById("rfgLightbox");
  if (lb) lb.classList.remove("open");
}

// Close lightbox with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") rfgCloseLightbox();
});

// ===== MAIN SCRIPT =====
document.addEventListener("DOMContentLoaded", function () {
  var sectionOrder = ["home", "about", "attractions", "rtffam", "rtfglobal"];
  var sections = sectionOrder.map(function (id) { return document.getElementById(id); }).filter(Boolean);

  var navLinks       = document.querySelectorAll(".nav-link");
  var menuToggle     = document.getElementById("menu-toggle");
  var mobileMenu     = document.getElementById("mobile-menu");
  var prevSectionBtn = document.getElementById("prev-page-button");
  var nextSectionBtn = document.getElementById("next-page-button");

  var currentIndex = 0;

  // ── showPage ──────────────────────────────────────────────────────────────
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

  // ── restartScrollAnimations ───────────────────────────────────────────────
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

  // ── Arrow visibility ──────────────────────────────────────────────────────
  function updateSectionArrows() {
    if (prevSectionBtn) prevSectionBtn.classList.toggle("hidden", currentIndex === 0);
    if (nextSectionBtn) nextSectionBtn.classList.toggle("hidden", currentIndex === sections.length - 1);
  }

  // ── Active nav highlight ──────────────────────────────────────────────────
  function updateActiveNav() {
    var activeId = sections[currentIndex] ? sections[currentIndex].id : "";
    navLinks.forEach(function (link) {
      link.classList.remove("text-yellow-300");
      if (link.getAttribute("data-target") === activeId) {
        link.classList.add("text-yellow-300");
      }
    });
  }

  // ── Nav link clicks ───────────────────────────────────────────────────────
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = this.getAttribute("data-target");
      var index = sections.findIndex(function (s) { return s.id === targetId; });
      if (index !== -1) showPage(index);
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      }
    });
  });

  // ── Arrow button clicks ───────────────────────────────────────────────────
  if (prevSectionBtn) prevSectionBtn.addEventListener("click", function () { showPage(currentIndex - 1); });
  if (nextSectionBtn) nextSectionBtn.addEventListener("click", function () { showPage(currentIndex + 1); });

  // ── Mobile menu toggle ────────────────────────────────────────────────────
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // ── Participant search ────────────────────────────────────────────────────
  var participantSearch = document.getElementById("participantSearch");
  if (participantSearch) {
    participantSearch.addEventListener("keyup", function () {
      var val = this.value.toLowerCase();
      document.querySelectorAll("#participantsTbody tr").forEach(function (row) {
        row.style.display = row.innerText.toLowerCase().includes(val) ? "" : "none";
      });
    });
  }

  // ── Browser back / forward ────────────────────────────────────────────────
  window.addEventListener("popstate", function () {
    var hash = window.location.hash.replace("#", "");
    var index = sections.findIndex(function (s) { return s.id === hash; });
    if (index !== -1) showPage(index, false);
  });

  // ── Initial page load ─────────────────────────────────────────────────────
  var initialHash  = window.location.hash.replace("#", "");
  var resolvedHash = initialHash === "partners" ? "rtffam" : initialHash;
  var initialIndex = sections.findIndex(function (s) { return s.id === resolvedHash; });
  showPage(initialIndex !== -1 ? initialIndex : 0, initialIndex === -1);
});
