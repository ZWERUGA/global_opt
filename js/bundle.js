/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/check-valid.js":
/*!***********************************!*\
  !*** ./js/modules/check-valid.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function checkValid(form) {
  let nameValid = false;
  let phoneValid = false;
  let emailValid = false;
  let messagesValid = false;

  const nameRegexp = /([А-Я][а-я]+)$/i;
  const phoneRegexp = /^((\+7|7|8)+([0-9]){10})$/;
  const emailRegexp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
  const messageRegexp = /^([а-яА-Я0-9]+)$/i;

  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.name === "name") {
      nameValid = getValid(nameRegexp, input.value, input);
    } else if (input.name === "phone") {
      phoneValid = getValid(phoneRegexp, input.value, input);
    } else if (input.name === "email") {
      emailValid = getValid(emailRegexp, input.value, input);
    }
  });

  if (form.getAttribute("id") === "form_questions") {
    const textarea = form.querySelector("textarea");
    messagesValid = getValid(messageRegexp, textarea.value, textarea);
  }

  function getValid(regexp, value, input) {
    if (regexp.test(value)) {
      input.classList.remove("error");
      input.classList.add("success");
      return true;
    }

    input.classList.remove("success");
    input.classList.add("error");
    return false;
  }

  if (form.getAttribute("id") === "form_consultation") {
    if (nameValid && phoneValid && emailValid) {
      return true;
    } else {
      return false;
    }
  } else if (form.getAttribute("id") === "form_questions") {
    if (nameValid && phoneValid && emailValid && messagesValid) {
      return true;
    } else {
      return false;
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkValid);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _check_valid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check-valid */ "./js/modules/check-valid.js");



function forms(selector) {
  const forms = document.querySelectorAll(selector);

  const titles = {
    consultation: "Бесплатная консультация",
    questions: "Отправка сообщения",
  };

  const messages = {
    successConsultation: "Спасибо! Скоро мы с вами свяжемся!",
    successQuestions:
      "Спасибо! Ваше сообщение доставлено! Скоро мы с вами свяжемся!",
    failure: "Что-то пошло не так!",
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if ((0,_check_valid__WEBPACK_IMPORTED_MODULE_1__["default"])(form)) {
        const formSubmitBtn = form.querySelector(".btn");
        formSubmitBtn.classList.add("btn_loading");

        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        const formId = form.getAttribute("id");
        const title =
          formId === "form_consultation"
            ? titles.consultation
            : titles.questions;
        const message =
          formId === "form_consultation"
            ? messages.successConsultation
            : messages.successQuestions;

        console.log("VALID");

        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)("http://localhost:3000/requests", json)
          .then((data) => {
            console.log(data);
            showThanksModal(title, message);
          })
          .catch(() => {
            showThanksModal(title, messages.failure);
          })
          .finally(() => {
            form.reset();
            defaultStyle(form);
          });
      }
    });
  }

  function showThanksModal(title, message) {
    const overlayModal = document.querySelector(".overlay_modal");
    const modal = overlayModal.querySelector(".modal");
    const modalContent = modal.querySelector(".modal__content");

    modalContent.innerHTML = `
      <h2 class="modal__content-title">
          ${title}
      </h2>
      <div class="modal__content-descr">
          ${message}
      </div>
    `;

    overlayModal.classList.add("overlay_active");
  }

  function defaultStyle(form) {
    form.querySelector(".btn").classList.remove("btn_loading");
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      input.classList.remove("success")
    });

    if (form.getAttribute("id") === "form_questions") {
      form.querySelector("textarea").classList.remove("success");
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/mobile-nav.js":
/*!**********************************!*\
  !*** ./js/modules/mobile-nav.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mobileNav);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal(overlay, closeBtn, activeClass) {
  const overlayModal = document.querySelector(overlay);
  const modalClose = overlayModal.querySelector(closeBtn);

  modalClose.addEventListener("click", () => {
    overlayModal.classList.remove(activeClass);
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/reviews-slider.js":
/*!**************************************!*\
  !*** ./js/modules/reviews-slider.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function reviewsSlider({
  wrapper,
  reviewsItems,
  prevBtn,
  nextBtn,
  inner,
  activeClass,
}) {
  const reviewsWrapper = document.querySelector(wrapper);
  const reviews = reviewsWrapper.querySelectorAll(reviewsItems);
  const prevReviewBtn = reviewsWrapper.querySelector(prevBtn);
  const nextReviewBtn = reviewsWrapper.querySelector(nextBtn);
  const reviewsInner = reviewsWrapper.querySelector(inner);
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
    if (e.currentTarget.classList.contains(activeClass)) {
      e.preventDefault();

      if (e.deltaY < 0) {
        nextReview();
      } else {
        prevReview();
      }
    }
  }

  if (reviews.length > 1) {
    reviews.forEach((review) => {
      review.addEventListener("touchstart", handleTouchStart, false);
      review.addEventListener("touchmove", handleTouchMove, false);
      review.addEventListener("wheel", handleWheel, false);
    });
  }

  const mediaQueryMobile = window.matchMedia("(max-width: 1000px)");

  if (mediaQueryMobile.matches) {
    reviews.forEach((review) => {
      review.removeEventListener("wheel", handleWheel, false);
    });
  }

  mediaQueryMobile.addEventListener("change", (e) => {
    if (e.matches) {
      reviews.forEach((review) => {
        review.removeEventListener("wheel", handleWheel, false);
      });
    } else {
      reviews.forEach((review) => {
        review.addEventListener("wheel", handleWheel, false);
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
      review.classList.remove(activeClass);
    });

    reviews[reviewIndex].classList.add(activeClass);
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reviewsSlider);


/***/ }),

