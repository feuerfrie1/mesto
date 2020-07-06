import { data } from "autoprefixer";

export class Card {
  constructor(api, item, {handleCardClick, handleCardDelete}, cardSelector) {
    this._api = api;
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = document.querySelector(cardSelector);
  }

  _getTemplate() {
    const cardElement = this._cardSelector
      .content
      .querySelector('.elements__card')
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

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._handleCardDelete(this._element);
    });
    this._element.querySelector('.elements__imagescale').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeButton(evt) {
    if (!(evt.target.classList.contains('elements__like_active'))) {
      this._api.putLike(`/cards/likes/${this._item._id}`, this._item)
        .then((data) => {
          evt.target.classList.add('elements__like_active');
          this._element.querySelector('.elements__like-amount').textContent = data.likes.length;
        });
    } else {
      this._api.deleteCard(`/cards/likes/${this._item._id}`)
        .then((data) => {
          evt.target.classList.remove('elements__like_active');
          this._element.querySelector('.elements__like-amount').textContent = data.likes.length;
        })
    }
  }

  _isMyLike(_item) {
  if (this._item._id === '60f3480b45ce6754456f4f17') {
  } else {
      this._element.querySelector('.elements__like').classList.add('elements__like-active');
  }
}

  _hiddenButtonTrash() {
    if (!(this._item.owner._id === 'b13c4e8ba6aa4955ac325afd')) {
      this._element.querySelector('.elements__delete').style.display = 'none';
    }
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
