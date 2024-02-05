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
  let y1 = null;

  function handleTouchStart(e) {
    x1 = e.touches[0].clientX;
    y1 = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
    if (!x1 || !y1) {
      return false;
    }

    const x2 = e.touches[0].clientX;
    const y2 = e.touches[0].clientY;

    const xDiff = x2 - x1;
    const yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff < 0) {
        prevReview();
      } else {
        nextReview();
      }
    }

    x1 = null;
    y1 = null;
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

  if (reviews.length > 1) {
    reviewsItems.forEach((reviewItem) => {
      reviewItem.addEventListener("touchstart", handleTouchStart, false);
      reviewItem.addEventListener("touchmove", handleTouchMove, false);
      reviewItem.addEventListener("wheel", handleWheel, false);
    });
  }

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

  // YANDEX MAP
  function init() {
    const map = new ymaps.Map("map", {
      center: [55.74797656898648, 37.627220499999915],
      zoom: 17,
      controls: ["zoomControl", "fullscreenControl"],
    });

    const myPlacemark = new ymaps.Placemark(
      map.getCenter(),
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "img/logo/logo-map.png",
        iconImageSize: [62, 63],
      }
    );

    map.geoObjects.add(myPlacemark);
    map.behaviors.disable(["drag", "scrollZoom", "dblClickZoom", "multiTouch"]);

    function closeDesktopBalloon() {
      document.querySelector("#desktop-balloon").style.display = "none";
    }

    function openBalloon() {
      map.balloon.open(
        [55.74797656898648, 37.627220499999915],
        `
          <div class="balloon balloon_mobile">
            <div class="item-title balloon__title">г. Москва</div>
            <address class="item-descr balloon__address">
              ул. Садовническая, дом 5, офис 4-6 700 от м. Новокузнецкая
              <br />
              Тел: +7 (926) 423 01 00
            </address>
            <div class="balloon__link">
              <a href="mailto:info@glopt.ru">info@glopt.ru</a>
            </div>
          </div>
        `,
        {
          closeButton: false,
          offset: [15, -50]
        }
      );
    }

    const mediaQueryMap = window.matchMedia("(max-width: 800px)");

    if (mediaQueryMap.matches) {
      openBalloon();
      closeDesktopBalloon();
    }

    mediaQueryMap.addEventListener("change", () => {
      if (mediaQueryMap.matches) {
        openBalloon();
        closeDesktopBalloon();
      } else {
        map.balloon.close();
        document.querySelector("#desktop-balloon").style.display = "block";
      }
    });
  }

  ymaps.ready(init);
});
