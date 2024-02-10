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

export default checkValid;
