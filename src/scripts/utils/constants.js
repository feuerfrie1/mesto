export const page = document.querySelector(".page");
export const editButton = document.querySelector(".profile__edit-button");
export const popup = document.querySelector(".popup");
export const popupCreateCard = document.querySelector(".popup__createcard");
export const popupCloseButton = document.querySelector(".popup__close");
export const popupCreateCloseButton = document.querySelector(".popup__createcardclose");
export const submitButton = document.querySelector(".popup__submit");
export const nameInput = document.querySelector(".popup__input_name");
export const aboutInput = document.querySelector(".popup__input_about");
export const createSrcInput = document.querySelector(".popup__input_card-about");
export const createNameInput = document.querySelector(".popup__input_card-name");
export const popupScaleImage = document.getElementById("image-scale");
export const addButton = document.querySelector(".profile__add-button");
export const profileTitle = document.querySelector(".profile__info-title");
export const profileSubtitle = document.querySelector(".profile__info-subtitle");
export const createButton = document.querySelector(".popup__submit_create");
export const imageScaleButton = document.querySelector(".popup__imagescale");
export const bigImage = document.querySelector(".popup__image");
export const bigImageName = document.querySelector(".popup__imagename");
export const popupImageScale = document.querySelector(".popup__imagescale");
export const popupImageScaleCloseButton = document.querySelector(".popup__imagescaleclose");
export const formInfo = document.querySelector(".popup__container");
export const elements = '.elements';

export const object = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_active",
};

export const initialCards = [
    {
      name: "Архыз",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Камчатка",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Иваново",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Холмогорский район",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];