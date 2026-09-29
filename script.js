// ===== MODAL =====
function toggleModal() {
  var modal = document.getElementById("modal");
  if (!modal) return;

  var isHidden =
    modal.style.display === "none" ||
    modal.style.display === "";

  modal.style.display = isHidden ? "flex" : "none";

  var mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  }
}


// ======================================================
// MAIN SCRIPT
// ======================================================

document.addEventListener("DOMContentLoaded", function () {


  // ====================================================
  // FEEDBACK LOOP
  // Works independently for March + August
  // ====================================================

  document.querySelectorAll(".feedback-track").forEach(function (track) {

    track.querySelectorAll(".feedback-clone").forEach(function (clone) {
      clone.remove();
    });

    var cards = Array.from(
      track.querySelectorAll(".feedback-card-item")
    );

    cards.forEach(function (card) {

      var clone = card.cloneNode(true);

      clone.classList.add("feedback-clone");

      track.appendChild(clone);

    });

    track.style.animation = "none";

    void track.offsetHeight;

    track.style.animation =
      "scrollFeedback 180s linear infinite";

  });


  // ====================================================
  // PAGE ORDER
  // ====================================================

  var sectionOrder = [
    "home",
    "about",
    "attractions",
    "rtffam",
    "rtffamaugust",
    "rtfglobal"
  ];


  var sections = sectionOrder
    .map(function (id) {

      return document.getElementById(id);

    })
    .filter(Boolean);


  var menuToggle =
    document.getElementById("menu-toggle");

  var mobileMenu =
    document.getElementById("mobile-menu");

  var prevSectionBtn =
    document.getElementById("prev-page-button");

  var nextSectionBtn =
    document.getElementById("next-page-button");


  var currentIndex = 0;


  // ====================================================
  // SHOW SELECTED PAGE
  // ====================================================

  function showPage(index, updateUrl) {

    if (
      index < 0 ||
      index >= sections.length
    ) {
      return;
    }


    if (updateUrl === undefined) {
      updateUrl = true;
    }


    // Hide every page
    sections.forEach(function (section) {

      section.classList.remove("active");

      section.style.display = "none";
      section.style.opacity = "0";
      section.style.visibility = "hidden";


      // Pause videos from inactive section
      section.querySelectorAll("video").forEach(function (video) {

        try {
          video.pause();
        } catch (err) {}

      });

    });


    // Set selected page
    currentIndex = index;

    var activeSection =
      sections[currentIndex];


    activeSection.style.display = "flex";
    activeSection.style.opacity = "1";
    activeSection.style.visibility = "visible";

    activeSection.classList.add("active");


    // Restart autoplay videos
    activeSection
      .querySelectorAll(
        "video[autoplay], video.bg-video, video.about-bg-video"
      )
      .forEach(function (video) {

        video.muted = true;

        video.play().catch(function () {});

      });


    // Change URL
    if (updateUrl) {

      history.pushState(
        null,
        "",
        "#" + activeSection.id
      );

    }


    // Go to top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    updateSectionArrows();
    updateActiveNav();

  }


  // ====================================================
  // PREVIOUS / NEXT BUTTONS
  // ====================================================

  function updateSectionArrows() {

    if (prevSectionBtn) {

      prevSectionBtn.classList.toggle(
        "hidden",
        currentIndex === 0
      );

    }


    if (nextSectionBtn) {

      nextSectionBtn.classList.toggle(
        "hidden",
        currentIndex === sections.length - 1
      );

    }

  }


  // ====================================================
  // ACTIVE NAVIGATION
  // ====================================================

  function updateActiveNav() {

    var activeId =
      sections[currentIndex]
        ? sections[currentIndex].id
        : "";


    document.querySelectorAll(".nav-link").forEach(function (link) {

      link.classList.remove(
        "text-yellow-300"
      );


      if (
        link.getAttribute("data-target") === activeId
      ) {

        link.classList.add(
          "text-yellow-300"
        );

      }

    });

  }


  // ====================================================
  // MENU CLICK
  // ====================================================

  document.addEventListener("click", function (event) {

    var link =
      event.target.closest(".nav-link");


    if (!link) {
      return;
    }


    var targetId =
      link.getAttribute("data-target");


    if (!targetId) {
      return;
    }


    var index =
      sections.findIndex(function (section) {

        return section.id === targetId;

      });


    if (index === -1) {
      return;
    }


    event.preventDefault();


    showPage(index);


    // Close mobile navigation
    if (mobileMenu) {

      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");

    }

  });


  // ====================================================
  // PREVIOUS
  // ====================================================

  if (prevSectionBtn) {

    prevSectionBtn.addEventListener("click", function () {

      if (currentIndex > 0) {

        showPage(
          currentIndex - 1
        );

      }

    });

  }


  // ====================================================
  // NEXT
  // ====================================================

  if (nextSectionBtn) {

    nextSectionBtn.addEventListener("click", function () {

      if (
        currentIndex <
        sections.length - 1
      ) {

        showPage(
          currentIndex + 1
        );

      }

    });

  }


  // ====================================================
  // MOBILE MENU
  // ====================================================

  if (
    menuToggle &&
    mobileMenu
  ) {

    menuToggle.addEventListener("click", function () {

      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");

    });

  }


  // ====================================================
  // PARTICIPANT SEARCH
  // Automatically works for March + August
  // ====================================================

  document
    .querySelectorAll(".participants-search")
    .forEach(function (searchBox) {


      searchBox.addEventListener("input", function () {


        var searchValue =
          this.value
            .toLowerCase()
            .trim();


        var panel =
          this.closest(".fam-panel");


        if (!panel) {
          return;
        }


        var tbody =
          panel.querySelector(
            ".participants-table tbody"
          );


        if (!tbody) {
          return;
        }


        tbody
          .querySelectorAll("tr")
          .forEach(function (row) {


            var rowText =
              row.textContent
                .toLowerCase();


            row.style.display =
              rowText.includes(searchValue)
                ? ""
                : "none";


          });


      });


    });


  // ====================================================
  // BROWSER BACK / FORWARD
  // ====================================================

  window.addEventListener("popstate", function () {


    var hash =
      window.location.hash
        .replace("#", "");


    var index =
      sections.findIndex(function (section) {

        return section.id === hash;

      });


    if (index !== -1) {

      showPage(
        index,
        false
      );

    }

  });


  // ====================================================
  // INITIAL URL
  // ====================================================

  var initialHash =
    window.location.hash
      .replace("#", "");


  // Support old #partners links
  if (initialHash === "partners") {

    initialHash = "rtffam";

  }


  var initialIndex =
    sections.findIndex(function (section) {

      return section.id === initialHash;

    });


  if (initialIndex !== -1) {

    showPage(
      initialIndex,
      false
    );

  } else {

    showPage(
      0,
      false
    );

  }

});
