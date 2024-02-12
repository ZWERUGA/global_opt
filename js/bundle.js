/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/check-valid.js":
/*!***********************************!*\
  !*** ./js/modules/check-valid.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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




/***/ }),

/***/ "./node_modules/wow.js/dist/wow.js":
/*!*****************************************!*\
  !*** ./node_modules/wow.js/dist/wow.js ***!
  \*****************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _class, _temp;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function isIn(needle, haystack) {
    return haystack.indexOf(needle) >= 0;
  }

  function extend(custom, defaults) {
    for (var key in defaults) {
      if (custom[key] == null) {
        var value = defaults[key];
        custom[key] = value;
      }
    }
    return custom;
  }

  function isMobile(agent) {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
    );
  }

  function createEvent(event) {
    var bubble = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var cancel = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var detail = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var customEvent = void 0;
    if (document.createEvent != null) {
      // W3C DOM
      customEvent = document.createEvent('CustomEvent');
      customEvent.initCustomEvent(event, bubble, cancel, detail);
    } else if (document.createEventObject != null) {
      // IE DOM < 9
      customEvent = document.createEventObject();
      customEvent.eventType = event;
    } else {
      customEvent.eventName = event;
    }

    return customEvent;
  }

  function emitEvent(elem, event) {
    if (elem.dispatchEvent != null) {
      // W3C DOM
      elem.dispatchEvent(event);
    } else if (event in (elem != null)) {
      elem[event]();
    } else if ('on' + event in (elem != null)) {
      elem['on' + event]();
    }
  }

  function addEvent(elem, event, fn) {
    if (elem.addEventListener != null) {
      // W3C DOM
      elem.addEventListener(event, fn, false);
    } else if (elem.attachEvent != null) {
      // IE DOM
      elem.attachEvent('on' + event, fn);
    } else {
      // fallback
      elem[event] = fn;
    }
  }

  function removeEvent(elem, event, fn) {
    if (elem.removeEventListener != null) {
      // W3C DOM
      elem.removeEventListener(event, fn, false);
    } else if (elem.detachEvent != null) {
      // IE DOM
      elem.detachEvent('on' + event, fn);
    } else {
      // fallback
      delete elem[event];
    }
  }

  function getInnerHeight() {
    if ('innerHeight' in window) {
      return window.innerHeight;
    }

    return document.documentElement.clientHeight;
  }

  // Minimalistic WeakMap shim, just in case.
  var WeakMap = window.WeakMap || window.MozWeakMap || function () {
    function WeakMap() {
      _classCallCheck(this, WeakMap);

      this.keys = [];
      this.values = [];
    }

    _createClass(WeakMap, [{
      key: 'get',
      value: function get(key) {
        for (var i = 0; i < this.keys.length; i++) {
          var item = this.keys[i];
          if (item === key) {
            return this.values[i];
          }
        }
        return undefined;
      }
    }, {
      key: 'set',
      value: function set(key, value) {
        for (var i = 0; i < this.keys.length; i++) {
          var item = this.keys[i];
          if (item === key) {
            this.values[i] = value;
            return this;
          }
        }
        this.keys.push(key);
        this.values.push(value);
        return this;
      }
    }]);

    return WeakMap;
  }();

  // Dummy MutationObserver, to avoid raising exceptions.
  var MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (_temp = _class = function () {
    function MutationObserver() {
      _classCallCheck(this, MutationObserver);

      if (typeof console !== 'undefined' && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    _createClass(MutationObserver, [{
      key: 'observe',
      value: function observe() {}
    }]);

    return MutationObserver;
  }(), _class.notSupported = true, _temp);

  // getComputedStyle shim, from http://stackoverflow.com/a/21797294
  var getComputedStyle = window.getComputedStyle || function getComputedStyle(el) {
    var getComputedStyleRX = /(\-([a-z]){1})/g;
    return {
      getPropertyValue: function getPropertyValue(prop) {
        if (prop === 'float') {
          prop = 'styleFloat';
        }
        if (getComputedStyleRX.test(prop)) {
          prop.replace(getComputedStyleRX, function (_, _char) {
            return _char.toUpperCase();
          });
        }
        var currentStyle = el.currentStyle;

        return (currentStyle != null ? currentStyle[prop] : void 0) || null;
      }
    };
  };

  var WOW = function () {
    function WOW() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, WOW);

      this.defaults = {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
        callback: null,
        scrollContainer: null
      };

      this.animate = function animateFactory() {
        if ('requestAnimationFrame' in window) {
          return function (callback) {
            return window.requestAnimationFrame(callback);
          };
        }
        return function (callback) {
          return callback();
        };
      }();

      this.vendors = ['moz', 'webkit'];

      this.start = this.start.bind(this);
      this.resetAnimation = this.resetAnimation.bind(this);
      this.scrollHandler = this.scrollHandler.bind(this);
      this.scrollCallback = this.scrollCallback.bind(this);
      this.scrolled = true;
      this.config = extend(options, this.defaults);
      if (options.scrollContainer != null) {
        this.config.scrollContainer = document.querySelector(options.scrollContainer);
      }
      // Map of elements to animation names:
      this.animationNameCache = new WeakMap();
      this.wowEvent = createEvent(this.config.boxClass);
    }

    _createClass(WOW, [{
      key: 'init',
      value: function init() {
        this.element = window.document.documentElement;
        if (isIn(document.readyState, ['interactive', 'complete'])) {
          this.start();
        } else {
          addEvent(document, 'DOMContentLoaded', this.start);
        }
        this.finished = [];
      }
    }, {
      key: 'start',
      value: function start() {
        var _this = this;

        this.stopped = false;
        this.boxes = [].slice.call(this.element.querySelectorAll('.' + this.config.boxClass));
        this.all = this.boxes.slice(0);
        if (this.boxes.length) {
          if (this.disabled()) {
            this.resetStyle();
          } else {
            for (var i = 0; i < this.boxes.length; i++) {
              var box = this.boxes[i];
              this.applyStyle(box, true);
            }
          }
        }
        if (!this.disabled()) {
          addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
          addEvent(window, 'resize', this.scrollHandler);
          this.interval = setInterval(this.scrollCallback, 50);
        }
        if (this.config.live) {
          var mut = new MutationObserver(function (records) {
            for (var j = 0; j < records.length; j++) {
              var record = records[j];
              for (var k = 0; k < record.addedNodes.length; k++) {
                var node = record.addedNodes[k];
                _this.doSync(node);
              }
            }
            return undefined;
          });
          mut.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.stopped = true;
        removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
        removeEvent(window, 'resize', this.scrollHandler);
        if (this.interval != null) {
          clearInterval(this.interval);
        }
      }
    }, {
      key: 'sync',
      value: function sync() {
        if (MutationObserver.notSupported) {
          this.doSync(this.element);
        }
      }
    }, {
      key: 'doSync',
      value: function doSync(element) {
        if (typeof element === 'undefined' || element === null) {
          element = this.element;
        }
        if (element.nodeType !== 1) {
          return;
        }
        element = element.parentNode || element;
        var iterable = element.querySelectorAll('.' + this.config.boxClass);
        for (var i = 0; i < iterable.length; i++) {
          var box = iterable[i];
          if (!isIn(box, this.all)) {
            this.boxes.push(box);
            this.all.push(box);
            if (this.stopped || this.disabled()) {
              this.resetStyle();
            } else {
              this.applyStyle(box, true);
            }
            this.scrolled = true;
          }
        }
      }
    }, {
      key: 'show',
      value: function show(box) {
        this.applyStyle(box);
        box.className = box.className + ' ' + this.config.animateClass;
        if (this.config.callback != null) {
          this.config.callback(box);
        }
        emitEvent(box, this.wowEvent);

        addEvent(box, 'animationend', this.resetAnimation);
        addEvent(box, 'oanimationend', this.resetAnimation);
        addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
        addEvent(box, 'MSAnimationEnd', this.resetAnimation);

        return box;
      }
    }, {
      key: 'applyStyle',
      value: function applyStyle(box, hidden) {
        var _this2 = this;

        var duration = box.getAttribute('data-wow-duration');
        var delay = box.getAttribute('data-wow-delay');
        var iteration = box.getAttribute('data-wow-iteration');

        return this.animate(function () {
          return _this2.customStyle(box, hidden, duration, delay, iteration);
        });
      }
    }, {
      key: 'resetStyle',
      value: function resetStyle() {
        for (var i = 0; i < this.boxes.length; i++) {
          var box = this.boxes[i];
          box.style.visibility = 'visible';
        }
        return undefined;
      }
    }, {
      key: 'resetAnimation',
      value: function resetAnimation(event) {
        if (event.type.toLowerCase().indexOf('animationend') >= 0) {
          var target = event.target || event.srcElement;
          target.className = target.className.replace(this.config.animateClass, '').trim();
        }
      }
    }, {
      key: 'customStyle',
      value: function customStyle(box, hidden, duration, delay, iteration) {
        if (hidden) {
          this.cacheAnimationName(box);
        }
        box.style.visibility = hidden ? 'hidden' : 'visible';

        if (duration) {
          this.vendorSet(box.style, { animationDuration: duration });
        }
        if (delay) {
          this.vendorSet(box.style, { animationDelay: delay });
        }
        if (iteration) {
          this.vendorSet(box.style, { animationIterationCount: iteration });
        }
        this.vendorSet(box.style, { animationName: hidden ? 'none' : this.cachedAnimationName(box) });

        return box;
      }
    }, {
      key: 'vendorSet',
      value: function vendorSet(elem, properties) {
        for (var name in properties) {
          if (properties.hasOwnProperty(name)) {
            var value = properties[name];
            elem['' + name] = value;
            for (var i = 0; i < this.vendors.length; i++) {
              var vendor = this.vendors[i];
              elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value;
            }
          }
        }
      }
    }, {
      key: 'vendorCSS',
      value: function vendorCSS(elem, property) {
        var style = getComputedStyle(elem);
        var result = style.getPropertyCSSValue(property);
        for (var i = 0; i < this.vendors.length; i++) {
          var vendor = this.vendors[i];
          result = result || style.getPropertyCSSValue('-' + vendor + '-' + property);
        }
        return result;
      }
    }, {
      key: 'animationName',
      value: function animationName(box) {
        var aName = void 0;
        try {
          aName = this.vendorCSS(box, 'animation-name').cssText;
        } catch (error) {
          // Opera, fall back to plain property value
          aName = getComputedStyle(box).getPropertyValue('animation-name');
        }

        if (aName === 'none') {
          return ''; // SVG/Firefox, unable to get animation name?
        }

        return aName;
      }
    }, {
      key: 'cacheAnimationName',
      value: function cacheAnimationName(box) {
        // https://bugzilla.mozilla.org/show_bug.cgi?id=921834
        // box.dataset is not supported for SVG elements in Firefox
        return this.animationNameCache.set(box, this.animationName(box));
      }
    }, {
      key: 'cachedAnimationName',
      value: function cachedAnimationName(box) {
        return this.animationNameCache.get(box);
      }
    }, {
      key: 'scrollHandler',
      value: function scrollHandler() {
        this.scrolled = true;
      }
    }, {
      key: 'scrollCallback',
      value: function scrollCallback() {
        if (this.scrolled) {
          this.scrolled = false;
          var results = [];
          for (var i = 0; i < this.boxes.length; i++) {
            var box = this.boxes[i];
            if (box) {
              if (this.isVisible(box)) {
                this.show(box);
                continue;
              }
              results.push(box);
            }
          }
          this.boxes = results;
          if (!this.boxes.length && !this.config.live) {
            this.stop();
          }
        }
      }
    }, {
      key: 'offsetTop',
      value: function offsetTop(element) {
        // SVG elements don't have an offsetTop in Firefox.
        // This will use their nearest parent that has an offsetTop.
        // Also, using ('offsetTop' of element) causes an exception in Firefox.
        while (element.offsetTop === undefined) {
          element = element.parentNode;
        }
        var top = element.offsetTop;
        while (element.offsetParent) {
          element = element.offsetParent;
          top += element.offsetTop;
        }
        return top;
      }
    }, {
      key: 'isVisible',
      value: function isVisible(box) {
        var offset = box.getAttribute('data-wow-offset') || this.config.offset;
        var viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
        var viewBottom = viewTop + Math.min(this.element.clientHeight, getInnerHeight()) - offset;
        var top = this.offsetTop(box);
        var bottom = top + box.clientHeight;

        return top <= viewBottom && bottom >= viewTop;
      }
    }, {
      key: 'disabled',
      value: function disabled() {
        return !this.config.mobile && isMobile(navigator.userAgent);
      }
    }]);

    return WOW;
  }();

  exports.default = WOW;
  module.exports = exports['default'];
});


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_mobile_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/mobile-nav */ "./js/modules/mobile-nav.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_reviews_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/reviews-slider */ "./js/modules/reviews-slider.js");
/* harmony import */ var _modules_yandex_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/yandex-map */ "./js/modules/yandex-map.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var wow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wow.js */ "./node_modules/wow.js/dist/wow.js");
/* harmony import */ var wow_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(wow_js__WEBPACK_IMPORTED_MODULE_5__);









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

  new (wow_js__WEBPACK_IMPORTED_MODULE_5___default())().init();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map