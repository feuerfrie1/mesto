const initialCards = [
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

import {
  bigImageName,
  imageScaleButton,
  bigImage,
  imageScale,
} from "./index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__title").textContent = this._name;
    return this._element;
  }

  _like() {
    this._element
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
  }

  _delete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__delete")
      .addEventListener("click", () => {
        this._delete();
      });
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._like();
      });
    this._element
      .querySelector(".elements__imagescale")
      .addEventListener("click", () => {
        this._imageScale();
      });
  }

  _imageScale() {
    bigImageName.textContent = this._name;
    bigImage.src = this._picture;
    imageScale(imageScaleButton);
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, ".card");
  const cardElement = card.generateCard();
  document.querySelector(".elements").append(cardElement);
});
