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

export default yandexMap;
