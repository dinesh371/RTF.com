// ===== MODAL =====function toggleModal() {const modal = document.getElementById("modal");if (!modal) return;const isHidden = modal.style.display === "none" || modal.style.display === "";modal.style.display = isHidden ? "flex" : "none";const mobileMenu = document.getElementById("mobile-menu");if (mobileMenu) {mobileMenu.classList.add("hidden");mobileMenu.classList.remove("flex");}}

// ===== LEGAL MODAL =====const legalContent = {privacy: {title: "Privacy Policy",body: `Privacy Policy — Rajasthan Travel Fair (RTF) 2026Last Updated: May 2026

  <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">1. Who We Are</h4>
  <p>Rajasthan Travel Fair (RTF) is operated by <strong>India Outtabox Pvt Ltd</strong>, headquartered at Sir Pratap Colony, D-1, Near Paanch Batti, Ratanada, Jodhpur, Rajasthan – 342001, India. This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website or participate in our events.</p>

  <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">2. Information We Collect</h4>
  <p>We may collect the following types of information:</p>
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
  <p>You have the right to:</p>
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

},terms: {title: "Terms & Conditions",body: `Terms & Conditions — Rajasthan Travel Fair (RTF) 2026Last Updated: May 2026By accessing this website or participating in any RTF event or FAM trip, you agree to be bound by the following Terms & Conditions. Please read them carefully.

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
    <li>Any costs not specified as included in the FAM itinerary are the responsibility of the participant (e.g., personal shopping, alcoholic beverages, medical expenses).</li>
    <li>Participants must behave professionally and respectfully toward all organisers, hotel staff, and fellow participants.</li>
    <li>The Organiser reserves the right to remove any participant from the FAM trip for misconduct, without refund or compensation.</li>
  </ul>

  <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">5. Cancellation &amp; Changes</h4>
  <ul style="list-style:disc;padding-left:20px;">
    <li>The Organiser reserves the right to modify or cancel any event or FAM trip due to circumstances beyond our control (force majeure, government restrictions, insufficient participation, etc.).</li>
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
    <li>The Organiser's liability, if any, is limited to the direct cost of the event registration, if applicable.</li>
  </ul>

  <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">8. Intellectual Property</h4>
  <p>All content on this website, including logos, text, images, and videos, is the property of India Outtabox Pvt Ltd / Rajasthan Travel Fair and may not be reproduced without written permission.</p>

  <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">9. Governing Law</h4>
  <p>These Terms &amp; Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Jodhpur, Rajasthan.</p>

  <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">10. Changes to Terms</h4>
  <p>We reserve the right to update these Terms &amp; Conditions at any time. Continued use of the website or participation in RTF events constitutes acceptance of the updated terms.</p>

  <h4 style="font-weight:700;color:#1B2A57;margin-top:16px;">11. Contact</h4>
  <p><strong>India Outtabox Pvt Ltd</strong><br>Sir Pratap Colony, D-1, Near Paanch Batti, Ratanada, Jodhpur, Rajasthan – 342001<br>
  📞 +91-91662-22900 | ✉ <a href="mailto:info@rajasthantravelfair.com" style="color:#1B2A57;text-decoration:underline;">info@rajasthantravelfair.com</a></p>
`

}};

function showLegalModal(type, e) {const modal = document.getElementById("legalModal");const title = document.getElementById("legalModalTitle");const body  = document.getElementById("legalModalBody");if (!modal || !legalContent[type]) return;title.textContent = legalContent[type].title;body.innerHTML = legalContent[type].body;modal.style.display = "flex";if (e) e.preventDefault();}

function closeLegalModal() {const modal = document.getElementById("legalModal");if (modal) modal.style.display = "none";}

// Close legal modal on backdrop clickdocument.addEventListener("click", function(e) {const modal = document.getElementById("legalModal");if (modal && e.target === modal) closeLegalModal();});

