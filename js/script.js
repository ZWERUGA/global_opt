"use strict";

import mobileNav from "./modules/mobile-nav";
import modal from "./modules/modal";
import reviewsSlider from "./modules/reviews-slider";
import yandexMap from "./modules/yandex-map";
import forms from "./modules/forms";
import WOW from "wow.js";

document.addEventListener("DOMContentLoaded", () => {
  mobileNav(".overlay_mobile", ".mobile-btn", ".close-btn", "overlay_active");
  modal(".overlay_modal", ".modal__close", "overlay_active");
  reviewsSlider({
    wrapper: ".reviews__wrapper",
    reviewsItems: ".reviews__item",
    prevBtn: ".reviews__prev",
    nextBtn: ".reviews__next",
    inner: ".reviews__inner",
    activeClass: "reviews__item_active",
  });
  yandexMap("map", "#desktop-balloon", "img/logo/logo-map.png");
  forms("form");

  const pageUpBtn = document.querySelector(".page-up");

  pageUpBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  function scrollTop() {
    if (
      document.body.scrollTop > 1000 ||
      document.documentElement.scrollTop > 1000
    ) {
      pageUpBtn.classList.add("page-up_active");
    } else {
      pageUpBtn.classList.remove("page-up_active");
    }
  }
  window.addEventListener("scroll", scrollTop);

  new WOW().init();
});