/***/ "./js/modules/yandex-map.js":
/*!**********************************!*\
  !*** ./js/modules/yandex-map.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function yandexMap(mapSelector, balloon, img) {
  // YANDEX MAP
  function init() {
    const map = new ymaps.Map(
      mapSelector,
      {
        center: [55.74797656898648, 37.627220499999915],
        zoom: 17,
        controls: ["zoomControl"],
      },
      {
        yandexMapDisablePoiInteractivity: true,
      }
    );

    map.options.yandexMapDisablePoiInteractivity = false;

    const myPlacemark = new ymaps.Placemark(
      map.getCenter(),
      {},
      {
        iconLayout: "default#image",
        iconImageHref: img,
        iconImageSize: [62, 63],
      }
    );

    map.geoObjects.add(myPlacemark);
    map.behaviors.disable([
      "drag",
      "scrollZoom",
      "dblClickZoom",
      "multiTouch",
      "rightMouseButtonMagnifier",
    ]);

    function closeDesktopBalloon() {
      document.querySelector(balloon).style.display = "none";
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
          offset: [15, -50],
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
        document.querySelector(balloon).style.display = "block";
      }
    });
  }

  ymaps.ready(init);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (yandexMap);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_mobile_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/mobile-nav */ "./js/modules/mobile-nav.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_reviews_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/reviews-slider */ "./js/modules/reviews-slider.js");
/* harmony import */ var _modules_yandex_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/yandex-map */ "./js/modules/yandex-map.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");








document.addEventListener("DOMContentLoaded", () => {
  (0,_modules_mobile_nav__WEBPACK_IMPORTED_MODULE_0__["default"])(".overlay_mobile", ".mobile-btn", ".close-btn", "overlay_active");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])(".overlay_modal", ".modal__close", "overlay_active");
  (0,_modules_reviews_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
    wrapper: ".reviews__wrapper",
    reviewsItems: ".reviews__item",
    prevBtn: ".reviews__prev",
    nextBtn: ".reviews__next",
    inner: ".reviews__inner",
    activeClass: "reviews__item_active",
  });
  (0,_modules_yandex_map__WEBPACK_IMPORTED_MODULE_3__["default"])("map", "#desktop-balloon", "img/logo/logo-map.png");
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form");
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map