// ===== MAIN SCRIPT =====document.addEventListener("DOMContentLoaded", function () {const sectionOrder = ["home", "about", "attractions", "rtffam", "rtfglobal"];const sections = sectionOrder.map(id => document.getElementById(id)).filter(Boolean);

const navLinks     = document.querySelectorAll(".nav-link");const menuToggle   = document.getElementById("menu-toggle");const mobileMenu   = document.getElementById("mobile-menu");const prevSectionBtn = document.getElementById("prev-page-button");const nextSectionBtn = document.getElementById("next-page-button");

let currentIndex = 0;

// ── showPage ──────────────────────────────────────────────────────────────function showPage(index, updateUrl = true) {if (index < 0 || index >= sections.length) return;

sections.forEach(section => {
  section.classList.remove("active");
  section.style.display    = "none";
  section.style.opacity    = "0";
  section.style.visibility = "hidden";
  // pause all videos in hidden sections
  section.querySelectorAll("video").forEach(v => { try { v.pause(); } catch(e){} });
});

currentIndex = index;
const active = sections[currentIndex];

active.style.display    = "flex";
active.style.opacity    = "1";
active.style.visibility = "visible";
active.classList.add("active");

// play bg videos in active section
active.querySelectorAll("video[autoplay], video.bg-video, video.about-bg-video").forEach(v => {
  v.muted = true;
  v.play().catch(() => {});
});

if (updateUrl) history.pushState(null, "", "#" + active.id);
window.scrollTo({ top: 0, behavior: "smooth" });

updateSectionArrows();
updateActiveNav();

// restart CSS animations for scrolling tracks when section becomes visible
restartScrollAnimations(active);

}

// ── restartScrollAnimations ───────────────────────────────────────────────function restartScrollAnimations(section) {const tracks = section.querySelectorAll(".logo-track, .feedback-track, .gallery-scroll-track");tracks.forEach(track => {track.style.animation = "none";// Force reflowvoid track.offsetWidth;track.style.animation = "";});}

function updateSectionArrows() {if (prevSectionBtn) prevSectionBtn.classList.toggle("hidden", currentIndex === 0);if (nextSectionBtn) nextSectionBtn.classList.toggle("hidden", currentIndex === sections.length - 1);}

function updateActiveNav() {const activeId = sections[currentIndex]?.id;navLinks.forEach(link => {link.classList.remove("text-yellow-300");if (link.getAttribute("data-target") === activeId) {link.classList.add("text-yellow-300");}});}

// ── Nav links ──────────────────────────────────────────────────────────────navLinks.forEach(link => {link.addEventListener("click", function(e) {e.preventDefault();const targetId = this.getAttribute("data-target");const index = sections.findIndex(s => s.id === targetId);if (index !== -1) showPage(index);if (mobileMenu) {mobileMenu.classList.add("hidden");mobileMenu.classList.remove("flex");}});});

if (prevSectionBtn) prevSectionBtn.addEventListener("click", () => showPage(currentIndex - 1));if (nextSectionBtn) nextSectionBtn.addEventListener("click", () => showPage(currentIndex + 1));

if (menuToggle && mobileMenu) {menuToggle.addEventListener("click", () => {mobileMenu.classList.toggle("hidden");mobileMenu.classList.toggle("flex");});}

// ── Participant search ─────────────────────────────────────────────────────const participantSearch = document.getElementById("participantSearch");if (participantSearch) {participantSearch.addEventListener("keyup", function() {const val = this.value.toLowerCase();document.querySelectorAll("#participantsTbody tr").forEach(row => {row.style.display = row.innerText.toLowerCase().includes(val) ? "" : "none";});});}

// ── Browser back/forward ──────────────────────────────────────────────────window.addEventListener("popstate", function() {const hash = window.location.hash.replace("#", "");const index = sections.findIndex(s => s.id === hash);if (index !== -1) showPage(index, false);});

