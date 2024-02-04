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
  const reviewsItems = reviewsInner.querySelectorAll(".reviews__item");
  let reviewIndex = 1;
  let offset = 0;

  reviewsInner.style.maxWidth = setInnerSize();

  if (reviews.length == 2) {
    reviewsInner.style.transform = `translateX(${(offset -= 201.5)}px)`;
    nextReviewBtn.style.display = "none";
  }

  if (reviews.length == 1) {
    prevReviewBtn.style.display = "none";
    nextReviewBtn.style.display = "none";
  }

  prevReviewBtn.addEventListener("click", nextReview);
  nextReviewBtn.addEventListener("click", prevReview);

  let x1 = null;

  function handleTouchStart(e) {
    x1 = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    if (!x1) {
      return false;
    }

    const x2 = e.touches[0].clientX;

    const xDiff = x2 - x1;

    if (xDiff < 0) {
      prevReview();
    } else {
      nextReview();
    }

    x1 = null;
  }

  function handleWheel(e) {
    if (e.currentTarget.classList.contains("reviews__item_active")) {
      e.preventDefault();

      if (e.deltaY < 0) {
        nextReview();
      } else {
        prevReview();
      }
    }
  }

  reviewsItems.forEach((reviewItem) => {
    reviewItem.addEventListener("touchstart", handleTouchStart, false);
    reviewItem.addEventListener("touchmove", handleTouchMove, false);
    reviewItem.addEventListener("wheel", handleWheel, false);
  });

  const mediaQueryMobile = window.matchMedia("(max-width: 1000px)");

  mediaQueryMobile.addEventListener("change", (e) => {
    if (e.matches) {
      reviewsItems.forEach((reviewItem) => {
        reviewItem.removeEventListener("wheel", handleWheel, false);
      });
    } else {
      reviewsItems.forEach((reviewItem) => {
        reviewItem.addEventListener("wheel", handleWheel, false);
      });
    }
  });

  function setInnerSize() {
    const reviewsNotActiveWidth = (reviews.length - 1) * 358;
    const reviewsColumnGupWidth = (reviews.length - 1) * 45;
    const reviewActiveWidth = 606;

    const resultWidth =
      reviewsNotActiveWidth + reviewsColumnGupWidth + reviewActiveWidth;

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

  function nextReview() {
    if (reviewIndex == 0) {
      return;
    }

    changeReviewIndex(-1);
    changeReview();

    if (reviewIndex == 0) {
      prevReviewBtn.style.display = "none";
    }
    nextReviewBtn.style.display = "flex";

    reviewsInner.style.transform = `translateX(${(offset += 403)}px)`;
  }

  function prevReview() {
    if (reviewIndex == reviews.length - 1) {
      return;
    }

    changeReviewIndex(1);
    changeReview();

    if (reviewIndex == reviews.length - 1) {
      nextReviewBtn.style.display = "none";
    }
    prevReviewBtn.style.display = "flex";

    reviewsInner.style.transform = `translateX(${(offset -= 403)}px)`;
  }
});
