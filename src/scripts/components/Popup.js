export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      document.querySelector(".popup_opened").classList.remove("popup_opened");
    }
  }

  _handleClickOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _setEventListeners() {
    document.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });
    document.querySelector(".popup__imagescaleclose").addEventListener("click", () => {
      this.close();
    });
    document.querySelector(".popup__createcardclose").addEventListener("click", () => {
      this.close();
    });
    document.querySelector(".popup__confirmclose").addEventListener("click", () => {
      this.close();
    });
    document.querySelector(".popup__update-avatar-close").addEventListener("click", () => {
      this.close();
    });
    document.addEventListener('click', evt => this._handleClickOverlayClose(evt));
  }
}
