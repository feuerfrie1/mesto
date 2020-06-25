export class Card {
  constructor(data, { handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = document.querySelector(cardSelector);
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector(".elements__card")
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
        this._handleCardClick(this._name, this._link);
      });
  }
}
