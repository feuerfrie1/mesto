export class Card {
  constructor(api, item, {handleCardClick, handleCardDelete}, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._api = api;
    this._item = item;
    this._owner = item.owner;
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
    this._isMyLike();
    const cardImage = this._element.querySelector(".elements__image");
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like-amount').textContent = this._item.likes.length;
    this._hiddenButtonTrash();
    this._loadImage(this._link)
    .then(() => {
    cardImage.src = this._link;
    cardImage.alt = this._name;
    })
    .catch((err) => {
      this._element.querySelector('.elements__title').textContent = 'Ошибка';
      cardImage.src = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
      this._element.querySelector('.elements__like').style.display = 'none';
      this._element.querySelector('.elements__like-amount').style.display = 'none';
      console.log(`Картинка не найдена ${err}`);
    });
    return this._element;
  }

  _handleLikeButton(evt) {
    if (!(this._element.querySelector('.elements__like').classList.contains('elements__like_active'))) {
      this._api.putLike(`/cards/likes/${this._item._id}`, this._item)
        .then((data) => {
          this._element.querySelector('.elements__like').classList.add('elements__like_active');
          this._element.querySelector('.elements__like-amount').textContent = data.likes.length;
        });
    } else {
      this._api.deleteCard(`/cards/likes/${this._item._id}`)
        .then((data) => {
          this._element.querySelector('.elements__like').classList.remove('elements__like_active');
          this._element.querySelector('.elements__like-amount').textContent = data.likes.length;
        })
    }
  }

  _isMyLike(_item) {
    if (this._item.owner._id === 'b13c4e8ba6aa4955ac325afd') {
    } else {
        this._element.querySelector('.elements__like').classList.add('elements__like_active');
    }
}
  _hiddenButtonTrash() {
    if (!(this._item.owner._id === 'b13c4e8ba6aa4955ac325afd')) {
      this._element.querySelector('.elements__delete').style.display = 'none';
    } 
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__delete")
      .addEventListener("click", () => {
        this._handleCardDelete(this._element);
      });
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._element
      .querySelector(".elements__imagescale")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  _loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", err => reject(err));
      img.src = src;
    });
  };
}