// ── Initial page ──────────────────────────────────────────────────────────const initialHash = window.location.hash.replace("#", "");const resolvedHash = initialHash === "partners" ? "rtffam" : initialHash;const initialIndex = sections.findIndex(s => s.id === resolvedHash);showPage(initialIndex !== -1 ? initialIndex : 0, initialIndex === -1);

// ── Init RTF Global FAM Slideshow ─────────────────────────────────────────initGlobalSlideshow();

// ── Duplicate feedback track for seamless loop ────────────────────────────duplicateScrollTrack("feedbackTrack");});

// ✅ ADD THIS BELOW 👇

const feedbackImageMap = {"alankaran verma": "images/agents/alankaran-verma.jpg","sachin sharma": "images/agents/sachin-sharma.jpg","aman saini": "images/agents/aman-saini.jpg"



// ... keep rest

};

document.querySelectorAll(".feedback-card-item").forEach(card => {

const nameEl = card.querySelector("h4");
if (!nameEl) return;

let cleanName = nameEl.innerText
  .replace(/Mr\.|Ms\.|Mrs\./gi, "")
  .trim()
  .toLowerCase();

const imagePath = feedbackImageMap[cleanName];

const profileDiv = document.createElement("div");
profileDiv.className = "profile-img";

const img = document.createElement("img");
img.src = imagePath || "";

img.onerror = function () {
  profileDiv.innerHTML = "";
  const span = document.createElement("span");
  span.innerText = cleanName
    .split(" ")
    .map(w => w[0])
    .join("")
    .substring(0,2)
    .toUpperCase();
  profileDiv.appendChild(span);
};

profileDiv.appendChild(img);
card.insertBefore(profileDiv, nameEl);

});

});  // ← THIS LINE MUST STAY LAST

// ===== DUPLICATE SCROLL TRACK (for seamless infinite scroll) =====function duplicateScrollTrack(id) {const track = document.getElementById(id);if (!track) return;// Already duplicated in HTML — just ensure animation runstrack.style.animationPlayState = "running";}

// ===== RTF GLOBAL FAM IMAGE SLIDESHOW =====function initGlobalSlideshow() {const slides    = document.querySelectorAll(".global-slideshow .slide");const dots      = document.querySelectorAll(".slideshow-dots .dot");const prevBtn   = document.getElementById("slidePrev");const nextBtn   = document.getElementById("slideNext");const progressBar = document.getElementById("slideProgressBar");

if (!slides.length) return;

let current   = 0;let autoTimer = null;const SLIDE_DURATION = 4000; // 4 seconds

function goToSlide(index) {slides[current].classList.remove("active");dots[current] && dots[current].classList.remove("active");

current = (index + slides.length) % slides.length;

slides[current].classList.add("active");
dots[current] && dots[current].classList.add("active");

// reset progress bar
if (progressBar) {
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  void progressBar.offsetWidth; // reflow
  progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
  progressBar.style.width = "100%";
}

}

function startAuto() {stopAuto();autoTimer = setInterval(() => goToSlide(current + 1), SLIDE_DURATION);}

function stopAuto() {if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }}

if (prevBtn) prevBtn.addEventListener("click", () => { goToSlide(current - 1); startAuto(); });if (nextBtn) nextBtn.addEventListener("click", () => { goToSlide(current + 1); startAuto(); });

dots.forEach((dot, i) => {dot.addEventListener("click", () => { goToSlide(i); startAuto(); });});

// keyboard nav (only when rtfglobal section is active)document.addEventListener("keydown", function(e) {const rtfGlobal = document.getElementById("rtfglobal");if (!rtfGlobal || !rtfGlobal.classList.contains("active")) return;if (e.key === "ArrowLeft")  { goToSlide(current - 1); startAuto(); }if (e.key === "ArrowRight") { goToSlide(current + 1); startAuto(); }});

// init progress barif (progressBar) {progressBar.style.transition = width ${SLIDE_DURATION}ms linear;progressBar.style.width = "100%";}

goToSlide(0);startAuto();}
