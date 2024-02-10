import { postData } from "../services/services";
import checkValid from "./check-valid";

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

      if (checkValid(form)) {
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

        postData("http://localhost:3000/requests", json)
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

export default forms;
