document.addEventListener("DOMContentLoaded", function () {
  /*=============== HEADER & NAV SCROLL ===============*/
  function scrollHeader() {
    const header = document.getElementById("header");
    if (this.scrollY >= 50) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");
  }
  window.addEventListener("scroll", scrollHeader);

  /*=============== ACTIVE NAV LINK ON SCROLL ===============*/
  const sections = document.querySelectorAll("section[id]");
  function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute("id"),
        navLink = document.querySelector(
          ".nav__menu a[href*=" + sectionId + "]"
        );
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add("active-link");
      } else {
        if (navLink) navLink.classList.remove("active-link");
      }
    });
  }
  window.addEventListener("scroll", scrollActive);

  /*=============== DARK LIGHT THEME ===============*/
  const themeButton = document.getElementById("theme-button");
  const darkTheme = "dark-theme",
    iconTheme = "uil-sun";
  const selectedTheme = localStorage.getItem("selected-theme"),
    selectedIcon = localStorage.getItem("selected-icon");
  const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";
  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      darkTheme
    );
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
      iconTheme
    );
  }
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });

  /*=============== SKILLS ACCORDION ===============*/
  const skillsHeader = document.querySelectorAll(".skills__header");
  function toggleSkills() {
    let item = this.parentElement;
    if (item.classList.contains("skills-open")) {
      item.classList.remove("skills-open");
    } else {
      // Close other open skills accordions first
      skillsHeader.forEach((el) =>
        el.parentElement.classList.remove("skills-open")
      );
      item.classList.add("skills-open");
    }
  }
  skillsHeader.forEach((el) => el.addEventListener("click", toggleSkills));

  /*=============== QUALIFICATION TABS ===============*/
  const tabs = document.querySelectorAll("[data-target]"),
    tabContents = document.querySelectorAll("[data-content]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.target);
      tabContents.forEach((tabContent) => {
        tabContent.classList.remove("qualification__content-active");
      });
      target.classList.add("qualification__content-active");
      tabs.forEach((t) => {
        t.classList.remove("qualification__active");
      });
      tab.classList.add("qualification__active");
    });
  });

  /*=============== EXPERIENCE ACCORDION ===============*/
  const experienceHeaders = document.querySelectorAll(".qualification__header");
  function toggleExperience() {
    const item = this.parentElement;
    if (!item.classList.contains("qualification-open")) {
      // Close all other items before opening the new one
      experienceHeaders.forEach((el) => {
        if (el.closest("#experience") && el.parentElement !== item) {
          el.parentElement.classList.remove("qualification-open");
        }
      });
    }
    // Toggle the clicked item
    item.classList.toggle("qualification-open");
  }
  experienceHeaders.forEach((el) => {
    // Only add the event listener to headers within the 'experience' tab
    if (el.closest("#experience")) {
      el.addEventListener("click", toggleExperience);
    }
  });

  /*=============== PROJECT FILTERING ===============*/
  const filterContainer = document.querySelector(".projects__filters"),
    projectCards = document.querySelectorAll(".project__card");
  if (filterContainer) {
    filterContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("projects__filter-item")) {
        filterContainer
          .querySelector(".active-filter")
          .classList.remove("active-filter");
        e.target.classList.add("active-filter");
        const filterValue = e.target.getAttribute("data-filter");
        projectCards.forEach((card) => {
          if (
            card.classList.contains(filterValue.replace(".", "")) ||
            filterValue === "all"
          ) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }
    });
  }

  /*=============== SCROLL REVEAL ANIMATION ===============*/
  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2000,
    delay: 200,
  });
  sr.reveal(
    `.home__data, .about__container, .skills__container, .qualification__container, .projects__container, .contact__container`
  );

  /*=============== SHOW SCROLL UP ===============*/
  function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");
    if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
  }
  window.addEventListener("scroll", scrollUp);

  /*=============== SET SKILL BAR WIDTHS ===============*/
  document.querySelectorAll(".skills__percentage").forEach((bar) => {
    const width = bar.getAttribute("data-width");
    if (width) {
      bar.style.width = width;
    }
  });
});
