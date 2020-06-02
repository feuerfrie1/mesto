import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const page = document.querySelector(".page");
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCreateCard = document.querySelector(".popup__createcard");
const popupCloseButton = document.querySelector(".popup__close");
const popupCreateCloseButton = document.querySelector(".popup__createcardclose");
const submitButton = document.querySelector(".popup__submit");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
const createSrcInput = document.querySelector(".popup__input_card-about");
const createNameInput = document.querySelector(".popup__input_card-name");
const popupScaleImage = document.getElementById("image-scale");
const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__info-title");
const profileSubtitle = document.querySelector(".profile__info-subtitle");
const createButton = document.querySelector(".popup__submit_create");
export const imageScaleButton = document.querySelector(".popup__imagescale");
export const bigImage = document.querySelector(".popup__image");
export const bigImageName = document.querySelector(".popup__imagename");
const popupImageScale = document.querySelector(".popup__imagescale");
const popupImageScaleCloseButton = document.querySelector(".popup__imagescaleclose");
const formList = Array.from(document.querySelectorAll(".popup__container"));

const object = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__error",
  errorClass: "popup__error_active",
};

function clearError(elem) {
  const object = { inactiveButtonClass: "popup__submit_inactive" };
  const errorSpanList = elem.querySelectorAll(".popup__error");
  const errorInputList = Array.from(elem.querySelectorAll(".popup__input"));
  const buttonElement = elem.querySelector(".popup__submit");
  elem.firstElementChild.reset();
  const resetButton = new FormValidator(object, elem);
  resetButton._toggleButtonState(errorInputList, buttonElement);
  errorSpanList.forEach((span) => {
    span.classList.remove("popup__error_active");
  });
  errorInputList.forEach((input) => {
    input.classList.remove("popup__input_error");
  });
}

function popupOpen() {
  popup.classList.add("popup_opened");
  clearError(popup);
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
  document.addEventListener("keydown", closeOnEscape);
}

function popupClose() {
  popup.classList.remove("popup_opened");
  popupCreateCard.classList.remove("popup_opened");
  popupImageScale.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEscape);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
}

function popupCreateOpen() {
  popupCreateCard.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
}

function formSubmitAddCard(evt) {
  evt.preventDefault();
  const object = {};
  object.picture = createSrcInput.value;
  object.name = createNameInput.value;
  const card = new Card(object.name, object.picture);
  document.querySelector(".elements").prepend(card.generateCard());
  closeAllPopups();
}

export function imageScale(form) {
  form.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    page.querySelector(".popup_opened").classList.remove("popup_opened");
  }
}

function closeOnClickOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    evt.target.classList.remove("popup_opened");
  }
}

function checkFormFields() {
  formList.forEach((form) => {
    const validation = new FormValidator(
      {
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__submit",
        inactiveButtonClass: "popup__submit_inactive",
        inputErrorClass: "popup__error_active",
        errorClass: "popup__error_active",
      },
      form
    );
    validation.enableValidation();
  });
}

addButton.addEventListener("click", function () {
  clearError(popupCreateCard);
  popupCreateOpen(popupCreateCard);
});
createButton.addEventListener("click", formSubmitAddCard);
createButton.addEventListener("click", popupClose);
editButton.addEventListener("click", popupOpen);
popupCloseButton.addEventListener("click", popupClose);
popupCreateCloseButton.addEventListener("click", popupClose);
popupImageScaleCloseButton.addEventListener("click", popupClose);
popup.addEventListener("submit", formSubmitHandler);
submitButton.addEventListener("click", popupClose);
popup.addEventListener("click", closeOnClickOverlay);
popupCreateCard.addEventListener("click", closeOnClickOverlay);
popupScaleImage.addEventListener("click", closeOnClickOverlay);
checkFormFields();
