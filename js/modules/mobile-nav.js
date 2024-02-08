function mobileNav(overlaySelector, openBtn, closeBtn, activeClass) {
  const overlay = document.querySelector(overlaySelector);
  const mobileOpenBtn = document.querySelector(openBtn);
  const mobileCloseBtn = document.querySelector(closeBtn);
  const mobileLinks = overlay.querySelectorAll(".mobile-nav__link");

  mobileLinks.forEach((mobileLink) => {
    mobileLink.addEventListener("click", () => {
      overlay.classList.remove(activeClass);
    });
  });

  mobileOpenBtn.addEventListener("click", () => {
    overlay.classList.add(activeClass);
  });

  mobileCloseBtn.addEventListener("click", () => {
    overlay.classList.remove(activeClass);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) {
      overlay.classList.remove(activeClass);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && overlay.classList.contains(activeClass)) {
      overlay.classList.remove(activeClass);
    }
  });
}

export default mobileNav;
