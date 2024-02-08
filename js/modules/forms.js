import { postData } from "../services/services";

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

      const formSubmitBtn = form.querySelector(".btn");
      formSubmitBtn.classList.add("btn_loading");

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          const formId = form.getAttribute("id");
          const title =
            formId === "form_consultation"
              ? titles.consultation
              : titles.questions;
          const message =
            formId === "form_consultation"
              ? messages.successConsultation
              : messages.successQuestions;
          showThanksModal(title, message);
          formSubmitBtn.classList.remove("btn_loading");
        })
        .catch(() => {
          showThanksModal(title, messages.failure);
        })
        .finally(() => {
          form.reset();
        });
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
}

export default forms;
