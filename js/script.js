"use strict";

import mobileNav from "./modules/mobile-nav";
import modal from "./modules/modal";
import reviewsSlider from "./modules/reviews-slider";
import yandexMap from "./modules/yandex-map";
import forms from "./modules/forms";
import validators from "./modules/validators";

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
  validators();
});
