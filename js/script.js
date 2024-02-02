"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // MOBILE NAV
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
  });

  function close(selector) {
    overlay.classList.remove(selector);
  }

  // REVIEWS SLIDER
  const reviewsWrapper = document.querySelector(".reviews__wrapper");
  const reviews = reviewsWrapper.querySelectorAll(".reviews__item");
  const prevReviewBtn = reviewsWrapper.querySelector(".reviews__prev");
  const nextReviewBtn = reviewsWrapper.querySelector(".reviews__next");
  const reviewsInner = reviewsWrapper.querySelector(".reviews__inner");
  let reviewIndex = 1;
  let offset = 0;
  
  reviewsInner.style.width = setInnerSize();

  prevReviewBtn.addEventListener("click", () => {
    if (reviewIndex == 0) {
      return;
    }

    changeReviewIndex(-1);
    changeReview();

    reviewsInner.style.transform = `translateX(${(offset += 403)}px)`;
  });

  nextReviewBtn.addEventListener("click", () => {
    if (reviewIndex == reviews.length - 1) {
      return;
    }

    changeReviewIndex(1);
    changeReview();

    reviewsInner.style.transform = `translateX(${(offset -= 403)}px)`;
  });

  function setInnerSize() {
    const reviewsNotActiveWidth = (reviews.length - 1) * 358;
    const reviewsColumnGupWidth = (reviews.length - 1) * 45;
    const reviewActiveWidth = 606;

    const resultWidth = reviewsNotActiveWidth + reviewsColumnGupWidth + reviewActiveWidth;

    return `${resultWidth}px`;
  }

  function changeReviewIndex(value) {
    reviewIndex += value;

    if (reviewIndex <= 0) {
      reviewIndex = 0;
    }

    if (reviewIndex >= reviews.length - 1) {
      reviewIndex = reviews.length - 1;
    }
  }

  function changeReview() {
    reviews.forEach((review) => {
      review.classList.remove("reviews__item_active");
    });

    reviews[reviewIndex].classList.add("reviews__item_active");
  }
});
