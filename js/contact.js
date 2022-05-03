const form = document.querySelector("form");
const name = document.querySelector("#name-field");
const email = document.querySelector("#email-field");
const subject = document.querySelector("#subject-field");
const message = document.querySelector("#message");
const submitBtn = document.querySelector(".cta");

function validateForm(event) {
  event.preventDefault();

  if (checkLengths(name.value, 6)) {
    name.previousElementSibling.classList.add("warning");
    return false;
  } else {
    name.previousElementSibling.classList.remove("warning");
  }

  if (!checkEmail(email.value)) {
    email.previousElementSibling.classList.add("warning");
    return false;
  } else {
    email.previousElementSibling.classList.remove("warning");
  }

  if (checkLengths(subject.value, 16)) {
    subject.previousElementSibling.classList.add("warning");
    return false;
  } else {
    subject.previousElementSibling.classList.remove("warning");
  }

  if (checkLengths(message.value, 26)) {
    message.previousElementSibling.classList.add("warning");
    return false;
  } else {
    message.previousElementSibling.classList.remove("warning");
  }

  if (checkLengths && checkEmail) {
    submitForm();
  }
}

form.addEventListener("submit", validateForm);

name.addEventListener("keyup", () => {
  if (!checkLengths(name.value, 6)) {
    name.previousElementSibling.classList.remove("warning");
  }
});

email.addEventListener("keyup", () => {
  if (!checkEmail(email.value)) {
    email.previousElementSibling.classList.remove("warning");
  }
});

message.addEventListener("keyup", () => {
  if (!checkLengths(message.value, 26)) {
    message.previousElementSibling.classList.remove("warning");
  }
});

subject.addEventListener("keyup", () => {
  if (!checkLengths(subject.value, 16)) {
    subject.previousElementSibling.classList.remove("warning");
  }
});

function submitForm() {
  alert("Your message has been sent");
  form.reset();
}

function checkLengths(val, len) {
  if (val.trim().length < len) {
    return true;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const regExMatches = regEx.test(email);
  return regExMatches;
}
