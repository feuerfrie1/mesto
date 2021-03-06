export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
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
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector
      .querySelector(".popup__close")
      .addEventListener("click", (evt) => {
        this.close();
        evt.preventDefault();
      });
    document.addEventListener("click", (evt) =>
      this._handleClickOverlayClose(evt)
    );
  }
}
