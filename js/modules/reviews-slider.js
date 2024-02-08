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

export default reviewsSlider;
