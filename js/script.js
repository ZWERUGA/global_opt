"use strict";

const overlay = document.querySelector(".overlay");
const mobileOpenBtn = document.querySelector(".mobile-btn");
const mobileCloseBtn = document.querySelector(".close-btn");

mobileOpenBtn.addEventListener("click", () => {
    overlay.classList.add("overlay_active");
});

mobileCloseBtn.addEventListener("click", () => {
    close("overlay_active");
});

overlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) {
      close("overlay_active");
    }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && overlay.classList.contains("overlay_active")) {
    close("overlay_active");
  }
})

function close(selector) {
  overlay.classList.remove(selector);
}