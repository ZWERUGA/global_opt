function validators() {
  const forms = document.querySelectorAll("form");
  let nameValid = false;
  let phoneValid = false;
  let emailValid = false;
  let messageValid = false;

  const nameRegexp = /([А-Я][а-я]+)$/i;
  const phoneRegexp = /^((\+7|7|8)+([0-9]){10})$/;
  const emailRegexp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
  const messageRegexp = /^([а-яА-Я0-9]+)$/i;

  forms.forEach((form) => {
    form.name.addEventListener("input", () =>
      bindCheckInputValue(nameRegexp, form.name, nameValid)
    );
    form.phone.addEventListener("input", () =>
      bindCheckInputValue(phoneRegexp, form.phone, phoneValid)
    );
    form.email.addEventListener("input", () =>
      bindCheckInputValue(emailRegexp, form.email, emailValid)
    );
    if (form.message) {
      form.message.addEventListener("input", () => {
        bindCheckInputValue(messageRegexp, form.message, messageValid);
      });
    }
  });

  function bindCheckInputValue(regexp, input, validValue) {
    if (regexp.test(input.value)) {
      input.style.borderColor = "green";
      validValue = true;
    } else {
      input.style.borderColor = "red";
      validValue = false;
    }

    if (!input.value) {
      input.style.borderColor = "#c4c4c4";
      validValue = false;
    }
  }
}

export default validators;
