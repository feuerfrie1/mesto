export class Card {
  constructor(
    cardSelector,
    putLike,
    deleteLike,
    { data, handleCardClick },
    deleteCard
  ) {
    this._name = data.name;
    this._picture = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content
      .querySelector(".elements__card")
      .cloneNode(true);

    this._element = cardElement;
    this._element.id = this._id;
    this._element.querySelector(
      ".elements__like-amount"
    ).textContent = this._likes.length;
    return this._element;
  }

  _whoIsOwner(_owner) {
    if (this._owner === "b13c4e8ba6aa4955ac325afd") {
    } else {
      this._element.querySelector(".elements__delete").style.display = "none";
    }
  }

  _cardDelete() {
    this._deleteCard();
  }

  _cardClickHandler(evt) {
    if (evt.target.classList.contains("elements__delete")) {
      this._cardDelete();
    }
  }

  _setEventListeners() {
    this._cardHandler = this._cardClickHandler.bind(this);
    this._element.addEventListener("click", this._cardHandler);

    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._showLike();
      });
    this._element
      .querySelector(".elements__delete")
      .addEventListener("click", () => {});
    this._element
      .querySelector(".elements__imagescale")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    const cardItem = this._element.querySelector(".elements__image");
    const cardHeader = this._element.querySelector(".elements__title");
    cardItem.src = this._picture;
    cardItem.alt = this._name;
    cardHeader.textContent = this._name;
    this._whoIsOwner(this._owner);
    if (this._likes.find((item) => item._id === "b13c4e8ba6aa4955ac325afd")) {
      this._element
        .querySelector(".elements__like")
        .classList.add("elements__like_active");
    }
    return this._element;
  }

  _showLike() {
    if (
      this._element
        .querySelector(".elements__like")
        .classList.contains("elements__like_active")
    ) {
      this._element
        .querySelector(".elements__like")
        .classList.remove("elements__like_active");
      this._element.querySelector(
        ".elements__like-amount"
      ).textContent = this._likes.length -= 1;
      this._deleteLike(this._id);
      return;
    }
    this._element
      .querySelector(".elements__like")
      .classList.add("elements__like_active");
    this._putLike(this._id);
    this._element.querySelector(
      ".elements__like-amount"
    ).textContent = this._likes.length += 1;
  }
}
