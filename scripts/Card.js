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

export { Card };

import {
  bigImageName,
  imageScaleButton,
  bigImage,
  imageScale,
} from "./index.js";

class Card {
  constructor(name, picture) {
    this._name = name;
    this._picture = picture;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#elements-template")
      .content.querySelector(".elements__card")
      .cloneNode(true);
    this._element = cardElement;
    return this._element;
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__image").src = `${this._picture}`;
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
  const card = new Card(item.name, item.link);
  document.querySelector(".elements").append(card.generateCard());
});
