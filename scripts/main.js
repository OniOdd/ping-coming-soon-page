"use strict";

const form = document.getElementById("notify-form");
const modal = document.getElementById("subscribed-modal");
const emailInput = document.getElementById("email-input");
const okBtn = document.getElementById("ok-button");
const bodyElemClasses = document.body.classList;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const errorMessageElem = document.getElementById("error-message");
  const emailInputClasses = emailInput.classList;

  if (errorMessageElem) errorMessageElem.remove();
  if (emailInputClasses.contains("error")) emailInputClasses.remove("error");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emptyMessage = "Whoops! It looks like you forgot to add your email";
  const errorMessage = "Please provide a valid email address";

  if (emailInput.value === "") {
    const pElem = createParagraphElement();

    pElem.textContent = emptyMessage;
    emailInput.after(pElem);
    emailInputClasses.add("error");

    return;
  }

  if (!emailPattern.test(emailInput.value)) {
    const pElem = createParagraphElement();

    pElem.textContent = errorMessage;
    emailInput.after(pElem);
    emailInputClasses.add("error");

    return;
  }

  bodyElemClasses.add("lock");
  modal.showModal();

  return;
});

okBtn.addEventListener("click", () => {
  bodyElemClasses.remove("lock");
  emailInput.value = "";
  modal.close();

  return;
});

function createParagraphElement() {
  const pElem = document.createElement("p");
  pElem.setAttribute("class", "ping-section__error-message");
  pElem.setAttribute("id", "error-message");

  return pElem;
}
