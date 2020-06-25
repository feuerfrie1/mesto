
import {Card} from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {Popup} from "../scripts/components/Popup.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {Section} from "../scripts/components/Section.js";
import {UserInfo} from "../scripts/components/UserInfo.js";
import { 
  initialCards,
  elements,
  imageScaleButton,
  nameInput,
  aboutInput
  } from "../scripts/utils/constants.js";

const page = document.querySelector(".page");
export const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupCreateCard = document.querySelector(".popup__createcard");
const popupCloseButton = document.querySelector(".popup__close");
const popupCreateCloseButton = document.querySelector(".popup__createcardclose");
const submitButton = document.querySelector(".popup__submit");

export const createSrcInput = document.querySelector(".popup__input_card-about");
export const createNameInput = document.querySelector(".popup__input_card-name");
const popupScaleImage = document.getElementById("image-scale");
export const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__info-title");
const profileSubtitle = document.querySelector(".profile__info-subtitle");
const createButton = document.querySelector(".popup__submit_create");


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

function popupOpen() {
  popup.classList.add("popup_opened");
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

const form = new UserInfo({
  nameSelector: '.popup__input_name',
  aboutSelector: '.popup__input_about'
});



const formSubmitHandler = new PopupWithForm({
  handleFormSubmit: (formData) => {
    form.setUserInfo(formData.author, formData.about);
  }
}, popup);

function popupCreateOpen() {
  popupCreateCard.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
}




function formSubmitAddCard(evt) {
  evt.preventDefault();
  const object = {};
  object.link = createSrcInput.value;
  object.name = createNameInput.value;
  const card = new Card(object, ".card");
  document.querySelector(".elements").prepend(card.generateCard());
  popupClose();
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
  popupCreateOpen(popupCreateCard);
});
createButton.addEventListener("click", formSubmitAddCard);
createButton.addEventListener("click", popupClose);
editButton.addEventListener("click", popupOpen);
popupCloseButton.addEventListener("click", popupClose);
popupCreateCloseButton.addEventListener("click", popupClose);
popupImageScaleCloseButton.addEventListener("click", popupClose);
popup.addEventListener("submit", formSubmitHandler);

popup.addEventListener("click", closeOnClickOverlay);
popupCreateCard.addEventListener("click", closeOnClickOverlay);
popupScaleImage.addEventListener("click", closeOnClickOverlay);
checkFormFields();
